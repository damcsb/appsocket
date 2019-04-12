import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from "../service/~service";
import { AlertController } from '@ionic/angular';
import { AuthCore } from '../core/auth.core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ Service ]
})
export class LoginPage implements OnInit
  {
    //
    // CONSTRUCTOR
    constructor(private router: Router, public alertController: AlertController, public cAuth: AuthCore) { }

    email: string;
    password: string;

    ngOnInit (){
      this.cAuth.conectarConToken();
    }
    //
    // METHODS
    login() 
    {
        this.cAuth.conectar(this.email, this.password)
          .then((data: any) => 
            {
              this.router.navigate(['/home'])
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
}
