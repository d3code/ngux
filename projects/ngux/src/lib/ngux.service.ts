import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NguxService {
  constructor() { }
}

export function getMaxIndex() {
  return Math.max(
    ...Array.from(document.querySelectorAll('body *'), el =>
      parseFloat(window.getComputedStyle(el).zIndex),
    ).filter(zIndex => !Number.isNaN(zIndex)),
    0,
  );
}
