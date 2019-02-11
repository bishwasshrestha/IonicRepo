import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import { HomePage } from "../home/home";
import { LogoutPage } from "../logout/logout";
import { RegisterPage } from "../register/register";
import { UploadPage } from "../upload/upload";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homepage = HomePage;
  register = RegisterPage;
  logout = LogoutPage;
  upload = UploadPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
