//main function to init JSGE main components (Playground and Canvas)
function initEngine() {
	if (!CANVAS) CANVAS = new Canvas("canvas")
	if (!PLAYGROUND) PLAYGROUND = new Playground(CANVAS)
	if (!INPUT_MANAGER) INPUT_MANAGER = PLAYGROUND.inputManager
	
	class DebugInfo {}
	if (!DEBUG) DEBUG = new DebugInfo()
	let debugSymbol = Symbol("Debug")
	PLAYGROUND.clearAllObjects()
	PLAYGROUND.createCustomGroup(debugSymbol)
	PLAYGROUND.putObject(DEBUG, debugSymbol)
}

//function for containsAndIntersects page
function containsAndIntersects() {
	initEngine()
	DEBUG.update = ()=>{}
	//CUTLINE
	class MyShape {
		constructor(shape, controlled) {
			this.shape = shape
			this.controlled = controlled
		}
		update(canvas) {
			if (this.controlled) {
				this.shape.setCenterX(INPUT_MANAGER.mouseX)
				this.shape.setCenterY(INPUT_MANAGER.mouseY)
				if (this.targetCircle) {
					if (this.shape.intersects(this.targetCircle.shape)) {
						if (this.shape.contains(this.targetCircle.shape)) {
							if (this.shape.fillcolor != "green") this.shape.setFillcolor("green")
						}
						else {
							if (this.shape.fillcolor != "yellow") this.shape.setFillcolor("yellow")
						}
					}
					else {
						if (this.shape.fillcolor != "blue") this.shape.setFillcolor("blue")
					}
				}
			}
		}
		render(canvas) {
			this.shape.render(canvas)
		}
	}
	let staticCircle = new MyShape(new Circle(100, 100, 100, "red"))
	let controlledCircle = new MyShape(new Circle(500, 130, 80, "blue"), true)
	controlledCircle.targetCircle = staticCircle
	PLAYGROUND.putObject(staticCircle)
	PLAYGROUND.putObject(controlledCircle)
}

//function for creatingShapes page
function creatingShapes() {
	initEngine()
	DEBUG.update = ()=>{}
	//CUTLINE
	//Circles
	for (let radius = 100; radius >= 10; radius -= 10) {
		let x = 200 - radius
		let y = 200 - radius
		let randomHexColor = "#"+((1<<24)*Math.random()|0).toString(16)
		let lineWidth = 5
		PLAYGROUND.putObject(new Circle(x, y, radius, randomHexColor, lineWidth))
	}
	
	//Rectangles
	for (let size = 10; size <= 100; size += 10) {
		let x = 400 + size
		let y = 100 + size
		let width = 250 - size*2
		let height = width
		let randomHexColor = "#"+((1<<24)*Math.random()|0).toString(16)
		let lineWidth = 5
		PLAYGROUND.putObject(new Rectangle(x, y, width, height, randomHexColor, lineWidth))
	}
}

//function for mouseControl page
function mouseControl() {
	initEngine()
	let mouseInfoX = document.querySelector("#mouseInfoX")
	let mouseInfoY = document.querySelector("#mouseInfoY")
	let mouseButtons = document.querySelector("#mouseButtons")
	DEBUG.update = ()=>{
		mouseInfoX.innerHTML = INPUT_MANAGER.mouseX
		mouseInfoY.innerHTML = INPUT_MANAGER.mouseY
		mouseButtons.innerHTML = `${Object.keys(INPUT_MANAGER.downMButtons).filter((o)=>INPUT_MANAGER.downMButtons[o])}`
	}
	//CUTLINE
	class MyShape {
		constructor(shape) {
			this.shape = shape
		}
		update(canvas) {
			this.shape.setCenterX(INPUT_MANAGER.mouseX)
			this.shape.setCenterY(INPUT_MANAGER.mouseY)
			let lmbIsClicked = INPUT_MANAGER.mouseDown("Left")
			if (lmbIsClicked) {
				let randomHexColor = "#"+((1<<24)*Math.random()|0).toString(16)
				this.shape.setFillcolor(randomHexColor)
			}
		}
		render(canvas) {
			this.shape.render(canvas)
		}
	}
	let controlledCircle = new MyShape(new Circle(100, 100, 80, "blue", 5))
	PLAYGROUND.putObject(controlledCircle)
}

//function for keyboardControl page
function keyboardControl() {
	initEngine()
	DEBUG.update = ()=>{
		keyboardKeys.innerHTML = `${Object.keys(INPUT_MANAGER.downKeys).filter((o)=>INPUT_MANAGER.downKeys[o])}`
	}
	//CUTLINE
	class MyShape {
		constructor(shape) {
			this.shape = shape
		}
		update(canvas) {
			let upIsDown = INPUT_MANAGER.keyDown("ArrowUp") || INPUT_MANAGER.keyDown("KeyW")
			let rightIsDown = INPUT_MANAGER.keyDown("ArrowRight") || INPUT_MANAGER.keyDown("KeyD")
			let downIsDown = INPUT_MANAGER.keyDown("ArrowDown") || INPUT_MANAGER.keyDown("KeyS")
			let leftIsDown = INPUT_MANAGER.keyDown("ArrowLeft") || INPUT_MANAGER.keyDown("KeyA")
			let spaceIsDown = INPUT_MANAGER.keyPressed("Space")
			
			if (upIsDown) this.shape.y -= 2
			if (downIsDown) this.shape.y += 2
			if (rightIsDown) this.shape.x += 2
			if (leftIsDown) this.shape.x -= 2
			if (spaceIsDown) {
				this.shape.setFillcolor("#"+((1<<24)*Math.random()|0).toString(16))
			}
		}
		render(canvas) {
			this.shape.render(canvas)
		}
	}
	let controlledCircle = new MyShape(new Circle(100, 100, 150, "blue", 5))
	PLAYGROUND.putObject(controlledCircle)
}

//function for timerCounter page
function timerCounter() {
	initEngine()
	DEBUG.update = ()=>{}
	//CUTLINE
	let counter = 0
	let text = new Text(75, 50, counter, "bold 250px Arial", "black", 10, "crimson")
	
	let callback = ()=>text.setText(++counter)
	let timer = new Timer(100, callback).startTimer()
	PLAYGROUND.putObject(text)
	PLAYGROUND.putObject(timer)
}

//function for timerEvent page
function timerEvent() {
	initEngine()
	DEBUG.update = ()=>{}
	//CUTLINE
	class MyShape {
		constructor(shape, timeMs) {
			this.shape = shape
			this.timer = new Timer(timeMs, ()=>this.setRandomFillColor()).startTimer()
		}
		setRandomFillColor() {
			this.shape.setFillcolor("#"+((1<<24)*Math.random()|0).toString(16))
		}
		update(canvas) {
			this.timer.update(canvas)
		}
		render(canvas) {
			this.shape.render(canvas)
		}
	}
	PLAYGROUND.putObject(new MyShape(new Circle(100, 50, 120, "blue", 5), 1000))
	PLAYGROUND.putObject(new MyShape(new Circle(400, 50, 120, "blue", 5), 600))
	PLAYGROUND.putObject(new MyShape(new Circle(250, 300, 120, "blue", 5), 200))
}

//function for text page
function text() {
	initEngine()
	DEBUG.update = ()=>{}
	//CUTLINE
	let font = "bold 5em Verdana"
	let fillStyle = "black"
	let lineWidth = 8
	let lineColor = "rgba(0, 0, 0, 0.15)"
	let text = "TEXT EXAMPLE"
	for (let y = 0; y < 600; y += 100)
		PLAYGROUND.putObject(new Text(75, y, text, font, fillStyle, lineWidth, lineColor))
}

//function for picture page
function picture() {
	initEngine()
	DEBUG.update = ()=>{}
	//CUTLINE
	let pic = new Picture(0, 0, 'img/picture.jpg')
	pic.width = 1280
	pic.height = 720
	pic.stretch = true
	PLAYGROUND.putObject(pic)
}

//function for sprite page
function sprite() {
	initEngine()
	DEBUG.update = ()=>{}
	PLAYGROUND.putObject(new Rectangle(470, 257, 10, 20, "crimson", 3))
	PLAYGROUND.putObject(new Text(300, 350, "Sprite #1", "bold 24px Arial", "crimson", 1, "black"))
	PLAYGROUND.putObject(new Text(630, 350, "Sprite #2", "bold 24px Arial", "crimson", 1, "black"))
	//CUTLINE
	//Sprite 1
	let src = "img/sheet.png"
	let startPartX, startPartY = 0
	let partWidth = 21450/55
	let partHeight = 498/2
	let partCount = 55
	let offsetX = partWidth
	let offsetY = 0
	let animSpeed = 60
	let mirror = false
	let pic = new SpriteAnimation(100, 100, src, 0, 0, partWidth, partHeight, partCount, offsetX, offsetY, animSpeed, mirror)
	PLAYGROUND.putObject(pic)
	
	
	//Sprite 2
	src = "img/sprite.png"
	startPartX, startPartY = 0
	partWidth = 190
	partHeight = 207 
	partCount = 20493/207
	offsetX = 0
	offsetY = partHeight
	animSpeed = 60
	mirror = true
	pic = new SpriteAnimation(550, 130, src, 0, 0, partWidth, partHeight, partCount, offsetX, offsetY, animSpeed, mirror)
	PLAYGROUND.putObject(pic)
}

//function for sorting page
function sorting() {
	initEngine()
	DEBUG.update = ()=>{}
	//CUTLINE
	class MyShape {
		constructor(shape, controlled) {
			this.shape = shape
			this.controlled = controlled
			this.sortObjectsByY()
		}
		update(canvas) {
			if (this.controlled) {
				if (INPUT_MANAGER.mouseX) this.shape.setCenterX(INPUT_MANAGER.mouseX)
				if (INPUT_MANAGER.mouseY && this.shape.getCenterY() != INPUT_MANAGER.mouseY) {
					this.shape.setCenterY(INPUT_MANAGER.mouseY)
					this.sortObjectsByY()
				}
			}
		}
		render(canvas) {
			this.shape.render(canvas)
		}
		sortObjectsByY() {
			PLAYGROUND.requestSortObjectsOnNextUpdate((a,b)=>(a.shape.getCenterY()>b.shape.getCenterY())?1:-1)
		}
	}
	let controlledCircle = new MyShape(new Circle(100, 100, 50, "blue", 5), true)
	PLAYGROUND.putObject(controlledCircle)
	
	//Create random circles
	for (let i = 5; i < 500; i += 5) {
		let randomHexColor = "#"+((1<<24)*Math.random()|0).toString(16)
		let radius = 35
		let randomX = Math.trunc(radius*2 + Math.random()*(CANVAS.width-radius*4))
		PLAYGROUND.putObject(new MyShape(new Circle(randomX, i, radius, randomHexColor, 5)))
	}
}

//function for spaceShooter page
function spaceShooter() {
	initEngine()
	let fpsInfo = document.querySelector("#fpsInfo")
	DEBUG.update = ()=>{
		fpsInfo.innerHTML = PLAYGROUND.FPS
	}
	let audioEnabled = true
	document.querySelector("#playSounds").addEventListener("change", ()=>audioEnabled=document.querySelector("#playSounds").checked)
	showHint("PAGE CONTAINS AUDIO", "crimson")
	//CUTLINE
	class Ship {
		constructor(picture, shape) {
			this.shape = shape
			this.picture = picture
			this.speed = 5
			this.hp = 15
			this.hpInfo = new Text(0, 0, this.hp, "bold 20px Arial", "green", 0)
			this.shootColdown = 500
			this.shootSound = new Audio("sounds/shoot.wav")
			this.deathSound = new Audio("sounds/explosion.wav")
			this.readyToShoot = true
			this.reloadTimer = new Timer(this.shootColdown, ()=>this.reload())
			PLAYGROUND.putObject(this.reloadTimer)
			PLAYGROUND.putObject(this.hpInfo)
		}
		render(canvas) {
			this.picture.render(canvas)
			this.hpInfo.render(canvas)
		}
		update(canvas) {
			if (INPUT_MANAGER.downKeys["ArrowUp"] || INPUT_MANAGER.downKeys["KeyW"]) this.moveUp()
			if (INPUT_MANAGER.downKeys["ArrowRight"] || INPUT_MANAGER.downKeys["KeyD"]) this.moveRight()
			if (INPUT_MANAGER.downKeys["ArrowDown"] || INPUT_MANAGER.downKeys["KeyS"]) this.moveDown()
			if (INPUT_MANAGER.downKeys["ArrowLeft"] || INPUT_MANAGER.downKeys["KeyA"]) this.moveLeft()
			if (INPUT_MANAGER.downKeys["Space"] && this.readyToShoot) {
				if (audioEnabled) this.shootSound.play()
				this.readyToShoot = false
				this.shoot()
				this.reloadTimer.startTimer()
			}
			this.hpInfo.setText(this.hp)
			this.hpInfo.setCenterX(this.shape.getCenterX())
			this.hpInfo.y = this.shape.y + this.picture.height
		}
		shoot() {
			let spawnX = this.shape.x + this.shape.width/2
			let spawnY = this.shape.y + this.shape.height/2
			let bullet = new Bullet(new Picture(spawnX, spawnY, 'img/laserBlue06.png'), new Rectangle(spawnX, spawnY, 7, 19), EnemyShip, true, 10)
			PLAYGROUND.putObject(bullet)
		}
		reload() {
			this.readyToShoot = true
		}
		moveUp() {
			this.shape.y -= this.speed
			this.picture.y -= this.speed
		}
		moveDown() {
			this.shape.y += this.speed
			this.picture.y += this.speed
		}
		moveLeft() {
			this.shape.x -= this.speed
			this.picture.x -= this.speed
		}
		moveRight() {
			this.shape.x += this.speed
			this.picture.x += this.speed
		}
		kill() {
			if (audioEnabled) this.deathSound.play()
			PLAYGROUND.removeObject(this)
			PLAYGROUND.removeObject(this.hpInfo)
			PLAYGROUND.removeObject(this.shape)
			PLAYGROUND.removeObject(this.reloadTimer)
		}
		damage(val) {
			this.hp -= val
			if (this.hp <= 0) this.kill()
		}
	}

	class EnemyShip {
		constructor(picture, shape) {
			this.shape = shape
			this.picture = picture
			this.shootInterval = 1500 + Math.random()*500
			this.shootTimer = new Timer(this.shootInterval, ()=>this.shoot()).startTimer()
			this.deathSound = new Audio("sounds/invaderkilled.wav")
			this.hp = 5
			this.hpInfo = new Text(0, 0, this.hp, "bold 14px Arial")
			this.hpInfo.fillcolor = "crimson"
			PLAYGROUND.putObject(this.hpInfo)
			PLAYGROUND.putObject(this.shootTimer)
		}
		render(canvas) {
			this.picture.render(canvas)
			this.hpInfo.render(canvas)
		}
		update(canvas) {
			this.hpInfo.setText("o".repeat(this.hp))
			this.hpInfo.setCenterX(this.shape.getCenterX())
			this.hpInfo.y = this.shape.y + this.picture.height
		}
		shoot() {
			let spawnX = this.shape.x + this.shape.width/2
			let spawnY = this.shape.y + this.shape.height/2
			let bullet = new Bullet(new Picture(spawnX, spawnY, 'img/laserRed06.png'), new Rectangle(spawnX, spawnY, 7, 19, "green"), Ship)
			PLAYGROUND.putObject(bullet)
		}
		kill() {
			if (audioEnabled) this.deathSound.play()
			PLAYGROUND.removeObject(this)
			PLAYGROUND.removeObject(this.hpInfo)
			PLAYGROUND.removeObject(this.shape)
			PLAYGROUND.removeObject(this.shootTimer)
		}
		damage(val) {
			this.hp -= val
			if (this.hp <= 0) this.kill()
		}
	}

	class Bullet {
		constructor(picture, shape, targetClass, directionTop=false, speed=5) {
			this.shape = shape
			this.picture = picture
			this.speed = speed
			this.targetClass = targetClass
			this.directionTop = directionTop
		}
		render(canvas) {
			this.picture.render(canvas)
		}
		update(canvas) {
			let o = PLAYGROUND.objects.filter((obj) => {
				return obj instanceof this.targetClass && this != (obj) && this.shape.intersects(obj.shape || obj)
			})
			if (o.length) {
				this.kill()
				o[0].damage(1)
			}
			this.shape.y += (this.directionTop)?-this.speed:+this.speed
			this.picture.y += (this.directionTop)?-this.speed:+this.speed
			if (this.isOutsideCanvas(canvas)) this.kill()
		}
		isOutsideCanvas(canvas) {
			return (this.shape.x > canvas.width) || (this.shape.y > canvas.height) || (this.shape.x < 0) || (this.shape.y < 0)
		}
		kill() {
			PLAYGROUND.removeObject(this)
			PLAYGROUND.removeObject(this.shape)
		}
	}
	
	//Create background
	let bg = new Picture(0, 0, 'img/darkPurple.png')
	bg.width = CANVAS.width
	bg.height = CANVAS.height
	bg.stretch = true
	PLAYGROUND.putObject(bg)

	//Create players ship
	let ship = new Ship(new Picture(300, 500, 'img/playerShip1_blue.png'), new Rectangle(300, 500, 50, 30))
	PLAYGROUND.putObject(ship)
	
	//Create enemies ships
	for (let x = 40; x < CANVAS.width-50; x += 75) {
		let enemyShip = new EnemyShip(new Picture(x, 0, 'img/playerShip1_red.png'), new Rectangle(x, 0, 50, 30))
		PLAYGROUND.putObject(enemyShip)
	}
	for (let x = 75; x < CANVAS.width-75; x += 75) {
		let enemyShip = new EnemyShip(new Picture(x, 75, 'img/playerShip1_red.png'), new Rectangle(x, 75, 50, 30))
		PLAYGROUND.putObject(enemyShip)
	}
}

//location page and function to execute
const PAGES_AND_FUNCTIONS = {
	"intersectsContains.html" : containsAndIntersects,
	"creatingShapes.html" : creatingShapes,
	"mouseControl.html" : mouseControl,
	"keyboardControl.html" : keyboardControl,
	"timerCounter.html" : timerCounter,
	"timerEvent.html" : timerEvent,
	"text.html" : text,
	"picture.html" : picture,
	"sprite.html" : sprite,
	"sorting.html" : sorting,
	"spaceShooter.html" : spaceShooter,
}

let CANVAS, PLAYGROUND, INPUT_MANAGER, DEBUG

//parse location, find page title and add code example on the page
let page = /\/([\.A-Za-z]+)$/gi.exec(location.href)[1]
let initFunction = null
if (PAGES_AND_FUNCTIONS.hasOwnProperty(page)) {
	initFunction = PAGES_AND_FUNCTIONS[page]
	initFunction()
	
	//add code example on the page
	let functionAsString = initFunction.toString().replace(/\t/g, " ").replace(/^ /gm, "")
	let startIndex = functionAsString.indexOf('//CUTLINE') + '//CUTLINE'.length
	let lastIndex = functionAsString.lastIndexOf('}')
	document.querySelector("code.js").innerHTML += functionAsString.substr(startIndex, lastIndex-startIndex) + "\n"
}
document.querySelector(".infoPanelClose").onclick=(e)=>document.querySelector(".infoPanel").classList.toggle("opened")