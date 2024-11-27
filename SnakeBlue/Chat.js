const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let playerWidth = 15;
let playerHeight = 12;
let playerX = (canvas.width - playerWidth) / 2;
let playerY = canvas.height - playerHeight - 10;
let rightPressed = false;
let leftPressed = false;
let bullets = [];
let enemies = [];
let yellowEnemies = [];
let bulletSpeed = 3;
let lastShotTime = 0;
let enemyWidth = 12;
let enemyHeight = 9;
let enemySpeed = 1;
let score = 0;
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
function keyDownHandler(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (e.key === ' ') {
        shootBullet();
    }
}
function keyUpHandler(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}
function shootBullet() {
    const currentTime = Date.now();
    if (currentTime - lastShotTime >= 300) {
        bullets.push({ x: playerX + playerWidth / 2 - 1.5, y: playerY - 6 });
        lastShotTime = currentTime;
    }
}
function drawPlayer() {
    ctx.fillStyle = 'white';
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}
function drawBullets() {
    ctx.fillStyle = 'red';
    for (let bullet of bullets) {
        ctx.fillRect(bullet.x, bullet.y, 3, 5);
    }
}
function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bulletSpeed;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}
function drawEnemies() {
    ctx.fillStyle = 'green';
    for (let enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
    }
}
function drawYellowEnemies() {
    for (let yellowEnemy of yellowEnemies) {
        ctx.fillStyle = yellowEnemy.color;
        ctx.fillRect(yellowEnemy.x, yellowEnemy.y, enemyWidth, enemyHeight);
    }
}
function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemySpeed;
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
        }
    }
}
function updateYellowEnemies() {
    for (let i = yellowEnemies.length - 1; i >= 0; i--) {
        yellowEnemies[i].y += enemySpeed;
        if (yellowEnemies[i].y > canvas.height) {
            yellowEnemies.splice(i, 1);
        }
    }
}
function checkCollisions() {
    for (let bullet of bullets) {
        for (let enemy of enemies) {
            if (bullet.x + 5 > enemy.x && bullet.x < enemy.x + enemyWidth &&
                bullet.y + 10 > enemy.y && bullet.y < enemy.y + enemyHeight) {
                score++;
                bullets.splice(bullets.indexOf(bullet), 1);
                enemies.splice(enemies.indexOf(enemy), 1);
            }
        }
        for (let yellowEnemy of yellowEnemies) {
            if (bullet.x + 5 > yellowEnemy.x && bullet.x < yellowEnemy.x + enemyWidth &&
                bullet.y + 10 > yellowEnemy.y && bullet.y < yellowEnemy.y + enemyHeight) {
                yellowEnemy.hits--;
                bullets.splice(bullets.indexOf(bullet), 1);
                if (yellowEnemy.hits <= 0) {
                    score += 5;
                    yellowEnemies.splice(yellowEnemies.indexOf(yellowEnemy), 1);
                } else {
                    yellowEnemy.color = 'orange';
                }
            }
        }
    }
    for (let enemy of enemies) {
        if (enemy.x + enemyWidth > playerX && enemy.x < playerX + playerWidth &&
            enemy.y + enemyHeight > playerY && enemy.y < playerY + playerHeight) {
            location.reload();
        }
    }
    for (let yellowEnemy of yellowEnemies) {
        if (yellowEnemy.x + enemyWidth > playerX && yellowEnemy.x < playerX + playerWidth &&
            yellowEnemy.y + enemyHeight > playerY && yellowEnemy.y < playerY + playerHeight) {
            location.reload();
        }
    }
}
function drawScore() {
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`${score}`, 3, 3);
}
function checkOverlap(newEnemy, enemyArray) {
    for (let enemy of enemyArray) {
        if (newEnemy.x < enemy.x + enemyWidth &&
            newEnemy.x + enemyWidth > enemy.x &&
            newEnemy.y < enemy.y + enemyHeight &&
            newEnemy.y + enemyHeight > enemy.y) {
            return true;
        }
    }
    return false;
}
function addEnemy() {
    let newEnemy = {x: Math.random() * (canvas.width - enemyWidth), y: -enemyHeight};
    if (!checkOverlap(newEnemy, enemies) && !checkOverlap(newEnemy, yellowEnemies)) {
        enemies.push(newEnemy);
    }
}
function addYellowEnemy() {
    let newYellowEnemy = {x: Math.random() * (canvas.width - enemyWidth), y: -enemyHeight, hits: 2, color: 'yellow'};
    if (!checkOverlap(newYellowEnemy, enemies) && !checkOverlap(newYellowEnemy, yellowEnemies)) {
        yellowEnemies.push(newYellowEnemy);
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    drawYellowEnemies();
    drawScore();
    updateBullets();
    updateEnemies();
    updateYellowEnemies();
    checkCollisions();
    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += 1;
    } else if (leftPressed && playerX > 0) {
        playerX -= 1;
    }
    if (Math.random() < 0.05) {
        addEnemy();
    }
    if (Math.random() < 0.005) {
        addYellowEnemy();
    }
    requestAnimationFrame(draw);
}
draw();