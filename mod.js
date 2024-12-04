
let runningKey = "";

const moveTRex = key => {
  const tRex = Runner.instance_.tRex;
  const moveDistance = 5;

  if (key === "ArrowLeft") {
    tRex.xPos = Math.max(0, tRex.xPos - moveDistance);
  } else if (key === "ArrowRight") {
    const maxX = Runner.instance_.canvas.width - tRex.config.WIDTH;
    tRex.xPos = Math.min(maxX, tRex.xPos + moveDistance);
  }
}

window.addEventListener("keydown", event => {
  if (event.key === " " || event.key === "ArrowUp") return;
  runningKey = event.key;
});

window.addEventListener("keyup", event => {
  if (event.key === " " || event.key === "ArrowUp") return;
  runningKey = "";
})

const originalUpdate = Runner.instance_.update;
Runner.instance_.update = function () {
  moveTRex(runningKey);
  originalUpdate.call(this);
}

const originalUpdateJump = Runner.instance_.tRex.updateJump;
Runner.instance_.tRex.updateJump = function (deltaTime) {
  const curXPos = this.xPos;
  originalUpdateJump.call(this, deltaTime);
  this.xPos = curXPos;
}

// リセット時の処理(今後更に変更を行う予定)
Runner.instance_.tRex.reset = function () {
  // this.xPos = this.xInitialPos;
  this.yPos = this.groundYPos;
  this.jumpVelocity = 0;
  this.jumping = false;
  this.ducking = false;
  this.update(0, Trex.status.RUNNING);
  this.midair = false;
  this.speedDrop = false;
  this.jumpCount = 0;

  runningKey = "";
}

Runner.instance_.loadSounds();
Runner.instance_.gameOver();
