import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { TimerComponent } from './component/operator/creation/timer/timer.component';
import { OperatorComponent, OperatorElement, Posiiton } from './component/operator/operator.interface';
import { SubscriberComponent } from './component/operator/subscriber/subscriber.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  private elements: OperatorElement[] = []

  @ViewChild('playArea', {static: true})
  playAreaElementRef!: ElementRef<Element>

  constructor(
    private vcr: ViewContainerRef
  ) { }

  ngOnInit(): void {

  }

  create1 (): void {
    this.addComponent(TimerComponent, { x: 0, y: 0 })
    this.addComponent(TimerComponent, { x: 4, y: 1 })
  }

  create2 (): void {
    this.addComponent(SubscriberComponent, { x: 1, y: 0 })
    this.addComponent(SubscriberComponent, { x: 1, y: 2 })

    this.addComponent(SubscriberComponent, { x: 6, y: 0 })
    this.addComponent(SubscriberComponent, { x: 5, y: 1 })
  }

  addComponent (componentType: Type<OperatorComponent>, position: Posiiton): void {
    if (this.canMakeOperatorAsPosiiton(position)) {
      console.warn('block')
      return
    }
    const host = this.playAreaElementRef.nativeElement
    const componentRef = this.vcr.createComponent(componentType)
    host.appendChild(componentRef.location.nativeElement)

    this.elements.push(componentRef)
    componentRef.instance.position = position

    componentRef.instance.upstreams = this.getUpstreamElements(componentRef)
    componentRef.instance.upstreams?.forEach(upstreamElement => {
      upstreamElement.instance.downstreams = this.getDownstreamElements(upstreamElement)
    })

    componentRef.instance.downstreams = this.getDownstreamElements(componentRef)
    componentRef.instance.downstreams?.forEach(downstreamElement => {
      downstreamElement.instance.upstreams = this.getUpstreamElements(downstreamElement)
    })
  }

  /** 指定した一点にオペレーターを作れるかどうか */
  canMakeOperatorAsPosiiton (position: Posiiton): boolean {
    return this.elements.some(element => {
      return element.instance.position.x <= position.x && position.x < element.instance.position.x + element.instance.size.x
          && element.instance.position.y <= position.y && position.y < element.instance.position.y + element.instance.size.y
    })
  }

  private getUpstreamElements (referenceElement: OperatorElement): OperatorElement[] | undefined {
    // この形
    // xx
    // xxy
    // zzy
    const pos = referenceElement.instance.position
    const size = referenceElement.instance.size
    const arrowedYConditions = this.range(pos.y, pos.y + size.y - 1)
    return this.elements.filter(element => {
      return element.instance.position.x + element.instance.size.x === pos.x
          && arrowedYConditions.some(arrow => {
            const elementArrowedYConditions = this.range(element.instance.position.y, element.instance.position.y + element.instance.size.y - 1)
            return elementArrowedYConditions.some(elementArrow => arrow === elementArrow)
          })
    })
  }

  private getDownstreamElements (referenceElement: OperatorElement): OperatorElement[] | undefined {
    // この形
    //  yy
    // xyy
    // xz
    const pos = referenceElement.instance.position
    const size = referenceElement.instance.size
    const arrowedYConditions = this.range(pos.y, pos.y + size.y - 1)
    const arrowedXCondition = pos.x + 1
    return this.elements.filter(element => {
      return element.instance.position.x === arrowedXCondition
          && arrowedYConditions.some(arrow => {
            const elementArrowedYConditions = this.range(element.instance.position.y, element.instance.position.y + element.instance.size.y - 1)
            return elementArrowedYConditions.some(elementArrow => arrow === elementArrow)
          })
    })
  }
  private range (start: number, end: number): number[] {
    return [...Array(end + 1).keys()].slice(start)
  }

  // オペレーターコンポーネントのツリー状態はここで管理しよう


}
