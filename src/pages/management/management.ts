import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-management',
  templateUrl: 'management.html'
})
export class ManagementPage {

  constructor(public navCtrl: NavController) {

  }

  executeLogout() {
  	this.navCtrl.parent.parent.pop(this);
  }
}
