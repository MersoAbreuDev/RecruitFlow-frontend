import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private messageService: MessageService) { }

  async showSuccess(message:string){
       await this.messageService.add({severity:'success', summary: 'Sucesso!', detail: message});
   }

  async showError(message: string){
    await this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: message });
  }


}
