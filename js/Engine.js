// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time

let musicOn = new Audio(
  'sound/nyancat.mp3'
);
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.

    this.root = theRoot;

    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);

    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];

    this.hearts = [];

    this.score = 0;

    this.lives = 3;

    this.livesDisplay = new Text(this.root, 505, 20);
    this.livesDisplay.update(`LIVES: ${this.lives}`);

    this.scoreDisplay = new Text(this.root, 20, 20);
    this.scoreDisplay.update(`SCORE: ${this.score}`);
    // We add the background image to the game
    addBackground(this.root);

  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {

    musicOn.play();

    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    this.hearts.forEach((heart) => {
        heart.update(timeDiff);
    });

    this.hearts = this.hearts.filter((heart) => {
      return !heart.destroyed;
    })

    while (this.hearts.length < MAX_HEARTS) {

      const spot = nextHeartSpot(this.hearts);
      
      setInterval(this.hearts.push(new Heart(this.root, spot)), 10000);
    }

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

      this.score = this.score + 1;
      this.scoreDisplay.update(`SCORE: ${this.score}`);

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)

    if (this.isPlayerDead()) {
      this.lives -= 1;
      if (this.lives >= 2) {
        window.alert(`OUCH! That really hurt. You have ${this.lives} more lives. Keep going!`)
      } else if (this.lives === 1) {
        window.alert(`OUCH! That really hurt. You have ${this.lives} more life. Don't give up!`)
      }
        this.livesDisplay.update(`LIVES: ${this.lives}`) 
        if (this.lives <= 0) {
          window.alert(`Game over! You're final score is ${this.score}`);
          musicOn.pause();
          const restart = new Button(this.root, 160, 250)
          restart.update('RESTART');
          restart.reload();
          return;
        }       
    }

    if (this.gainLife()) {
      if (this.lives < 3) {
        this.lives += 1;
        this.livesDisplay.update(`LIVES: ${this.lives}`)
      } else if (this.lives >= 3) {
        this.lives += 0;
        this.livesDisplay.update(`LIVES: ${this.lives}`)
      }
      console.log(this.lives)
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);

  };
  
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let isDead = false;
      this.enemies.forEach((enemy) => {
    if ((enemy.x === this.player.x) && (enemy.y + ENEMY_HEIGHT) >= (GAME_HEIGHT - PLAYER_HEIGHT - 10)) {
      isDead = true;
    }
  })
  return isDead;
}

  gainLife = () => {
    let lifeGained = false;
    this.hearts.forEach((heart) => {
      if ((heart.x === this.player.x) && (heart.y + HEART_HEIGHT) >= (GAME_HEIGHT - PLAYER_HEIGHT - 10)) {
        heart.destroyed = true;
        this.root.removeChild(heart.domElement)
        lifeGained = true;
      }
    })
    return lifeGained;
  }

  reload = () => {
    window.location.reload();
  }
}

// getPoints = () => {
//   let isDead = false;
//   let points = 0;
//   if (this.y > GAME_HEIGHT) {
//     points += 1;
//     console.log(points)
//   }
// }

// FOR LOOP METHOD
// isPlayerDead = () => {
//   console.log(this.enemies[0])
//     for (let i = 0; i < this.enemies.length; i++) {
//       let enemyY = this.enemies[i].y + ENEMY_HEIGHT;
//       if (this.enemies[i].x === this.player.x && enemyY >= (GAME_HEIGHT - PLAYER_HEIGHT - 10)) {
//         return true;
//       } else {
//         return false;
//       }
//     }
// }