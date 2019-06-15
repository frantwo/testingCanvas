class Fondo {
    constructor(backgX, backgY, backgWidth, backHeight) {
        this.canvasDOMEl = undefined;
        /** @type CanvasRenderingContext2D */
        this.ctx = undefined;
        this.backgX = backgX;
        this.backgY = backgY;
        this.backgWidth = backgWidth;
        this.backHeight = backHeight;
        this.backgroundPos = 0;
        //OJOOO!!! PREGUNTAR A LOS PROFES!!!! NO ENTIENDO PQ ASÍ FUNCIONA Y SI LO CAMBIO A '../images..' NO FUNCIONA
        this.pathImage = "./images/fondo.png";
        this.Backgrounds = [{
                imagen: new Image(),
                x: 0,
                y: 0,
                counterX: 0
            },
            {
                imagen: new Image(),
                x: 0,
                y: 0,
                counterX: 0
            }
        ];
        this.intervalID = undefined;
    }

    init() {
        /** @type HTMLCanvasElement */
        this.canvasDOMEl = document.getElementById("myCanvas");
        /** @type CanvasRenderingContext2D */
        this.ctx = this.canvasDOMEl.getContext("2d");
        this.canvasDOMEl.width = this.backgWidth;
        this.canvasDOMEl.height = this.backHeight;
        this.backgroundPos = this.backgX + this.backgWidth;
        for (let cont = 0; cont < 2; cont++) {
            if (cont == 1) {
                this.Backgrounds[cont].x = this.backgWidth;
            }
            this.Backgrounds[cont].imagen.onload = () => {
                this.ctx.drawImage(
                    this.Backgrounds[cont].imagen,
                    this.Backgrounds[cont].x,
                    this.Backgrounds[cont].y,
                    this.backgWidth,
                    this.backHeight
                );
            };
            this.Backgrounds[cont].imagen.src = this.pathImage;
        }
    }

    drawBackground = () => {
        let img = new Image();
        img.src = this.pathImage;
        // debugger;
        this.Backgrounds[0].x = this.Backgrounds[0].x - 1;
        this.Backgrounds[1].x = this.Backgrounds[1].x - 1;

        if (this.backgroundPos > 0) {
            if (this.Backgrounds[0].x < this.Backgrounds[1].x) {
                this.backgroundPos = this.Backgrounds[0].x + this.backgWidth;
            } else {
                this.backgroundPos = this.Backgrounds[1].x + this.backgWidth;
            }
        } else {
            if (this.Backgrounds[0].x < this.Backgrounds[1].x) {
                this.backgroundPos = this.Backgrounds[1].x + this.backgWidth;
                this.Backgrounds[0].x = this.Backgrounds[1].x + this.backgWidth;
            } else {
                this.backgroundPos = this.Backgrounds[0].x + this.backgWidth;
                this.Backgrounds[1].x = this.Backgrounds[0].x + this.backgWidth;
            }
        }

        this.ctx.drawImage(
            img,
            this.Backgrounds[0].x,
            this.Backgrounds[0].y,
            this.backgWidth,
            this.backHeight
        );
        this.ctx.drawImage(
            img,
            this.Backgrounds[1].x,
            this.Backgrounds[1].y,
            this.backgWidth,
            this.backHeight
        );
    };

    runAnimation() {
        this.intervalID = setInterval(() => {
            this.ctx.clearRect(0, 0, this.backgWidth, this.backHeight);
            this.drawBackground();
        }, 5);
    }
}