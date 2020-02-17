import * as PIXI from 'pixi.js';
import {shapeSide, randNumber} from "./constant";

export default class Shapes extends PIXI.Container {
    constructor(data, xCurrent, yCurrent, id, color) {
        super();
        this.data = data;
        this.x = xCurrent;
        this.y = yCurrent;
        this.color = color;
        this.id = id;
        this.shapeArea = 0;
        this.addChild(this.selected(this.color));
    }

    moving(position) {
        this.x += position.x;
        this.y += position.y;
    }

    selected = (color) => {
        let shapes = [
            this.threeSides(color), this.fourSides(color),
            this.fiveSides(color), this.sixSides(color),
            this.circle(color), this.ellipse(color),
            this.random(color)
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    };

    threeSides = (color) => {
        let threeSides = new PIXI.Graphics();
        threeSides.beginFill(color);
        shapeSide(threeSides, 3, 50);
        threeSides.endFill();
        this.shapeArea = Math.floor(1 / 2 * threeSides.width * threeSides.height);
        return threeSides;
    };

    fourSides = (color) => {
        let fourSides = new PIXI.Graphics();
        fourSides.beginFill(color);
        shapeSide(fourSides, 4, 50);
        fourSides.endFill();
        this.shapeArea = Math.pow(fourSides.width, 2);
        return fourSides;
    };

    fiveSides = (color) => {
        let fiveSides = new PIXI.Graphics();
        fiveSides.beginFill(color);
        shapeSide(fiveSides, 5, 50);
        fiveSides.endFill();
        this.shapeArea = (5 * 58) / (58 / Math.tan(180 / 5));
        return fiveSides;
    };

    sixSides = (color) => {
        let sixSides = new PIXI.Graphics();
        let height = 50 * Math.sqrt(3);
        sixSides.beginFill(color);
        shapeSide(sixSides, 6, 50);
        sixSides.endFill();
        this.shapeArea = Math.floor((Math.pow(3, 3) * 50 / 2 * height / 2) / 2);
        return sixSides;
    };

    circle = (color) => {
        let circle = new PIXI.Graphics();
        circle.beginFill(color);
        circle.drawCircle(0, 0, 35);
        circle.endFill();
        this.shapeArea = Math.floor(Math.PI * Math.pow(circle.width / 2, 2));
        return circle;
    };

    ellipse = (color) => {
        let ellipse = new PIXI.Graphics();
        ellipse.beginFill(color);
        ellipse.drawEllipse(0, 0, 50, 25);
        ellipse.endFill();
        this.shapeArea = Math.floor(ellipse.width / 2 * ellipse.height / 2 * Math.PI);
        return ellipse;
    };

    random = (color) => {
        let random = new PIXI.Graphics();
        random.beginFill(color);
        random.drawStar(20, 20, 20, 30);
        random.endFill();
        this.shapeArea = Math.floor(Math.PI * Math.pow(random.width / 2, 2));
        return random;
    };
}