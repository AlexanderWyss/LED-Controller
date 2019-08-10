# LED-Controller
Prerequisits:
```
npm i -g ionic
npm i -g cordova
```

Java 1.8.* + JAVA_HOME env variable

Android sdk + ANDROID_SKD_ROOT env variable + adb (Am einfachsten installiert mithilfe von AndroidStuio)

Install on device:
```
ionic cordova build android --prod
adb install .\platforms\android\app\build\outputs\apk\debug\app-debug.apk
```

Dependig on wheter it is used as Website or App Http or Bluetooth will be used.
