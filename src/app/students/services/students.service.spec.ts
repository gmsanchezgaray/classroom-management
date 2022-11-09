import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { mockStudents } from 'src/mocks/students.mock';
import { of } from 'rxjs';

describe('::::::::::::::StudentsService::::::::::::::', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: StudentsService;
  let httpController: HttpTestingController;

  let url = 'localhost:3000/api';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new StudentsService(httpClientSpy as any);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllStudents and return an array of Students', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockStudents));

    service.GetAllStudents().subscribe((usuarios) => {
      expect(usuarios).toEqual(mockStudents);
      done();
    });
  });
});
