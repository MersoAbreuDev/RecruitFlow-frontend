import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { PrimengModule } from "../../shared/primeng/primeng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";
import { MessageService } from "primeng/api";

@NgModule({
    declarations: [SidebarComponent],
    imports: [
        PrimengModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PrimengModule
    ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
  ],
    providers:[MessageService],
    exports:[
        SidebarComponent
    ]
  })
  export class ComponentModule { }
