class Platform {
    constructor({ x, y, image }){
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        // c.fillStyle='blue'
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)

        c.drawImage(this.image,this.position.x,this.position.y)
    }
}