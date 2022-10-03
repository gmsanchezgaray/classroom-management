import { Component, OnInit } from '@angular/core';
import { students } from 'src/app/data/students';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  students = students;
  status: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
