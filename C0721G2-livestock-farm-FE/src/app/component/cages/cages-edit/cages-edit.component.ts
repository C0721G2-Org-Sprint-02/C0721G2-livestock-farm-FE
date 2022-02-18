import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeOfCage} from "../../../model/cage/type-of-cage";
import {Cage} from "../../../model/cage/cage";
import {CageService} from "../../../service/cage/cage.service";
import {ActivatedRoute} from "@angular/router";
import {TypeOfCageService} from "../../../service/cage/type-of-cage.service";

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

  constructor(private cageService: CageService,
              private activatedRoute: ActivatedRoute,
              private typeOfCageService: TypeOfCageService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateCage = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^([C][A]-[0-9]{4})$')]],
      closeDate: ['', [Validators.required]],
      openDate: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern('^([0-9]+)$')]],
      typeOfCage: ['', [Validators.required]],
      employee: ['', [Validators.required]],
    });
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.id = params.get('id');
        console.log(this.id);
        this.cageService.findCageById(this.id).subscribe(
          data => {
            this.cage = data;
            this.updateCage.patchValue(this.cage);
            console.log(data);
          }, error => {
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
        console.log(this.updateCage);
        alert('update thành công');
      }, error => {
        console.log(error);
        console.log('erorr');
      }
    );
  }

}
