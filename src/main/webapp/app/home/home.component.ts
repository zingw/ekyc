import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { HomeService } from './home.service';

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
    'Thêm thông tin',
    'Xác thực',
    'Chọn ảnh',
    'Giấy tờ tùy thân',
    '',
    'Thông tin cá nhân',
    'Kiểm tra thông tin',
    'Kiểm tra địa chỉ',
    'Tạo tài khoản',
    'Tạo mật khẩu',
    'Hoàn tất',
  ];
  trimList: string[] = [];
  user: any;
  imgFrontUploaded = false;
  imgBackUploaded = false;
  fileUploaded = false;
  imageVerifiedSuccess = true;
  createAccountSuccess = true;
  reachStart = true;
  reachEnd = false;

  files: File[] = [];

  constructor(private accountService: AccountService, private router: Router, private homeService: HomeService) {}

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

  selectFiles($event: any) {
    this.files.push($event.target.files[0]);
    if (this.files.length == 3) {
      this.uploadAllFiles();
    }
  }

  uploadAllFiles() {
    this.homeService.upload(this.files).subscribe({
      next: res => {
        console.log(res);
      },
      error: res => {
        console.log(res);
      },
    });
  }
}
