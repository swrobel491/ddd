import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './components/account-list/account-list.component';
import { CallManagementComponent } from './components/call-management/call-management.component';

@Component({
  selector: 'app-calendar-management',
  standalone: true,
  imports: [CommonModule, AccountListComponent, CallManagementComponent],
  templateUrl: './calendar-management.component.html',
  styleUrl: './calendar-management.component.scss'
})
export class CalendarManagementComponent {

}
