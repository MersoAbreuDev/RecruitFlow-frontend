import { NgModule } from "@angular/core";
import { PrimengModule } from "../../shared/primeng/primeng.module";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
    declarations: [LoginComponent],
    imports: [
        PrimengModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports:[
        LoginComponent
    ]
  })
  export class ComponentModule { }