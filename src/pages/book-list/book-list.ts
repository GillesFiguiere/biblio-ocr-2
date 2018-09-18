import { Component } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { Book } from '../../models/book';
import { ItemsService } from '../../services/items.service';
import { LendBookPage } from '../lend-book/lend-book';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  booksList: Book[];

  constructor(private modalCtrl: ModalController, private itemsService: ItemsService, private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.booksList = this.itemsService.booksList.slice();
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

  // onToggleMenu() {
  //   this.menuCtrl.open();
  // }
}
