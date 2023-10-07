class UI {
    constructor() {
      this.currentZoom = 100;
      this.zoomInButton = document.getElementById('zoom-in');
      this.zoomOutButton = document.getElementById('zoom-out');
  
      this.currentYear = 1972; // Set an initial year
      this.yearSlider = document.getElementById('year-slider');
      this.yearValue = document.getElementById('year-value');
  
      //add functions
      this.zoomInButton.addEventListener('click', this.zoomIn.bind(this));
      this.zoomOutButton.addEventListener('click', this.zoomOut.bind(this));
      this.yearSlider.addEventListener('input', this.handleYearSlider.bind(this));
      this.updateYearValue();
    }
  
    zoomIn() {
        this.currentZoom += 10;
    }
  
    zoomOut() {
        this.currentZoom -= 10;
    }
  
    handleYearSlider() {
      this.currentYear = parseInt(this.yearSlider.value);
      this.updateYearValue();
    }
  
    updateYearValue() {
      // Update the displayed year value
      this.yearValue.textContent = this.currentYear;
    }
  }
  
  
  const ui = new UI();
  