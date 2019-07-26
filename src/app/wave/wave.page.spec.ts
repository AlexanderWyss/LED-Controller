import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WavePage } from './wave.page';

describe('WavePage', () => {
  let component: WavePage;
  let fixture: ComponentFixture<WavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
