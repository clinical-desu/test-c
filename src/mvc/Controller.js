export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.onAddShape = this.onAddShape.bind(this);
        this.onRemoveShape = this.onRemoveShape.bind(this);
        this.gravityPlus = this.gravityPlus.bind(this);
        this.gravityMinus = this.gravityMinus.bind(this);
        this.numPlus = this.numPlus.bind(this);
        this.numMinus = this.numMinus.bind(this);
        this.tick = this.tick.bind(this);
        this.addListeners();
    }

    addListeners() {
        this.view.bind('ADD_SHAPE', this.onAddShape);
        this.view.bind('GRAVITY_PLUS', this.gravityPlus);
        this.view.bind('GRAVITY_MINUS', this.gravityMinus);
        this.view.bind('NUM_PLUS', this.numPlus);
        this.view.bind('NUM_MINUS', this.numMinus);
    }

    onAddShape(data) {
        const newShape = this.model.addShape(data, new Date().getTime());
        newShape.interactive = true;
        newShape.click = () => {
            this.model.removeShape(newShape, this.onRemoveShape);
        };
        this.view.addSprite(newShape);
    }

    onRemoveShape(shape) {
        this.view.removeSprite(shape);
    }

    gravityPlus(value) {
        if(this.model.gravity <= 4) this.model.gravity += value;
    }

    gravityMinus(value) {
        if(this.model.gravity > 0) this.model.gravity += value;
    }

    numPlus(value) {
        if(this.model.shapesEachSec <= 4) this.model.shapesEachSec += value;
    }

    numMinus(value) {
        if(this.model.shapesEachSec > 0) this.model.shapesEachSec += value;
    }

    tick(appSize, generate) {
        if (generate) {
            this.shapesGenerate(appSize, this.model.shapesEachSec);
            this.model.removeFinishedShapes(appSize, this.onRemoveShape);
        }
        this.model.moveShapes();
        this.view.infoUpdate(this.model.numberOfShapes, this.model.coveredArea, this.model.gravity, this.model.shapesEachSec);
    }

    shapesGenerate(appSize, amount) {
        for (let i = 0; i < amount; i++) {
            this.onAddShape({
                app: this.view.app,
                id: new Date().getTime() + i,
                x: Math.floor(Math.random() * appSize.view.width),
                y: 0,
            });
        }
    }
}
