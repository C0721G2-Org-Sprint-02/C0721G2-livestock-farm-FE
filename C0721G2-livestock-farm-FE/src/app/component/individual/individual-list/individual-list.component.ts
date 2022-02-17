import {Component, OnInit} from '@angular/core';
import {IndividualService} from '../../../service/individual/individual.service';
import {MatDialog} from '@angular/material/dialog';
import {Individual} from '../../../model/individual/individual';

@Component({
  selector: 'app-individual-list',
  templateUrl: './individual-list.component.html',
  styleUrls: ['./individual-list.component.css']
})
export class IndividualListComponent implements OnInit {

  individuals: Individual[];
  page = 0;
  totalPage: number;
  currentPage: number;
  flagSearch = false;
  message: string;


  constructor(private individualService: IndividualService,
              private dialogDeleteIndividual: MatDialog) {
  }

  ngOnInit(): void {
  }

}
