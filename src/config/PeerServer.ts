import Peer from 'peerjs'

const HOST = 'localhost'
const PORT = 9000
const PATH = '/peer'

class PeerServer {
  private static instance: Peer | null = null

  static getInstance() {
    if (!PeerServer.instance) {
      PeerServer.instance = new Peer({
        host: HOST,
        port: PORT,
        path: PATH,
        secure: false
      })
    }
    PeerServer.instance.on('open', () => {
      console.log(`Connected to peer server: ${HOST}:${PORT}`);
    })
    PeerServer.instance.on('error', (error) => {
      console.error('Connection error:', error.message);
    })

    return PeerServer.instance
  }

}

export default PeerServer