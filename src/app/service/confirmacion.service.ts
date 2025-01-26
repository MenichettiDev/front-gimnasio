import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  confirmAction(message: string, header: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Se canceló la operación' });
          resolve(false);
        }
      });
    });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
