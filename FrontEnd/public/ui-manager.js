class UI {
    constructor(socketio) {
      this.socket = socketio;
      this.currentZoom = 100;
      this.zoomInButton = document.getElementById('zoom-in');
      this.zoomOutButton = document.getElementById('zoom-out');
  
      this.currentYear = 1969; // Set an initial year
      this.yearSlider = document.getElementById('year-slider');
      this.yearValue = document.getElementById('year-value');
      //options
      this.option1 = document.getElementById('option1');
      this.option1Value=0;

  
      //add functions
      
      this.zoomInButton.addEventListener('click', this.zoomIn.bind(this));
      this.zoomOutButton.addEventListener('click', this.zoomOut.bind(this));
      this.yearSlider.addEventListener('input', this.handleYearSlider.bind(this));
      this.updateYearValue();
      this.searchButton = document.getElementById('search-button');
      this.searchButton.addEventListener('click', this.search_request.bind(this));
      //functions for options
      //this.option1.addEventListener('change', this.updateCheck1.bind(this));
      this.check=0;
      //this.btn1971=document.getElementById('proj-button1');
      //this.btn1971.addEventListener('click', this.setColor.bind(this));
    }
    search_request() {
        //Get the value of the input field with id "search-bar" and emit a userRequest event
        console.log("search request")
        var searchBar = document.getElementById("search-bar");
        var searchValue = searchBar.value;
        this.socket.emit("userRequest", searchValue);
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
      this.socket.emit("changeYear", this.currentYear)
    }

    //create functions for options
    updateCheck1(){
        if (this.option1.checked) {
            this.option1Value = 1;
        } else {
            this.option1Value = 0;
        }
    }
    
    setColor() {
      console.log("cioa");
      if (this.check == 0) {
          this.btn1971btn.style.backgroundColor = "#FFFFFF";
          this.check = 1;        
      }
      else {
          this.btn1971btn.style.backgroundColor = "#7FFF00";
          this.check = 0;
      }
    }
}
  
export {UI}
  
// const ui = new UI();