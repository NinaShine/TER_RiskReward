import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickmanComponent } from './stickman2.component';

describe('StickmanComponent', () => {
  let component: StickmanComponent;
  let fixture: ComponentFixture<StickmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickmanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
