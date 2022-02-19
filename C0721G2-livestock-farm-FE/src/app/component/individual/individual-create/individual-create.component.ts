import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IndividualService} from '../../../service/individual/individual.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CageService} from '../../../service/cage/cage.service';
import {Subscription} from 'rxjs';
import {Individual} from '../../../model/individual/individual';
import {Cages} from '../../../model/cage/cages';

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

  constructor(private individualService: IndividualService,
              private router: Router,
              private matDialog: MatDialog, private cageService: CageService,) {
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
       this.individual = data
      }, error => {
      })
    }
  }
  Reset(): void{
    this.individualForm.reset();
  }

}
