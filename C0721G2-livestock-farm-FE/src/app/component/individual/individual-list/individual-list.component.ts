import {Component, Input, OnInit} from '@angular/core';
import {IndividualService} from '../../../service/individual/individual.service';
import {MatDialog} from '@angular/material/dialog';
import {Individual} from '../../../model/individual/individual';
import {IndividualEditComponent} from '../individual-edit/individual-edit.component';

@Component({
  selector: 'app-individual-list',
  templateUrl: './individual-list.component.html',
  styleUrls: ['./individual-list.component.css'],
})
export class IndividualListComponent implements OnInit {

  individuals: Individual[];
  individualId = '';
  cageId = '';
  dateIn = '';
  dateOut = '';
  status = '';
  page = 0;
  totalPages: number;
  currentPage: number;
  sortField = 'id';
  sortDirection = 'asc';
  flagSearch = false;
  message: string;


  constructor(private individualService: IndividualService,
              private dialogDeleteIndividual: MatDialog) {
  }

  ngOnInit(): void {
    this.showIndividual();
  }

  showIndividual() {
    if (this.individualId === '' && this.cageId === '' && this.dateIn === '' && this.dateOut === '' && this.status === '') {
      this.flagSearch = false;
      this.getIndividuals();
    } else {
      if (this.flagSearch === false) {
        this.page = 0;
        this.getIndividuals();
        this.flagSearch = true;
      } else {
        this.getIndividuals();
      }
    }
  }

  getIndividuals() {
    this.individualService.searchIndividual(this.page, this.sortField, this.sortDirection, this.individualId,
      this.cageId, this.dateIn, this.dateOut, this.status).subscribe(value => {
      this.individuals = value.content;
      this.totalPages = value.totalPages;
      this.page = value.pageable.pageNumber;
      this.message = '';
    }, error => {
      this.message = 'Không tìm thấy';
      this.individuals = [];
      this.totalPages = 0;
    });
  }

  onSubmit() {
    this.flagSearch = false;
    this.showIndividual();
  }

  opendialog(individualId) {
    individualId = this.individualService.findIndividualbyId(individualId);
    this.individualService.findIndividualbyId(individualId).subscribe(data => {
      const dialogRef = this.dialogDeleteIndividual.open(IndividualEditComponent, {
        width: '500px',
        data: {data2: data},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('the dialog was closed');
        this.ngOnInit();
      });
    });
  }


  sort(sortField: string) {
    this.sortField = sortField;
    this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc';
    this.ngOnInit();
  }
}
