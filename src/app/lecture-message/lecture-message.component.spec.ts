import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureMessageComponent } from './lecture-message.component';

describe('LectureMessageComponent', () => {
  let component: LectureMessageComponent;
  let fixture: ComponentFixture<LectureMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectureMessageComponent]
    });
    fixture = TestBed.createComponent(LectureMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
