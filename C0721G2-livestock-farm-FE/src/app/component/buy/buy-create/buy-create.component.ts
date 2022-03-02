import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import { BuyIndividual } from 'src/app/model/buy/buy-individual';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BuyService} from '../../../service/buy_individual/buy.service';

@Component({
  selector: 'app-buy-create',
  templateUrl: './buy-create.component.html',
  styleUrls: ['./buy-create.component.css']
})
export class BuyCreateComponent implements OnInit {

  buyIndividualForm = new FormGroup({
    name: new FormControl('', [Validators.required,
      Validators.maxLength(40), Validators.minLength(6),
      Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)*$')]),
    email: new FormControl('',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9_!#$%&\'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+.[a-z]{2,6}$')]),
    phoneNumber: new FormControl('',
      [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    address: new FormControl('',
      [Validators.required, Validators.pattern('')]),
    content: new FormControl('', [Validators.required]),
  });

  subscription: Subscription;
  buyIndividual: BuyIndividual;

  loading = '';
  constructor(private buyIndividualSerive: BuyService, private router: Router,
              public dialogRef: MatDialogRef<BuyCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  onSubmit(buyIndividualForm: FormGroup) {
    if (this.buyIndividualForm.valid) {
      this.loading = 'success';
      console.log(this.buyIndividualForm.value);
      this.subscription = this.buyIndividualSerive.save(this.buyIndividualForm.value).subscribe(data => {
          alert('Đã gửi thành công');
          this.dialogRef.close();
        }
        , error => {
          console.log('Not found');
        });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
