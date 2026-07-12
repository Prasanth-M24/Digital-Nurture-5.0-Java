import { ElementRef, Renderer2 } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const renderer = {
      setStyle: () => {},
      removeStyle: () => {},
    } as unknown as Renderer2;

    const directive = new Highlight(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
