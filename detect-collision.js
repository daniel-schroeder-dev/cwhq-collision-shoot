var scoreElement;
var score = 0;

AFRAME.registerComponent('detect-collision', {
    schema: {},
    init: detectCollision,
});


function detectCollision() {
    scoreElement = document.querySelector("#score");
    this.el.addEventListener("hitstart", collisionListener);
}


function collisionListener(event) {
    scoreElement.setAttribute("value", ++score);
    event.target.remove();
}
