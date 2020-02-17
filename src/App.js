import * as PIXI from 'pixi.js'
import Game from "./Game";
import View from "./mvc/View";
import Model from "./mvc/Model";
import Controller from "./mvc/Controller";

let app = new PIXI.Application({width: 500, height: 500});

let view = new View(app);
let model = new Model();
let controller = new Controller(view, model);
let game = new Game(app, view, controller);

game.isProcessing();

let el2 = document.getElementById("canvas");
el2.insertAdjacentElement("afterEnd", app.view);