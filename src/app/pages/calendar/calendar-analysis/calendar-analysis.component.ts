import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

import { CalendarService } from '../../../core/services/calendar.service';
import { IStatistics, IStatisticsDetail } from '../../../core/models/call.model';


@Component({
  selector: 'app-calendar-analysis',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    TabViewModule,
    TableModule
  ],
  templateUrl: './calendar-analysis.component.html',
  styleUrl: './calendar-analysis.component.scss'
})

export class CalendarAnalysisComponent implements OnInit {
  protected date: Date[] = [];
  protected startDate: string | undefined;
  protected endDate: string | undefined;
  protected tabs: { label: string, icon: string, content?: IStatisticsDetail[], total?: number, pass?: number }[] = [];
  protected statistics: IStatistics[] = [];
  constructor(private calendarService: CalendarService) {
    this.date = [new Date()];
    this.tabs = [
      {
        label: 'Introductory Call',
        icon: 'pi pi-phone',
      },
      {
        label: 'Tech Interview',
        icon: 'pi pi-code',
      },
      {
        label: 'Final Interview',
        icon: 'pi pi-user',
      }
    ]
  }

  ngOnInit(): void {
    this.onDateSelect(this.date[0]);
  }

  protected onDateSelect(selectedDate: Date): void {
    const startOfWeek = new Date(selectedDate);
    const endOfWeek = new Date(selectedDate);

    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    this.startDate = formatDate(startOfWeek, 'yyyy-MM-dd', 'en-US');
    this.endDate = formatDate(endOfWeek, 'yyyy-MM-dd', 'en-US');
    
    this.calendarService.getStatistics(this.startDate, this.endDate).subscribe((response: IStatistics[]) => {
      this.tabs[0].total = response.reduce((acc, curr) => acc + parseInt(curr.introCount), 0);
      this.tabs[1].total = response.reduce((acc, curr) => acc + parseInt(curr.techCount), 0);
      this.tabs[2].total = response.reduce((acc, curr) => acc + parseInt(curr.finalCount), 0);
      this.tabs[0].pass = response.reduce((acc, curr) => acc + parseInt(curr.introPass), 0);
      this.tabs[1].pass = response.reduce((acc, curr) => acc + parseInt(curr.techPass), 0);
      this.tabs[2].pass = response.reduce((acc, curr) => acc + parseInt(curr.finalPass), 0);
      this.statistics = response;
    });
  }
}
