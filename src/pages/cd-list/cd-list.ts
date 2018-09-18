import { Component } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { Cd } from '../../models/cd';
import { ItemsService } from '../../services/items.service';
import { LendCdPage } from '../lend-cd/lend-cd';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdsList: Cd[];

  constructor(private modalCtrl: ModalController, private itemsService: ItemsService, private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.cdsList = this.itemsService.cdsList.slice();
  }

  onLoadCd(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

  // onToggleMenu() {
  //   this.menuCtrl.open();
  // }
}