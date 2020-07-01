// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = (enemies) => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const addBackground = (root) => {
  // We create a new img DOM node.
  const bg = document.createElement('div'); // const bg = document.createElement('img');

  // We set its src attribute and the height and width CSS attributes
  // bg.src = GAME_BG;
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;
  bg.className = 'grid';

 // We add it to the root DOM node
  root.append(bg);

  // Create grid
  const GRID_ROWS = 5;
  const GRID_COLS = 5;
  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLS; j++) {
      let box = document.createElement('div');
      box.className = 'box';
      bg.appendChild(box);
    }
  }

  // We don't want the enemies to go beyond the lower edge of the image
  // so we place a white div to hide the enemies after they reach the bottom.
  // To see what it does, you can comment out all the remaining lines in the function to see the effect.
  const whiteBox = document.createElement('div');

  // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = 'absolute';
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = '#202639';
  root.append(whiteBox);
};

// NEW - Display player lives
showPlayerLives = (player) => {
  let header = document.querySelector('#header');
  let playerLives = document.createElement('div');
  playerLives.className = 'lives';
  playerLives.id = 'lives';
  playerLives.innerHTML = `Lives: ${player.lives}`;
  header.appendChild(playerLives);
};

// NEW - Display player score
showPlayerScore = (player) => {
  let header = document.querySelector('#header');
  let playerScore = document.createElement('div');
  playerScore.className = 'score';
  playerScore.id = 'score';
  playerScore.innerHTML = `${player.score}`;
  header.appendChild(playerScore);
};

// ----- GAME MESSAGES CONTROL -----
createGameMsg = (root) => {

  let gameMsg = document.createElement('div');
  gameMsg.className = 'game-msg';
  gameMsg.id = 'game-msg';

  root.appendChild(gameMsg);
}

// Start gameLoop
startGame = () => {
  // Start game loop
  gameEngine.gameLoop();
  // Start keydown listener
  keydownStart();
  // Start game music
  let gameMusic = new Audio('audio/music.wav');
  gameMusic.play();
  gameMusic.loop = true;
  gameMusic.volume = 0.1;

  let gameMsgDiv = document.querySelector('#game-msg');
  gameMsgDiv.style.display = 'none';
}

// NEW - Update game message on death
updateGameMsg = (gameMsgDiv, msg) => {
  // Pause keydown functions during message
  keydownStop();
  gameMsgDiv.innerHTML = msg;
  gameMsgDiv.style.display = 'flex';
}

// NEW - Continue game after losing a life
continueGame = (lives) => {
  // Grab game message element
  let gameMsgDiv = document.querySelector('#game-msg');
  gameMsgDiv.style.display = 'none';

  // Update player lives
  let playerLives = document.querySelector('#lives');
  playerLives.innerHTML = `Lives: ${lives}`;

  // Restart game loop
  gameEngine.gameLoop();

  // Re-enable keydown functions
  keydownStart();
}

// NEW - Start and stop keydown listener
keydownStart = () => {
  document.addEventListener('keydown', keydownHandler);
}
keydownStop = () => {
  document.removeEventListener('keydown', keydownHandler);
}
