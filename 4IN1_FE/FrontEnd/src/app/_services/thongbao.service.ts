import {Injectable, ViewContainerRef} from '@angular/core';
import {NotificationService} from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class ThongbaoService {
  public type: any;

  constructor(private notificationService: NotificationService) {
  }

  public showDefault(notificationTemplate: string, apendto: ViewContainerRef): void {
    this.type = 'default';

    this.notificationService.show({
      appendTo: apendto,
      content: notificationTemplate,
      height: 20,
      width: 300,
      hideAfter: 4000,
      position: {horizontal: 'right', vertical: 'top'},
      animation: {type: 'fade', duration: 400},
      type: {style: 'none', icon: false},
    });
  }

  public showSuccess(notificationTemplate: string, apendto: ViewContainerRef): void {
    this.notificationService.show({
      appendTo: apendto,
      content: notificationTemplate,
      hideAfter: 4000,
      height: 20,
      width: 300,
      position: {horizontal: 'center', vertical: 'top'},
      animation: {type: 'fade', duration: 400},
      type: {style: 'success', icon: true},
    });
  }

  public showWarning(notificationTemplate: string, apendto: ViewContainerRef): void {
    this.notificationService.show({
      appendTo: apendto,
      content: notificationTemplate,
      hideAfter: 4000,
      height: 20,
      width: 300,
      position: {horizontal: 'center', vertical: 'top'},
      animation: {type: 'fade', duration: 400},
      type: {style: 'warning', icon: true},
    });
  }

  public showInfo(notificationTemplate: string, apendto: ViewContainerRef): void {
    this.notificationService.show({
      appendTo: apendto,
      content: notificationTemplate,
      hideAfter: 4000,
      height: 20,
      width: 300,
      position: {horizontal: 'center', vertical: 'bottom'},
      animation: {type: 'fade', duration: 400},
      type: {style: 'info', icon: true},
    });
  }

  public showError(notificationTemplate: string, apendto: ViewContainerRef): void {
    this.notificationService.show({
      appendTo: apendto,
      content: notificationTemplate,
      height: 20,
      width: 300,
      hideAfter: 4000,
      position: {horizontal: 'center', vertical: 'top'},
      animation: {type: 'fade', duration: 400},
      type: {style: 'error', icon: true},
    });
  }
}
