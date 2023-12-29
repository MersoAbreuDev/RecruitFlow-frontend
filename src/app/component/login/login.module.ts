import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginRoutingModule } from "./login-routing.module";
import { PrimengModule } from "../../../shared/primeng/primeng.module";



@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      LoginRoutingModule,
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      PrimengModule,

    ]
  })
  export class LoginModule { }