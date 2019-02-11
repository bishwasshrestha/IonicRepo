import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginResponse, RegisterResponse, User, existingUser } from '../../interfaces/Users';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { createViewChild } from '@angular/compiler/src/core';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: any = {};
  showRegister = false;
  confirmpassword = '';

  @ViewChild('username') usernameInput;
  @ViewChild('registerForm') form: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad RegisterPage');
  }

  confirmPassword(event) {
    if (this.user.password !== this.confirmpassword) {
      this.showAlert('Your password did not match. :(');
      return;
    }
  }

  showAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK'],
    });
    alert.present().catch();
  }

  checkUser() {
    this.mediaProvider.checkUsers(this.user.username).subscribe((data: existingUser) => {
      console.log(data.available);
      if (!data.available) {
        this.usernameInput.clearInput = true;
        this.showAlert('Username already taken, please select another!');
      }
    });
  }

  register() {
    console.log('registration baby! ');
    this.mediaProvider.register(this.user).subscribe((data: RegisterResponse) => {
      this.login();
      this.form.reset();
    }, error => {
      this.showAlert(error.error.message + 'register error');
    });
  }

  login() {
    console.log('loggin in');
    this.mediaProvider.login(this.user)
      .subscribe((data: LoginResponse) => {
        console.log('login party');
        localStorage.setItem('token', data.token);
        this.mediaProvider.user = data.user;
        localStorage.setItem('user_id', data.user.user_id.toString());
        this.mediaProvider.loggedIn = true;
        this.navCtrl.parent.select(0);
      }, (error) => {
        console.log(error.error.message);
        this.showAlert(error.error.message + ' login error');
      });
  }


  swapForm() {
    this.showRegister = !this.showRegister;
  }
}
