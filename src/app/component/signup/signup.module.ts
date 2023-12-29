import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "../../../shared/primeng/primeng.module";
import { SignupComponent } from "./signup.component";
import { SignupRoutingModule } from "./signup-routing.module";



@NgModule({
    declarations: [
      SignupComponent
    ],
    imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      PrimengModule,
      SignupRoutingModule
    ]
  })
  export class SignupModule { }