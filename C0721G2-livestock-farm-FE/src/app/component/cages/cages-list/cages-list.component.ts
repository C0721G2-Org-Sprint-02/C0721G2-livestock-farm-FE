import { Component, OnInit } from '@angular/core';
import {Cage} from '../../../model/cage/cage';
import {Subscription} from 'rxjs';
import {CageService} from '../../../service/cage/cage.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-cages-list',
  templateUrl: './cages-list.component.html',
  styleUrls: ['./cages-list.component.css']
})
export class CagesListComponent implements OnInit {
  cages: Cage[];
  private subscription: Subscription | undefined;
  page = 0;
  searchCage = '';
  totalPages: number;
  pageNumber: number;
  size = 0;
  flag = false;
  message: string;


  constructor(private cageService: CageService,
              private dialogDelete: MatDialog,) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    if (this.searchCage === '') {
      this.flag = false;
      this.cageService.search(this.page, this.searchCage).subscribe(data => {
        console.log(data);
        if (data !== null) {
          this.cages = data.content;
          this.totalPages = data.totalPages;
          this.pageNumber = data.pageable.pageNumber;
          this.size = data.size;
          this.page = data.pageable.pageNumber;
          this.message = '';
        } else {
          this.message = 'Không tìm thấy';
          this.cages = [];
          this.totalPages = 0;
        }
      });
    } else {
      if (this.flag === false) {
        this.page = 0;
        this.cageService.search(this.page, this.searchCage).subscribe(data => {
          if (data !== null) {
            this.cages = data.content;
            this.totalPages = data.totalPages;
            this.pageNumber = data.pageable.pageNumber;
            this.size = data.size;
            this.page = data.pageable.pageNumber;
            this.message = '';
          } else {
            this.message = 'Không tìm thấy';
            this.cages = [];
            this.totalPages = 0;
          }
          this.flag = true;
        });
      } else {
        this.cageService.search(this.page, this.searchCage).subscribe(data => {
          if (data !== null) {
            this.cages = data.content;
            this.totalPages = data.totalPages;
            this.pageNumber = data.pageable.pageNumber;
            this.size = data.size;
            this.page = data.pageable.pageNumber;
            this.message = '';
            console.log(this.message);
          } else {
            this.message = 'Không tìm thấy';
            this.cages = [];
            this.totalPages = 0;
          }
          this.flag = true;
        });
      }
    }
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

  onsubmit() {
    this.flag = false;
    this.search();
  }
}
