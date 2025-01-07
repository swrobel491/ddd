import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GoogleAccountService } from '../../../../../core/services/google-account.service';
import { IAuthorizationUrl, IGoogleAccount } from '../../../../../core/models/google-account.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-my-accounts',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './my-accounts.component.html',
  styleUrl: './my-accounts.component.scss'
})
export class MyAccountsComponent implements OnInit {
  protected myAccounts: IGoogleAccount[] = [];
  constructor(private googleAccountService: GoogleAccountService) { }

  protected onAddAccount(): void {
    this.googleAccountService.getAuthorizationUrl().subscribe((url: IAuthorizationUrl) => {
      window.open(url.authorizationUrl, '_blank', 'width=500,height=600');
    });
  }

  ngOnInit(): void {
    this.googleAccountService.getMyAccounts().subscribe((accounts: IGoogleAccount[]) => {
      this.myAccounts = accounts;
    });
  }
}
