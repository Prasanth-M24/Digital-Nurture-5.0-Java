import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    {path: 'courses', loadComponent: () => import('./pages/courses-layout/courses-layout').then(m => m.CoursesLayoutComponent), children: [
      {path: '', loadComponent: () => import('./pages/course-list/course-list').then(m => m.CourseList)},
      {path: ':id', loadComponent: () => import('./pages/course-detail/course-detail').then(m => m.CourseDetailComponent)}
    ]},
    {path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/student-profile/student-profile').then(m => m.StudentProfile)},
    {path: 'enroll', canActivate: [authGuard], loadComponent: () => import('./features/enrollment/enrollment-form/enrollment-form').then(m => m.EnrollmentForm)},
    {path: 'enroll-reactive', canActivate: [authGuard], loadComponent: () => import('./features/enrollment/reactive-enrollmentform/reactive-enrollmentform').then(m => m.ReactiveEnrollmentform)},
    {path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)}
];
