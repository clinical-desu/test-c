import Shapes from "../Shapes";

export default class Model {
    constructor() {
        this.gravity = 1;
        this.shapesEachSec = 1;
        this.shapes = [];

        this.removeShape = this.removeShape.bind(this);
        this.addShape = this.addShape.bind(this);
    }

    randColor = () => {
        let colors = [0x000000, 0x008000, 0x00FF00, 0x800000, 0xFF0000, 0x804000, 0xFF8000, 0x808000,
            0xFFFF00, 0x000080, 0x0000FF, 0x800080, 0xFF00FF, 0x004080, 0x0080FF, 0x008080, 0x00FFFF];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    addShape(data, i) {
        let check = data.id === undefined ? i : data.id;
        const newShape = new Shapes(data, data.x, data.y, check, this.randColor());
        this.shapes.push(newShape);
        return newShape;
    }

    removeShape(remove, callback) {
        const shapeIndex = this.shapes.findIndex(shape => shape.id === remove.id);
        callback(this.shapes[shapeIndex]);
        this.shapes.splice(shapeIndex, 1);
    }

    removeFinishedShapes(appSize, callback) {
        this.shapes
            .filter(shape => shape.x >= appSize.view.width || shape.y >= appSize.view.height)
            .forEach((shape) => {
                this.removeShape(shape, callback);
            });
    }

    moveShapes() {
        this.shapes.forEach(shape => {
            shape.moving({x: 0, y: this.gravity});
        });
    }

    get coveredArea() {
        return Math.ceil(this.shapes.reduce((prev, curr) => prev + curr.shapeArea, 0));
    }

    get numberOfShapes() {
        return this.shapes.filter(e => e.y <= 502 && e.y + e.height > 0).length;
    }
}