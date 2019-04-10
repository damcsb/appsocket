import * as io from 'socket.io-client';

export class SesionSocket
  {
    public socket: SocketIOClient.Socket;
    //
    // METHODS
    connect(apiUrl: string, token: string): Promise<string> {
        this.disconnect();
        this.socket = io.connect(`${ apiUrl }/sesion`, { query: { appToken: token }});
        return new Promise((resolve, reject) => {
            this.socket.on('GET', (data) => {
                resolve(data);
              });
            this.socket.on('REJECT', (data) => {
                reject();
              });
          });
      }
    disconnect() {
        if (this.socket && this.socket.connected)
            this.socket.disconnect();
      }
  }