import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private commissionsService: CommissionsService,
    private router: Router
  ) {
    this.commissions$ = this.commissionsService.commissions$;
  }

  ngOnInit(): void {}
  deleteCommission(index: string) {
    console.log(index);
  }
  viewCommission(index: string) {
    this.router.navigateByUrl(`/commissions/view/${index}`, {
      skipLocationChange: true,
    });
  }
  editCommission(index: string) {
    this.router.navigateByUrl(`/commissions/edit/${index}`, {
      skipLocationChange: true,
    });
  }
  addCommission() {
    this.router.navigateByUrl('/commissions/new');
  }
}
