import { NgModule } from "@angular/core";

import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
    declarations: [],
    imports: [
        DividerModule,
        ButtonModule,
        StyleClassModule,
        PasswordModule,
        InputGroupModule,
        InputGroupAddonModule

    ],
    exports:[
        DividerModule,
        ButtonModule,
        StyleClassModule,
        PasswordModule,
        InputGroupModule,
        InputGroupAddonModule
    ]
  })
  export class PrimengModule { }