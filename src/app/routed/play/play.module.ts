import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';
import { TimerComponent } from './component/operator/creation/timer/timer.component';
import { FilterComponent } from './component/operator/pipeable/filter/filter.component';
import { SubscriberComponent } from './component/operator/subscriber/subscriber.component';
import { StreamDataComponent } from './component/stream-data/stream-data.component';


@NgModule({
  declarations: [
    PlayComponent,
    TimerComponent,
    FilterComponent,
    SubscriberComponent,
    StreamDataComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule
  ]
})
export class PlayModule { }
