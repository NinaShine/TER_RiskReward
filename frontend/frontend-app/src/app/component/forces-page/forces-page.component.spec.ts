import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcesPageComponent } from './forces-page.component';

describe('ForcesPageComponent', () => {
  let component: ForcesPageComponent;
  let fixture: ComponentFixture<ForcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForcesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForcesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
