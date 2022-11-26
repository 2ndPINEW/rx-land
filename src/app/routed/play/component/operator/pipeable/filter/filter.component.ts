import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SIZE_OF_CELL } from '../../operator.config';
import { OperatorElement, Posiiton, Size } from '../../operator.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  size: Size = { x: 1, y: 1}

  position!: Posiiton

  /** 上流のオペレーター */
  private _upstream: OperatorElement | undefined
  @Input()
  get upstream (): OperatorElement | undefined {
    return this._upstream
  }
  set upstream (v: OperatorElement | undefined) {
    this._upstream = v
    this.operatorInit()
  }

  /** 下流のオペレーター */
  private _downstream: OperatorElement | undefined
  @Input()
  get downstream (): OperatorElement | undefined {
    return this._downstream
  }
  set downstream (v: OperatorElement | undefined) {
    this._downstream = v
  }

  private _children: any
  @Input()
  get children (): any {
    return this._children
  }
  set children (v: any) {
    this._children = v
  }

  private _parent: any
  @Input()
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

  // private _params: FilterParams = {
  //   startDue: 0,
  //   intervalDuration: 1000
  // }
  // get params (): FilterParams {
  //   return this._params
  // }
  // set params (v: FilterParams) {
  //   this._params = v
  //   this.operatorInit()
  // }


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
  operatorInit (): void {
    if (this._operator$) {
      // ここでコンプリートした方が良いかも
      this._operator$ = undefined
    }
    if (!this.upstream) {
      console.warn('filter element need upstream')
      return
    }
    // オペレーターを作る、途中でアニメーションの制御もする
    // パイプの中に入れるからこれちゃうな作り直し
    // this._operator$ = this.upstream.instance.operator$?.pipe


    // (this.params.startDue, this.params.intervalDuration, this.params.scheduler)
    //   .pipe(
    //     tap((v) => { console.log(v) }),
    //     delay(500)
    //   )

    // 子がある場合はその子のオペレーターを更新する
    if (this.children) {
      this.children.operatorInit()
    }
  }
}
