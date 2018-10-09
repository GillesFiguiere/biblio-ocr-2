import { Component } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public itemsService: ItemsService
  ) { }

  onSaveToCloud() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours…'
    });
    loader.present();
    this.itemsService.saveBooksToCloud().then(
      () => {
        this.itemsService.saveCDsToCloud().then(
          () => {
            loader.dismiss();
            this.toastCtrl.create({
              message: 'Données sauvegardées !',
              duration: 3000,
              position: 'bottom'
            }).present();
          },
          (error) => {
            loader.dismiss();
            this.toastCtrl.create({
              message: error,
              duration: 3000,
              position: 'bottom'
            }).present();
          });
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onLoadFromCloud() {
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours…'
    });
    loader.present();
    this.itemsService.loadBooksFromCloud().then(
      () => {
        this.itemsService.loadCDsFromCloud().then(
          () => {
            loader.dismiss();
            this.toastCtrl.create({
              message: 'Données récupérées !',
              duration: 3000,
              position: 'bottom'
            }).present();
          },
          (error) => {
            loader.dismiss();
            this.toastCtrl.create({
              message: error,
              duration: 3000,
              position: 'bottom'
            }).present();
          }
        )

      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

}
