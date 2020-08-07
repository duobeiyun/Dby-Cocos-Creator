(function() {
  console.log("init dbyEngine in adapter");

  if(!window.dbyEngine) {
    console.error("no dbyEngine found")
    return
  }

  let DbyPaasWebSDK
  try {
    DbyPaasWebSDK = require("dby-paas-web-sdk").default
  } catch(e) {
    console.error(e.message)
  }

  if(!DbyPaasWebSDK) {
    console.error(`failed to load DbyRtcEngine`)
    return
  }

  let rtcApiChannel = window.dbyEngine
  let dbyEngineApiCallResultChannel = window.dbyEngineApiCallResultChannel
  let dbyEngineEventChannel = window.dbyEngineEventChannel
  let rtcEngine = new DbyPaasWebSDK()

  rtcApiChannel.on("initialize", event => {
    const data = event.detail.data
    const id = event.detail.id
    rtcEngine.initialize(data.appId, data.appKey).then((code) => {
      dbyEngineApiCallResultChannel.emit(id, {
        code,
      })
    })
  })

  rtcApiChannel.on("joinChannel", event => {
    const data = event.detail.data
    const id = event.detail.id
    rtcEngine.joinChannel(data.channelId, data.userId, data.nickName).then((code) => {
      dbyEngineApiCallResultChannel.emit(id, {
        code,
      })
    })
  })

  rtcApiChannel.on("setupLocalVideo", event => {
    const data = event.detail.data
    const id = event.detail.id
    const div = document.querySelector(`#${data.view}`)
    rtcEngine.setupLocalVideo(div).then((code) => {
      dbyEngineApiCallResultChannel.emit(id, {
        code,
      })
    })
  })

  rtcApiChannel.on("setupRemoteVideo", event => {
    const data = event.detail.data
    const id = event.detail.id
    let div = document.querySelector(`#${data.view}`)
    rtcEngine.subscribe(data.uid, div).then((code) => {
      dbyEngineApiCallResultChannel.emit(id, {
        code,
      })
    })
  })

  rtcApiChannel.on("enableLocalVideo", event => {
    const data = event.detail.data
    const id = event.detail.id
    rtcEngine.enableLocalVideo(data.enable).then((code) => {
      console.log('rtcEngine.enableLocalVideo ', code, dbyEngineApiCallResultChannel, id)
      dbyEngineApiCallResultChannel.emit(id, {
        code,
      })
    })
  })

  rtcApiChannel.on("enableLocalAudio", event => {
    const data = event.detail.data
    const id = event.detail.id
    rtcEngine.enableLocalAudio(data.enable).then((code) => {
      dbyEngineApiCallResultChannel.emit(id, {
        code,
      })
    })
  })

  rtcEngine.on("joinedChannel", (channel, uid) => {
    dbyEngineEventChannel.emit("joinedChannel", {
      channel,
      uid,
    })
  })

  rtcEngine.on("userJoined", (uid, nickName) => {
    dbyEngineEventChannel.emit("userJoined", {
      uid,
      nickName,
    })
  })
})();