import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Book } from '../../models/book';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage {

  index: number;
  book: Book;

  constructor( public viewCtrl: ViewController, public navParams: NavParams, public itemsService: ItemsService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.itemsService.booksList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleBook() {
    this.book.isLent = !this.book.isLent;
  }

}
