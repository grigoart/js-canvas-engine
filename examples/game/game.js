class Model {
	constructor(shapedObject, spriteSrc, spriteOffsetX, spriteOffsetY, modelPattern=null) {
		this.shapedObject = shapedObject
		this.spriteSrc = spriteSrc
		this.spriteOffsetX = spriteOffsetX
		this.spriteOffsetY = spriteOffsetY
		const defaultAnimSpeed = 100
		this.modelPattern = {
			partWidth : (modelPattern && modelPattern.partWidth)?modelPattern.partWidth:72,
			partHeight : (modelPattern && modelPattern.partHeight)?modelPattern.partHeight:72,
			walkStartY : (modelPattern && modelPattern.walkStartY)?modelPattern.walkStartY:0,
			attackStartY : (modelPattern && modelPattern.attackStartY)?modelPattern.attackStartY:5,
			deathStartY : (modelPattern && modelPattern.walkStartY)?modelPattern.walkStartY:9,
			walkPartsCount : (modelPattern && modelPattern.walkPartsCount)?modelPattern.walkPartsCount:5,
			attackPartsCount : (modelPattern && modelPattern.attackPartsCount)?modelPattern.attackPartsCount:4,
			deathPartsCount : (modelPattern && modelPattern.deathPartsCount)?modelPattern.deathPartsCount:3,
			walkAnimSpeed : (modelPattern && modelPattern.walkAnimSpeed)?modelPattern.walkAnimSpeed:defaultAnimSpeed,
			attackAnimSpeed : (modelPattern && modelPattern.attackAnimSpeed)?modelPattern.attackAnimSpeed:defaultAnimSpeed,
			deathAnimSpeed : (modelPattern && modelPattern.deathAnimSpeed)?modelPattern.deathAnimSpeed:defaultAnimSpeed,
		}
		this.directionWalkAnimations = [
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*0, this.modelPattern.partHeight*this.modelPattern.walkStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.walkPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.walkAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*1, this.modelPattern.partHeight*this.modelPattern.walkStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.walkPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.walkAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*2, this.modelPattern.partHeight*this.modelPattern.walkStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.walkPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.walkAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*3, this.modelPattern.partHeight*this.modelPattern.walkStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.walkPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.walkAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*4, this.modelPattern.partHeight*this.modelPattern.walkStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.walkPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.walkAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*3, this.modelPattern.partHeight*this.modelPattern.walkStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.walkPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.walkAnimSpeed, true),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*2, this.modelPattern.partHeight*this.modelPattern.walkStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.walkPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.walkAnimSpeed, true),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*1, this.modelPattern.partHeight*this.modelPattern.walkStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.walkPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.walkAnimSpeed, true),
		]
		this.directionAttackAnimations = [
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*0, this.modelPattern.partHeight*this.modelPattern.attackStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.attackPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.attackAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*1, this.modelPattern.partHeight*this.modelPattern.attackStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.attackPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.attackAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*2, this.modelPattern.partHeight*this.modelPattern.attackStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.attackPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.attackAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*3, this.modelPattern.partHeight*this.modelPattern.attackStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.attackPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.attackAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*4, this.modelPattern.partHeight*this.modelPattern.attackStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.attackPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.attackAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*3, this.modelPattern.partHeight*this.modelPattern.attackStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.attackPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.attackAnimSpeed, true),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*2, this.modelPattern.partHeight*this.modelPattern.attackStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.attackPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.attackAnimSpeed, true),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*1, this.modelPattern.partHeight*this.modelPattern.attackStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.attackPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.attackAnimSpeed, true),
		]
		this.directionDeathAnimations = [
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*0, this.modelPattern.partHeight*this.modelPattern.deathStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.deathPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.deathAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*1, this.modelPattern.partHeight*this.modelPattern.deathStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.deathPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.deathAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*2, this.modelPattern.partHeight*this.modelPattern.deathStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.deathPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.deathAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*3, this.modelPattern.partHeight*this.modelPattern.deathStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.deathPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.deathAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*4, this.modelPattern.partHeight*this.modelPattern.deathStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.deathPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.deathAnimSpeed),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*3, this.modelPattern.partHeight*this.modelPattern.deathStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.deathPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.deathAnimSpeed, true),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*2, this.modelPattern.partHeight*this.modelPattern.deathStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.deathPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.deathAnimSpeed, true),
			new SpriteAnimation(0, 0, spriteSrc, this.modelPattern.partWidth*1, this.modelPattern.partHeight*this.modelPattern.deathStartY, this.modelPattern.partWidth, this.modelPattern.partHeight, this.modelPattern.deathPartsCount, 0, this.modelPattern.partHeight, this.modelPattern.deathAnimSpeed, true),
		]
		this.directionStandAnimations = [
			new SpriteStatic(0, 0, spriteSrc, this.modelPattern.partWidth*0, 0, this.modelPattern.partWidth, this.modelPattern.partHeight),
			new SpriteStatic(0, 0, spriteSrc, this.modelPattern.partWidth*1, 0, this.modelPattern.partWidth, this.modelPattern.partHeight),
			new SpriteStatic(0, 0, spriteSrc, this.modelPattern.partWidth*2, 0, this.modelPattern.partWidth, this.modelPattern.partHeight),
			new SpriteStatic(0, 0, spriteSrc, this.modelPattern.partWidth*3, 0, this.modelPattern.partWidth, this.modelPattern.partHeight),
			new SpriteStatic(0, 0, spriteSrc, this.modelPattern.partWidth*4, 0, this.modelPattern.partWidth, this.modelPattern.partHeight),
			new SpriteStatic(0, 0, spriteSrc, this.modelPattern.partWidth*3, 0, this.modelPattern.partWidth, this.modelPattern.partHeight, true),
			new SpriteStatic(0, 0, spriteSrc, this.modelPattern.partWidth*2, 0, this.modelPattern.partWidth, this.modelPattern.partHeight, true),
			new SpriteStatic(0, 0, spriteSrc, this.modelPattern.partWidth*1, 0, this.modelPattern.partWidth, this.modelPattern.partHeight, true),
		]
		this.defaultAnimation = this.directionStandAnimations[this.shapedObject.facingDirection]
		this.currentAnimation = this.defaultAnimation
	}
	resetCurrentAnimation() {
		if (this.currentAnimation.resetSequence) this.currentAnimation.resetSequence()
	}
	playAnimation(animation) {
		let animationToSet = null
		if (animation == "Walk") animationToSet = this.directionWalkAnimations[this.shapedObject.facingDirection]
		if (animation == "Stand") animationToSet = this.directionStandAnimations[this.shapedObject.facingDirection]
		if (animation == "Attack") animationToSet = this.directionAttackAnimations[this.shapedObject.facingDirection]
		if (animation == "Death") animationToSet = this.directionDeathAnimations[this.shapedObject.facingDirection]
		if (animationToSet && animationToSet != this.currentAnimation) {
			this.currentAnimation = animationToSet
			this.resetCurrentAnimation()
		}
		return this.currentAnimation
	}
	render(canvas) {
		/*#DEBUG*/ if (drawSprites.checked)
		this.currentAnimation.render(canvas)
	}
	update(canvas) {
		this.currentAnimation.x = this.shapedObject.shape.x + this.spriteOffsetX
		this.currentAnimation.y = this.shapedObject.shape.y + this.spriteOffsetY
	}
}
class Unit {
	constructor(background, x, y, size, loseColors) {
		this.background = background
		this.shape = new Circle(x, y, size, "rgba(0, 255, 0, 0.30)", 1)
		this.loseColors = loseColors
		this.speed = 1
		this.facingDirection = 0
		this.model = null
		this.canWalk = true
		this.canAttack = true
		this.isAlive = true
		this.isKillable = true
	}
	shapeIsOutOfBounds(canvas) {
		return this.shape.x < 0 || this.shape.y < 0 || this.shape.x > canvas.width || this.shape.y > canvas.height
	}
	render(canvas) {
		if (!this.model) throw new TypeError("Unit must have model!")
		/*#DEBUG*/ if (drawShapes.checked)
		this.shape.render(canvas)
		this.model.render(canvas)
	}
	update(canvas) {
		if (!this.model) throw new TypeError("Unit must have model!")
		let upIsDown = INPUT_MANAGER.keyDown("ArrowUp") || INPUT_MANAGER.keyDown("KeyW")
		let rightIsDown = INPUT_MANAGER.keyDown("ArrowRight") || INPUT_MANAGER.keyDown("KeyD")
		let downIsDown = INPUT_MANAGER.keyDown("ArrowDown") || INPUT_MANAGER.keyDown("KeyS")
		let leftIsDown = INPUT_MANAGER.keyDown("ArrowLeft") || INPUT_MANAGER.keyDown("KeyA")
		let spaceIsDown = INPUT_MANAGER.keyDown("Space")
		
		if (this.isAlive) {
			if (this.isKillable && this.loseColors.indexOf(this.getColorUnderUnit(canvas))+1) {
				this.kill(canvas)
				this.model.update(canvas)
				return
			}
			if (this.canWalk) {
				if (upIsDown) {
					this.facingDirection = 0 + (rightIsDown == true) - (leftIsDown == true)
					if (this.facingDirection < 0) this.facingDirection += 8
					this.moveForward()
					this.model.playAnimation("Walk")
				}
				else if (downIsDown) {
					this.facingDirection = 4 + (leftIsDown == true) - (rightIsDown == true)
					this.moveForward()
					this.model.playAnimation("Walk")
				}
				else if (rightIsDown) {
					this.facingDirection = 2 + (downIsDown == true) - (upIsDown == true)
					this.moveForward()
					this.model.playAnimation("Walk")
				}
				else if (leftIsDown) {
					this.facingDirection = 6 + (upIsDown == true) - (downIsDown == true)
					this.moveForward()
					this.model.playAnimation("Walk")
				}
			}
			if (this.canAttack) {
				if (spaceIsDown) {
					this.canWalk = false
					this.model.playAnimation("Attack")
					this.model.currentAnimation.setCallback(()=>{console.info("HIT")})
				}
			}
			if (!spaceIsDown && !upIsDown && !rightIsDown && !downIsDown && !leftIsDown) {
				this.canWalk = true
				this.model.playAnimation("Stand")
			}
		}
		if (this.shapeIsOutOfBounds(canvas)) this.kill()
		this.model.update(canvas)
	}
	refreshRenderingOrder() {
		PLAYGROUND.requestSortObjectsOnNextUpdate((a,b)=>(a.shape&&b.shape)?( (a.shape.getCenterY()>b.shape.getCenterY())?1:( (a.shape.getCenterY()==b.shape.getCenterY())?a.shape.hashCode>b.shape.hashCode:-1 ) ):0)
	}
	moveForward() {
		if (this.facingDirection == 0) this.moveUp()
		else if (this.facingDirection == 1) {this.moveUp(); this.moveRight()}
		else if (this.facingDirection == 2) this.moveRight()
		else if (this.facingDirection == 3) {this.moveRight(); this.moveDown()}
		else if (this.facingDirection == 4) this.moveDown()
		else if (this.facingDirection == 5) {this.moveDown(); this.moveLeft()}
		else if (this.facingDirection == 6) this.moveLeft()
		else if (this.facingDirection == 7) {this.moveLeft(); this.moveUp()}
		if ([0, 1, 3, 4, 5, 7].indexOf(this.facingDirection)+1) this.refreshRenderingOrder()
	}
	moveUp() {
		this.shape.y -= this.speed
	}
	moveLeft() {
		this.shape.x -= this.speed
	}
	moveRight() {
		this.shape.x += this.speed
	}
	moveDown() {
		this.shape.y += this.speed
	}
	kill(canvas) {
		this.isAlive = false
		this.canWalk = false
		this.canAttack = false
		this.model.playAnimation("Death").setCallback(()=>{this.remove(canvas)})
		console.info("DEAD")
	}
	remove(canvas) {
		console.info("REMOVED")
		canvas.playground.removeObject(this)
		this.isAlive = false
	}
	getColorUnderUnit(canvas) {
		return this.background.getHexColor(this.shape.getCenterX(), this.shape.getCenterY())
	}
}
class Missile {
	constructor(target, x, y, size, direction, speed=2, playDeathAnimation=false) {
		this.shape = new Circle(x, y, size, "rgba(0, 0, 0, 0.30)", 1)
		this.target = target
		this.facingDirection = direction
		this.speed = speed
		this.playDeathAnimation = playDeathAnimation
		this.model = null
		this.isAlive = true
		
		this.refreshRenderingOrder()
	}
	render(canvas) {
		if (!this.model) throw new TypeError("Missile must have model!")
		/*#DEBUG*/ if (drawShapes.checked)
		this.shape.render(canvas)
		this.model.render(canvas)
	}
	update(canvas) {
		if (!this.model) throw new TypeError("Missile must have model!")
		if (this.target.isAlive && this.isAlive && this.shape.intersects(this.target.shape)) {
			if (this.target.isKillable) this.target.kill(canvas)
			this.kill(canvas)
			return
		}
		if (this.isAlive && this.shapeIsOutOfBounds(canvas)) {
			this.kill(canvas)
			return
		}
		if (this.isAlive) {
			this.moveForward(canvas)
			this.model.playAnimation("Walk")
		}
		this.model.update(canvas)
	}
	shapeIsOutOfBounds(canvas) {
		return this.shape.x < 0 || this.shape.y < 0 || this.shape.x > canvas.width || this.shape.y > canvas.height
	}
	refreshRenderingOrder() {
		PLAYGROUND.requestSortObjectsOnNextUpdate((a,b)=>(a.shape&&b.shape)?( (a.shape.getCenterY()>b.shape.getCenterY())?1:( (a.shape.getCenterY()==b.shape.getCenterY())?a.shape.hashCode>b.shape.hashCode:-1 ) ):0)
	}
	moveForward(canvas) {
		if (this.facingDirection == 0) this.moveUp()
		else if (this.facingDirection == 1) {this.moveUp(); this.moveRight()}
		else if (this.facingDirection == 2) this.moveRight()
		else if (this.facingDirection == 3) {this.moveRight(); this.moveDown()}
		else if (this.facingDirection == 4) this.moveDown()
		else if (this.facingDirection == 5) {this.moveDown(); this.moveLeft()}
		else if (this.facingDirection == 6) this.moveLeft()
		else if (this.facingDirection == 7) {this.moveLeft(); this.moveUp()}
	}
	moveUp() {
		this.shape.y -= this.speed
	}
	moveLeft() {
		this.shape.x -= this.speed
	}
	moveRight() {
		this.shape.x += this.speed
	}
	moveDown() {
		this.shape.y += this.speed
	}
	kill(canvas) {
		this.isAlive = false
		if (this.playDeathAnimation) {
			this.model.playAnimation("Death").setCallback(()=>{this.remove(canvas)})
		}
		else {
			this.remove(canvas)
		}
		console.info("DEAD Missile")
	}
	remove(canvas) {
		console.info("REMOVED Missile")
		canvas.playground.removeObject(this)
	}
}
class Enemy {
	constructor(unit, x, y, size, missileModelPattern=null) {
		this.unit = unit
		this.shape = new Circle(x, y, size, "rgba(255, 0, 0, 0.30)")
		this.speed = 1
		this.facingDirection = 4
		this.attackCooldown = 1000
		this.model = null
		this.canWalk = true
		this.canAttack = true
		this.isAlive = true
		this.attackTimer = null
		this.missileModelPattern = missileModelPattern
	}
	startAttacking() {
		if (!this.missileModelPattern || !this.missileModelPattern.picSrc) throw new TypeError("Enemy has no src for missile model")
		if (!this.attackTimer) this.attackTimer = new Timer(this.attackCooldown, (canvas)=>this.attack(canvas))
		this.attackTimer.startTimer()
	}
	stopAttacking() {
		if (!this.attackTimer) this.attackTimer.stopTimer()
	}
	attack(canvas) {
		this.model.playAnimation("Attack")
		this.model.currentAnimation.setCallback(()=>{
			let missile = new Missile(this.unit, this.shape.x+5, this.shape.y+5, 4, this.facingDirection)
			missile.model = new Model(missile, this.missileModelPattern.picSrc, (this.missileModelPattern.modelOffsetX)?this.missileModelPattern.modelOffsetX:0, (this.missileModelPattern.modelOffsetY)?this.missileModelPattern.modelOffsetY:0, this.missileModelPattern)
			canvas.playground.putObject(missile)
			this.model.playAnimation("Stand")
			console.info("ENEMY ATTACKED")
		})
	}
	render(canvas) {
		if (!this.model) throw new TypeError("Enemy must have model!")
		/*#DEBUG*/ if (drawShapes.checked)
		this.shape.render(canvas)
		this.model.render(canvas)
	}
	update(canvas) {
		if (!this.model) throw new TypeError("Enemy must have model!")
		if (this.attackTimer) this.attackTimer.update(canvas)
		this.model.update(canvas)
	}
	kill(canvas) {
		console.info("ENEMY DEAD")
		this.isAlive = false
		this.canWalk = false
		this.canAttack = false
		this.model.playAnimation("Death").setCallback(()=>{this.remove(canvas)})
	}
	remove(canvas) {
		console.info("ENEMY REMOVED")
		canvas.playground.removeObject(this)
		this.isAlive = false
	}
}
class EndPoint {
	constructor(unit, x, y) {
		this.unit = unit
		this.shape = new Circle(x, y, 26, "rgba(255, 0, 0, 0.30)")
		this.picture = new Picture(x-8, y-8, "resourses/buildings/circle_of_power.png")
	}
	render(canvas) {
		/*#DEBUG*/ if (drawShapes.checked)
		this.shape.render(canvas)
		/*#DEBUG*/ if (drawSprites.checked)
		this.picture.render(canvas)
	}
	update(canvas) {
		if (this.shape.contains(this.unit.shape)) LevelManager.loadMenu()
	}
}
class DebugInfo {
	constructor(unit) {
		this.unit = unit
		this.PCx = null
		this.PCy = null
		this.FD = null
		this.IA = null
		this.CW = null
		this.CA = null
		this.IK = null
		this.OC = null
		this.FPS = null
	}
	update(canvas) {
		this.unit.isKillable = !noDamage.checked
		let PCx = this.unit.shape.getCenterX()
		let PCy = this.unit.shape.getCenterY()
		let FD = this.unit.facingDirection
		let IA = this.unit.isAlive
		let CW = this.unit.canWalk
		let CA = this.unit.canAttack
		let IK = this.unit.isKillable
		let OC = canvas.playground.objects.length
		let FPS = canvas.playground.FPS
		if (this.PCx != PCx || this.PCy != PCy) {
			playerCoords.innerHTML = `Position: [X: ${PCx} Y: ${PCy}]`
			this.PCx = PCx
			this.PCy = PCy
		}
		if (this.FD != FD) {
			playerDirection.innerHTML = `FD: ${FD}`
			this.FD = FD
		}
		if (this.IA != IA) {
			playerDead.innerHTML = `Dead: ${!IA}`
			this.IA = IA
		}
		if (this.CW != CW) {
			playerCanWalk.innerHTML = `Can walk: ${CW}`
			this.CW = CW
		}
		if (this.CA != CA) {
			playerCanAttack.innerHTML = `Can attack: ${CA}`
			this.CA = CA
		}
		if (this.IK != IK) {
			playerCanAttack.innerHTML = `Is killable: ${IK}`
			this.IK = IK
		}
		if (this.OC != OC) {
			objectCount.innerHTML = `Object count: ${OC}`
			this.OC = OC
		}
		if (this.FPS != FPS) {
			fpsMeter.innerHTML = `FPS: ${FPS}`
			this.FPS = FPS
		}
		fpsMeter.style.color = (canvas.playground.FPS > 50)?"#00CC00":(canvas.playground.FPS > 40)?"#FFFF00":(canvas.playground.FPS > 30)?"#FF4500":"#FF0000"
		keysDown.innerHTML = `Down keys: [${Object.keys(INPUT_MANAGER.downKeys).filter((o)=>INPUT_MANAGER.downKeys[o])}]`
		mBtnsDown.innerHTML = `Mouse down: [${Object.keys(INPUT_MANAGER.downMButtons).filter((o)=>INPUT_MANAGER.downMButtons[o])}]`
		mouseCoords.innerHTML = `Mouse: [X: ${INPUT_MANAGER.mouseX} Y: ${INPUT_MANAGER.mouseY}]`
	}
}
class LevelManager {
	static loadMenu() {
		this.loadLevel(0)
	}
	static loadLevelOne() {
		this.loadLevel(1)
	}
	static loadLevelTwo() {
		this.loadLevel(2)
	}
	static loadLevelThree() {
		this.loadLevel(3)
	}
	static loadLevel(level) {
		PLAYGROUND.clearAllObjects()
		if (level == 0) {
			BACKGROUND = new Picture(0, 0, 'resourses/menu.jpg')
			BACKGROUND.width = CANVAS.width
			BACKGROUND.height = CANVAS.height
			PLAYGROUND.putObject(BACKGROUND)
			
			class Button {
				constructor(cursor, shape, text, event) {
					this.shape = shape
					this.cursor = cursor
					this.text = new Text(shape.x, shape.y, text, "60px Arial", "brown", 2, "black")
					this.event = event
				}
				update(canvas) {
					if (this.shape.contains(cursor.shape)) {
						this.text.setFillColor("red")
						if (INPUT_MANAGER.mousePressed("Left")) this.event()
					}
					else if (this.text.fillColor != "brown") {
						this.text.setFillColor("brown")
					}
				}
				render(canvas) {
					/*#DEBUG*/ if (drawShapes.checked)
					this.shape.render(canvas)
					/*#DEBUG*/ if (drawSprites.checked)
					this.text.render(canvas)
				}
			}
			class Cursor {
				constructor() {
					this.shape = new Circle(0, 0, 1)
				}
				update(canvas) {
					this.shape.x = INPUT_MANAGER.mouseX
					this.shape.y = INPUT_MANAGER.mouseY
				}
				render(canvas) {
					/*#DEBUG*/ if (drawShapes.checked)
					this.shape.render(canvas)
				}
			}
			
			let cursor = new Cursor()
			PLAYGROUND.putObject(cursor)
			PLAYGROUND.putObject(new Button(cursor, new Rectangle(150, 150, 500, 60), "First level example", ()=>LevelManager.loadLevelOne()))
			PLAYGROUND.putObject(new Button(cursor, new Rectangle(105, 250, 590, 60), "Second level example", ()=>LevelManager.loadLevelTwo()))
			PLAYGROUND.putObject(new Button(cursor, new Rectangle(140, 350, 520, 60), "Third level example", ()=>LevelManager.loadLevelThree()))
		}
		else if (level == 1) {
			BACKGROUND = new Picture(0, 0, 'resourses/ground/ground2.png')
			BACKGROUND.width = CANVAS.width
			BACKGROUND.height = CANVAS.height
			
			let uX = 45
			let uY = 560
			let uSize = 8
			let uLoseColors = ['#6501ff']
			let unit = new Unit(BACKGROUND, uX, uY, uSize, uLoseColors)
			unit.model = new Model(unit, 'resourses/units/human/footman.png', -30, -36)
			PLAYGROUND.putObject(unit)
			
			let eSize = 16
			let ogresX = [90,  40]
			let ogresY = [245, 30]
			let ogresF = [4,   3]
			for (let i = 0; i < ogresX.length; i++) {
				let eX = ogresX[i]
				let eY = ogresY[i]
				let ogre = new Enemy(unit, eX, eY, eSize)
				ogre.model = new Model(ogre, 'resourses/units/orc/ogre.png', -21, -25)
				ogre.missileModelPattern = {
							picSrc : 'resourses/missiles/big_cannon.png',
							modelOffsetX : -5,
							modelOffsetY : -5,
							partWidth : 16,
							partHeight : 16,
							walkPartsCount : 4
						}
				ogre.facingDirection = ogresF[i]
				ogre.model.playAnimation("Stand")
				PLAYGROUND.putObject(ogre)
				ogre.startAttacking()
			}

			let eX = 300
			let eY = 130
			let deathKnight = new Enemy(unit, eX, eY, eSize)
			deathKnight.model = new Model(deathKnight, 'resourses/units/orc/death_knight.png', -21, -25)
			deathKnight.facingDirection = 2
			deathKnight.model.playAnimation("Stand")
			PLAYGROUND.putObject(deathKnight)

			let archersX = [200, 160, 10]
			let archersY = [340, 340, 200]
			let archersF = [2,   0,   2]
			for (let i = 0; i < archersX.length; i++) {
				eX = archersX[i]
				eY = archersY[i]
				let archer = new Enemy(unit, eX, eY, eSize)
				archer.model = new Model(archer, 'resourses/units/human/elven_archer.png', -21, -25, {attackPartsCount : 2, attackAnimSpeed : 150})
				archer.missileModelPattern = {
							picSrc : 'resourses/missiles/arrow.png',
							modelOffsetX : -16,
							modelOffsetY : -17,
							partWidth : 40,
							partHeight : 40,
							walkPartsCount : 1
						}
				archer.facingDirection = archersF[i]
				archer.model.playAnimation("Stand")
				PLAYGROUND.putObject(archer)
				archer.startAttacking()
			}
			
			const bottomLayer = Symbol("BottomLayer")
			PLAYGROUND.createCustomGroup(bottomLayer)

			PLAYGROUND.putObject(BACKGROUND, bottomLayer)
			PLAYGROUND.putObject(new EndPoint(unit, 242, 570), bottomLayer)
			
			PLAYGROUND.putObject(new DebugInfo(unit))
		}
		else if (level == 2) {
			BACKGROUND = new Picture(0, 0, 'resourses/ground/ground1.png')
			BACKGROUND.width = CANVAS.width
			BACKGROUND.height = CANVAS.height
			
			let uX = 385
			let uY = 565
			let uSize = 8
			let uLoseColors = ['#6501ff']
			let unit = new Unit(BACKGROUND, uX, uY, uSize, uLoseColors)
			unit.model = new Model(unit, 'resourses/units/human/footman.png', -30, -36)
			PLAYGROUND.putObject(unit)
			
			let eSize = 16
			let arrowMissileModelPattern = {
						picSrc : 'resourses/missiles/arrow.png',
						modelOffsetX : -16,
						modelOffsetY : -17,
						partWidth : 40,
						partHeight : 40,
						walkPartsCount : 1
					}
			let archer = new Enemy(unit, 350, 220, eSize)
			archer.model = new Model(archer, 'resourses/units/human/elven_archer.png', -21, -25, {attackPartsCount : 2, attackAnimSpeed : 150})
			archer.missileModelPattern = arrowMissileModelPattern
			archer.facingDirection = 0
			archer.model.playAnimation("Stand")
			PLAYGROUND.putObject(archer)
			archer.startAttacking()
			
			let archer1 = new Enemy(unit, 350+32, 220+32, eSize)
			archer1.model = new Model(archer1, 'resourses/units/human/elven_archer.png', -21, -25, {attackPartsCount : 2, attackAnimSpeed : 150})
			archer1.missileModelPattern = arrowMissileModelPattern
			archer1.facingDirection = 2
			archer1.model.playAnimation("Stand")
			PLAYGROUND.putObject(archer1)
			archer1.startAttacking()
			
			let archer2 = new Enemy(unit, 350, 220+32*2, eSize)
			archer2.model = new Model(archer2, 'resourses/units/human/elven_archer.png', -21, -25, {attackPartsCount : 2, attackAnimSpeed : 150})
			archer2.missileModelPattern = arrowMissileModelPattern
			archer2.facingDirection = 4
			archer2.model.playAnimation("Stand")
			PLAYGROUND.putObject(archer2)
			archer2.startAttacking()
			
			let archer3 = new Enemy(unit, 350-32, 220+32, eSize)
			archer3.model = new Model(archer3, 'resourses/units/human/elven_archer.png', -21, -25, {attackPartsCount : 2, attackAnimSpeed : 150})
			archer3.missileModelPattern = arrowMissileModelPattern
			archer3.facingDirection = 6
			archer3.model.playAnimation("Stand")
			PLAYGROUND.putObject(archer3)
			archer3.startAttacking()
			
			const bottomLayer = Symbol("BottomLayer")
			PLAYGROUND.createCustomGroup(bottomLayer)
			
			PLAYGROUND.putObject(BACKGROUND, bottomLayer)
			PLAYGROUND.putObject(new EndPoint(unit, 120, 5), bottomLayer)

			PLAYGROUND.putObject(new DebugInfo(unit))
		}
		else if (level == 3) {
			BACKGROUND = new Picture(0, 0, 'resourses/ground/ground3.png')
			BACKGROUND.width = CANVAS.width
			BACKGROUND.height = CANVAS.height
			
			let uX = 390
			let uY = 530
			let uSize = 8
			let uLoseColors = ['#6501ff']
			let unit = new Unit(BACKGROUND, uX, uY, uSize, uLoseColors)
			unit.model = new Model(unit, 'resourses/units/human/footman.png', -30, -36)
			PLAYGROUND.putObject(unit)
			
			let eSize = 16
			let arrowMissileModelPattern = {
						picSrc : 'resourses/missiles/arrow.png',
						modelOffsetX : -16,
						modelOffsetY : -17,
						partWidth : 40,
						partHeight : 40,
						walkPartsCount : 1
					}
			for (let i = 0; i <= 450; i += 100) {
				let archer = new Enemy(unit, 5, 50 + i, eSize)
				archer.model = new Model(archer, 'resourses/units/human/elven_archer.png', -21, -25, {attackPartsCount : 2, attackAnimSpeed : 150})
				archer.missileModelPattern = arrowMissileModelPattern
				archer.facingDirection = 2
				archer.model.playAnimation("Stand")
				PLAYGROUND.putObject(archer)
				archer.startAttacking()
			}
			for (let i = 0; i <= 400; i += 100) {
				let archer = new Enemy(unit, 760, 100 + i, eSize)
				archer.model = new Model(archer, 'resourses/units/human/elven_archer.png', -21, -25, {attackPartsCount : 2, attackAnimSpeed : 150})
				archer.missileModelPattern = arrowMissileModelPattern
				archer.facingDirection = 6
				archer.model.playAnimation("Stand")
				PLAYGROUND.putObject(archer)
				archer.startAttacking()
			}
			
			const bottomLayer = Symbol("BottomLayer")
			PLAYGROUND.createCustomGroup(bottomLayer)
			
			PLAYGROUND.putObject(BACKGROUND, bottomLayer)
			PLAYGROUND.putObject(new EndPoint(unit, 375, 5), bottomLayer)
			
			PLAYGROUND.putObject(new DebugInfo(unit))
		}
	}
}
	
const CANVAS = new Canvas("canvas")
const PLAYGROUND = new Playground(CANVAS)
let INPUT_MANAGER = PLAYGROUND.inputManager

let BACKGROUND = null

LevelManager.loadMenu()