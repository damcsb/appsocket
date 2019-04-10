import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from "../service/~service";
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ Service ]
})
export class LoginPage
  {
    //
    // CONSTRUCTOR
    constructor(private router: Router, private http: HttpClient, public alertController: AlertController, private service: Service) { }

    email: string;
    password: string;
    //
    // METHODS
    login() 
    {
        let url: string =  "https://froged.herokuapp.com"
        //let url: string = "http://jjrc.ddns.net:5000"
        // console.log("Esto es el email: " + this.email);
        
      this.service.login(this.http, url, this.email, this.password)
          .then((data: { token: string }) => 
            {
              console.log({ data });
              localStorage.setItem("token", data.token);
              this.gotoHome();
            })
          .catch((error: Error) => 
            { 
              this.PassFailAlarm();
            })  
      }
      //ERROR LOGIN ALARM
      async PassFailAlarm() {
        const alert = await this.alertController.create
        ({
          header: 'Error',
          subHeader: 'Authentication failed',
          message: 'Use your credentials correctly to log in.',
          buttons: ['OK']
        });
        await alert.present();
        }

    gotoHome() {
        this.router.navigate(['/home'])
    }  
}
