import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

import { CalendarService } from '../../../../../core/services/calendar.service';
import { ICallEvent } from '../../../../../core/models/call.model';
import { MyAccountsComponent } from '../my-accounts/my-accounts.component';

@Component({
  selector: 'app-call-management',
  standalone: true,
  imports: [CommonModule,
    CalendarModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    MyAccountsComponent],
  templateUrl: './call-management.component.html',
  styleUrl: './call-management.component.scss'
})

export class CallManagementComponent implements OnInit {
  protected date: Date[] = [];
  protected startDate: string | undefined;
  protected endDate: string | undefined;
  protected callEvents: ICallEvent[] = [];
  protected isUpdateDlgOpen: boolean = false;
  protected updateMeetingForm: WritableSignal<FormGroup> = signal(new FormGroup({}));

  protected meetingStatusOptions: any[] = [];
  protected selectedMeetingStatus: any;
  protected meetingTypeOptions: any[] = [];
  protected selectedMeetingType: any;
  protected selectedId: string = '';

  constructor(
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
    this.date = [new Date()];
  }

  ngOnInit(): void {
    this.updateMeetingForm.set(this.formBuilder.group({
      type: [null, Validators.required],
      status: [null, Validators.required],
    }));

    this.meetingStatusOptions = [
      { label: 'Pending', value: 0 },
      { label: 'Waiting for Response', value: 1 },
      { label: 'Passed', value: 2 },
      { label: 'Not Passed', value: 3 },
    ];

    this.meetingTypeOptions = [
      { label: 'Introductory Call', value: 0 },
      { label: 'Tech Interview', value: 1 },
      { label: 'Final Interview', value: 2 },
    ];

    this.onDateSelect(this.date[0]);
  }

  protected onDateSelect(selectedDate: Date): void {
    const startOfWeek = new Date(selectedDate);
    const endOfWeek = new Date(selectedDate);

    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    this.startDate = formatDate(startOfWeek, 'yyyy-MM-dd', 'en-US');
    this.endDate = formatDate(endOfWeek, 'yyyy-MM-dd', 'en-US');

    this.calendarService.getCallEvents(this.startDate || '', this.endDate || '').subscribe((response: ICallEvent[]) => {
      this.callEvents = response;
    });
  }


  protected showUpdateDlg(id: string, type: number, state: number): void {
    this.isUpdateDlgOpen = true;
    this.selectedId = id;
    this.selectedMeetingStatus = state;
    this.selectedMeetingType = type;
  }

  protected onUpdateMeeting(): void {
    this.calendarService.updateCallEvent(this.selectedId, this.selectedMeetingStatus, this.selectedMeetingType).subscribe({
      next: (response: any) => {
        this.isUpdateDlgOpen = false;

        this.calendarService.getCallEvents(this.startDate || '', this.endDate || '').subscribe((response: ICallEvent[]) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Meeting reloaded successfully' });
          this.callEvents = response;
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Meeting updated successfully' });
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update meeting' });
      }
    });
  }
}
