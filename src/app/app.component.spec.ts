import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('derives the initial combined bird collection', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    expect(component.combinedBirds()).toHaveLength(4);
    expect(component.matchedCount()).toBe(3);
  });

  it('recomputes when source signal data changes', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.addFalconDetails();

    expect(component.matchedCount()).toBe(4);
    expect(component.combinedBirds()[2].details?.habitat).toContain('Cliffs');
  });
});
