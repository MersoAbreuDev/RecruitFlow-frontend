import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../../../services/login/login.service';
import { MenuItem } from 'primeng/api';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{
  sidebarVisible: boolean = false;
  items!: MenuItem[];
  isLoginPage!: boolean;
  role: string | null = null;

  constructor(private router: Router, private loginService: LoginService, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/login' || event.url == '/signup') {
          this.isLoginPage = false;
        } else {
          this.isLoginPage = true;
        }
      }
    });
  }

  ngOnInit() {
    this.loginService.role$.subscribe((role) => {
      this.role = role;
      this.updateSidebarItems();
    });

    this.updateSidebarItems();
  }

  updateSidebarItems() {
    this.items = [
      {
        label: 'Cadastros',
        icon: 'pi pi-fw pi-file',
        visible: this.isAuthorized(),
        items: [
          {
            label: 'Usuario',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Cadastrar',
                icon: 'pi pi-fw pi-user-plus',
                command: () => {
                  this.sidebarVisible = !this.sidebarVisible;
                  this.router.navigateByUrl('/user');
                },
              },
              {
                label: 'Consultar',
                icon: 'pi pi-fw pi-list',
                command: () => {
                  this.sidebarVisible = !this.sidebarVisible;
                  this.router.navigateByUrl('/user/user-list');
                },
              },
            ],
          },
          {
            label: 'Vagas',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Cadastrar',
                icon: 'pi pi-fw pi-user-plus',
                command: () => {
                  this.sidebarVisible = !this.sidebarVisible;
                  this.router.navigateByUrl('/vaga');
                },
              },
              {
                label: 'Consultar',
                icon: 'pi pi-fw pi-list',
                command: () => {
                  this.sidebarVisible = !this.sidebarVisible;
                  this.router.navigateByUrl('/vaga/vaga-list');
                },
              },
            ],
          },
          {
            label: 'Avaliação Candidato',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Avaliar',
                icon: 'pi pi-fw pi-user-plus',
              },
              {
                label: 'Consultar',
                icon: 'pi pi-fw pi-list',
              },
            ],
          },
        ],
      },
      {
        label: 'Candidato',
        icon: 'pi pi-fw pi-file',
        visible:this.isAuthorizedUser(),
        items: [
          // {
          //   label: 'Perfil',
          //   icon: 'pi pi-fw pi-plus',
          //   items: [
          //     {
          //       label: 'Cadastrar',
          //       icon: 'pi pi-fw pi-user-plus',
          //       command: () => {
          //         this.router.navigateByUrl('/perfil');
          //       },
          //     },
          //     {
          //       label: 'Consulta',
          //       icon: 'pi pi-fw pi-user-plus',
          //       command: () => {
          //         this.router.navigateByUrl('/perfil/perfil-view');
          //       },
          //     },
          //   ],
          // },
        ],
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.sidebarVisible = !this.sidebarVisible;
          const overlay = document.querySelector('.p-component-overlay');
          if (overlay) {
            overlay.remove();
          }
          this.cdr.detectChanges();
          localStorage.clear();
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 1000);
        },
      },
    ];
  }

  isAuthorized(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'ADMIN';
  }

  isAuthorizedUser(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'USER';
  }
  
}
