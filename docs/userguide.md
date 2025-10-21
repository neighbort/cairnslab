## 1. RAspberry Pi Zero 2Wの設定
Raspberry Pi Zero 2W を自宅のネットワークに接続し、更にノートパソコンから操作するための基本設定を行います。
### Step 1.1: Raspberry Pi ZERO 2Wの準備
・micro SDカードをRaspberry Pi ZERO 2Wに差し込みます。  
・ディスプレイとRaspberry Pi Zero 2Wを繋ぎます。図1.1-1ののミニHDMIポートにミニHDMIケーブルを接続します。  
・キーボードとRaspberry Pi Zero 2Wを繋ぎます。図1.1-1のBのUSB type bポートにキーボードのUSBケーブルを接続します。  
・電源とRaspberry Pi Zero 2Wを繋ぎます。図1.1-1のAのUSB type bポートに5V電源を繋ぎます。Raspberry Pi Zero 2Wが起動します。  
・login名とPasswordを要求されます。出荷時のlogin名とPasswordは以下になります。キーボードでそれぞれ入力すると、ディスプレイに図1.1-2の画面が表示され、Raspberry Pi Zero 2Wの立上が完了となります。  
`Login name : cairnsberry`  
`Password : cairnsberryPi`
### Step 1.2: WiFiの設定
・キーボードで以下のコマンドを入力し、エンターキーを押します。画面に利用可能なWi-Fiネットワークが表示されます。利用予定のWi-Fiが画面に表示されていることを確認してください。  
`sudo nmcli device wifi list`  
・キーボードで以下のコマンドを入力し、エンターキーを押します。ここで、"SSID"には利用予定のWiFiのSSIDを、"YourPassword"にはWi-Fiのパスワードを入力します。これでWi-Fiへの接続が完了します。次回以降、Raspberry Pi Zero 2Wは起動すると自動的にこのWi-Fiに接続します。  
`nmcli device wifi connect "SSID" password "YourPassword"`  
もしSSIDにスペースが含まれる場合は、SSIDを""で囲って入力するようにしてください。  
・キーボードで以下のコマンドを入力し、エンターキーを押します。Raspberry Pi ZERO 2Wが再起動します。  
`sudo reboot`  
・再度login名とパスワードを入力し、図1.1-2の画面が表示されたら、キーボードで以下のコマンドを入力し、エンターキーを押します。Raspberry Pi ZERO 2WのIPアドレスが表示されるので、表示されたIPアドレスをメモしてください（例: 192.168.0.123）。  
`hostname -I`  
### Step 1.3: SSH接続
※以降はRaspberry Pi ZERO 2Wと同じWiFiに接続したパソコンで操作を行います。  
・コマンドプロンプトを開き、以下のコマンドを実行します。  
`ssh cairnsberry@IPアドレス(1.2でメモしたもの)`  
・パスワードを要求されるので、以下の通り入力します。  
`cairnsberryPi`  
・コマンドプロンプト上で図1.3-1の画面が表示されたらssh接続が完了です。パソコンを介してRaspberry Pi ZERO 2Wを操作できます。  
### Step 1.4: Raspberry Pi ZERO 2W組立
・以下のコマンドでRaspberry Pi ZERO 2Wをシャットダウンします。  
`sudo shutdown -h now`  
・付属のミドルハウジングを基盤に取り付けます。  
・基盤のピンソケットにRaspberry Pi ZERO 2Wを取差し込みます。  
・付属のボトムハウジングを基盤にあてがい、タッピングネジでネジ止めします。  
・付属のトップカバーを差し込みます。以上で組立完了です。  
### Note
・Step 1.2が完了すると、Raspberry Pi ZERO 2Wは起動時に自動でWiFiに接続します。ですので、STEP 1.3のSSH接続を用いれば、パソコンからRaspberry Pi ZERO 2Wを操作することができます。  

## 2. ビジュアルプログラム環境の実行
Raspberry Pi ZERO 2Wには予めビジュアルプログラムの為の環境をインストールしています。ここでは当ビジュアルプログラム環境の立上を行います。  
※以降はRaspberry Pi ZERO 2Wと同じWiFiに接続したパソコンで操作を行います。
### Step 2.1: SSH接続
・コマンドプロンプトを開き、以下のコマンドを実行します。  
`ssh cairnsberry@IPアドレス(1.2でメモしたもの)`  
・パスワードを要求されるので、以下の通り入力します。  
`cairnsberryPi`  
・コマンドプロンプト上で図1.3-1の画面が表示されます。  
### Step 2.2: Raspberry Pi ZERO 2Wサーバの立上げ
・先ず以下のコマンドを実行し、ディレクトリを移動します。  
`cd cairnslab/src`  
・GPIO端子を制御する為に以下のコマンドを実行します。  
`sudo pigpiod`  
・ビジュアルプログラム環境の為のRaspberry Pi Webサーバを立上げます。以下のコマンドを実行します。  
`sudo python cairnslab_exe.py`  
・図2.2-1が表示されたら成功です。  
### Step 2.3: ビジュアルプログラム環境
・コマンドプロンプトを最小化し、WEBブラウザのEdgeを立ち上げます。  
・ブラウザ上部のロケーションバーに以下を入力します。  
`https://IPアドレス(1.2でメモしたもの):334`  
・”安全ではありません”等の警告が表示されますので、詳細表示をクリックしアクセスを行います。  
・図2.3-1が表示されれば成功です。  
## 3. ビジュアルプログラミング環境ガイド
### 3.1: 概要
・図3.1-1がビジュアルプログラミング環境です。パソコンのブラウザ上でブロックを組み立ててプログラムを行います。組み立てたプログラムは、Raspberry Pi ZERO 2W上で実行することが出来ます。  
・インターフェースの各部について説明します。
- A. Toolbox : プログラムする為のブロックを選択します
- B. Workspace : このエリアでブロックを組み立ててプログラムします。
- C. Run Code : このボタンを押すと、Workspace上で現在組み立てられたプログラムをRaspberry Pi ZERO 2W上で実行します。  
- D. Terminate : このボタンを押すと、Raspberry Pi ZERO 2W上で実行されているプログラムを強制停止します。  
- E. Save/Load : Saveを押すと、Workspace上で現在組み立てられたプログラムを名前を付けて保存することができます。また、Loadを押すと、過去に保存したプログラムをWorkspace上に呼び出すことが出来ます。  
- F. Console : Raspberry Pi ZERO 2W上で実行しているプログラムの出力等を表示します。  
- G. Bluetooth : Joy-ConとRaspberry Pi ZERO 2Wを接続する場合に使用します。  
### 3.2: ビジュアルプログラミング
・Toolbox内でプログラムする為に必要なブロックを選択できます。ブロックをWorkspaceにドラッグアンドドロップすることでプログラミングできます。
### 3.3: プログラム例
・

## 4. 発送時のRaspberry Pi OS設定
