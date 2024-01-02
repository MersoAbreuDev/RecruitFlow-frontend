import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-candidato-form',
  templateUrl: './perfil-candidato-form.component.html',
  styleUrl: './perfil-candidato-form.component.scss'
})
export class PerfilCandidatoFormComponent {
  imagemSelecionada: string | ArrayBuffer | null = null;


     onFileChange(event: any): void {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagemSelecionada = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
