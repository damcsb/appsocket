import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionSocket } from '../sockets/sesion.socket';


// import { PublicService } from "./../../services/xtra/~public.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


  export class HomePage
  {
    
    constructor(private router: Router, public sesionSocket: SesionSocket) { }

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