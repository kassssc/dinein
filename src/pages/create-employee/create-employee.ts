import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Employee, EmployeesPage } from '../employees/employees';

/**
 * Generated class for the CreateEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-employee',
  templateUrl: 'create-employee.html',
})
export class CreateEmployeePage {
  name: string;
  ID: string;
  phone: string;
  pay: string;
  src: string;
  title: string;

  employees: Array<Employee>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.employees = navParams.get("employees");
  }

  createAndExit(){
    let employeesPage = new EmployeesPage(null);
    this.employees.push(new Employee(this.name, this.ID, this.title, this.pay, this.phone, this.src));
    this.employees.sort(employeesPage.sortByName);

    let alert = this.alertCtrl.create({
      title: 'Employee Successfully Created',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
    

  }

  confirmExit() {
    let confirm = this.alertCtrl.create({
      title: 'Exit without saving?',
      message: 'Are you sure you want to exit without saving your changes? This EMPLOYEE PROFILE WILL NOT BE CREATED.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEmployeePage');
  }

}