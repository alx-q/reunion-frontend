import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReunionComponent } from './header-reunion.component';

describe('HeaderReunionComponent', () => {
  let component: HeaderReunionComponent;
  let fixture: ComponentFixture<HeaderReunionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderReunionComponent]
    });
    fixture = TestBed.createComponent(HeaderReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
