import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFinaleComponent } from './page-finale.component';

describe('PageFinaleComponent', () => {
  let component: PageFinaleComponent;
  let fixture: ComponentFixture<PageFinaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFinaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFinaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
