import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
      enrolled: false,
    },
    {
      id: 2,
      name: 'Algorithms',
      code: 'CS201',
      credits: 3,
      gradeStatus: 'pending',
      enrolled: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses from the API', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should return a friendly error message when the API fails', () => {
    service.getCourses().subscribe({
      next: () => {
        throw new Error('Expected request to fail');
      },
      error: (error: Error) => {
        expect(error.message).toBe('Failed to load courses. Please try again.');
      },
    });

    const requests = httpMock.match('http://localhost:3000/courses');
    expect(requests.length).toBe(1);

    requests[0].flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    const retryOne = httpMock.expectOne('http://localhost:3000/courses');
    expect(retryOne.request.method).toBe('GET');
    retryOne.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    const retryTwo = httpMock.expectOne('http://localhost:3000/courses');
    expect(retryTwo.request.method).toBe('GET');
    retryTwo.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
