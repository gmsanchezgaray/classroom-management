import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {
  public courseForm!: FormGroup;
  tittle!: string;
  textButton!: string;
  buttonDisable: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.max(100)]],
      qtys_classes: ['', [Validators.required, Validators.max(100)]],
      qtys_hours: ['', Validators.max(100)],
      teachers_name: ['', [Validators.required]],
    });
    this.loadView();
  }

  back() {
    this.router.navigateByUrl('/courses');
  }

  loadView() {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.coursesService.GetCourseById(id)))
        .subscribe(
          (Tema) => (
            this.courseForm.patchValue(Tema),
            (this.tittle = 'Edit'),
            (this.textButton = 'Edit')
          )
        );
      return;
    }

    if (this.router.url.includes('view')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.coursesService.GetCourseById(id)))
        .subscribe((student) => {
          console.log(student);
          this.courseForm.patchValue(student),
            (this.tittle = 'Consult'),
            this.courseForm.disable(),
            (this.buttonDisable = true);
          //   this.studentForm.controls['inicioVigencia'].setValue(
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
          //   this.studentForm.controls['finVigencia'].reset();
          // } else {
          //   this.studentForm.controls['finVigencia'].setValue(
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
