import time
import pigpio
import numpy as np
from flask import Flask

print("hello world!")
vectr = np.array([1, 1, 2])
print(type(vectr))

pi = pigpio.pi()
pi.set_mode(23, pigpio.OUTPUT)

pi.write(23, 1)
time.sleep(2)
pi.write(23, 0)
