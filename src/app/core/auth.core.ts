import { Injectable } from '@angular/core'
import { SesionSocket } from '../sockets/sesion.socket';
import { WsSocket } from '../sockets/ws.socket';
import { Service } from '../service/~service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthCore
  {
    public apiUrl: string = "https://froged.herokuapp.com";
    public token: string;
    public sesion: SesionSocket = new SesionSocket;
    public ws: WsSocket = new WsSocket;
    public conectado: boolean = false;
    private sesionService: Service = new Service();

    constructor(private http: HttpClient) { }
    //
    // METHODS
    conectar(email: string, password: string) {
        return this.sesionService.login(this.http, this.apiUrl, email, password)
            .then((data: { token: string }) => {
                localStorage.setItem("token", data.token);
                return this.conectarConToken();
              })
      }
    conectarConToken() {
        this.token = localStorage.getItem("token");
        console.log({ token: this.token })
        if (this.token == null) return;
        return this.sesion.connect(this.apiUrl, this.token)
            .then(() => console.log("sesion ok"))
            .then(() => this.ws.connect(this.apiUrl, this.token, "company1"))
            .then(() => console.log("ws ok"))
            .then(() => this.conectado = true)
            .catch((error) => {
                console.log("Error")
                console.log(error)
                localStorage.clear()
              });
        /**
        return Promise.all([
              this.sesion.connect(this.apiUrl, this.token),
              this.ws.connect(this.apiUrl, this.token, "company1")
            ])
          .then(() => this.conectado = true)
          .catch((error) => {
              console.log("Error")
              console.log(error)
              localStorage.clear()
            });*/
      }
    desconectar() {
        localStorage.clear();
        this.sesion.disconnect();
        this.ws.disconnect();
        this.token = "";
        this.conectado  = false;
      }
  }