import {Rendering} from "./client.js"
import {UI} from "./ui-manager.js"
var socket = io.connect('http://127.0.0.1:5000');

let main_visual=document.getElementById("main-visual");
let projector_visual=document.getElementById("projector-visual");

let current_visual="main-visual";
let option=document.getElementById("btSwitcher");

option.addEventListener('click', changeView.bind());

function changeView(){
    if(current_visual=="main-visual"){
        current_visual="projector-visual";
        main_visual.style.display = "none";
        projector_visual.style.display = "block";
    }else{
        current_visual="main-visual";
        projector_visual.style.display = "none";
        main_visual.style.display = "block";
    }
}

let full_screen=document.getElementById("projector-header")
let switch_button=document.getElementById("btSwitcher")
window.addEventListener('resize', (evt) => { 
    if (window.innerHeight == screen.height) {
        full_screen.style.display = "none";
        switch_button.style.display = "none";
    } else {
        full_screen.style.display = "block";
        switch_button.style.display = "block";
    }
});

const rendering = new Rendering();
rendering.setRotation(0);
rendering.animate();

const ui = new UI(socket);
socket.on("changeTexture", (data)=>{
    console.log("change texture");
    rendering.change_texture(data.texture, data.bump);
});

//Get object by id "btConnect" and attach connect event listener
var btConnect = document.getElementById("btConnect");
btConnect.addEventListener("click", function(){
    connect();
});
var deviceCache = null;
function connect() {
  return (deviceCache ? Promise.resolve(deviceCache) :
      requestBluetoothDevice()).
      then(device => connectDeviceAndCacheCharacteristic(device)).
      then(characteristic => startNotifications(characteristic)).
      catch(error => console.log(error));
}
function requestBluetoothDevice() {
  console.log('Requesting bluetooth device...');

  return navigator.bluetooth.requestDevice({
    filters: [{services: [0xFFE0]}],
  }).
      then(device => {
        console.log('"' + device.name + '" bluetooth device selected');
        deviceCache = device;

        return deviceCache;
      });
}
// Characteristic object cache
let characteristicCache = null;

// Connect to the device specified, get service and characteristic
function connectDeviceAndCacheCharacteristic(device) {
  if (device.gatt.connected && characteristicCache) {
    return Promise.resolve(characteristicCache);
  }

  console.log('Connecting to GATT server...');

  return device.gatt.connect().
      then(server => {
        console.log('GATT server connected, getting service...');

        return server.getPrimaryService(0xFFE0);
      }).
      then(service => {
        console.log('Service found, getting characteristic...');

        return service.getCharacteristic(0xFFE1);
      }).
      then(characteristic => {
        console.log('Characteristic found');
        characteristicCache = characteristic;

        return characteristicCache;
      });
}
// Enable the characteristic changes notification
function startNotifications(characteristic) {
  console.log('Starting notifications...');

  return characteristic.startNotifications().
      then(() => {
        console.log('Notifications started');
        // Added line
        characteristic.addEventListener('characteristicvaluechanged',
            handleCharacteristicValueChanged);
      });
}

function disconnect() {
  if (deviceCache) {
    console.log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
    deviceCache.removeEventListener('gattserverdisconnected',
        handleDisconnection);

    if (deviceCache.gatt.connected) {
      deviceCache.gatt.disconnect();
      console.log('"' + deviceCache.name + '" bluetooth device disconnected');
    }
    else {
      console.log('"' + deviceCache.name +
          '" bluetooth device is already disconnected');
    }
  }

  // Added condition
  if (characteristicCache) {
    characteristicCache.removeEventListener('characteristicvaluechanged',
        handleCharacteristicValueChanged);
    characteristicCache = null;
  }

  deviceCache = null;
}

// Data receiving
function handleCharacteristicValueChanged(event) {
  let value = new TextDecoder().decode(event.target.value);
  console.log('received', value);
  //If value contains "button:{number}"
  if (value.includes(":")) {
    //Get number
    console.log("Button pressed")
    let number = value.split(":")[1];
    //Map the number to the following indexes:
    //1: 1971, 2:1972, 3:1973, 4:1974, 5: 1975, 6:1976
    let year = 1970 + parseInt(number);
    socket.emit('year_request', year)
  }
}
socket.on("ChangeMap", (data)=>{
    //Change the background map
    let moonmap = document.getElementById("moonmap");
    //Get the first texture from the data
    let texture = data.texture;
    //Set the source of the image to the texture
    moonmap.src = texture;

})
setTimeout(() => {
    //rendering.setRotation(-0.001);
    console.log("start rotation");
    let coordinates = rendering.points_data.map(x=>({x:x.Long, y:x.Lat}));
    console.log(coordinates)
    console.log(coordinates[1].x);
    
    rendering.create_point2(     
        90,90
        , "#7FFFD4"
        )

    rendering.create_point2(    
        0,90, "#FFA500"
        )
    
    rendering.create_point2(     
        0,0, "#0000FF"
        )
    for (let i = 0; i < coordinates.length; i++) {

        console.log(i);
        rendering.create_point2(coordinates[i].x,coordinates[i].y)
        
    }
    //rendering.change_texture("moonmap.png","moonbump.png");

}, 1000);