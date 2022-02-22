import { Component, OnInit } from '@angular/core';
import {Treatment} from '../../../model/treatement/treatment';
import {TreatementService} from '../../../service/treatement/treatement.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-treatement-list',
  templateUrl: './treatement-list.component.html',
  styleUrls: ['./treatement-list.component.css']
})
export class TreatementListComponent implements OnInit {
  treatements: Treatment[];
  private subscription: Subscription | undefined;
  page = 0;
  searchCage = '';
  searchDoctor: '';
  searchKindOfDisease: '';
  totalPages: number;
  pageNumber: number;
  size = 0;
  flag = false;
  message: string;
  constructor(private treatmentService: TreatementService) { }

  ngOnInit(): void {
    this.search();
  }

  private search() {
    if (!(this.searchCage === '' && this.searchDoctor === '' && this.searchKindOfDisease === '')) {
      if (this.flag === false) {
        console.log('if 1');
        this.page = 0;
        this.searchService();
          this.flag = true;
      } else {
        console.log('if 2');
        this.searchService();
          this.flag = true;
      }
    } else {
      console.log('if 3');
      this.flag = false;
      this.searchService();
    }
  }
  searchService(){
    console.log('searchDoctor: '+this.searchDoctor);
    console.log('searchKindOfDisease: '+this.searchKindOfDisease);
    console.log('searchCage: '+this.searchCage);
    this.treatmentService.search(this.page, this.searchDoctor, this.searchKindOfDisease, this.searchCage).subscribe(data => {
      console.log(data);
      if (data !== null) {
        this.treatements = data.content;
        this.totalPages = data.totalPages;
        this.pageNumber = data.pageable.pageNumber;
        this.size = data.size;
        this.page = data.pageable.pageNumber;
        this.message = '';
      } else {
        this.message = 'Không tìm thấy';
        this.treatements = [];
        this.totalPages = 0;
      }
    });
  }
  previousClick(index) {
    this.page = this.page - index;
    this.ngOnInit();
  }

  nextClick(index) {
    this.page = this.page + index;
    console.log('next pay ' + this.page);
    this.ngOnInit();
  }

  findPaginnation(value: number) {
    this.page = value - 1;
    this.ngOnInit();
  }

  onSubmit() {
    this.flag = false;
    this.search();
  }
}
