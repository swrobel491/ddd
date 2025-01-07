import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleAccountService } from '../../../core/services/google-account.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connect-gmail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connect-gmail.component.html',
  styleUrls: ['./connect-gmail.component.scss']
})
export class ConnectGmailComponent implements OnInit {

  protected linkResult: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private googleAccountService: GoogleAccountService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const code = params['code'];
      if (code) {
        this.googleAccountService.linkAccount(code).subscribe({
          next: (response: any) => {
            if (response)
            {
              this.linkResult = true;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account linked successfully', life: 3000 });
            }
            else
            {
              this.linkResult = false;
              this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Invalid user', life: 3000 });
            }
            this.closeWindow();
          },
          error: (error: any) => {
            this.linkResult = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to link account', life: 3000 });
            this.closeWindow();
          }
        });
      }
    });
  }

  closeWindow() {
    setTimeout(() => {
      window.close();
    }, 3000);
  }
}
