import { Component, OnInit } from '@angular/core';
import { students } from 'src/app/data/students';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  students = students;
  status: string = 'online';
  constructor() {}

  ngOnInit() {}
}
