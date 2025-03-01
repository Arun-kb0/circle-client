
enum socketEvents {
  // * user
  joinUserRoom = 'join-user-room',
  userRoomNotification = 'user-room-notification',

  // * chat
  joinRoom = 'join-room',
  sendMessage = 'send-message',
  receiveMessage = 'receive-message',
  receiveNotification = 'receive-notification',

  // * call room
  joinCallRoom = 'join-call-room',
  callUserConnected = 'call-user-connected',
  signal = 'signal',
  callStarted = 'call-started',


  // * new call events
  callEnded = 'call-ended',
  callUser = 'call-user',
  answerCall = 'answer-call',
  callAccepted = 'call-accepted',
  leaveCall = 'leave-call',
  iceCandidate = 'ice-candidate',

  getOnlineUsers = 'get-online-users',
  me = "me",

  // * live stream
  liveStreamStarted = 'live-stream-started',
  liveStreamEnded = 'live-stream-ended',
  userLiveStreamStarted = 'user-live-stream-started',
  userLiveStreamEnded = 'user-live-stream-ended',
  liveIceCandidate = 'live-ice-candidate',
  answerLiveStream ='answer-live-stream',
  answeredLiveStream = 'answered-live-stream',
  joinRoomLive = 'join-room-live',
  joinedRoomLive = 'joined-room-live',
  prepareLiveStream = 'prepare-live-stream',
  liveUserDisconnect = 'live-user-disconnect',
  liveUserDisconnected = 'live-user-disconnected',

  liveSendMessage = 'live-send-message',
  liveReceiveMessage = 'live-receive-message',

  // * notification event
  getNotificationSocketId = 'get-notification-socket-id',
  newNotification = 'new-notification'

}

export default socketEvents