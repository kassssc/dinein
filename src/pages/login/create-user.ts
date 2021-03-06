import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { CreateRestaurantPage } from './create-restaurant';
import { Restaurant } from '../util/classes';
import { InputNumpad } from '../util/numpad';

import { UserObject } from '../../DBAssets/DBObjects';
import { DbHelperProvider } from '../../providers/dbhelper/dbhelper';

/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-create-user',
	templateUrl: 'create-user.html',
	providers: [ DbHelperProvider ]
})
export class CreateUserPage {

	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	phone: number;
	restaurant: string;

	buttonTextPhone: string;
	buttonTextRestaurant: string;

	createdRestaurant: Restaurant;

	restaurantsList: string[] = ["Potbelly", "State St. Brats", "Hopcat", "Five Guys",
															 "Chipotle", "Nitty Gritty", "Dotty's", "Ians",
															 "Glaze", "QQs"];

	constructor(public navCtrl: NavController,
							public modalCtrl: ModalController,
							public viewCtrl: ViewController,
							public alertCtrl: AlertController,
							public navParams: NavParams,
						  public DBHelper: DbHelperProvider) {

		this.createdRestaurant = this.navParams.get('restaurant');
		if (this.createdRestaurant) {
			console.log('received restaurant: ' + this.createdRestaurant.name);
		} else {
			this.createdRestaurant = null;
		}

		this.email = null;
		this.password = null;
		this.confirmPassword = null;
		this.firstName = null;
		this.lastName = null;
		this.phone = null;
		this.restaurant = null;

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateUserPage');
	}

	submit() {
		let newUser = new UserObject();
		newUser.email = this.email;
		newUser.password = this.password;
		newUser.firstName = this.firstName;
		newUser.lastName = this.lastName;
		newUser.phoneNo = this.phone;
		newUser.restaurant = this.restaurant;

		this.DBHelper.addUser(newUser);


		let alert = this.alertCtrl.create({
			title: "User Account Successfully Created",
			enableBackdropDismiss: false,
			buttons: [
				{
					text: "OK",
					handler: () => { this.exit(); }
				}
			]
		});
		alert.present();
	}

	exit() {
		this.navCtrl.pop();
	}

	presentNumpad() {
		let numpadModal = this.modalCtrl.create(
			InputNumpad, {
										inputField: "Phone Number",
										alertTitle: "Invalid Phone Number",
										alertMsg: null,
										validInputCondition: function(input) {
											return (input > 999999999) && (input < 10000000000);
										},
										secondaryValidInputCondition: null
									 }
		);
		numpadModal.onDidDismiss(returnedNum => {
			if (returnedNum != null) {
				this.phone = returnedNum;
			}
		});
		numpadModal.present();
	}

	presentRestaurantSelector() {
		let modal = this.modalCtrl.create(SelectRestaurant, {restaurants: this.restaurantsList});
		modal.onDidDismiss(data => {
			if (data != null) {
				if (data == 0) {
					this.navCtrl.push(CreateRestaurantPage);
				} else {
					this.restaurant = data;
					this.buttonTextRestaurant = String(this.restaurant);
				}
			}
		});
		modal.present();
	}

	validData() {
		return (this.email != null &&
						this.password != null &&
						this.confirmPassword != null &&
						this.firstName != null &&
						this.restaurant != null);
	}

	passwordsMatch() {
		return (this.password == this.confirmPassword);
	}

	getPhoneStr(): string {
		if (this.phone) {
			let phoneStr = this.phone.toString();
			if (phoneStr.length == 10) {
				return "("+phoneStr.slice(0,3)+") "+phoneStr.slice(3,6)+"-"+phoneStr.slice(6,10);
			}
		}
		return this.phone.toString();
	}
}

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
@Component({
	selector: 'page-create-user',
	template: `
		<div class="modalbase" id="restaurantmodal">
			<h3 class="colormedium">Select Restaurant</h3>
			<ion-content class="modallist3buttons">
				<ion-list scroll="true">
					<button ion-button block outline class="listbutton"
									*ngFor="let restaurant of restaurants"
									[ngClass]="{'selectedrestaurant': restaurant === selectedRestaurant,
															'restaurant': restaurant !== selectedRestaurant}"
									(click)="selectRestaurant(restaurant)">
						{{restaurant}}
					</button>
				</ion-list>
			</ion-content>
			<button class="modalbutton" ion-button block
								(click)="OK()">OK</button>
			<button class="modalbutton" ion-button block outline
								(click)="cancel()">Cancel</button>
			<button class="modalbutton" ion-button block outline
								(click)="createNewRestaurant()">Create New Restaurant</button>
		</div>
	`
})
export class SelectRestaurant {

	restaurants: string[];
	selectedRestaurant: string;

	constructor(public viewCtrl: ViewController,
							private params: NavParams) {
		this.restaurants = params.get('restaurants');
		this.selectedRestaurant = this.restaurants[0];
	}

	selectRestaurant(r: string) {
		this.selectedRestaurant = r;
	}

	OK() {
		this.viewCtrl.dismiss(this.selectedRestaurant);
	}

	createNewRestaurant() {
		this.viewCtrl.dismiss(0);
	}

	cancel() {
		this.viewCtrl.dismiss(null);
	}

}
