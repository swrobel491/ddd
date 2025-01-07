import { Routes } from "@angular/router";
import { CalendarAnalysisComponent } from "./calendar-analysis/calendar-analysis.component";
import { CalendarManagementComponent } from "./calendar-management/calendar-management.component";

export const routes: Routes = [
  { path: '', redirectTo: 'analysis', pathMatch: 'full' },
  { path: 'analysis', component: CalendarAnalysisComponent },
  { path: 'manage', component: CalendarManagementComponent }
]

