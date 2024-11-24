import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirEnregistrementComponent } from './voir-enregistrement.component';

describe('VoirEnregistrementComponent', () => {
  let component: VoirEnregistrementComponent;
  let fixture: ComponentFixture<VoirEnregistrementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoirEnregistrementComponent]
    });
    fixture = TestBed.createComponent(VoirEnregistrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
