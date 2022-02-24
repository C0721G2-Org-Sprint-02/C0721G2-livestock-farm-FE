import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeOfCage} from "../../../model/cage/type-of-cage";
import {Employee} from "../../../model/employee/employee";
import {CageService} from "../../../service/cage/cage.service";
import {TypeOfCageService} from "../../../service/cage/type-of-cage.service";
import {EmployeeService} from "../../../service/employee/employee.service";
import {Router} from "@angular/router";

export function checkOpendate(control: AbstractControl) {
  const dateOfBirth = new Date(control.value);
  // lớn hơn 18  và bé hơn 65 dateDiff(dateOfBirth, new Date()) < 365 ||
  console.log(dateOfBirth);
  if (dateDiff(dateOfBirth, new Date()) > 1) {
    console.log('abc');
    console.log(dateDiff(dateOfBirth, new Date()));
    return {checkDate: true};
  }
  return null;
}

export function checkClosedate(control: AbstractControl) {
  const dateOfBirth = new Date(control.value);
  // lớn hơn 18  và bé hơn 65 dateDiff(dateOfBirth, new Date()) < 365 ||
  if (dateDiff(dateOfBirth, new Date()) > 0) {
    return {checkDate: true};
  }
  return null;
}

function parseDate(str: string) {
  let dmy = str.split('-');
  return new Date(Number(dmy[0]), Number(dmy[1]) - 1, Number(dmy[2]));
}

function dateDiff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}


@Component({
  selector: 'app-cages-create',
  templateUrl: './cages-create.component.html',
  styleUrls: ['./cages-create.component.css']
})
export class CagesCreateComponent implements OnInit {
  createCage: FormGroup = new FormGroup({});
  showErrorCage: any;
  employeeExist: any;
  typeOfCage: TypeOfCage[];
  employee: Employee[];
  showAlert = false;


  constructor(private formBuilder: FormBuilder,
              private cageService: CageService,
              private typeOfCageService: TypeOfCageService,
              private employeeService: EmployeeService,
              private router: Router) {
    this.createCage = formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^([C][A]-[0-9]{4})$')]],
      closeDate: ['', [Validators.required, checkClosedate]],
      openDate: ['', [Validators.required, checkOpendate]],
      quantity: ['', [Validators.required, Validators.pattern('^([0-9]+)$'), Validators.max(100)]],
      typeOfCage: [null, [Validators.required]],
      employee: ['', [Validators.required, Validators.pattern('^([N][V]-[0-9]{4})$')]],
    });
  }

  ngOnInit(): void {
    this.typeOfCageService.getTypeOfCage().subscribe(
      data => {
        this.typeOfCage = data;
        console.log(this.typeOfCage);
      }, error => {
        console.log(error);
        console.log('error');
      }
    );
  }

  submit() {
    if (this.createCage.valid) {
      // console.log('OK');
      this.showAlert = true;
      console.log(this.createCage.value);
      this.cageService.saveCage(this.createCage.value).subscribe(
        data => {
          // this.typeOfCage.forEach(value => {
          //   this.createCage.value.typeOfCage = value.id;
          // });
          // alert('OK');
          this.showErrorCage = '';
          this.employeeExist = '';
          this.showAlert = true;
          console.log(data);
          this.createCage.reset();
          // this.router.navigateByUrl('cage/list')
        }, error => {
          this.showErrorCage = error.error.cageError;
          this.employeeExist = error.error.employeeError;
          console.log(error.error.cageError);
        }
      );
    }
  }

  closeAlert() {
    this.showAlert = false;
  }
}
