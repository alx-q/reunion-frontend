import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerEnregistrementComponent } from './creer-enregistrement.component';

describe('CreerEnregistrementComponent', () => {
  let component: CreerEnregistrementComponent;
  let fixture: ComponentFixture<CreerEnregistrementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerEnregistrementComponent]
    });
    fixture = TestBed.createComponent(CreerEnregistrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
