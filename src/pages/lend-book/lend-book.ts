import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ItemsService } from '../../services/items.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Book from '../../models/book';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage {

  index: number;
  book: Book;
  borrowerForm: FormGroup;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public itemsService: ItemsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.itemsService.booksList[this.index];
    this.initForm();
  }

  initForm(): any {
    this.borrowerForm = this.formBuilder.group({
      borrower: ['', Validators.required]
    });
    if (this.book.borrower != null) {
      this.borrowerForm.setValue({ borrower: this.book.borrower });
    }
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  lendBook() {
    if (this.borrowerForm.valid) {
      const borrower = this.borrowerForm.get('borrower').value;
      try {
        this.itemsService.setBookBorrower(this.index, borrower);
      } catch (error) {
        console.log("Failed to lend book : " + error);
      }
    }
  }

  getBookBack() {
    try {
      this.itemsService.getBookBack(this.index);
    } catch (error) {
      console.log("Failed to get book back : " + error);
      return;
    }
    this.borrowerForm.setValue({ borrower: "" });
  }

}
