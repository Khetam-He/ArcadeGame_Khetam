// Player score starts with 0
var score = 0;
// player start with 0 stars
cleanStars();
document.getElementById('playerScore').innerHTML = score;

// Enemies object that the player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

};

//this method updates the position of enemys and called each time the anemy moves.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -50;
        //made the speed of the enemy  random .
        this.speed = 100 + Math.floor(Math.random() * 360);
    }

    // If the enemy and the player collide.
    if (player.x < this.x + 50 &&
        player.x + 30 > this.x &&
        player.y < this.y + 30 &&
        player.y + 50 > this.y) {

        score = 0;
        document.getElementById('playerScore').innerHTML = score;
        player.restart();
        cleanStars();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//create the character object.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Is called every time the player position is updated
Player.prototype.update = function() {
    // If the player reaches the water
    if (player.y < 0) {
        score++;
        switch (score) {
            case 1:
                console.log('star1');
                document.getElementById('star1').style.visibility = "visible";
                break;
            case 2:
                console.log('star2');
                document.getElementById('star2').style.visibility = "visible";
                break;
            case 3:
                console.log('star3');
                document.getElementById('star3').style.visibility = "visible";
                break;
            case 4:
                console.log('star4');
                document.getElementById('star4').style.visibility = "visible";
                break;
            case 5:
                console.log('star5');
                document.getElementById('star5').style.visibility = "visible";
                break;

        }
        console.log(score);
        document.getElementById('playerScore').innerHTML = score;
        player.restart();
        if (score >= 5) {
            window.location = "win.html";

        }
    }
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles the arrow keys input from the keyboard.
//add constrains so thet the player can not move out of screen .
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x > 2) {
        this.x -= 100;
    }
    if (keyPress == 'right' && this.x < 370) {
        this.x += 100;
    }
    if (keyPress == 'up' && this.y > 2) {
        this.y -= 50;
        console.log(this.y);

    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 50;
        console.log(this.y);
    }

};

// Is called when the player is reset to the starting point
Player.prototype.restart = function() {
    this.x = 202;
    this.y = 320;
};


// Place all enemy objects in an array called allEnemies
// locationY is an array that contains the Y position of the enemys
var allEnemies = [];
var locationY = [60, 143, 230];

locationY.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
    console.log(JSON.stringify(enemy, null, 4) + 'enemyHere');

});
// Place the player object in a variable called player
var player = new Player(202, 320);



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
//this function hides all the stars whin the game start or restart.
function cleanStars() {
    document.getElementById('star1').style.visibility = "hidden";
    document.getElementById('star2').style.visibility = "hidden";
    document.getElementById('star3').style.visibility = "hidden";
    document.getElementById('star4').style.visibility = "hidden";
    document.getElementById('star5').style.visibility = "hidden";

}