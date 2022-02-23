import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IndividualService} from '../../../service/individual/individual.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CageService} from '../../../service/cage/cage.service';
import {Subscription} from 'rxjs';
import {Individual} from '../../../model/individual/individual';
import {Cage} from '../../../model/cage/cage';

@Component({
  selector: 'app-individual-create',
  templateUrl: './individual-create.component.html',
  styleUrls: ['./individual-create.component.css']
})
export class IndividualCreateComponent implements OnInit {

  individualForm = new FormGroup({
    // id: new FormControl('', [Validators.required]),
    dateIn: new FormControl('', [Validators.required]),
    dateOut: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required, Validators.min(1)]),
    status: new FormControl('', [Validators.required]),
    cage: new FormControl('', [Validators.required]),
    deleted: new FormControl(0)
  });
  subcription: Subscription;
  individual: Individual;
  cagelist: Cage[];
  message: string;

  constructor(private individualService: IndividualService,
              private router: Router,
              private matDialog: MatDialog, private cageService: CageService,) {
  }

  ngOnInit(): void {
    this.subcription = this.cageService.getListCage().subscribe(data=>{this.cagelist = data.content});
    console.log(this.cagelist);
  }

  onSubmit(): void {
    if (this.individualForm.valid) {
      console.log(this.individualForm);
      this.subcription = this.individualService.addIndividual(this.individualForm.value).subscribe(data => {
        // this.individual = data;
        console.log(data);
        this.message='Thêm mới thành công';
        console.log('1');
      }, error => {
        console.log('2');
        console.log(error);
        this.message='Thêm mới thất bại';
      })
    }
  }
  Reset(): void{
    this.individualForm.reset();
  }

}
