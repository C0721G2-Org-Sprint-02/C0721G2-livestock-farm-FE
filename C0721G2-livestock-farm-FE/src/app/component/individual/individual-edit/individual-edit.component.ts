import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Individual} from '../../../model/individual/individual';
import {IndividualService} from '../../../service/individual/individual.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CageService} from '../../../service/cage/cage.service';
import {Cage} from '../../../model/cage/cage';
import {IndividualListComponent} from '../individual-list/individual-list.component';

@Component({
  selector: 'app-individual-edit',
  templateUrl: './individual-edit.component.html',
  styleUrls: ['./individual-edit.component.css']
})
export class IndividualEditComponent implements OnInit {
  individualForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    dateIn: new FormControl('', [Validators.required]),
    dateOut: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required, Validators.min(1)]),
    status: new FormControl('', [Validators.required]),
    cage: new FormControl('', [Validators.required])
  });
  subcription: Subscription;
  individual: Individual;
  cage: Cage[];
  id: string;
  constructor(private individualService: IndividualService,
              private router: Router,
              private matDialog: MatDialog, private cageService: CageService, private individualListComponent: IndividualListComponent) {
  }

  @Input() currentId: any;
  message: string;
  ngOnInit(): void {
    this.subcription = this.cageService.getListCage().subscribe(data => {
      this.cage = data;
    });
    this.subcription = this.individualService.findIndividualbyId(this.currentId).subscribe(data => {
      this.individual = data;
      console.log(this.individual);
      this.individualForm.patchValue(this.individual);
    });
  }

  onSubmit(): void {
    if (this.individualForm.valid) {
      this.subcription = this.individualService.editIndividual(this.individualForm.value).subscribe(data => {
        this.message = 'Đã cập nhật thành công';
        this.individualListComponent.ngOnInit();
      }, error => {
        this.message = 'Đã cập nhật thất bại';
      })
    }
  }
  Reset(): void {
    this.individualForm.reset();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
