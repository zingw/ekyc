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
  step: number = 7;
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
  reachStart = true;
  reachEnd = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.user = {};
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
    this.trimList = this.sourceList.slice(0, this.SLOT);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
    if (this.step == 1) {
      this.reachStart = true;
      return;
    } else {
      this.reachStart = false;
      this.reachEnd = false;
      if ((this.step - 1) % this.SLOT == 0) {
        const start = this.step - this.SLOT - 1;
        const end = start + this.SLOT;
        this.trimList = this.sourceList.slice(start, end);
      }
      this.step--;
      // console.log('now on index :',this.getStepIndex())
      // console.log('now on step :', this.step)
    }
  }

  nextStep() {
    if (this.step == this.sourceList.length) {
      this.reachEnd = true;
      return;
    } else {
      this.reachEnd = false;
      this.reachStart = false;
      if (this.step % this.SLOT == 0) {
        const start = this.step;
        const end = start + this.SLOT;
        this.trimList = this.sourceList.slice(start, end);
      }
      this.step++;
      // console.log('now on index :',this.getStepIndex())
      // console.log('now on step :', this.step)
    }
  }
  getStepIndex(): number {
    if (this.step % this.SLOT == 0) {
      return this.SLOT - 1;
    } else {
      return (this.step % this.SLOT) - 1;
    }
  }
}
