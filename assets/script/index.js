'use strict';
import { Shape } from './Shape.js';

document.addEventListener('DOMContentLoaded', function () {
    const shapeSelect = document.querySelector('.shape-select');
    const colorSelect = document.querySelector('.color-select');
    const createButton = document.querySelector('button');
    const alertMessage = document.querySelector('.alert-message');

    createButton.addEventListener('click', function () {
        const selectedShape = shapeSelect.value;
        const selectedColor = colorSelect.value;

        if (selectedShape && selectedColor) {
            const newShape = new Shape(selectedShape, selectedColor);
            addShapeToGrid(newShape);
        }
    });

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

        } else {
            alertMessage.style.animation = 'fadeIn 0.25s ease-in-out forwards';
            alertMessage.innerText = 'The grid is full!';
        }
    }
});