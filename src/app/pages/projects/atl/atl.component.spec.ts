import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ATLComponent } from './atl.component';

describe('ATLComponent', () => {
  let component: ATLComponent;
  let fixture: ComponentFixture<ATLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ATLComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ATLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
