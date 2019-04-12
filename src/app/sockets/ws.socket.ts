import * as io from 'socket.io-client';

export class WsSocket
  {
    public socket: SocketIOClient.Socket;
    //
    public app: any;
    //
    // METHODS
    connect(apiUrl: string, token: string, slug: string): Promise<void> {
        this.disconnect();
        this.socket = io.connect(`${ apiUrl }/ws`, { query: { appToken: token, slug }});
        return new Promise((resolve, reject) => {
            this.socket.on('GET', (data) => {
                this.app = data.app;
                resolve();
                console.log("comprobando")
              });
            this.socket.on('REJECT', () => reject());
              });
            
      }
    disconnect() {
        this.app = null;
        if (this.socket && this.socket.connected)
            this.socket.disconnect();
      }
  }