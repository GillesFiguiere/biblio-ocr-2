import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ItemsService } from '../../services/items.service';
import { LendBookPage } from '../lend-book/lend-book';

import Book from '../../models/book';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  booksList: Book[];
  booksListSubscription: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.booksListSubscription = this.itemsService.booksList$.subscribe(
      (books: Book[]) => {
        this.booksList = books.slice();
      }
    );
    this.itemsService.emitBooksList();
  }

  ngOnDestroy() {
    this.booksListSubscription.unsubscribe();
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, { index: index });
    modal.present();
  }

}
