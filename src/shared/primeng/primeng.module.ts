import { NgModule } from "@angular/core";

import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from "primeng/api";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [],
    imports: [
        DividerModule,
        ButtonModule,
        StyleClassModule,
        PasswordModule,
        InputGroupModule,
        InputGroupAddonModule,
        SidebarModule,
        PanelMenuModule,
        TableModule,
        SharedModule,
        InputTextModule,
        DropdownModule,
        InputTextareaModule,
        MessagesModule,
        InputMaskModule,
        DialogModule
  
    ],
    exports:[
        DividerModule,
        ButtonModule,
        StyleClassModule,
        PasswordModule,
        InputGroupModule,
        InputGroupAddonModule,
        SidebarModule,
        PanelMenuModule,
        TableModule,
        SharedModule,
        InputTextModule,
        DropdownModule,
        InputTextareaModule,
        MessagesModule,
        InputMaskModule,
        DialogModule
    ]
  })
  export class PrimengModule { }