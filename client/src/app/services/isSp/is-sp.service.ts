import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsSpService {
  private _isSp = false;

  constructor() {
    this.isSp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      navigator.userAgent
    );
  }

  get isSp() {
    return this._isSp;
  }

  set isSp(isSp: boolean) {
    this._isSp = isSp;
  }
}
