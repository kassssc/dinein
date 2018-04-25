import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CreateUserPage } from './create-user/create-user';

import { DbHelperProvider } from '../../providers/dbhelper/dbhelper';
import { UserObject } from '../../DBAssets/DBObjects';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[ DbHelperProvider ],
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public DBHelper: DbHelperProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  executeLogin() {
    this.DBHelper.authenticate(this.email, this.password);
    //console.log(this.email, this.password);

    if (this.loginSuccess(this.email, this.password)) {
      console.log('Login Successful');
      //this.navCtrl.push(TabsPage);
    }
    else {
      console.log('Login Unsuccessful');
    }

  }

  loginSuccess(email: string, password: string) {
    return true;
  }

  goToCreateUser() {
  	this.navCtrl.push(CreateUserPage);
  }
}
