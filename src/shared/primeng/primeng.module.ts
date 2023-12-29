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
        InputTextareaModule
  
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
        InputTextareaModule
    ]
  })
  export class PrimengModule { }