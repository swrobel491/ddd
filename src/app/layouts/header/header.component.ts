import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, MenuModule, CommonModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  protected items: WritableSignal<MenuItem[] | undefined> = signal(undefined);
  protected profileMenu: WritableSignal<MenuItem[] | undefined> = signal(undefined);
  constructor(protected router: Router, protected userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this.initMenu(this.userService.loggedUser);
    }
  }

  protected initMenu(user: IUser | undefined): void {
    this.items.set([
      // {
      //   label: 'Calendar',
      //   icon: 'pi pi-calendar-clock',
      //   items: [
      //     {
      //       label: 'Call Analytics',
      //       icon: 'pi pi-chart-bar',
      //       route: '/calendar/analysis',
      //     },
      //     {
      //       label: 'Call Management',
      //       icon: 'pi pi-pen-to-square',
      //       route: '/calendar/manage',
      //     },
      //   ],
      // },
      {
        label: 'Call Analytics',
        icon: 'pi pi-chart-bar',
        route: '/calendar/analysis',
      },
      {
        label: 'Call Management',
        icon: 'pi pi-pen-to-square',
        route: '/calendar/manage',
      },
      // {
      //   label: 'Service',
      //   items: [
      //     {
      //       label: 'Service Info',
      //       icon: 'pi pi-building-columns',
      //       // command: () => {
      //       //   this.state.set(HomeComponentState.serviceInfo);
      //       // },
      //     },
      //   ],
      // },
      // {
      //   label: 'Profile',
      //   id: 'profile',
      //   items: [
      //     {
      //       id: 'info',
      //       label: 'Info',
      //       icon: 'pi pi-user',
      //       // command: () => {
      //       //   this.state.set(HomeComponentState.userInfo);
      //       // },
      //     },
      //     {
      //       label: 'Logout',
      //       icon: 'pi pi-sign-out',
      //       command: () => {
      //         this.userService.logout();
      //         this.router.navigate(['/login']);
      //       },
      //     },
      //   ],
      // },
    ]);
    this.profileMenu.set([
      {
        icon: 'pi pi-user',
        label: `Welcome ${user?.unique_name}!!`,
        command: () => {
          this.userService.logout();
          this.router.navigate(['/']);
        },
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.userService.logout();
          this.router.navigate(['/auth']);
        },
      },
    ]);
  }
}
