
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
  me = "me"
}

export default socketEvents