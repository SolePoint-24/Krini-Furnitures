class HoverZoom extends HTMLElement {
  constructor() {
    super();
    // Wait for DOM to be ready to find the image
    this.img = this.querySelector('img');
    
    // If image isn't immediately available (e.g. lazy loaded), wait for it
    if (!this.img) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            this.img = this.querySelector('img');
            if (this.img) {
              this.init();
              observer.disconnect();
            }
          }
        });
      });
      observer.observe(this, { childList: true, subtree: true });
    } else {
      this.init();
    }
  }

  init() {
    // Only enable on devices that support hover (mouse)
    if (window.matchMedia('(hover: hover)').matches) {
      this.addEventListener('mousemove', this.move.bind(this));
      this.addEventListener('mouseenter', this.enter.bind(this));
      this.addEventListener('mouseleave', this.leave.bind(this));
    }
  }

  enter() {
    // Smoother start
    this.img.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    this.img.style.willChange = 'transform, transform-origin';
  }

  move(e) {
    const rect = this.getBoundingClientRect();
    // Calculate percentage position of mouse
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Set transform origin to mouse position and scale
    this.img.style.transformOrigin = `${x}% ${y}%`;
    this.img.style.transform = 'scale(2)'; // Adjust '2' to change zoom level
  }

  leave() {
    // Smooth exit
    this.img.style.transition = 'transform 0.3s ease-out';
    this.img.style.transform = 'scale(1)';
    // Reset origin after transition to prevent jumping on next hover
    setTimeout(() => {
      this.img.style.transformOrigin = 'center center';
    }, 300);
  }
}

if (!customElements.get('hover-zoom')) {
  customElements.define('hover-zoom', HoverZoom);
}