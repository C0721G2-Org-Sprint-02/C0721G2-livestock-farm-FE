import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IndividualService} from '../../../service/individual/individual.service';
import {Individual} from '../../../model/individual/individual';
import {Router} from '@angular/router';

@Component({
  selector: 'app-individual-delete',
  templateUrl: './individual-delete.component.html',
  styleUrls: ['./individual-delete.component.css']
})
export class IndividualDeleteComponent implements OnInit {
  individual: Individual;
  message : string;
  constructor(public dialogRef: MatDialogRef<IndividualDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private individualService: IndividualService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.individual = this.data.individual;
  }

  deleteIndividual() {
    this.individualService.deleteIndividual(this.individual).subscribe(value => {
      this.message = 'Xóa thành công!';
      this.dialogRef.close(this.message);

    })
  }
}
