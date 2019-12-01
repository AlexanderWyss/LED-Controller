import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CronPage } from './cron.page';

describe('CronPage', () => {
  let component: CronPage;
  let fixture: ComponentFixture<CronPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
