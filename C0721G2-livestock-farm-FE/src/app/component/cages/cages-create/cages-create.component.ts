import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeOfCage} from "../../../model/cage/type-of-cage";
import {Employee} from "../../../model/employee/employee";
import {CageService} from "../../../service/cage/cage.service";
import {TypeOfCageService} from "../../../service/cage/type-of-cage.service";
import {EmployeeService} from "../../../service/employee/employee.service";
import {Router} from "@angular/router";

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
  showAlert: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private cageService: CageService,
              private typeOfCageService: TypeOfCageService,
              private employeeService: EmployeeService,
              private router: Router) {
    this.createCage = formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^([C][A]-[0-9]{4})$')]],
      closeDate: ['', [Validators.required]],
      openDate: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern('^([0-9]+)$')]],
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
      console.log('OK');
      console.log(this.createCage.value);
      this.cageService.saveCage(this.createCage.value).subscribe(
        data => {
          // this.typeOfCage.forEach(value => {
          //   this.createCage.value.typeOfCage = value.id;
          // });
          alert('OK');
          this.showErrorCage = '';
          this.employeeExist = '';
          this.showAlert = true;
          console.log(data);
          this.createCage.reset();
          this.router.navigateByUrl('cage/list')
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
