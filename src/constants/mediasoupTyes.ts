import * as mediasoupClient from 'mediasoup-client';

export interface ExtendedTransport extends mediasoupClient.types.Transport {
  _isConnected?: boolean;
}
