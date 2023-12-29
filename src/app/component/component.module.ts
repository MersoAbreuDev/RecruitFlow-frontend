import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { PrimengModule } from "../../shared/primeng/primeng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations: [SidebarComponent],
    imports: [
        PrimengModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ],
    exports:[
        SidebarComponent
    ]
  })
  export class ComponentModule { }