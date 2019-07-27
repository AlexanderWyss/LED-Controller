import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternSettingsSliderComponent } from './pattern-settings-slider.component';

describe('PatternSettingsSliderComponent', () => {
  let component: PatternSettingsSliderComponent;
  let fixture: ComponentFixture<PatternSettingsSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternSettingsSliderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternSettingsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
