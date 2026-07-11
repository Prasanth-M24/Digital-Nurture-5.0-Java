import { Injectable } from '@angular/core';

@Injectable()
export class Notification {
  private notifications: string[] = [];

  addNotification(message: string): void {
    this.notifications.push(message);
  }

  getNotifications(): string[] {
    return this.notifications;
  }
}
