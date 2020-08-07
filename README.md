
step 1: Build web-desktop project and copy it into electron demo.

1.1: Open project named CocosCreator_for-Electron by Cocos Creator v1.8.2.

1.2: Input your appId in CocosCreator_for-Electron/assets/Script/HelloWorld.js :
var appId = #YOUR_APPID;
var appKey = #YOUT_APPKEY;
var channelId = #YOUR_CHANNEL_ID;
var userId = #YOUR_USER_ID

1.3: Project->Build->Platform->Web Desktop->Build.(These steps is just want to build an Web-Desktop project, Note: do not need to compile it)

1.4: copy CocosCreator_for-Electron/build/web-desktop into Dby-Electron-React/ .


step 2: Run web-desktop by electron.

2.1: Run "cd /Dby-Electron-React".

2.2: Run "npm install".

2.3: Run "npm run start"


end!