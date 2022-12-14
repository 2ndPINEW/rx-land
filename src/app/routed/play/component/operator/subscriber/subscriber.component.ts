import { Component, HostBinding, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SIZE_OF_CELL } from '../operator.config';
import { OperatorElement, Posiiton, Size } from '../operator.interface';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent implements OnInit {
  size: Size = { x: 1, y: 1}

  position!: Posiiton

  datas: number[] = []

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
  downstreams: undefined = undefined
  children: undefined = undefined
  parent: undefined = undefined
  operator$: undefined = undefined
  params: undefined = undefined

  streamSubscription: Subscription | undefined

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

  constructor() { }

  ngOnInit(): void {
    this.operatorInit()
  }

  // オペレーターを初期化する
  // MEMO: 上流のコンポーネントから呼び出されるので関数名は変えれない
  operatorInit (): void {
    this.datas = []
    if (this.streamSubscription) {
      this.streamSubscription.unsubscribe()
    }
    if (!this.upstreams?.[0]) {
      console.warn('subscriber need upstream')
      return
    }
    this.streamSubscription = this.upstreams[0].instance.operator$?.subscribe(v => {
      this.datas.push(v)
    })
  }
}
