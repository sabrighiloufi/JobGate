import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmedJobsComponent } from './unconfirmed-jobs.component';

describe('UnconfirmedJobsComponent', () => {
  let component: UnconfirmedJobsComponent;
  let fixture: ComponentFixture<UnconfirmedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnconfirmedJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnconfirmedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
