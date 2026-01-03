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

import smbus
import time

bus = smbus.SMBus(1)

# MMA8452のレジスタアドレス
#REG_CTRL_REG1 = 0x2A
#REG_OUT_X_MSB = 0x01

def init_mma8452(ADDRESS):
    #bus.write_byte_data(ADDRESS, REG_CTRL_REG1, 0x01)
    bus.write_byte_data(ADDRESS, 0x2A, 0x01)

def read_acceleration(ADDRESS):
    #data = bus.read_i2c_block_data(ADDRESS, REG_OUT_X_MSB, 6)
    data = bus.read_i2c_block_data(ADDRESS, 0x01, 6)
    accel_x = ((data[0] << 8) | data[1]) >> 4
    accel_y = ((data[2] << 8) | data[3]) >> 4
    accel_z = ((data[4] << 8) | data[5]) >> 4
    if accel_x > 2047:
        accel_x -= 4096
    if accel_y > 2047:
        accel_y -= 4096
    if accel_z > 2047:
        accel_z -= 4096
    accel_x *= 0.000977
    accel_y *= 0.000977
    accel_z *= 0.000977
    return accel_x, accel_y, accel_z

def read_specified_acceleration(ADDRESS, coord):
    #data = bus.read_i2c_block_data(ADDRESS, REG_OUT_X_MSB, 6)
    data = bus.read_i2c_block_data(ADDRESS, 0x01, 6)
    accel_x = ((data[0] << 8) | data[1]) >> 4
    accel_y = ((data[2] << 8) | data[3]) >> 4
    accel_z = ((data[4] << 8) | data[5]) >> 4
    if accel_x > 2047:
        accel_x -= 4096
    if accel_y > 2047:
        accel_y -= 4096
    if accel_z > 2047:
        accel_z -= 4096
    accel_x *= 0.000977
    accel_y *= 0.000977
    accel_z *= 0.000977
    if coord == "x":
        value = accel_x
    elif coord == "y":
        value = accel_y
    elif coord == "z":
        value = accel_z
    else:
        value = False
    return value

if __name__ == "__main__":
    count = 0
    address = 0x1c
    init_mma8452(address)
    while count <= 10:
        x, y, z = read_acceleration(address)
        print("x: ", x, ", y: ", y, ", z: ", z)

