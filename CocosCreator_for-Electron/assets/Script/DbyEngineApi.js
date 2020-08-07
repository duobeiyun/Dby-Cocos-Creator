(function() {
    console.log("init dbyEngine in cocos");

    // 一个简易的生成 uuid 的方法
    const uuids = new Set()
    function genUuid() {
        const uuid = Math.floor(Math.random() * 10e9)
        if (uuids.has(uuid) === false) {
            uuids.add(uuid)
            return uuid
        }
        return genUuid()
    }


    window.dbyEngine = new cc.EventTarget();
    window.dbyEngineApiCallResultChannel = new cc.EventTarget(); // 用来通知 API 调用结果
    window.dbyEngineEventChannel = new cc.EventTarget();

    // dby-paas-web-sdk 的所有接口都是异步的，所以这里也要支持回调

    dbyEngine.initialize = function (appId, appKey, cb = () => {}) {
        const uuid = genUuid()
        dbyEngineApiCallResultChannel.once(uuid, cb)
        dbyEngine.emit('initialize', {
            id: uuid,
            data: {
                appId,
                appKey,
            },
        });
    };

    dbyEngine.setupLocalVideo = function (view, cb = () => {}) {
        const uuid = genUuid()
        dbyEngineApiCallResultChannel.once(uuid, cb)
        dbyEngine.emit("setupLocalVideo", {
            id: genUuid(),
            data: {
                view,
            },
        });
    };

    dbyEngine.setupRemoteVideo = function (uid, view, cb = () => {}) {
        const uuid = genUuid()
        dbyEngineApiCallResultChannel.once(uuid, cb)
        dbyEngine.emit("setupRemoteVideo", {
            id: genUuid(),
            data: {
                uid,
                view,
            },
        });
    };

    dbyEngine.joinChannel = function (channelId, userId, nickName, cb = () => {}) {
        const uuid = genUuid()
        dbyEngineApiCallResultChannel.once(uuid, cb)
        dbyEngine.emit('joinChannel', {
            id: uuid,
            data: {
                channelId,
                userId,
                nickName,
            }
        });
    };

    dbyEngine.enableLocalVideo = function (enable, cb = () => {}) {
        const uuid = genUuid()
        dbyEngineApiCallResultChannel.once(uuid, cb)
        dbyEngine.emit("enableLocalVideo", {
            id: uuid,
            data: {
                enable,
            }
        });
    };

    dbyEngine.enableLocalAudio = function (enable, cb = () => {}) {
        const uuid = genUuid()
        dbyEngineApiCallResultChannel.once(uuid, cb)
        dbyEngine.emit("enableLocalAudio", {
            id: uuid,
            data: {
                enable,
            }
        });
    };
})();