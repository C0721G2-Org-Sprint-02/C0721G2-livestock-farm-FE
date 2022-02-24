import {IndividualService} from '../../../service/individual/individual.service';
import {MatDialog} from '@angular/material/dialog';
import {Individual} from '../../../model/individual/individual';
import {IndividualDeleteComponent} from '../individual-delete/individual-delete.component';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {IndividualEditComponent} from '../individual-edit/individual-edit.component';
import {IndividualCreateALotComponent} from '../individual-create-a-lot/individual-create-a-lot.component';

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
  sortField = 'id';
  sortDirection = 'asc';
  flagSearch = false;
  message: string;


  constructor(private individualService: IndividualService,
              private dialogDeleteIndividual: MatDialog,
              private activatedRoute: ActivatedRoute,) {
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
    }, error => {
      this.message = 'Không tìm thấy';
      this.individuals = [];
      this.totalPages = 0;
    });
  }

  onSubmit() {
    this.flagSearch = false;
    this.message = '';
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
    this.message = '';
    this.ngOnInit();
  }

  previousClick() {
    this.page = this.page - 1;
    this.message = '';
    this.ngOnInit();
  }

  nextClick() {
    this.page = this.page + 1;
    this.message = '';
    this.ngOnInit();
  }

  findPagination(value: any) {
    this.page = value - 1;
    this.message = '';
    this.ngOnInit();
  }

  openDialogDelete(id: string) {
    this.individualService.getIndividualById(id).subscribe(value => {
      const dialogRef = this.dialogDeleteIndividual.open(IndividualDeleteComponent, {
        width: '550px',
        data: {individual: value},
        disableClose: true,
        panelClass: 'custom-dialog',
      });

      dialogRef.afterClosed().subscribe(result => {
        this.message = result;
        this.ngOnInit();
      });
    }, error => {
      this.message = 'Không tìm thấy';
    });
  }

  openDialogFile() {
    const dialogRef = this.dialogDeleteIndividual.open(IndividualCreateALotComponent, {
      width: '600px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.message = result;
      this.ngOnInit();
    });
  }
}
