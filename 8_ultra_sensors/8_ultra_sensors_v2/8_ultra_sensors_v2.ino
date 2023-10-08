#include <SoftwareSerial.h>

int trigPin = 13;
int echoPin = 12;

int trigPin2 = 11;
int echoPin2 = 10;

int trigPin3 = 9;
int echoPin3 = 8;

int trigPin4 = 7;
int echoPin4 = 6;

int trigPin5 = 5;
int echoPin5 = 4;

int trigPin6 = 3;
int echoPin6 = 2;

int trigPin7 = 22;
int echoPin7 = 24;

int trigPin8 = A14;
int echoPin8 = A15;

int Irsen1 = 30;
int Irsen2 = 31;
int Irsen3 = 32;
int Irsen4 = 33;
int Irsen5 = 34;
int Irsen6 = 35;
int Irsen7 = 36;
int Irsen8 = 37;
int Irsen9 = 38;

void setup() {
  Serial.begin (9600);
  Serial1.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin3, INPUT);

  pinMode(trigPin4, OUTPUT);
  pinMode(echoPin4, INPUT);
  
  pinMode(trigPin5, OUTPUT);
  pinMode(echoPin5, INPUT);

  pinMode(trigPin6, OUTPUT);
  pinMode(echoPin6, INPUT);

  pinMode(trigPin7, OUTPUT);
  pinMode(echoPin7, INPUT);
  
  pinMode(trigPin8, OUTPUT);
  pinMode(echoPin8, INPUT);


    pinMode(Irsen1 ,INPUT);
    pinMode(Irsen2 ,INPUT);
    pinMode(Irsen3 ,INPUT);
    pinMode(Irsen4 ,INPUT);
    pinMode(Irsen5 ,INPUT);
    pinMode(Irsen6 ,INPUT);
    pinMode(Irsen7 ,INPUT);
    pinMode(Irsen8 ,INPUT);
    pinMode(Irsen9, INPUT);    
    
    
    
}

  
void loop() {
  if (Serial1.available()) {
        Serial.write(Serial1.read());
    }
    float duration4, distance4;
    digitalWrite (trigPin4, HIGH);
    delayMicroseconds (10);
    digitalWrite (trigPin4, LOW);
    duration4 = pulseIn (echoPin4, HIGH);
    distance4 = (duration4/2) / 29.1;

    float duration1, distance1;
    digitalWrite (trigPin, HIGH);
    delayMicroseconds (10);
    digitalWrite (trigPin, LOW);
    duration1 = pulseIn (echoPin, HIGH);
    distance1 = (duration1/2) / 29.1;

       


    float duration2, distance2;
    digitalWrite (trigPin2, HIGH);
    delayMicroseconds (10);
    digitalWrite (trigPin2, LOW);
    duration2 = pulseIn (echoPin2, HIGH);
    distance2 = (duration2/2) / 29.1;


  

    float duration3, distance3;
    digitalWrite (trigPin3, HIGH);
    delayMicroseconds (10);
    digitalWrite (trigPin3, LOW);
    duration3 = pulseIn (echoPin3, HIGH);
    distance3 = (duration3/2) / 29.1;



    
    float duration5, distance5;
    digitalWrite (trigPin5, HIGH);
    delayMicroseconds (10);
    digitalWrite (trigPin5, LOW);
    duration5 = pulseIn (echoPin5, HIGH);
    distance5 = (duration5/2) / 29.1;

    
    float duration6, distance6;
    digitalWrite (trigPin6, HIGH);
    delayMicroseconds (10);
    digitalWrite (trigPin6, LOW);
    duration6 = pulseIn (echoPin6, HIGH);
    distance6 = (duration6/2) / 29.1;

    
    float duration7, distance7;
    digitalWrite (trigPin7, HIGH);
    delayMicroseconds (10);
    digitalWrite (trigPin7, LOW);
    duration7 = pulseIn (echoPin7, HIGH);
    distance7 = (duration7/2) / 29.1;

  
    float duration8, distance8;
    digitalWrite (trigPin8, HIGH);
    delayMicroseconds (10);
    digitalWrite (trigPin8, LOW);
    duration8 = pulseIn (echoPin8, HIGH);
    distance8 = (duration8/2) / 29.1;


    
      /*
      Serial.print("Sensor1 = ");
      Serial.print(distance1);

      Serial.print("| Sensor2 = ");
      Serial.print(distance2);  

      Serial.print("| Sensor3 = ");
      Serial.print(distance3); 

      Serial.print("| Sensor4 = ");
      Serial.print(distance4); 

      Serial.print("| Sensor5 = ");
      Serial.print(distance5); 

      Serial.print("| Sensor6 = ");
      Serial.print(distance6); 

      Serial.print("| Sensor7 = ");
      Serial.print(distance7); 

      Serial.print("| Sensor8 = ");
      Serial.print(distance8); 
      
      Serial.print("cm");
      Serial.println();

      */

      float longitude1, latitude1;
  if (distance1 > 3 && distance1 < 30) {
      Serial.println();
      Serial.print("Something was detected1");
      longitude1 = (distance1 - 15)*6;
      latitude1 = -157.5;
      String msg = String(longitude1)+";"+String(latitude1);
      Serial1.print(msg);
      Serial.println();
      Serial.print("longitude = ");
      Serial.print(longitude1);
      Serial.print("| latitude = ");
      Serial.print(latitude1);
      Serial.println();
    }

          
      float longitude2, latitude2;
  if (distance2 > 3 && distance2 < 30) {
      Serial.println();
      Serial.print("Something was detected1");
      longitude2 = (distance2 - 15)*6;
      latitude2 = -112.5;
      String msg = String(longitude2)+";"+String(latitude2);
      Serial1.print(msg);
      Serial.println();
      Serial.print("longitude = ");
      Serial.print(longitude2 );
      Serial.print("| latitude = ");
      Serial.print(latitude2 );
      Serial.println();
    }
    Serial.print(distance2);
      float longitude3 , latitude3 ;
  if (distance3 > 3 && distance3 < 30) {
      Serial.println();
      Serial.print("Something was detected1");
      longitude3 = (distance3 - 15)*6;
      latitude3 = -67.5;
      String msg = String(longitude3)+";"+String(latitude3);
      Serial1.print(msg);
      Serial.println();
      Serial.print("longitude = ");
      Serial.print(longitude3 );
      Serial.print("| latitude = ");
      Serial.print(latitude3 );
      Serial.println();
    }
     float longitude4 , latitude4 ;
  if (distance4 > 3 && distance4 < 30) {
      Serial.println();
      Serial.print("Something was detected1");
      longitude4 = (distance4 - 15)*6;
      latitude4 = -22.5;
      String msg = String(longitude4)+";"+String(latitude4);
      Serial1.print(msg);
      Serial.println();
      Serial.print("longitude = ");
      Serial.print(longitude4 );
      Serial.print("| latitude = ");
      Serial.print(latitude4 );
      Serial.println();
    }

         float longitude5 , latitude5 ;
  if (distance5 > 3 && distance5 < 30) {
      Serial.println();
      Serial.print("Something was detected1");
      longitude5 = (distance5 - 15)*6;
      latitude5 = 22.5;
      String msg = String(longitude5)+";"+String(latitude5);
      Serial1.print(msg);
      Serial.println();
      Serial.print("longitude = ");
      Serial.print(longitude5 );
      Serial.print("| latitude = ");
      Serial.print(latitude5 );
      Serial.println();
    }


         float longitude6 , latitude6 ;
  if (distance6 > 3 && distance6 < 30) {
      Serial.println();
      Serial.print("Something was detected1");
      longitude6 = (distance6 - 15)*6;
      latitude6 = 67.5;
      String msg = String(longitude6)+";"+String(latitude6);
      Serial1.print(msg);
      Serial.println();
      Serial.print("longitude = ");
      Serial.print(longitude6 );
      Serial.print("| latitude = ");
      Serial.print(latitude6 );
      Serial.println();
    }


         float longitude7 , latitude7 ;
  if (distance7 > 3 && distance7 < 30) {
      Serial.println();
      Serial.print("Something was detected1");
      longitude7 = (distance7 - 15)*6;
      latitude7 = 112.5;
      String msg = String(longitude7)+";"+String(latitude7);
      Serial1.print(msg);
      Serial.println();
      Serial.print("longitude = ");
      Serial.print(longitude7 );
      Serial.print("| latitude = ");
      Serial.print(latitude7 );
      Serial.println();
    }


         float longitude8 , latitude8 ;
  if (distance8 > 3 && distance8 < 30) {
      Serial.println();
      Serial.print("Something was detected1");
      longitude8 = (distance8 - 15)*6;
      latitude8 = 157.5;
      String msg = String(longitude8)+";"+String(latitude8);
      Serial1.print(msg);
      Serial.println();
      Serial.print("longitude = ");
      Serial.print(longitude8 );
      Serial.print("| latitude = ");
      Serial.print(latitude8 );
      Serial.println();
    }

  //IR SENSORS

    int ir1=digitalRead(Irsen1);
    int ir2=digitalRead(Irsen2);
    int ir3=digitalRead(Irsen3);
    int ir4=digitalRead(Irsen4);
    int ir5=digitalRead(Irsen5);
    int ir6=digitalRead(Irsen6);
    int ir7=digitalRead(Irsen7);
    int ir8=digitalRead(Irsen8);
    int ir9=digitalRead(Irsen9);

    if (ir1 == 0 ){  
      String msg = "Button:1";
      Serial1.print(msg);
      }
    if (ir2 == 0 ){  
      String msg = "Button:2";
      Serial1.print(msg);
      }
    if (ir3 == 0 ){  
      String msg = "Button:3";
      Serial1.print(msg);
      }
    if (ir4 == 0 ){  
      String msg = "Button:4";
      Serial1.print(msg);
      }
    if (ir5 == 0 ){  
      String msg = "Button:5";
      Serial1.print(msg);
      }
    if (ir6 == 0 ){  
      String msg = "Button:6";
      Serial1.print(msg);
      }
    if (ir7 == 0 ){  
      String msg = "Button:7";
      Serial1.print(msg);
      }
    if (ir8 == 0 ){  
      String msg = "Button:8";
      Serial1.print(msg);
      }
    if (ir9 == 0 ){  
      String msg = "Button:9";
      Serial1.print(msg);
      }
    else{
      }
    Serial.println(ir1);
    

    delay(750);


  }
