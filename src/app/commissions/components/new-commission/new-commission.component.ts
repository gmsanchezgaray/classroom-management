import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommissionsService } from '../../services/commissions.service';

@Component({
  selector: 'app-new-commission',
  templateUrl: './new-commission.component.html',
  styleUrls: ['./new-commission.component.scss'],
})
export class NewCommissionComponent implements OnInit {
  public commissionForm!: FormGroup;
  tittle!: string;
  textButton!: string;
  buttonDisable: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commissionsService: CommissionsService
  ) {}

  // registration_manager
  // :
  // "V7a7e948-1915-3470-f644c1ce"
  // student_id
  // :
  // "47c554be-42b1-7cbf-154a8828"

  ngOnInit(): void {
    this.commissionForm = this.fb.group({
      registration_manager: ['', [Validators.required, Validators.max(100)]],
      student_id: ['', [Validators.required, Validators.max(100)]],
      enrollment_date: ['', [Validators.required]],
      enrolled_course_id: ['', [Validators.required]],
    });
    this.loadView();
  }

  back() {
    this.router.navigateByUrl('/commissions');
  }

  loadView() {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.commissionsService.GetCommissionById(id))
        )
        .subscribe(
          (commission) => (
            this.commissionForm.patchValue(commission),
            (this.tittle = 'Edit'),
            (this.textButton = 'Edit')
          )
        );
      return;
    }

    if (this.router.url.includes('view')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.commissionsService.GetCommissionById(id))
        )
        .subscribe((commission) => {
          console.log(commission);
          this.commissionForm.patchValue(commission),
            (this.tittle = 'Consult'),
            this.commissionForm.disable(),
            (this.buttonDisable = true);
          //   this.commissionForm.controls['inicioVigencia'].setValue(
          //     this.datePipe.transform(Tema.inicioVigencia, 'yyyy-MM-dd'),
          //   ),
          //   (this.fechaFinVigencia = this.datePipe.transform(
          //     Tema.finVigencia,
          //     'yyyy-MM-dd',
          //   ));
          // if (
          //   this.fechaFinVigencia === null ||
          //   this.fechaFinVigencia === '0001-01-01'
          // ) {
          //   this.commissionForm.controls['finVigencia'].reset();
          // } else {
          //   this.commissionForm.controls['finVigencia'].setValue(
          //     this.datePipe.transform(Tema.finVigencia, 'yyyy-MM-dd'),
          //   );
          // }
        });
      return;
    }
    if (this.router.url.includes('new')) {
      this.tittle = 'New';
      this.textButton = 'Save';
      return;
    }
  }

  onSubmit() {
    // if (this.topicForm.invalid) {
    //   this.topicForm.markAllAsTouched();
    //   this.toastR.warning('Debe completar los campos requeridos');
    //   return;
    // }
    // if (this.topicForm.controls['finVigencia'].value === '') {
    //   this.topicForm.controls['finVigencia'].setValue(null);
    // }
    // if (this._idTopic) {
    //   this.topicsService.UpdateTopics(this._idTopic, this.topicForm.value).then(
    //     (resp: any) => {
    //       this.toastR.success('Tema actualizado correctamente', 'Tema', {
    //         timeOut: 5000,
    //         closeButton: true,
    //       });
    //       this.router.navigateByUrl('topics');
    //     },
    //     (err) => {
    //       this.toastR.error('Ocurrió un error', 'Tema', {
    //         timeOut: 3000,
    //         closeButton: true,
    //       });
    //     },
    //   );
    //   return;
    // }
    // this.topicsService
    //   .CreateTopics(this.topicForm.value)
    //   .then((resp) => {
    //     this.toastR.success('Creado correctamente', 'Nuevo Tema', {
    //       timeOut: 5000,
    //       closeButton: true,
    //     });
    //     this.router.navigateByUrl('topics');
    //   })
    //   .catch((err) => {
    //     if (err === 412) {
    //       this.toastR.error('Ya existe un tema con ese nombre', 'Nuevo tema', {
    //         timeOut: 3000,
    //         closeButton: true,
    //       });
    //       return;
    //     }
    //     if (err === 500) {
    //       localStorage.setItem('errorType', '500');
    //       localStorage.setItem('errorLog', err.message);
    //       this.router.navigateByUrl('**'),
    //         {
    //           skipLocationChange: true,
    //         };
    //     } else {
    //       this.toastR.error('Ocurrió un error', 'Nuevo tema', {
    //         timeOut: 3000,
    //         closeButton: true,
    //       });
    //       return;
    //     }
    //   });
  }
}
