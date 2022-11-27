import { Component, Input, OnInit } from '@angular/core';

export type Data = number | string | StreamData | undefined

export interface StreamData {
  number: number
  string: number
  boxColor: string
}

export type DataType =
    'number'
  | 'numbers'
  | 'unknown'
  | 'undefined'

@Component({
  selector: 'app-stream-data',
  templateUrl: './stream-data.component.html',
  styleUrls: ['./stream-data.component.scss']
})
export class StreamDataComponent {
  @Input()
  data: Data | Data[]

  constructor() { }

  dataType (): DataType {
    if (this.data === undefined) {
      return 'undefined'
    }

    if (Array.isArray(this.data)) {
      if (typeof(this.data) === 'number') {
        return 'numbers'
      }
    }

    if (typeof(this.data) === 'number') {
      return 'number'
    }

    console.error('unknown data type', this.data)
    return 'unknown'
  }
}
