import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmedCompaniesComponent } from './unconfirmed-companies.component';

describe('UnconfirmedCompaniesComponent', () => {
  let component: UnconfirmedCompaniesComponent;
  let fixture: ComponentFixture<UnconfirmedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnconfirmedCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnconfirmedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
