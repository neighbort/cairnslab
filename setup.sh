#!/bin/bash
set -e

echo "==================="
echo "=== Setup Start ==="
echo "==================="
sudo apt -y update

# Installing std package
sudo apt install -y vim-nox || echo "ERROR at vim-nox" > log.txt
sudo apt install -y git || echo "ERROR at git" > log.txt
sudo apt install -y jq || echo "ERROR at jq" > log.txt
sudo apt install -y bat || echo "ERROR at bat" > log.txt
sudo apt install -y zip || echo "ERROR at zip" > log.txt
sudo apt install -y tmux || echo "ERROR at tmux" > log.txt
sudo apt install -y pigpio || echo "ERROR at pigpio" > log.txt
sudo apt install -y pigpiod || echo "ERROR at pigpiod" > log.txt
sudo apt install -y i2c-tools || echo "ERROR at i2c-tools" > log.txt
sudo apt install -y dhcpcd5 || echo "ERROR at dhcpcd5" > log.txt
sudo apt install -y fonts-takao || echo "ERROR at fonts-takao" > log.txt

# Installing python package
sudo apt install -y python3-pigpio || echo "ERROR at python3-pigpio" > log.txt
sudo apt install -y python3-numpy || echo "ERROR at python3-numpy" > log.txt
sudo apt install -y python3-flask || echo "ERROR at python3-flask" > log.txt
sudo apt install -y python3-eventlet || echo "ERROR at python3-eventlet" > log.txt
sudo apt install -y python3-flask-socketio || echo "ERROR at python3-flask-socketio" > log.txt
sudo apt install -y python3-evdev || echo "ERROR at python3-evdev" > log.txt
sudo apt install -y python3-smbus || echo "ERROR at python3-smbus" > log.txt
sudo apt install -y python3-pil || echo "ERROR at python3-pil" > log.txt
sudo apt install -y python3-setuptools || echo "ERROR at python3-setuptools" > log.txt

# LED lighting setup 
cat << EOS | sudo tee -a /boot/config.txt
dtparam=pwr_led_trigger=heartbeat
EOS

# Activate i2c
sudo dtparam i2c_arm=on || echo "EROOR at i2c activate" > log.txt

# Actibate bluetooth
if rfkill list bluetooth 2>/dev/null | grep -q "Soft blocked: yes"; then
    sudo rfkill unblock bluetooth || echo "ERROR at bluetoothctl rfkill unblock" > log.txt
fi
sudo hciconfig hci0 up || echo "ERROR at bluetoothctl hci0 up" > log.txt
bluetoothctl power on echo "ERROR at bluetoothctl power on" > log.txt

# Pigpiod automatic start
sudo systemctl enable pigpiod || echo "ERROR at pigpiod automatic" > log.txt

# SD card lifetime extension
F=/etc/fstab
B=/etc/fstab.bak.$(date +%Y%m%d_%H%M%S)
sudo cp "$F" "$B" || echo "ERROR at backup fstab" > log.txt
grep -qE '^[^#].*\s+/tmp\s+tmpfs' "$F" \
 || echo 'tmpfs /tmp tmpfs defaults,size=256m,noatime,mode=1777 0 0' | sudo tee -a "$F"
grep -qE '^[^#].*\s+/var/tmp\s+tmpfs' "$F" \
 || echo 'tmpfs /var/tmp tmpfs defaults,size=32m,noatime,mode=1777 0 0' | sudo tee -a "$F"
sudo mount -a || sudo cp "$B" "$F"

# Reboot
echo "=========================="
echo "=== Setup Completed !! ==="
echo "=========================="
echo "==== Reboot in 10 sec ===="
echo "=========================="
sleep 10
sudo reboot