import { ComponentRef } from "@angular/core"

// MEMO: interfaceファイルでcomponentインポートするの良くない気がする
import { TimerComponent } from "./creation/timer/timer.component"
import { SubscriberComponent } from "./subscriber/subscriber.component"

export type OperatorComponent = TimerComponent | SubscriberComponent

export type OperatorElement = ComponentRef<OperatorComponent>

export interface Posiiton {
  x: number
  y: number
}

export interface Size {
  x: number
  y: number
}
