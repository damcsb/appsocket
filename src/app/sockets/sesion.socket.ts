import * as io from 'socket.io-client';

export class SesionSocket
  {
    public socket: SocketIOClient.Socket;
    public profile: any = null;
    //
    // METHODS
    connect(apiUrl: string, token: string): Promise<any> {
        this.disconnect();
        this.socket = io.connect(`${ apiUrl }/sesion`, { query: { appToken: token }});
        return new Promise((resolve, reject) => {
            this.socket.on('GET', (data) => {
                this.profile = data.agent;
                resolve(data);
              //  console.log(data);
              console.log(this.profile);
              });
            this.socket.on('REJECT', (data) => {
                reject();
              });
            this.socket.on('PROFILE', (data) => {
                console.log("refrescando datos")
                this.profile = data.agent;
              });
          });
      }
      
    disconnect() {
        if (this.socket && this.socket.connected)
            this.socket.disconnect();
      }
  }