//

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d') // modalidad del juego 2D

const gravity = 0.5 

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
}


class Sprite{
  constructor({position, imagenSrc}){
    this.position = position
    this.imagen = new Image()
    this.imagen.src = imagenSrc
  }

  draw() {
    if (!this.imagen) return
    context.drawImage(this.imagen, this.position.x, this.position.y)
  }

  update(){
    this.draw()
  }
}

class Player{     //Personaje 
  constructor(position){
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    }
    this.height = 100

  }

  draw(){
  context.fillStyle = 'red' // Personaje
  context.fillRect(this.position.x, this.position.y, 100, this.height)
  }

  update(){
    this.draw()

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if (this.position.y + this.height + this.velocity.y < canvas.height) 
      this.velocity.y += gravity
    else this.velocity.y = 0
  }
}

const player = new Player({
  x: 0,
  y: 0,
})

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false, 
  },
}

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
    imagenSrc: './img/pared.png',
})

const backgroundImageHeight = 432

function animation() {

  //Gravedad del personaje 
  window.requestAnimationFrame(animation) // llamar la funcion varias veces
  
  context.fillStyle = 'white' // ambiente
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.save()
  context.scale(4, 4)
  context.translate(0, -background.imagen.height + scaledCanvas.height)
  background.update()
  context.restore()

  player.update()


  player.velocity.x = 0
  if (keys.d.pressed) player.velocity.x = 5 // velocidad del personaje x
    else if (keys.a.pressed) player.velocity.x = -5 // velocidad del personaje y
}

animation()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
    case 'ArrowRight':
      keys.d.pressed = true
      break
    case 'a':
    case 'ArrowLeft':
      keys.a.pressed = true
      break
    case 'w':
    case 'ArrowUp':
      player.velocity.y = -15 // saltar 
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
    case 'ArrowRight':
      keys.d.pressed = false
      break
    case 'a':
    case 'ArrowLeft':
      keys.a.pressed = false
      break
  }
})