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
  errorMessage: string;

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

  ionViewWillEnter() {

  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  lendBook() {
    // const borrower = this.borrowerForm.get('borrower').value.then(
    //   () => {
    //     try {
    //       this.itemsService.setBookBorrower(this.index, borrower);
    //     } catch (error) {
    //       this.errorMessage = error;
    //     }
    //   },
    //   (error) => {
    //     this.errorMessage = error;
    //   }
    // );

    if (this.borrowerForm.invalid) {
      this.errorMessage = "Erreur";
      return;
    }

    const borrower = this.borrowerForm.get('borrower').value;
    try {
      this.itemsService.setBookBorrower(this.index, borrower);
    } catch (error) {
      this.errorMessage = error;
    }

  }

  getBookBack() {
    try {
      this.itemsService.getBookBack(this.index);
    } catch (error) {
      this.errorMessage = error;
    }
    this.borrowerForm.setValue({ borrower: null });
  }

}
