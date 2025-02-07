
enum socketEvents {
  joinRoom = 'join-room',
  sendMessage = 'send-message',
  receiveMessage = 'receive-message',
  receiveNotification = 'receive-notification',

  // * call room
  joinCallRoom = 'join-call-room',
  callUserConnected = 'call-user-connected',
  signal = 'signal',
  callStarted = 'call-started'
}

export default socketEvents