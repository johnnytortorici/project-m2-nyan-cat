// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Disk {
    // The constructor takes 2 arguments.
    // - theRoot refers to the parent DOM element.
    //   We need a way to add the DOM element we create in this constructor to our DOM.
    // - enemySpot is the position of the enemy (either 0, 1, 2, 3 or 4)
    // Since the constructor takes 2 parameters
    // and the 2 parameters provide important information, we must supply 2 arguments to "new" every time we
    // create an instance of this class.
    constructor() {
      // When we create an Enemy instance, for example, new Enemy(someRoot, 3)
      // A new object is created and the constructor of the Enemy class is called. The context (the \`this\` keyword) is going
      // to be the new object. In these lines of code we see how to add 2 properties to this object: spot, root and gameHeight.
      // We do this because we want to access this data in the other methods of the class.
      // - We need the root DOM element so that we can remove the enemy when it is no longer needed. This will be done at a later time.
      // - We need to keep track of the enemy spot so that we don't place two enemies in the same spot.
        this.root = gameEngine.root;

        let player = gameEngine.player;

        this.destroyed = false;

        this.x = player.x + 35;
        this.y = GAME_HEIGHT - 35;

        // this.destroyed = false;

        // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the enemy image
        // to the user. When the enemy is no longer needed, we will use a reference to this DOM node to remove it from the game. This
        // is why we create a property that refers to it.
        this.domElement = document.createElement('img');
        this.domElement.id = 'disk';

        // We give it a src attribute to specify which image to display.
        this.domElement.src = './images/disk.png';
        // We modify the CSS style of the DOM node.
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
        this.domElement.style.zIndex = 5;

        // Show that the user can actually see the img DOM node, we append it to the root DOM node.
        this.root.appendChild(this.domElement);
    }

    // NEW - Allow player to shoot at enemy
    shoot(disk) {
        // Move disk smoothly up the screen
        let moveDisk = setInterval(function () {
            if (disk.destroyed === false) {
                disk.y -= 10 ;
                disk.domElement.style.top = `${disk.y}px`;
                gameEngine.isEnemyHit(disk.x, disk.y);
            }

            // Once disk arrives at top, remove disk element from DOM
            if (disk.y < 0) {
                gameEngine.root.removeChild(disk.domElement);
                clearInterval(moveDisk);
                disk.destroyed = true;
            }
        }, 10);
    }

    // On enemy collision, destroy disk
    destroyDisk() {
        // Remove DOM element
        this.root.removeChild(gameEngine.player.disk.domElement);
        // Remove disk object from Player
        gameEngine.player.disk = undefined;
        // Set disk as destroyed
        this.destroyed = true;
    }
}
