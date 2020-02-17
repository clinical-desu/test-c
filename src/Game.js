export default class Game {
    constructor(app, view, controller) {
        this.app = app;
        this.view = view;
        this.controller = controller;
        this.isProcessing();
    }

    isProcessing = () => {
        let renderCount = 0;
        this.app.ticker.add(() => {
            const interval = this.app.ticker.elapsedMS;
            const generate = renderCount * interval % 1000 < interval;
            this.controller.tick(this.app, generate);
            renderCount++;
        })
    };
}