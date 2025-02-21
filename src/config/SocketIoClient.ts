import { relativeTimeRounding } from "moment"
import { connect, Socket } from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5001'

class SocketIoClient {
  private static instance: Socket | null = null

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
    }
  }

}

export default SocketIoClient