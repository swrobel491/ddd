import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { GoogleAccountService } from '../../../../../core/services/google-account.service';
import { IGoogleAccount } from '../../../../../core/models/google-account.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [TreeModule, TableModule, ButtonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {
  protected nodes: TreeNode[] = [];
  protected accounts: IGoogleAccount[] = [];
  constructor(private googleAccountService: GoogleAccountService) { }

  ngOnInit(): void {
    this.googleAccountService.getAccounts({ skip: 0, limit: 200 }).subscribe((accounts: IGoogleAccount[]) => {
      this.accounts = accounts;
    });
  }

}
