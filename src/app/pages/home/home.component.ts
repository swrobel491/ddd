import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ImageModule } from "primeng/image";
import { Menu, MenuModule } from "primeng/menu";
import { UserService } from "../../core/services/user.service";
import { Router } from "@angular/router";

import { HomeComponentState } from "./model";
import { IUser } from "../../core/models/user.model";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    imports: [
        AvatarModule,
        AvatarGroupModule,
        CardModule,
        ButtonModule,
        ImageModule,
        MenuModule,
        CommonModule,
    ]
})

export class HomeComponent implements OnInit {
    readonly HomeComponentState = HomeComponentState;
    
    constructor(private userService: UserService, private router: Router){}
    ngOnInit(): void {
    }
    // private initMenu(user: IUser): void {
    //   this.items.set([
    //     {
    //       label: 'Administration',
    //       items: [
    //         {
    //           label: 'Change role',
    //           icon: 'pi pi-pen-to-square',
    //           command: () => {
    //             this.state.set(HomeComponentState.changeRole);
    //           },
    //           disabled: user.role !== 'administrator',
    //         },
    //         {
    //           label: 'Users Info',
    //           icon: 'pi pi-users',
    //           command: () => {
    //             this.state.set(HomeComponentState.allUsersInfo);
    //           },
    //           disabled:
    //             user.role !== 'administrator' && user.role !== 'developer',
    //         },
    //       ],
    //     },
    //     {
    //       label: 'Service',
    //       items: [
    //         {
    //           label: 'Service Info',
    //           icon: 'pi pi-building-columns',
    //           command: () => {
    //             this.state.set(HomeComponentState.serviceInfo);
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       label: 'Profile',
    //       id: 'profile',
    //       items: [
    //         {
    //           id: 'info',
    //           label: 'Info',
    //           icon: 'pi pi-user',
    //           command: () => {
    //             this.state.set(HomeComponentState.userInfo);
    //           },
    //         },
    //         {
    //           label: 'Logout',
    //           icon: 'pi pi-sign-out',
    //           command: () => {
    //             this.userService.logout();
    //             this.router.navigate(['/login']);
    //           },
    //         },
    //       ],
    //     },
    //   ]);
    // }
}