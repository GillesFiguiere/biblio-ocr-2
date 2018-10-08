import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ItemsService } from '../../services/items.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import CD from '../../models/cd';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCDPage {

  index: number;
  cd: CD;
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
    this.cd = this.itemsService.cdsList[this.index];
    this.initForm();
  }

  initForm(): any {
    this.borrowerForm = this.formBuilder.group({
      borrower: ['', Validators.required]
    });
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  lendCD() {
    if (this.borrowerForm.invalid) {
      this.errorMessage = "Erreur";
      return;
    }

    const borrower = this.borrowerForm.get('borrower').value;
    try {
      this.itemsService.setCDBorrower(this.index, borrower);
    } catch (error) {
      this.errorMessage = error;
    }
  }

  getCDBack() {
    try {
      this.itemsService.getCDBack(this.index);
    } catch (error) {
      this.errorMessage = error;
    }
  }

}
