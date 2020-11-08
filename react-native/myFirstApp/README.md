#windows android 环境搭建
安装react-native
```
npm install -g react-native-cli
```
上官网下载android studio

下载[SDK平台工具](https://developer.android.com/studio/releases/platform-tools.html)

配置环境变量
```
ANDROID_SDK_HOME E:\android-avd  // 用于配置下载的android系统位置
Path E:\platform-tools  // 用于配置 adb
C:\Users\HASEE\AppData\Local\Android\Sdk\emulator  // 用于配置 emulator
```
打开android studio并安装

在`E:\android-avd\.android\avd\Pixel_2_API_30.avd`目录下删除`hardware-qemu.ini.lock`、`multiinstance.lock`和`snapshot.lock.lock`

在app\android目录下新建local.properties文件
```
sdk.dir=C\:\\Users\\HASEE\\AppData\\Local\\Android\\Sdk
```

