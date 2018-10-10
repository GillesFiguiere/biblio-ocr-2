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
  borrowerFormInvalid: boolean = false;

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
    if (this.cd.borrower != null) {
      this.borrowerForm.setValue({ borrower: this.cd.borrower });
    }
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  lendCD() {
    if (this.borrowerForm.valid) {
      const borrower = this.borrowerForm.get('borrower').value;
      try {
        this.itemsService.setCDBorrower(this.index, borrower);
      } catch (error) {
        console.log("Failed to lend cd : " + error);
        return;
      }
      this.dismissModal();
    } else if (this.borrowerForm.get('borrower').hasError('required')) {
      this.borrowerFormInvalid = true;
    }
  }

  getCDBack() {
    try {
      this.itemsService.getCDBack(this.index);
    } catch (error) {
      console.log("Failed to get cd back : " + error);
      return;
    }
    this.borrowerForm.setValue({ borrower: "" });
    this.dismissModal();
  }

}
