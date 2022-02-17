import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Individual} from '../../../model/individual/individual';
import {Cages} from '../../../model/cage/cages';
import {IndividualService} from '../../../service/individual/individual.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CageService} from '../../../service/cage/cage.service';

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
    weight: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
    // ,
    // cage: new FormControl('', [Validators.required])
  });
  subcription: Subscription;
  individual: Individual;
  cage: Cages[];
  id: string;
  constructor(private individualService: IndividualService,
              private router: Router,
              private matDialog: MatDialog, private cageService: CageService,) {
  }

  ngOnInit(): void {
    this.id= 'IN-0001';

    this.subcription = this.individualService.findIndividualbyId(this.id).subscribe(data => {
      this.individual = data;
    });
    if (this.individualForm.valid) {
      this.subcription = this.individualService.editIndividual(this.individualForm.value).subscribe(data => {
        this.individual = data
      }, error => {
        console.log('không chạy');
      })
    }
  }

  onSubmit(): void {
    if (this.individualForm.valid) {
      this.subcription = this.individualService.editIndividual(this.individualForm.value).subscribe(data => {
        this.router.navigate(['/individual/list']);
      }, error => {
        console.log('có bug')
      })
    }
  }

  Reset(): void {
    this.individualForm.reset();
  }
}
