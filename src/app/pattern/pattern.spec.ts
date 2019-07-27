import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternPage } from './pattern.page';

describe('WavePage', () => {
  let component: PatternPage;
  let fixture: ComponentFixture<PatternPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
