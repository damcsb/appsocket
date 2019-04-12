import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionSocket } from '../sockets/sesion.socket';
import { WsSocket } from '../sockets/ws.socket';

// import { PublicService } from "./../../services/xtra/~public.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


  export class HomePage implements OnInit
  {
    ngOnInit(){
      let url: string =  "https://froged.herokuapp.com"

    if(localStorage.getItem('token') == null) 
    {
        this.router.navigate(['/login']);
        return;
    }
    if(this.sesionSocket.disconnect)
    {
        return this.sesionSocket.connect(url, localStorage.getItem('token'))
          .then(() => this.wssocket.connect(url, localStorage.getItem('token'), "company1"))
          .catch((error) =>{
            this.router.navigate(['/login'])
          });

    }
  }
    
    constructor(private router: Router, public sesionSocket: SesionSocket, public wssocket: WsSocket) { }

    public ClearStorage(){
      localStorage.clear();
    }

    public appMenu = 
    [
        { title: "", url: '', icon: ""}
    ];

    goToLogin(){
      this.router.navigate(['/login']);      
    }
}