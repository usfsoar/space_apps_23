const int pingPin1 = 13; // Trigger Pin of Ultrasonic Sensor
const int echoPin1 = 12; // Echo Pin of Ultrasonic Sensor

const int pingPin2 = 11; // Trigger Pin of Ultrasonic Sensor
const int echoPin2 = 10; // Echo Pin of Ultrasonic Sensor

const int pingPin3 = 13; // Trigger Pin of Ultrasonic Sensor
const int echoPin3 = 12; // Echo Pin of Ultrasonic Sensor

const int pingPin4 = 13; // Trigger Pin of Ultrasonic Sensor
const int echoPin4 = 12; // Echo Pin of Ultrasonic Sensor

const int pingPin5 = 13; // Trigger Pin of Ultrasonic Sensor
const int echoPin5 = 12; // Echo Pin of Ultrasonic Sensor

const int pingPin6 = 13; // Trigger Pin of Ultrasonic Sensor
const int echoPin6 = 12; // Echo Pin of Ultrasonic Sensor

const int pingPin7 = 13; // Trigger Pin of Ultrasonic Sensor
const int echoPin7 = 12; // Echo Pin of Ultrasonic Sensor

const int pingPin8 = 13; // Trigger Pin of Ultrasonic Sensor
const int echoPin8 = 12; // Echo Pin of Ultrasonic Sensor


void setup() {
   Serial.begin(9600); // Starting Serial Terminal
}

void loop() {
   long duration1, cm1;
   pinMode(pingPin1, OUTPUT);
   digitalWrite(pingPin1, LOW);
   delayMicroseconds(2);
   digitalWrite(pingPin1, HIGH);
   delayMicroseconds(10);
   digitalWrite(pingPin1, LOW);
   pinMode(echoPin1, INPUT);
   duration1 = pulseIn(echoPin1, HIGH);
   cm1 = microsecondsToCentimeters(duration1);


   long duration2, cm2;
   pinMode(pingPin2, OUTPUT);
   pinMode(pingPin2, OUTPUT);
   digitalWrite(pingPin2, LOW);
   delayMicroseconds(2);
   digitalWrite(pingPin2, HIGH);
   delayMicroseconds(10);
   digitalWrite(pingPin2, LOW);
   pinMode(echoPin2, INPUT);
   duration2 = pulseIn(echoPin1, HIGH);
   cm2 = microsecondsToCentimeters(duration2);




   
   Serial.print("Sensor 1 = "); 
   Serial.print(cm1);
      
   Serial.print("| Sensor 2 = "); 
   Serial.print(cm2);
   Serial.println();
   delay(50);



   
}

long microsecondsToCentimeters(long microseconds) {
   return microseconds / 29 / 2;
}
