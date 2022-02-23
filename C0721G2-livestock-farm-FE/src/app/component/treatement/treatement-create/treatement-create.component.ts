import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreatementService} from '../../../service/treatement/treatement.service';
import {Individual} from '../../../model/individual/individual';
import {Router} from "@angular/router";

@Component({
  selector: 'app-treatement-create',
  templateUrl: './treatement-create.component.html',
  styleUrls: ['./treatement-create.component.css']
})
export class TreatementCreateComponent implements OnInit {
  individual: Individual;
  errorMessage: string;
  formCreate: FormGroup = this.formBuilder.group(
    {
      id: [],
      treatementDate: ['', [Validators.required]],
      individual: ['', [Validators.required, Validators.pattern('^IN-[0-9]{4}$')]],
      doctor: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+\\s*)*$')]],
      medicine: ['', [Validators.required, Validators.maxLength(40)]],
      note: [''],
      kindOfDisease: ['', [Validators.required, Validators.maxLength(255)]],
      quantily: [null, [Validators.required, Validators.max(100), Validators.min(1), Validators.pattern('^[0-9]*$')]],
    }
  );

  constructor(private formBuilder: FormBuilder, private treatementService: TreatementService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formCreate.value);
    if (this.formCreate.valid) {
      console.log('valid form');
      this.treatementService.save(this.formCreate.value).subscribe(
        data => {
          // console.log(this.customer);
          // this.router.navigate(['/employee/list']);
          console.log(data);
          this.router.navigate(['/treatement/list']);
        }, error => {
          this.errorMessage = error.error.IndividualNotExist;
          console.log(this.errorMessage);
          console.log(error.error);
        })
    }
  }
}
