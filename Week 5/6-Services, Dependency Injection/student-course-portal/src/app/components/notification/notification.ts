import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification as NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [NotificationService]
})
export class Notification {
  constructor(private notificationService: NotificationService) {}
  notifications: string[] = [];

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }

  addNotification(): void {
    this.notificationService.addNotification("New Notification");
  }

  getNotifications(): string[] {
    return this.notificationService.getNotifications();
  }
}
