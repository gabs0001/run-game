addEventListener('keydown', ({ keyCode }) => {
    switch(keyCode) {
      //esquerda (a)
      case 65:
          keys.left.pressed = true
          lastKey = 'left'
          break
      //baixo (s)
      case 83:
          break
      //direita (d)
      case 68:
          keys.right.pressed = true
          lastKey = 'right'
          break
      //cima (w)
      case 87:
          player.velocity.y -= 35
          break
    }
})

addEventListener('keyup',({ keyCode }) => {
    switch(keyCode) {
        //esquerda (a)
        case 65:
            keys.left.pressed = false
            break
        //baixo (s)
        case 83:
            break
        //direita (d)
        case 68:
            keys.right.pressed = false
            // player.currentSprite = player.sprites.stand.right
            // player.currentCropWidth = player.sprites.stand.cropWidth
            // player.width = player.sprites.stand.width
            break
        //cima (w)
        case 87:
            break
    }
})