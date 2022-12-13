import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ngux-dropdown',
  template: `<ng-content></ng-content>`,
  styles: [
  ]
})
export class NguxDropdownComponent implements OnInit, OnDestroy {
  @Input() trigger: string | undefined;

  @Input() width: number = 380;
  @Input() background: boolean = true;

  @Input() fadeIn: number = 0;
  @Input() fadeOut: number = 0;

  // Component elements
  triggerElement: HTMLElement | null = null;
  contentElement: HTMLElement;
  backgroundElement: HTMLElement;

  /**
   * ---------------------------------------------------------
   * Create background element when component is constructed
   * ---------------------------------------------------------
   */
  constructor(private el: ElementRef) {

    this.contentElement = el.nativeElement

    // Create background element
    this.backgroundElement = document.createElement('div');
    this.backgroundElement.style.top = '0';
    this.backgroundElement.style.left = '0';
    this.backgroundElement.style.width = '100%';
    this.backgroundElement.style.height = '100%';
    this.backgroundElement.style.position = 'fixed'
    this.backgroundElement.onclick = () => this.ngOnDestroy()
  }

  /**
   * ---------------------------------------------------------
   * Initialize component
   * ---------------------------------------------------------
   */
  ngOnInit(): void {

    // Return if trigger not defined
    if (!this.trigger) {
      console.error('Dropdown trigger not defined');
      return
    }

    // Setup content
    this.contentElement.hidden = true
    this.contentElement.style.position = 'fixed'
    this.contentElement.style.width = this.width + 'px';
    this.contentElement.style.opacity = '0'

    // Find trigger
    this.triggerElement = document.querySelector('[dropdown=' + this.trigger + ']');

    if (this.triggerElement) {
      console.debug('Found dropdown trigger: ' + this.trigger);
      this.triggerElement.onclick = () => this.toggleDropdown()
    }
  }

  /**
   * ---------------------------------------------------------
   * Remove background and hide content
   * ---------------------------------------------------------
   */
  ngOnDestroy(): void {
    this.hideDropdown()
  }
  
  /**
   * ---------------------------------------------------------
   * Show background
   * ---------------------------------------------------------
   */
  private showBackground(topIndex: number) {
    this.backgroundElement.style.zIndex = String(topIndex + 1);
    document.body.appendChild(this.backgroundElement);
  }

  // ---------------------------------------------------------
  // Hide or show dropdown content and background
  // ---------------------------------------------------------
  toggleDropdown() {
    if (this.contentElement.hidden) {
      this.showDropdown()
    }
    else {
      this.hideDropdown()
    }
  }

  showDropdown() {
    if (!this.triggerElement) {
      console.error('Trigger element not found, unable to position dropdown');
      return
    }

    this.contentElement.style.transition = 'opacity ' + this.fadeIn + 's';

      // Set close triggers on [close] content elements
      var closeElements = Array.from(this.contentElement.querySelectorAll('[close]'));
      closeElements.forEach(e => {
        if (e instanceof HTMLElement) {
          e.onclick = () => this.ngOnDestroy()
        }
      });

      // Show dropdown
      this.contentElement.hidden = false
      this.setContentPosition()

      // Set z-index
      const topIndex = getMaxIndex();
      this.contentElement.style.zIndex = (topIndex + 2).toString()

      // Create dropdown background
      if (this.background) {
        this.showBackground(topIndex);
      }

      // Show content by opacity with fade configuration 
      this.contentElement.style.opacity = '1'
  }

  hideDropdown() {
    if (!this.contentElement) {
      return;
    }

    console.debug('Closing dropdown', this.trigger);

    this.contentElement.style.transition = 'opacity ' + this.fadeOut + 's';
    setTimeout(() => {
      this.contentElement.hidden = true;
    }, this.fadeOut * 1000);

    this.contentElement.style.opacity = '0'

    try {
      document.body.removeChild(this.backgroundElement);
    } catch (error) {
      console.debug('Background not a child');
    }
  }


  // ---------------------------------------------------------
  // Set position of the content element
  // ---------------------------------------------------------
  private setContentPosition() {
    if (!this.triggerElement) {
      return;
    }

    // Get window width
    let windowWidth = document.body.clientWidth;

    // ------------------------------------------------------------
    // If bounding exists on ducument body set to bounding width
    // ------------------------------------------------------------
    const navElement = document.querySelector('nav > .container');
    if (!navElement) {
      console.log('Cant find bounding area');
      return
    }
    
    const navRect = navElement.getBoundingClientRect()
    
    // Get position
    const triggerRect = this.triggerElement.getBoundingClientRect();
    const contentRect = this.contentElement.getBoundingClientRect();

    // Set y-position of dropdown
    this.contentElement.style.top = (triggerRect.bottom + 0) + 'px';
    
    // ------------------------------------------------------------
    // Set x-position based on window and dropdown width
    // ------------------------------------------------------------

    // Full width if content larger than window width
    if (contentRect.width > (navRect.width - 20)) {
      this.contentElement.style.left = '0';
      this.contentElement.style.right = '0';
      this.contentElement.style.width = windowWidth + 'px';
    }
    // 
    else if ((triggerRect.left + contentRect.width) > navRect.right) {
      const styleRight = windowWidth - triggerRect.right;
      this.contentElement.style.left = '';
      this.contentElement.style.right = (styleRight) + 'px';
    }
    else {
      const styleLeft = triggerRect.left;
      this.contentElement.style.right = '';
      this.contentElement.style.left = (styleLeft) + 'px';
    }

    // Adjust position if off screen
    const updatedContentRect = this.contentElement.getBoundingClientRect();    
    if (updatedContentRect.left < 0) {
      const margin = (windowWidth - updatedContentRect.width) / 2
      this.contentElement.style.right = '';
      this.contentElement.style.left = margin + 'px';
    }
  }
}

function getMaxIndex() {
  return Math.max(
    ...Array.from(document.querySelectorAll('body *'), el =>
      parseFloat(window.getComputedStyle(el).zIndex),
    ).filter(zIndex => !Number.isNaN(zIndex)),
    0,
  );
}
