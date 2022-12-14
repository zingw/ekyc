import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  private readonly destroy$ = new Subject<void>();
  state: number = 1;
  stateList: any = [
    { name: 'step1', colortext: 'red' },
    { name: 'step2', colortext: 'red' },
    { name: 'step3', colortext: 'red' },
    { name: 'step4', colortext: 'red' },
    { name: 'step5', colortext: 'red' },
  ];
  user: any;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.user = {};
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeState(number: number) {
    this.state = number;
  }
}
