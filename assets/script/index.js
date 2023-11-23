'use strict';
import { Shape } from './Shape.js';

document.addEventListener('DOMContentLoaded', function () {
    const shapeSelect = document.querySelector('.shape-select');
    const colorSelect = document.querySelector('.color-select');
    const createButton = document.querySelector('button');
    const alertMessage = document.querySelector('.alert-message');

    const sparkle = new Audio('./assets/audio/sparkle.mp3');

    function createSparkleSound() {
        return new Audio('./assets/audio/sparkle.mp3')
    }

    function createSpawnSound() {
        return new Audio('./assets/audio/spawn-sound.mp3');
    }

    function addShapeToGrid(shape) {
        const grid = document.querySelector('.shape-grid');

        if (grid.children.length < 36) {
            const shapeDiv = document.createElement('div');
            shapeDiv.className = `${shape.name} fade-in`;
            shapeDiv.style.backgroundColor = shape.color;

            shapeDiv.addEventListener('click', () => {
                alert(shape.getInfo());
            });

            const rowCount = Math.floor(grid.children.length / 6);
            const colCount = grid.children.length % 6;

            shapeDiv.style.gridRow = `${6 - rowCount}`;
            shapeDiv.style.gridColumn = `${colCount + 1}`;

            grid.appendChild(shapeDiv);

            return false; // Grid is not full
        } else {
            alertMessage.innerText = 'The grid is full!';
            return true; // Grid is full
        }
    }

    createButton.addEventListener('click', function () {
        const selectedShape = shapeSelect.value;
        const selectedColor = colorSelect.value;

        if (selectedShape && selectedColor) {
            const newShape = new Shape(selectedShape, selectedColor);
            const gridFull = addShapeToGrid(newShape);

            if (!gridFull) {
                const spawnSound = createSpawnSound();
                spawnSound.play();
            } else {
                const sparkleSound = createSparkleSound();

                alertMessage.classList.remove('pulsing');
                alertMessage.offsetWidth;
                alertMessage.classList.add('pulsing');
                sparkleSound.play();
            }
        }
    });
});
