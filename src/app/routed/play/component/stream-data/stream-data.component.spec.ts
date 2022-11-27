import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamDataComponent } from './stream-data.component';

describe('StreamDataComponent', () => {
  let component: StreamDataComponent;
  let fixture: ComponentFixture<StreamDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
