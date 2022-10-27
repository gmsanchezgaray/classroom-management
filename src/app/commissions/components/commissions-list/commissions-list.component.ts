import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Commission } from '../../interfaces/commission';
import { CommissionsService } from '../../services/commissions.service';

@Component({
  selector: 'app-commissions-list',
  templateUrl: './commissions-list.component.html',
  styleUrls: ['./commissions-list.component.scss'],
})
export class CommissionsListComponent implements OnInit {
  displayedColumns: string[] = [
    'student id',
    'enrolled course id',
    'enrollment date',
    'registration manager id',
    'actions',
  ];

  commissions$: Observable<Commission[]>;
  constructor(private commissionsService: CommissionsService) {
    this.commissions$ = this.commissionsService.commissions$;
  }

  ngOnInit(): void {}
  deleteCommission(index: string) {
    console.log(index);
  }
  viewCommission(index: string) {
    console.log(index);
  }
  editCommission(index: string) {
    console.log(index);
  }
  addCommission() {
    console.log('first');
  }
}
