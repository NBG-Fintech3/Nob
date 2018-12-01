import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WatsonProvider } from '../../providers/watson/watson';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
