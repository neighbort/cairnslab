# Copyright 2026 Nnighbort
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

import subprocess
import time
import re

def start_scan_and_get_joycon_address(timeout=15):
    print("🔍 Joy-Con をスキャン中…")
    proc = subprocess.Popen(["bluetoothctl"],
                            stdin=subprocess.PIPE,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            universal_newlines=True,
                            bufsize=1)
    # scan on を送信
    proc.stdin.write("scan on\n")
    proc.stdin.flush()
    joycon_mac = None
    start_time = time.time()
    # 出力をリアルタイムに読み取り
    while True:
        line = proc.stdout.readline()
        print(line)
        if not line:
            break
        # スキャン中に "Device XX:XX:XX:XX:XX:XX Joy-Con" の行を探す
        match = re.search(r'Device\s+([0-9A-F:]{17})\s+(Joy-Con(?:\s\w+)?)', line)
        if match:
            joycon_mac = match.group(1)
            joycon_name = match.group(2)
            print(f"🎮 見つけた！: {joycon_name} [{joycon_mac}]")
            break
        if time.time() - start_time > timeout:
            print("⏰ タイムアウト: Joy-Con が見つかりませんでした。")
            break
    # scan off と bluetoothctl 終了
    proc.stdin.write("scan off\n")
    proc.stdin.write("exit\n")
    proc.stdin.flush()
    proc.terminate()
    return joycon_mac

def pair_and_connect(mac):
    print(f"🔗 {mac} にペアリング & 接続を開始します")
    proc = subprocess.Popen(["bluetoothctl"],
                            stdin=subprocess.PIPE,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            universal_newlines=True,
                            bufsize=1)

    def send_and_wait(cmd, expected, timeout=10):
        print(f"👉 {cmd} を送信中...")
        proc.stdin.write(cmd + '\n')
        proc.stdin.flush()
        start_time = time.time()
        while True:
            line = proc.stdout.readline()
            if line:
                print("📥", line.strip())
                if expected in line:
                    print(f"✅ 「{expected}」を検出しました")
                    break
            if time.time() - start_time > timeout:
                print(f"⚠️ タイムアウト: 「{expected}」が見つかりませんでした")
                break

    send_and_wait(f"pair {mac}", "Pairing successful")
    send_and_wait(f"trust {mac}", "trust succeeded")
    send_and_wait(f"connect {mac}", "Connection successful")
    proc.stdin.write("exit\n")
    proc.stdin.flush()
    proc.terminate()

def scan_and_connect_to_joycon():
    mac = start_scan_and_get_joycon_address()
    if mac:
        pair_and_connect(mac)
        output = "Success!!! Joy-Con mac address: " + str(mac)
    else:
        print("❌ Joy-Con の接続に失敗しました。")
        output = "Failed... turn Joy-Con stand by mode"
    return output


def run_bluetoothctl_command(commands):
    proc = subprocess.Popen(['bluetoothctl'],
                            stdin=subprocess.PIPE,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE)
    output, _ = proc.communicate('\n'.join(commands).encode())
    return output.decode()


def get_paired_devices():
    #proc = subprocess.run(["bluetoothctl", "devices"], capture_output=True, text=True)
    proc = run_bluetoothctl_command(["devices"])
    devices = []
    if len(proc) != 0:
        for line in proc.splitlines():
            match = re.search(r"Device ([0-9A-F:]{17}) (.+)", line)
            if match:
                mac, name = match.groups()
                devices.append({"mac": mac, "name": name})
    return devices


def connect_to_device(mac):
    proc = run_bluetoothctl_command([f"connect {mac}"])
    return proc


def disconnect_current_device():
    proc = run_bluetoothctl_command(["disconnect"])
    return proc


def remove_device(mac):
    proc = run_bluetoothctl_command([f"remove {mac}"])
    return proc


if __name__ == "__main__":
    #result = scan_and_connect_to_joycon()
    
    devices = get_paired_devices()
    print(devices)
    print(devices[0]["mac"])
    mac = devices[0]["mac"]

    #result = connect_to_device(mac)
    result = disconnect_current_device()
    #result = remove_device(mac)
    print(result) 
