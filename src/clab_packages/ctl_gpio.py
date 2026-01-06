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

import pigpio

def set_gpio_default():
    pi = pigpio.pi()

    #pin_low = [22, 27, 10, 17, 13, 23, 24, 25, 12]
    pin_low = [17, 27, 22, 10, 9, 11, 13, 19, 26, 18, 23, 24, 25, 12, 16, 20, 21]
    for pin in pin_low:
        pi.set_mode(pin, pigpio.INPUT)
        pi.set_pull_up_down(pin, pigpio.PUD_DOWN)
    print(str(pin_low) + "have turned to INPUT with PUD_DOWN\n")

    #pin_high = [3, 2]
    pin_high = [4, 5, 6, 14, 15, 8, 7]
    for pin in pin_high:
        pi.set_mode(pin, pigpio.INPUT)
        pi.set_pull_up_down(pin, pigpio.PUD_UP)
    print(str(pin_high) + "have turned to INPUT with PUD_UP\n")
    ## Note. if you set GPIO 2 and 3 high, then you cannnot use them as I2C SCL/SDA.

    pi.stop()


if "__name__" == "__main__":
    set_gpio_default()
