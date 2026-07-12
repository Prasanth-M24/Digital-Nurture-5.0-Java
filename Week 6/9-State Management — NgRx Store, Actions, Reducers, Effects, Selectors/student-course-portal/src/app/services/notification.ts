import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  private readonly notificationsSubject = new BehaviorSubject<string[]>([]);
  readonly notifications$ = this.notificationsSubject.asObservable();

  addNotification(message: string): void {
    this.notificationsSubject.next([...this.notificationsSubject.value, message]);
  }

  getNotifications(): string[] {
    return this.notificationsSubject.value;
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }
}
