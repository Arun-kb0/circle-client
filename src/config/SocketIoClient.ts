import { connect, Socket } from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5001'
const SOCKET_NOTIFICATION_URL = import.meta.env.VITE_NOTIFICATION_SERVICE || 'http://localhost:8086'


class SocketIoClient {
  private static instance: Socket | null = null
  private static notificationInstance: Socket | null = null

  static getInstance(userId?: string) {
    if (!SocketIoClient.instance && userId) {
      SocketIoClient.instance = connect(SOCKET_URL, {
        reconnectionAttempts: 3,
        timeout: 10000, // 10 seconds
        query: { userId }
      })

      SocketIoClient.instance.on('connect', () => {
        console.log('Connected to Socket.IO server:', SOCKET_URL);
      })
      SocketIoClient.instance.on('connect_error', (error) => {
        console.error('Connection error:', error.message);
      })

    }
    return SocketIoClient.instance
  }

  static connect() {
    const socket = SocketIoClient.getInstance()
    if (!socket?.connected) {
      socket?.connect()
    }
  }

  static disconnect() {
    if (SocketIoClient.instance) {
      SocketIoClient.instance.disconnect()
      SocketIoClient.instance = null
    }
  }

  static getNotificationInstance(userId?: string) {
    if (!SocketIoClient.notificationInstance && userId) {
      SocketIoClient.notificationInstance = connect(SOCKET_NOTIFICATION_URL, {
        reconnectionAttempts: 3,
        timeout: 10000, // 10 seconds
        query: { userId }
      })

      SocketIoClient.notificationInstance.on('connect', () => {
        console.log('Connected to Socket.IO notification server:', SOCKET_NOTIFICATION_URL);
      })
      SocketIoClient.notificationInstance.on('connect_error', (error) => {
        console.error('Notification Connection error:', error.message);
      })

    }
    return SocketIoClient.notificationInstance
  }

  static connectNotification() {
    const socket = SocketIoClient.getNotificationInstance()
    if (!socket?.connected) {
      socket?.connect()
    }
  }

  static disconnectNotification() {
    if (SocketIoClient.notificationInstance) {
      SocketIoClient.notificationInstance.disconnect()
      SocketIoClient.notificationInstance = null
    }
  }

}

export default SocketIoClient