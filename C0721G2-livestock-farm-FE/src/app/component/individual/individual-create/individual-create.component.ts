import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IndividualService} from '../../../service/individual/individual.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CageService} from '../../../service/cage/cage.service';
import {Subscription} from 'rxjs';
import {Individual} from '../../../model/individual/individual';
import {Cages} from '../../../model/cage/cages';
import {IndividualEditComponent} from '../individual-edit/individual-edit.component';
import {IndividualCreateALotComponent} from '../individual-create-a-lot/individual-create-a-lot.component';

@Component({
  selector: 'app-individual-create',
  templateUrl: './individual-create.component.html',
  styleUrls: ['./individual-create.component.css']
})
export class IndividualCreateComponent implements OnInit {

  individualForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    dateIn: new FormControl('', [Validators.required]),
    dateOut: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
    // ,
    // cage: new FormControl('', [Validators.required])
  });
  subcription: Subscription;
  individual: Individual;
  cage: Cages[];
  message: string;


  constructor(private individualService: IndividualService,
              private router: Router,
              private matDialog: MatDialog, private cageService: CageService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    // this.subcription = this.cageService.getAll().subcribe(data=>{this.cage = data})
    // if (this.individualForm.valid) {
    //   this.subcription = this.individualService.addIndividual(this.individualForm.value).subscribe(data => {
    //     this.individual = data
    //   }, error => {
    //     console.log('không chạy');
    //   })
    // }

  }

  onSubmit(): void {
    if (this.individualForm.valid) {
      this.subcription = this.individualService.addIndividual(this.individualForm.value).subscribe(data => {
        this.individual = data;
        this.message = 'Thêm mới thành công';
      }, error => {
        this.message = 'Thêm mới thất bại';
      })
    }
  }

  Reset(): void {
    this.individualForm.reset();
  }
}
