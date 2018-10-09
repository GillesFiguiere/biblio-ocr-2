import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ItemsService } from '../../services/items.service';
import { LendCDPage } from '../lend-cd/lend-cd';

import CD from '../../models/cd';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdsList: CD[];
  cdsListSubscription: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.cdsListSubscription = this.itemsService.cdsList$.subscribe(
      (cds: CD[]) => {
        this.cdsList = cds.slice();
      }
    );
    this.itemsService.emitCDsList();
  }

  ngOnDestroy() {
    this.cdsListSubscription.unsubscribe();
  }

  onLoadCd(index: number) {
    let modal = this.modalCtrl.create(LendCDPage, { index: index });
    modal.present();
  }

}