import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { delay, Observable, SchedulerLike, take, tap, timer } from 'rxjs';
import { SIZE_OF_CELL } from '../../operator.config';
import { OperatorElement, Posiiton, Size } from '../../operator.interface';

interface TimerParams {
  startDue: number | Date
  intervalDuration: number
  scheduler?: SchedulerLike | undefined
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  size: Size = { x: 1, y: 1}

  position!: Posiiton

  /** 上流のオペレーター */
  private _upstreams: OperatorElement[] | undefined
  get upstreams (): OperatorElement[] | undefined {
    return this._upstreams
  }
  set upstreams (v: OperatorElement[] | undefined) {
    this._upstreams = v
    this.operatorInit()
  }

  /** 下流のオペレーター */
  private _downstreams: OperatorElement[] | undefined
  get downstreams (): OperatorElement[] | undefined {
    return this._downstreams
  }
  set downstreams (v: OperatorElement[] | undefined) {
    this._downstreams = v
    this.operatorInit()
  }

  private _children: any
  get children (): any {
    return this._children
  }
  set children (v: any) {
    this._children = v
  }

  private _parent: any
  get parent (): any {
    return this._parent
  }
  set parent (v: any) {
    this._parent = v
    this.operatorInit()
  }

  private _operator$: Observable<any> | undefined
  get operator$ (): Observable<any> | undefined {
    return this._operator$
  }

  private _params: TimerParams = {
    startDue: 0,
    intervalDuration: 1000
  }
  get params (): TimerParams {
    return this._params
  }
  set params (v: TimerParams) {
    this._params = v
    this.operatorInit()
  }


  @HostBinding('style.width') get widthPx() { return `${this.sizeOfCell.x}px` }
  @HostBinding('style.height') get heightPx() { return `${this.sizeOfCell.y}px` }

  private get sizeOfCell (): Size {
    return {
      x: this.size.x * SIZE_OF_CELL,
      y: this.size.y * SIZE_OF_CELL
    }
  }


  @HostBinding('style.left') get posXPx() { return `${this.positionOfCell.x}px` }
  @HostBinding('style.top') get posYPx() { return `${this.positionOfCell.y}px` }
  get positionOfCell (): Size {
    return {
      x: this.position.x * SIZE_OF_CELL,
      y: this.position.y * SIZE_OF_CELL
    }
  }

  data: any = undefined

  constructor() { }

  ngOnInit(): void {
    this.operatorInit()
  }

  // オペレーターを初期化する
  operatorInit (): void {
    if (this._operator$) {
      // ここでコンプリートした方が良いかも
      this._operator$ = undefined
    }
    // オペレーターを作る、途中でアニメーションの制御もする
    this._operator$ = timer(this.params.startDue, this.params.intervalDuration, this.params.scheduler)
      .pipe(
        tap((v) => {
          this.data = v
        }),
        delay(500)
      )

    // 子がある場合はその子のオペレーターを更新する
    if (this.downstreams) {
      this.downstreams.forEach(downstream => {
        downstream.instance.operatorInit()
      })
    }
  }
}
