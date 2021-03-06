AFRAME.registerComponent('shoot', {
    schema: {
        rate: {
            type: 'number',
            default: 0.05,
        },
        bullet: {
            type: 'selector',
        }
    },
    init: function () {
        const bullet = this.data.bullet;
        const scene = document.querySelector('a-scene');
        this.el.addEventListener('click', e => {
            const targetPosition = e.detail.intersection.point;
            const cameraPosition = this.el.getAttribute('position');
            const distance = Math.abs(targetPosition.z - cameraPosition.z) + 2;
            const rate = this.data.rate;
            const time = distance / rate;
            const animationString = `
                property: position;
                from: ${cameraPosition.x} ${cameraPosition.y} ${cameraPosition.z};
                to: ${targetPosition.x} ${targetPosition.y} ${targetPosition.z};
                dur: ${time};
                easing: linear;
  		    `;
            const clone = bullet.cloneNode();
            clone.setAttribute('animation', animationString);
            const cameraRotation = this.el.getAttribute('rotation')
            const rotationDelta = bullet.getAttribute('rotation')
            clone.setAttribute('rotation', `0 ${cameraRotation.y + rotationDelta.y} ${cameraRotation.x}`);
            clone.addEventListener('animationcomplete', () => clone.remove());
            scene.append(clone);
        });
    },
});
