import {Component, Input, OnInit} from '@angular/core';
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
@Input() currentId : any;
  message: string;

  ngOnInit(): void {
    console.log(this.currentId);
    this.subcription = this.individualService.findIndividualbyId(this.currentId).subscribe(data => {
      this.individual = data;
      this.individualForm.setValue(this.individual);
      console.log(this.individual)
    });
  }

  onSubmit(): void {
    if (this.individualForm.valid) {
      this.subcription = this.individualService.editIndividual(this.individualForm.value).subscribe(data => {
        this.router.navigate(['/individual/list']);
        this.message='Đã cập nhật thành công';
      }, error => {
        this.message='Đã cập nhật thất bại';
      })
    }
  }


  Reset(): void {
    this.individualForm.reset();
  }
}
