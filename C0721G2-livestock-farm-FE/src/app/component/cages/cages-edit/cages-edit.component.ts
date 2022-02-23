import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeOfCage} from "../../../model/cage/type-of-cage";
import {Cage} from "../../../model/cage/cage";
import {CageService} from "../../../service/cage/cage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeOfCageService} from "../../../service/cage/type-of-cage.service";
import {Employee} from "../../../model/employee/employee";

@Component({
  selector: 'app-cages-edit',
  templateUrl: './cages-edit.component.html',
  styleUrls: ['./cages-edit.component.css']
})
export class CagesEditComponent implements OnInit {
  updateCage: FormGroup;
  id: string;
  public cage: Cage;
  typeOfCage: TypeOfCage[];
  // cages: Cage[];
  showAlert: boolean = false;
  messageNotFound='';

  employeeId: string;
  showErrorCage: string;
  employeeExist: string;

  constructor(private cageService: CageService,
              private activatedRoute: ActivatedRoute,
              private typeOfCageService: TypeOfCageService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.updateCage = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^([C][A]-[0-9]{4})$')]],
      closeDate: ['', [Validators.required]],
      openDate: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern('^([0-9]+)$') , Validators.max(100)]],
      typeOfCage: ['', [Validators.required]],
      employee: ['', [Validators.required, Validators.pattern('^([N][V]-[0-9]{4})$')]],
    });
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.id = params.get('id');
        console.log(this.id);
        this.cageService.findCageById(this.id).subscribe(
          data => {
            this.cage = data;
            this.updateCage.patchValue(this.cage);
            this.employeeId = this.cage.employee.id;
            console.log(data);
            console.log(this.updateCage.value);
          }, error => {
            this.messageNotFound = 'Không tìm thấy chuồng nuôi này.';
            console.log('error');
            console.log(error);
          }
        );
      });
    this.typeOfCageService.getTypeOfCage().subscribe(data => {
      this.typeOfCage = data;
    }, error => {
      console.log(error);
    });
  }

  submit() {
    this.cageService.updateCage(this.id, this.updateCage.value).subscribe(
      data => {
        // alert('Chỉnh sửa thành công');
        this.showAlert = true;
        console.log(this.updateCage);
        this.employeeExist = '';
        this.showErrorCage= '';
        // this.router.navigateByUrl('cage/list')
      }, error => {
        console.log(error);
        console.log('erorr');
        this.showErrorCage = error.error.cageError;
        this.employeeExist = error.error.employeeError;
      }
    );
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  closeAlert() {
    this.showAlert = false;
  }
}
