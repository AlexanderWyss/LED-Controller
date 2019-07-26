import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsPage } from './patterns.page';

describe('PatternsPage', () => {
  let component: PatternsPage;
  let fixture: ComponentFixture<PatternsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
