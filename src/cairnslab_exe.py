# Copyright 2026 neighbort
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, Response, request, redirect, url_for, render_template, jsonify
from flask_socketio import SocketIO
import threading
import json
import sys
import io
from clab_packages import ctl_bluetooth as myblue
from clab_packages import ctl_gpio as mygpio
from multiprocessing import Process, Queue
import subprocess
import argparse

# arg analysis
parser = argparse.ArgumentParser()
parser.add_argument('--camera', action='store_true', help='カメラモードを有効にする')
args = parser.parse_args()

# Set up Web Server
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")  # add 0331

current_process = None

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

# This is called from "run_python()": which is used only at testing
@app.route('/jsonrpi', methods=['POST'])
def controll():
    code = request.json
    try:
        exec(code)
        return 'Success'
    except Exception as e:
        return 'Error: ' + str(e)

# this makes RPi run code and let stdout issue to client real time, as well as terminate run
# At the end of this code, initialize GPUI state
def stream_exec_code(code, output_queue):
    class StreamRedirector:
        def write(self, message):
            output_queue.put(message)
        def flush(self):
            pass
    sys.stdout = StreamRedirector()
    output_queue.put("\n***** Run Program You Built! *****\n")
    try:
        exec(code)
    except Exception as e:
        output_queue.put(f"Error: {str(e)}")
    finally:
        output_queue.put("+++++ Finish +++++\n")
        mygpio.set_gpio_default()
        output_queue.put("__end__")

# queue code and put message with "output" event
@socketio.on("run_code")
def handle_code(code):
    global current_process
    if current_process and current_process.is_alive():
        socketio.emit("output", {"message": "Error: Another process is still running."})
        return
    output_queue = Queue()
    current_process = Process(target=stream_exec_code, args=(code, output_queue))
    current_process.start()
    def stream_output():
        while True:
            message = output_queue.get()
            if message == "__end__":
                break
            socketio.emit("output", {"message": message})
        current_process.join()
    socketio.start_background_task(stream_output)

# terminate implementing code, and initialize GPIO state
@socketio.on("stop_code")
def stop_code():
    global current_process
    if current_process and current_process.is_alive():
        current_process.terminate()
        socketio.emit("output", {"message": "Code execution was forcibly stopped."})
    else:
        socketio.emit("output", {"message": "No running code to stop."})
    mygpio.set_gpio_default()


@app.route("/scan-connect", methods=["POST"])
def scan_connect():
    stdout = myblue.scan_and_connect_to_joycon()
    return jsonify({"result": stdout})

@app.route("/paired", methods=["GET"])
def paired_devices():
    devices = myblue.get_paired_devices()
    return jsonify(devices)

@app.route("/connect", methods=["POST"])
def connect():
    mac = request.json.get("mac")
    print(mac)
    stdout = myblue.connect_to_device(mac)
    print(stdout)
    return jsonify({"result": stdout})

@app.route("/disconnect", methods=["POST"])
def disconnect():
    stdout = myblue.disconnect_current_device()
    return jsonify({"result": stdout})

@app.route("/remove", methods=["POST"])
def remove():
    mac = request.json.get("mac")
    stdout = myblue.remove_device(mac)
    return jsonify({"result": stdout})

@app.route("/detect_i2c", methods=["POST"])
def detect_i2c():
    try:
        result = subprocess.check_output(
            ["sudo", "i2cdetect", "-y", "1"], 
            stderr=subprocess.STDOUT, 
            text=True
        )
    except subprocess.CalledProcessError as e:
        result = f"Error: {e.output}"
    return jsonify({"result": result})

# Set up camera and streaming
if args.camera:
    from picamera2 import Picamera2
    import cv2
    from libcamera import Transform
    picam2 = Picamera2()
    picam2.configure(picam2.create_video_configuration(main={"size": (420, 315)}, transform=Transform(vflip=True, hflip=True)))
    picam2.start()

    def generate_frames():
        while True:
            # Capture frame-by-frame
            frame = picam2.capture_array()
            # Convert to JPEG format
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            # Yield the frame in byte format to the browser
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    @app.route('/free_boad')
    def video_feed():
        return Response(generate_frames(),
                        mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':

### follwoing is std http run, FilePicker doesn't work
#    app.run(host='0.0.0.0', port=8000, debug=False)

### following is std https run, FilePicker work
#    app.run(host='0.0.0.0', port=334, ssl_context=('server.crt', 'server.key'), threaded=True, debug=True)

### following is https run with socket to catch server stdout in real time
    #NOTE: work with "async_mode=threading"
    socketio.run(app, host='0.0.0.0', port=334, ssl_context=('server.crt', 'server.key'), debug=False)
    #CAUTION: following could work with "async_mode=eventlet", but had ssrerror. Not knowing why. 2025/04/01
    #socketio.run(app, host='0.0.0.0', port=334, certfile='serevr.crt', keyfile='server.key', debug=False
