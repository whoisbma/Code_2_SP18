function Bryan() {
  this.speed = 1;
  this.angle = 0;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 10;
  this.height = 200;
  this.pos = createVector(random(200, width-200-this.width), random(300, height-300-this.height));

  this.update = function() {
    this.angle = (this.angle + 0.05) % TWO_PI;
    this.vel.y = sin(this.angle) * this.speed;
    this.pos.add(this.vel);
  }

  this.display = function() {
    fill(color(map(sin(this.angle), -1, 1, 0, 255), map(cos(this.angle), -1, 1, 0, 255), 1));
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    if (other.speed > 1) {
      other.speed -= 0.5;
    }

    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;

    if (this.height > 0) {
      this.pos.y += 20;
      this.height -= 40;      
    } else {
      this.height = 0;
    }

    if (!hitColliderSFX.isPlaying()) {
      hitColliderSFX.play();
    }
  }
}

function Yizhou() {
  var balls;

  this.pos = createVector(width/2, height/2);
  this.speed = 7;
  this.angle = random(TWO_PI);
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.size = 15;
  
  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {
    fill(255,30);
    rectMode(CENTER);
    rect(width/2,height/2,100,200);
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    for (var i = 0; i < 600,this.pos.x=400 && this.pos.y>150&&this.pos.y<35; i++) {
      balls[i].update();
      balls[i].display();
    }
  }

  this.collided = function(other) {
    balls = new Ball();
  }
}


function Ellie() {
  this.pos =  createVector(100, 100);
  this.speed = 1;
  this.angle = 0;
  this.vel =  createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.width = 100;
  this.height = 80;
  this.c = color(200, 90, 10);

  this.update = function() {
    this.pos.add(this.vel);

  }

  this.display = function() {
    // draw something here
    fill(this.c);
    rect(this.pos.x, this.pos.y, this.width, this.height);

  }

  this.collided = function(other) {
    // do something cool here! do something to yourself,
    // and also something to the other thing?
    other.size = 3;
    other.vel.x *= 1;
    this.c = color(200, 5, 100);
  }
}

function Yanwen() {
  this.pos = createVector(100, 50);
  this.speed = 3;
  this.angle = random(TWO_PI);
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.size1 = 8;
  this.size2 = 20;
  this.side = 3;
  var point = this.side;
  var scaleStar = 1;

  this.star = function(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  this.update = function() {
    if (this.pos.x < 10) {
      this.pos = createVector(width/2, height/2);
      point = 3;
      scaleStar = 1;
    } else if (this.pos.x > width - 10) {
      this.pos = createVector(width/2, height/2);
      point = 3;
      scaleStar = 1;
    }

    if (this.pos.y < margin + 20 || 
        this.pos.y > height - margin - 20) {
      this.vel.y *= -1;
      point ++;
      scaleStar += 0.2;

      if (scaleStar > 4){
        scaleStar = 1;
      }
    }
    this.pos.add(this.vel);

    if (point >= 18) {
      point = 3;
    }
  }

  this.display = function() {
    // draw something here
    noStroke();
    fill(255, 215 - random(100), 0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(frameCount / 100.0);
    scale(scaleStar);
    this.star(0, 0, this.size1, this.size2, point); 
    pop();
  }

  this.collided = function(p) {
    // do something cool here! do something to yourself,
    // and also something to the other thing?
    if (this.pos.x + 20 > p.pos.x && this.pos.x + 20 < p.pos.x + p.width ||
      this.pos.x - 20 > p.pos.x && this.pos.x - 20 < p.pos.x + p.width){
      if (this.pos.y > p.pos.y && this.pos.y < p.pos.y + p.height) {
        this.vel.x *= -1;
          point ++;
          scaleStar += 0.2;
      }
    }
  }
}

function MaddyRed() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
    //this.pos.add(this.vel);

    if(this.pos.y < margin || 
        this.pos.y > height - margin - this.height){
    this.angle=100;
  print("hit");

    }
  }

  this.display = function() {
    fill(255,0,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    r = 255;
    g=0;
    b=0;
    // if (this.height < 500) {
    //   this.width += 10;
    //   this.height += 10;      
    // } 
    
  }
}

function MaddyGreen() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
    //this.pos.add(this.vel);

    if(this.pos.y < margin || 
        this.pos.y > height - margin - this.height){
    this.angle=100;
  print("hit");

    }
  }

  this.display = function() {
    fill(0,255,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    g = 255;
    r =0;
    b=0;
    
  }
}

function MaddyBlue() {
  this.pos = createVector(random(200,600),random(100,400));

  this.speed = 3;
  this.angle = -100;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;

  this.update = function() {
    //this.pos.add(this.vel);

  //   if(this.pos.y < margin || 
  //       this.pos.y > height - margin - this.height){
  //   this.angle=100;
  // print("hit");

  //   }
  }

  this.display = function() {
    fill(0,0,255);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    
    other.angle = random(TWO_PI);
    other.vel.x = cos(other.angle) * other.speed;
    other.vel.y = sin(other.angle) * other.speed;
    g = 0;
    r =0;
    b=255;
    
  }
}

function AlyssaForrest() {
  this.pos = createVector(width/2, height/2);
  this.speed = 0;
  this.angle = 0;
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.height = 0;
  this.width = 0;

  this.update = function() {
    this.pos.add(this.vel);
    if (this.height < height-40){
    this.height = this.height + 0.5;
    this.width = this.width + 0.5;
    } else {
    this.height = this.height;
    this.width = this.width;
    }
  }

  this.display = function() {
    fill(255,0,0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    other.vel.x *= -1;
    this.width = this.width - 5;
    this.height = this.height - 5;
  }
}


function Sarah() {
  this.speed = 2;
  this.angle = PI;
  this.vel = createVector(0, sin(this.angle) * this.speed);
  this.width = 50;
  this.height = 50;
  this.pos = createVector(random(margin, width - margin), random(margin, height - margin));
  this.counter = 0;
  this.amplitude = 10;
  this. r = 0;

  this.update = function() {
    this.angle = this.angle + 1;
    this.pos.add(this.vel);
    this.counter ++;
          //check borders
          if(this.pos.x > (width - (margin + this.width))) {
            this.vel.x = -2;
          }
          if(this.pos.x < margin) {
            this.vel.x = 2;
          }

          if(this.pos.y > (height - (margin + this.height))) {
            this.vel.y = -2;
          }
          if(this.pos.y < margin) {
            this.vel.y = 2;
          }

          if (this.counter % 40 == 0) {
      //set x vel
      this.r = random(1);
      if (this.r > .5) {
        this.vel.x = 2;
      } else {
        this.vel.x = -2;
      }
      //set y vel
      this.r = random(1);
      if (this.r > .5) {
        this.vel.y = 2;
      } else {
        this.vel.y = -2;
      }
    }
  }

  this.display = function() {

    fill(map(this.pos.y, 0, height, 0, 255), 150, map(this.pos.x, 0, width, 0, 255), 200);
   rect(this.pos.x, this.pos.y, this.width, this.height);



 }

 this.collided = function(other) {
  if (other.speed > 1) {
    other.speed -= 0.5;
  }
  other.angle = random(TWO_PI);
  other.vel.x = cos(other.angle) * other.speed;
  other.vel.y = sin(other.angle) * other.speed;
     //teleport
     other.pos.y = random(height);
     if(other.pos.x > width/2) {
      other.pos.x = random(width/2);
    } else{
     other.pos.x = random(width/2, width);
   }

   

   if (!hitColliderSFX.isPlaying()) {
    hitColliderSFX.play();
  }
}
}



function Jackie() {
  this.pos = createVector(0, 0);
  this.width = 25;
  this.height = 25;
  this.time = 0;

  this.update = function() {
    this.time += .03;
    this.pos.x = (200*sin(this.time)) + (width/2)
    this.pos.y = (200*cos(this.time)) + (height/2)
  }

  this.display = function(){
    rect(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
  }
  
  this.collided = function(other){
    if (other.speed > 1) {
      other.speed += random(-2, 0);
    }
    colliders.push(new Jackie());

    other.vel.x = -other.vel.x;
    other.pos.x += other.vel.x;
    other.vel.y = -other.vel.y;
    other.pos.y += other.vel.y;
  }
}


function Cat() {
  this.pos = new createVector(0, 0);
  this.speed = 0;
  this.angle = 70;
  this.vel = new createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.width = 0;
  this.height = 0;
  this.c = color(255, 0, 0);


  this.update = function() {
    this.pos.add(this.angle);
  }

  this.display = function() {
    rect(pos, pos, this.width, this.height);
    fill(this.c);
  }

  this.collided = function(other) {
    this.width+10;
    this.height+20;
    fill(random(0, 255), random(0, 255), random(0, 255));
  }
}

