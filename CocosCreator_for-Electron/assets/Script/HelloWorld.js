import {
    join
} from "path";
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },

        muteVideoBtn: {
            default: null,
            type: cc.Button
        },

        muteVideoLabel: {
            default: null,
            type: cc.Label
        },

        muteAudioBtn: {
            default: null,
            type: cc.Button
        },

        muteAudioLabel: {
            default: null,
            type: cc.Label,
        },

        muteVideoFlag: false,
        muteAudioFlag: false,

        tag: "Dby_Log",
    },

    // use this for initialization
    onLoad: function () {
        var appId = #YOUR_APPID
        var appKey = #YOUR_APPKEY
        var channelId = #YOUR_CHANNEL_ID
        var userId = #YOUR_USER_ID

        this.initDbyEvents(true);
        this.initClickEvents(true);

        dbyEngine.initialize(appId, appKey, () => {
            console.log('init success')
            dbyEngine.joinChannel(channelId, userId, userId, () => {
                console.log('joinChannel success')
                dbyEngine.setupLocalVideo("LocalVideoDiv");
            });
        });
    },

    onDestroy: function() {
        this.initDbyEvents(false);
        this.initClickEvents(false);
    },

    initClickEvents: function(initFlag) {
        if (initFlag) {
            this.muteVideoBtn.node.on('click', this.onMuteVideoClick, this);
            this.muteAudioBtn.node.on('click', this.OnMuteAudioClick, this);
        } else {
            this.muteVideoBtn.node.off('click', this.onMuteVideoClick, this);
            this.muteAudioBtn.node.off('click', this.OnMuteAudioClick, this);
        }
    },

    initDbyEvents: function (initFlag) {
        if (dbyEngine) {
            if (initFlag && dbyEngineEventChannel) {
                dbyEngineEventChannel.on('joinedChannel', this.onJoinChannelSuccess, this);
                dbyEngineEventChannel.on('userJoined', this.onUserJoined, this);
                dbyEngineEventChannel.on('error', this.onError, this);
            } else if (initFlag === false && dbyEngineEventChannel) {
                dbyEngineEventChannel.off('joinedChannel', this.onJoinChannelSuccess, this);
                dbyEngineEventChannel.off('userJoined', this.onUserJoined, this);
                dbyEngineEventChannel.off('error', this.onError, this);
            }
        }
    },

    onMuteVideoClick: function() {
        console.log('onMuteVideoClick')
        this.muteVideoFlag = !this.muteVideoFlag;
        dbyEngine.enableLocalVideo(!this.muteVideoFlag);
        this.updateMuteVideoBtnUI();
    },

    OnMuteAudioClick: function() {
        console.log('OnMuteAudioClick')
        this.muteAudioFlag = !this.muteAudioFlag;
        dbyEngine.enableLocalAudio(!this.muteAudioFlag);
        this.updateMuteAudioBtnUI();
    },

    updateMuteAudioBtnUI: function() {
        this.printfLog(this.tag, "updateMuteAudioBtnUI");
        if (this.muteAudioFlag) {
            this.muteAudioLabel.string = "UnMuteAudio";
        } else {
            this.muteAudioLabel.string = "MuteAudio";
        }
    },

    updateMuteVideoBtnUI: function() {
        this.printfLog(this.tag, "updateMuteVideoBtnUI");
        if (this.muteVideoFlag) {
            this.muteVideoLabel.string = "UnMuteVideo";
        } else {
            this.muteVideoLabel.string = "MuteVideo";
        }
    },

    onUserJoined: function (event) {
        this.printfLog(this.tag, "receive message onUserJoined uid = " + event.detail.uid + " , nickname = " + event.detail.nickName);
        dbyEngine.setupRemoteVideo(event.detail.uid, "RemoteVideoDiv");
    },

    onJoinChannelSuccess: function (event) {
        this.printfLog(this.tag, "onJoinChannelSuccess channel = " + event.detail.channel + " ,uid = " + event.detail.channel);
    },

    onError: function (event) {
        this.printfLog(this.tag, "onError warn = " + event.detail[0] + " ,msg = " + event.detail[1]);
    },

    printfLog: function(tag, message) {
        cc.log(tag + " " + message);
    }
});
