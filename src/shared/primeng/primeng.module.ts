import { NgModule } from "@angular/core";

import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';
@NgModule({
    declarations: [],
    imports: [
        DividerModule,
        ButtonModule,
        StyleClassModule,
        PasswordModule
    ],
    exports:[
        DividerModule,
        ButtonModule,
        StyleClassModule,
        PasswordModule
    ]
  })
  export class PrimengModule { }