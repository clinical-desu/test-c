import * as PIXI from 'pixi.js';

export default class View {
    constructor(app) {
        this.app = app;

        this.currentNum = document.getElementById("num-current");
        this.surfaceArea = document.getElementById("surface-area");
        this.gravityElement = document.getElementById("gravity-value");
        this.perSec = document.getElementById("num-shapes-per-sec");

        this.plusGravity = document.getElementById("plus-g");
        this.minusGravity = document.getElementById("minus-g");
        this.plusNumber = document.getElementById("plus-n");
        this.minusNumber = document.getElementById("minus-n");

        this.infoUpdate = this.infoUpdate.bind(this);
        this.drawArea();
    }

    drawArea = () => {
        let area = new PIXI.Graphics();
        area.lineStyle(2, 0xFF0000, 1);
        area.beginFill(0xFFFFFF);
        area.drawRect(0, 0, 500, 500);
        area.endFill();

        this.areaB = area;
        this.areaB.interactive = true;
        this.app.stage.addChild(this.areaB);
    };

    bind(event, handler) {
        switch (event) {
            case 'ADD_SHAPE': {
                this.areaB.click = (eC) => handler(eC.data.global);
                break;
            }
            case 'GRAVITY_PLUS': {
                this.plusGravity.addEventListener('click',() => handler(+1));
                break;
            }
            case 'GRAVITY_MINUS': {
                this.minusGravity.addEventListener('click',() => handler(-1));
                break;
            }
            case 'NUM_PLUS': {
                this.plusNumber.addEventListener('click',() => handler(+1));
                break;
            }
            case 'NUM_MINUS': {
                this.minusNumber.addEventListener('click',() => handler(-1));
                break;
            }
            default: return;
        }
    }

    addSprite = (shape) => this.app.stage.addChild(shape);

    removeSprite(shape) {
        this.app.stage.removeChild(shape);
        shape.click = null;
        shape.destroy();
    }

    infoUpdate = (currentShapes, occupiedArea, gravityValue, shapesPer) => {
        this.currentNum.innerHTML = currentShapes;
        this.surfaceArea.innerHTML = `${occupiedArea} px^2`;
        this.gravityElement.innerHTML = gravityValue;
        this.perSec.innerHTML = shapesPer;
    };
}