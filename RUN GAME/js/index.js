const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576 

const gravity = 4

//criando as imagens das plataformas
let platformImage = createImage('./img/platform.png',580,125)
let platformSmallTallImage = createImage('./img/platformSmallTall.png',291,227)

let player = new Player()

let platforms = []
let genericObjects = []

let lastKey

const keys = {
    right: { pressed: false },
    left: { pressed: false }
}

let scrollOffset = 0

//reinicia o jogo
const init = () => {
    platformImage = createImage('./img/platform.png', 580, 125)
    platformSmallTallImage = createImage('./img/platformSmallTall.png', 291, 227)
    player = new Player()

    platforms = [
        new Platform({
            x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: -1,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width-3,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 2 + 100,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 3 + 300,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 4 + 300 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 5 + 700 - 2,
            y: 470,
            image: platformImage
        })
    ]

    genericObjects = [
        new GenericObject({
            x:-1,
            y:-1,
            image: createImage('./img/background.png',11643,732)
        }),
        new GenericObject({
            x:-1,
            y:-1,
            image: createImage('./img/hills.png',7545,592)
        })
    ]

    scrollOffset = 0
}

const animate = () => {
    requestAnimationFrame(animate)
    
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    genericObjects.forEach((genericObject) => genericObject.draw())

    platforms.forEach((platform) => platform.draw())

    player.update()

    //limites de esquerda e direita
    if(keys.right.pressed && player.position.x < 400) player.velocity.x = player.speed
    else if((keys.left.pressed && player.position.x > 100) || 
            (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) 
            player.velocity.x = - player.speed
    else {
        player.velocity.x = 0
        
        //tecla 'd' é pressionada após atingir o limite da direita, a plataforma se move para a esquerda
        if(keys.right.pressed){
            scrollOffset += player.speed
            
            //desloca a plataforma e os objetos de fundo para a esquerda
            platforms.forEach((platform) => platform.position.x -= player.speed)
            genericObjects.forEach((genericObject) => genericObject.position.x -= player.speed * 0.66)
        }
        //tecla 'a' é pressionada após atingir o limite da esquerda, a plataforma se move para a direita
        else if(keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed

            //desloca a plataforma e os objetos de fundo para a direita
            platforms.forEach((platform) => platform.position.x += player.speed)
            genericObjects.forEach((genericObject) => genericObject.position.x += player.speed * 0.66)
        }
    }

    //colisão do player com a parte de cima da plataforma
    //a velocidade no eixo y só fica zerada quando o player estiver sobre a plataforma
    platforms.forEach((platform) => {
        if( player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0
        }
    })

    //troca de sprite
    if(keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } 
    else if(keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } 
    else if(!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    } 
    else if(!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }

    //determina a vitória baseado no limite de deslocamento da tela
    if(scrollOffset > platformImage.width * 5 + 300 - 2) console.log('you win')

    //se o jogador perder (cair da plataforma), o jogo reinicia
    if(player.position.y > canvas.height) init()
}

init()
animate()