import smbus
from PIL import Image, ImageDraw, ImageFont

# SSD1306 I2C アドレス
#ADDRESS = 0x3C
#bus = smbus.SMBus(1)

def ssd1306_command(cmd, ADDRESS):
    bus.write_byte_data(ADDRESS, 0x00, cmd)

bus = smbus.SMBus(1)

def ssd1306_init(ADDRESS):
    for cmd in [
        0xAE,  # DISPLAYOFF
        0xD5, 0x80,  # SETDISPLAYCLOCKDIV
        0xA8, 0x3F,  # SETMULTIPLEX
        0xD3, 0x00,  # SETDISPLAYOFFSET
        0x40,        # SETSTARTLINE
        0x8D, 0x14,  # CHARGEPUMP
        0x20, 0x00,  # MEMORYMODE
        0xA1,        # SEGREMAP
        0xC8,        # COMSCANDEC
        0xDA, 0x12,  # SETCOMPINS
        0x81, 0xCF,  # SETCONTRAST
        0xD9, 0xF1,  # SETPRECHARGE
        0xDB, 0x40,  # SETVCOMDETECT
        0xA4,        # DISPLAYALLON_RESUME
        0xA6,        # NORMALDISPLAY
        0xAF         # DISPLAYON
    ]:
        bus.write_byte_data(ADDRESS, 0x00, cmd)


def ssd1306_image(image, ADDRESS):
    pixels = list(image.getdata())
    for page in range(0, 8):
        ssd1306_command(0xB0 + page, ADDRESS)
        ssd1306_command(0x00, ADDRESS)
        ssd1306_command(0x10, ADDRESS)
        for i in range(0, 128, 32):  # 32バイトずつ送る
            chunk = []
            for x in range(i, i + 32):
                byte = 0
                for bit in range(8):
                    pixel = pixels[x + (page*8+bit)*128]
                    if pixel > 0:
                        byte |= (1 << bit)
                chunk.append(byte)
            bus.write_i2c_block_data(ADDRESS, 0x40, chunk)


def draw_screen(lines):
    image = Image.new("1", (128, 64))
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    for i, text in enumerate(lines):
        y = i * 16  # 行の高さ（標準フォントなら16pxぐらいが見やすい）
        if y + 16 <= 64:  # 画面外にはみ出さないように制限
            draw.text((0, y), text, font=font, fill=255)
    return image


if __name__ == "__main__":
    ssd1306_init()

    draw_screen(["a", "b", "c", "d"])
    ssd1306_image(image, 0x3C)