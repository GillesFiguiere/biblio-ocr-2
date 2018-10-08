import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ItemsService } from '../../services/items.service';
import { LendCDPage } from '../lend-cd/lend-cd';
import CD from '../../models/cd';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdsList: CD[];

  constructor(private modalCtrl: ModalController, private itemsService: ItemsService) {
  }

  ionViewWillEnter() {
    this.cdsList = this.itemsService.cdsList.slice();
  }

  onLoadCd(index: number) {
    let modal = this.modalCtrl.create(LendCDPage, {index: index});
    modal.present();
  }

  ngOnInit() {
    //this.itemsService.loadCDs();
  }
}