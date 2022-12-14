import { Component, OnDestroy, OnInit } from '@angular/core';
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
  // to specify number of slot appears on screen
  SLOT: number = 5;
  private readonly destroy$ = new Subject<void>();
  step: number = 1;
  sourceList: string[] = [
    'step1',
    'step2',
    'step3',
    'step4',
    'step5',
    'step6',
    'step7',
    'step8',
    'step9',
    'step10',
    'step11',
    'step12',
    'step13',
    'step14',
    'step15',
    'step16',
    'step17',
  ];
  trimList: string[] = [];
  user: any;
  imgFrontUploaded = false;
  imgBackUploaded = false;
  fileUploaded = false;
  imageVerifiedSuccess = true;

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

  // changeState(number: number) {
  //   this.state = number;
  // }

  uploadImage() {
    console.log('image uploaded');
    this.fileUploaded = true;
  }

  uploadFrontImage() {
    console.log('image Front uploaded');
    this.imgFrontUploaded = true;
  }

  uploadBackImage() {
    console.log('image Back uploaded');
    this.imgBackUploaded = true;
  }

  previousStep() {
    // if curr step is end or start of array then refresh to get a new list
    if (this.step % this.SLOT == 0) {
      this.genPreviousSlots();
    }
    this.step--;
  }

  nextStep() {
    // if curr step is end or start of array then refresh to get a new list
    if (this.step % this.SLOT == 0) {
      this.genBehindSlots();
    }
    this.step++;
  }

  private genPreviousSlots() {
    // 7 / 6 = 1 -> 0 -> 5 || 13/6 = 2 ->
    const end = Math.ceil(this.step / this.SLOT) * this.SLOT - 1;
    const start = end - this.SLOT - 1;
    this.trimList = this.sourceList.splice(start, end - 1);
  }

  private genBehindSlots() {
    const end = Math.ceil(this.step / this.SLOT) * this.SLOT - 1;
    const start = end - this.SLOT - 1;
    this.trimList = this.sourceList.splice(start, end - 1);
  }
}
