import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Cd } from '../../models/cd';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage {

  index: number;
  cd: Cd;

  constructor( public viewCtrl: ViewController, public navParams: NavParams, public itemsService: ItemsService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.itemsService.cdsList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleCd() {
    this.itemsService.toggleCdIsLent(this.index);
  }

}
