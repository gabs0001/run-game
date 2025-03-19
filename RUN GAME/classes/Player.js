class Player {
    constructor() {
        this.speed = 18
        this.position = {
            x: 100, 
            y: 100
        }
        this.velocity = {
            x: 0, 
            y: 0
        }
        this.width = 66
        this.height = 150
        this.image = createImage('./img/spriteStandRight.png',10620,400)
        this.frames = 0
        this.sprites = {
            stand: {
                right: createImage('./img/spriteStandRight.png',10620, 400),
                left: createImage('./img/spriteStandLeft.png',10620, 400),
                cropWidth: 177,
                width: 66
            },
            run: {
                right: createImage('./img/spriteRunRight.png',10230, 400),
                left: createImage('./img/spriteRunLeft.png', 10230, 400),
                cropWidth: 341,
                width: 127.875
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw() {
        // c.fillStyle = '#f00'
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)

        c.drawImage(
                this.currentSprite,
                this.currentCropWidth * this.frames, //posiniX de corte
                0, //posiniY de corte
                this.currentCropWidth, //largura do corte
                400, //altura do corte
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
    }

    update() {
        this.frames++
        
        //controle de frame atual, se tiver chegado no ultimo volta para o primeiro
        if(this.frames > 59 && (this.currentSprite === this.sprites.stand.right) || 
        (this.currentSprite === this.sprites.stand.left)) this.frames = 0
        else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right) ||
        (this.currentSprite === this.sprites.run.left)) this.frames = 0
        
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //controle do limite inferior da tela
        if(this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity
        // else this.velocity.y = 0
    }
}