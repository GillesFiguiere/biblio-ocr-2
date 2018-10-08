import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ItemsService } from '../../services/items.service';
import { LendBookPage } from '../lend-book/lend-book';

import Book from '../../models/book';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  booksList: Book[];

  constructor(private modalCtrl: ModalController, private itemsService: ItemsService) {
  }

  ionViewWillEnter() {
    this.booksList = this.itemsService.booksList.slice();
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

  ngOnInit() {
    //this.itemsService.loadBooks();
  }
}
