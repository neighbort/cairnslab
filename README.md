# cairnslab

## 概要

Raspberry Pi Zero W（以降ラズパイZero）で気軽に電子工作を楽しむ為のアプリです。ラズパイZeroの機能や接続した電子部品等を、WEBブラウザを介してお手持ちのPCで操作することが出来ます。また、ビジュアルプログラム環境を備えており、WEBブラウザでブロックを組み立ててプログラムを行い、完成したコードをラズパイZeroに実行させることが出来ます。これらの機能により、複雑なコマンドやコードを記述することなく、ラズパイZeroで電子工作

## クイックスタート

1. `sudo apt update`, `sudo apt install git` を実行し、ラズパイZeroに git をインストールします。
2. `git clone https://github.com/neighbort/cairnslab.git`　を実行し、アプリケーションをインストールします。
3. `./setup.sh` を実行し、必要なパッケージをインストールします。
4.  `cd src` を実行し、srcフォルダへ移動します。
5. `sudo pigpiod` を実行し、pigpioデーモンを起動します。
6. `sudo python cairnslab_exe.py` を実行し、cairnslabを起動します。
7. お手持ちのPCで、ラズパイZeroサーバーへアクセスします。

## ガイド

- 