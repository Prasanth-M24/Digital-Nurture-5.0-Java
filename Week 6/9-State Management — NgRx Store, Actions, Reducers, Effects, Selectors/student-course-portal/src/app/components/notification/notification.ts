import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification as NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  private notificationService = inject(NotificationService);

  notifications$ = this.notificationService.notifications$;

  addNotification(): void {
    this.notificationService.addNotification("New Notification");
  }
}
