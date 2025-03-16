import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPageComponent } from './final-page.component';

describe('PageFinaleComponent', () => {
  let component: FinalPageComponent;
  let fixture: ComponentFixture<FinalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
