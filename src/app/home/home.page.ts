import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCore } from '../core/auth.core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


  export class HomePage implements OnInit
  {
    ngOnInit(){
      let url: string =  "https://froged.herokuapp.com"

    if(localStorage.getItem('token') == null)  {
        console.log("Vuelta 1")
        this.router.navigate(['/login']);
        return;
    }
    if(this.cAuth.conectado == false) {
      return this.cAuth.conectarConToken()
          .catch((error) =>{
            console.log("Vuelta 2")
            this.router.navigate(['/login'])
          });

    }
  }
    
logout() {
  this.cAuth.desconectar();
  this.router.navigate(['/login']);
    
}

    constructor(private router: Router, public cAuth: AuthCore) { }

    

    public appMenu = 
    [
        { title: "", url: '', icon: ""}
    ];

    goToLogin(){
      this.router.navigate(['/login']);      
    }
}