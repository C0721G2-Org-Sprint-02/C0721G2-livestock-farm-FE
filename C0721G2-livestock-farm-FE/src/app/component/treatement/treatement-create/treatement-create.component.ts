import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreatementService} from '../../../service/treatement/treatement.service';
import {Individual} from '../../../model/individual/individual';

@Component({
  selector: 'app-treatement-create',
  templateUrl: './treatement-create.component.html',
  styleUrls: ['./treatement-create.component.css']
})
export class TreatementCreateComponent implements OnInit {

  formCreate: FormGroup = this.formBuilder.group(
    {
      id: [],
      treatementDate: ['', [Validators.required]],
      individualId: [''],
      doctor: ['', [Validators.required, Validators.maxLength(40)]],
      medicine: ['', [Validators.required, Validators.maxLength(10)]],
      note: [''],
      kindOfDisease: ['', [Validators.required, Validators.maxLength(10)]],
      quantily: [null, [Validators.required]],
    }
  );

  constructor(private formBuilder: FormBuilder, private treatementService: TreatementService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formCreate.value);
    if (this.formCreate.valid) {
      this.treatementService.save(this.formCreate.value).subscribe(data => {
        // console.log(this.customer);
        // this.router.navigate(['/employee/list']);
      })
    }
  }
}
