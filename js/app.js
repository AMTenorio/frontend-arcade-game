// Enemy class with location//
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

//Sets random speed for enemy bugs on canvas and off//
Enemy.prototype.update = function(dt) {
    if (this.x < 800) {
        this.x = this.x + (this.move * dt);
    } else {
        this.x = -10;
        this.move = Math.floor(Math.random() * (300 - 80)) + 110;
    }
};

// Draw bugs on canvas.//
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Princess = function(x, y) {
    this.x = 200;
    this.y = 0;
    this.sprite = "images/char-princess-girl-boat.png";
};

//Princess Movement
Princess.prototype.update = function(dt) {
    if (this.x < 800) {
        this.x = this.x + 1;
    } else {
        this.x = -1;
    }
};

//Draw princess on canvas.//
Princess.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class with image location. //
// Updated the engine.js to use image//
var Player = function(x, y) {
    this.sprite = "images/char-boy.png";
    this.x = 300;
    this.y = 420;
};

//Draw player on canvas.//
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Heart = function(x, y) {
    this.sprite = "images/Heart.png";
    this.x = x;
    this.y = 550;
    this.heartCount = 0;
};

//Draw heart on canvas//
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Rock = function(x, y) {
    this.sprite = "images/Rock.png";
    this.x = x;
    this.y = 530;
    this.rockCount = 0;
};

//draw rock on cavas//
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check to see if collision conditions occur. Calculate distance between images.//
//Reset player to original coordinates and add rock collection points when collision with bugs occurs. //
//Reset player to original coordinates and add heart collection points when collision with princess occurs.//
Player.prototype.collision = function collision() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
            this.reset();
            rock.rockCount++;

        }
    }

    for (var i = 0; i < princess.length; i++) {
        if (this.x < princess[i].x + 50 &&
            this.x + 50 > princess[i].x &&
            this.y < princess[i].y + 50 &&
            this.y + 50 > princess[i].y) {
            this.reset();
            heart.heartCount++;
        }
    }
};

//update player prototype and invoke function to check for collision//
Player.prototype.update = function() {
    this.collision();
    this.water();
};

//update player once player reaches the water//
Player.prototype.water = function water() {
    if (this.y < 1) {
        this.sprite = "images/char-boy-water.png";
    } else {
        this.sprite = "images/char-boy.png";
    }
};
//update heart collection//
Heart.prototype.heartCollect = function() {

    if (heart.heartCount == 1) {
        this.x = 0;
    } else if (heart.heartCount == 2) {
        this.x = 100;
    } else if (heart.heartCount == 3) {
        this.x = 200;
    }

};

 //display game messsage " You won!"//
Heart.prototype.message = function() {
    if (this.x == 200) {
        var Play = confirm("You Won! Do you want to play again?");
        if (Play === true) {
            location.reload();
        } else {
            close();
        }
    }
};

Heart.prototype.update = function() {
    this.heartCollect();
    this.message();
   
};

//update rock collection//
Rock.prototype.rockCollect = function() {
    if (rock.rockCount == 1) {
        this.x = 600;
    } else if (rock.rockCount == 2) {
        this.x = 500;
    } else if (rock.rockCount == 3) {
        this.x = 400;

    }

};

//display game message "You lost"//
Rock.prototype.message = function() {
    if (this.x == 400) {
        var Play = confirm("You Lost! Do you want to play again?");
        if (Play === true) {
            location.reload();
        } else {
            close();
        }
    }
};

Rock.prototype.update = function() {
    this.rockCollect();
    this.message();
};


//function for keyboard input and setting the canvas boundaries//
Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            this.x = this.x - 100;
            break;
        case "right":
            this.x = this.x + 100;
            break;
        case "up":
            this.y = this.y - 85;
            break;
        case "down":
            this.y = this.y + 85;
    };
    if (this.x < 0) {
        this.x = 0;
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.x + 100 >= 800) {
        this.x = 700 - 100;
    } else if (this.y + 200 >= 600) {
        this.y = 600 - 180;
    }
};
// Instantiate objects and set array for enemy bugs//
var player = new Player();

var heart = new Heart();

var rock = new Rock();

var princess = [];
for (var i = 0; i < 1; i++) {
    princess.push(new Princess(-40, 60 + (83 * i)));
};

var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy(-0, 60 + (85 * i)));
};
//Reset positions for new game after setTimeout on collision.//
Player.prototype.reset = function() {
    this.x = 300;
    this.y = 420;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});