class Playground {
	constructor(canvas) {
		if (canvas instanceof Canvas)
			canvas.playground = this
		else
			throw new TypeError("Contructor contructor needs Canvas instance as parameter")
		this.canvas = canvas
		this.renderFunc = this.renderObjects
		this.updateFunc = this.updateObjects
		this.objects = []
		this.customGroup = {}
		this.customGroupSymbols = []
		this.requestedSort = null
		this.inputManager = new InputManager(this)
		this.prevTimeStamp = Date.now()
		this.prevRenderTimeStamp = Date.now()
		this.timeDelta = 0
		this.FPS = 0
		var frameFunction = ()=>{
			this.renderFunc()
			this.updateFunc()
				const NOW = Date.now()
				this.framesRendered++
				this.timeDelta = NOW - this.prevRenderTimeStamp
				this.prevRenderTimeStamp = NOW
			if (NOW - this.prevTimeStamp >= 1000) {
				this.FPS = this.framesRendered
				this.framesRendered = 0
				this.prevTimeStamp = NOW
			}
			requestAnimationFrame(frameFunction)
		}
		frameFunction()
	}
	renderObjects() {
		this.canvas.clear()
		for (let group in this.customGroupSymbols) {
			group = this.customGroupSymbols[group]
			for (let obj in this.customGroup[group]) {
				if (this.customGroup[group][obj] && this.customGroup[group][obj].render) this.customGroup[group][obj].render(this.canvas)
			}
		}
		for (let obj in this.objects) {
			if (this.objects[obj] && this.objects[obj].render) this.objects[obj].render(this.canvas)
		}
	}
	updateObjects() {
		if (this.requestedSort) this.sortObjects(this.requestedSort)
		for (let group in this.customGroupSymbols) {
			group = this.customGroupSymbols[group]
			for (let obj in this.customGroup[group]) {
				if (this.customGroup[group][obj] && this.customGroup[group][obj].update) this.customGroup[group][obj].update(this.canvas)
			}
		}
		for (let obj in this.objects) {
			if (this.objects[obj] && this.objects[obj].update) this.objects[obj].update(this.canvas)
		}
	}
	putObject(obj, groupSymbol) {
		if (!groupSymbol) {
			this.objects.push(obj)
		}
		else {
			if (typeof groupSymbol !== 'symbol') throw new TypeError("Playground's method putObject accepts only Symbols")
			this.customGroup[groupSymbol].push(obj)
		}
	}
	removeObject(objToRemove, groupSymbol) {
		if (!groupSymbol) {
			for (let i = 0; i < this.objects.length; i++) {
				if (this.objects[i] == objToRemove) {         
				  this.objects.splice(i, 1);
				  i--
				}
			}
		}
		else {
			if (typeof groupSymbol !== 'symbol') throw new TypeError("Playground's method removeObject accepts only Symbols")
			for (let i = 0; i < this.customGroup[groupSymbol].length; i++) {
				if (this.customGroup[groupSymbol][i] == objToRemove) {         
				  this.customGroup[groupSymbol].splice(i, 1);
				  i--
				}
			}
		}
	}
	clearObjects() {
		this.objects = []
	}
	clearAllObjects() {
		this.objects = []
		this.customGroup = {}
		this.customGroupSymbols = []
	}
	createCustomGroup(groupSymbol) {
		if (typeof groupSymbol !== 'symbol') throw new TypeError("Playground's method createCustomGroup accepts only Symbols")
		this.customGroup[groupSymbol] = []
		this.customGroupSymbols.push(groupSymbol)
	}
	getCustomGroup(groupSymbol) {
		if (typeof groupSymbol !== 'symbol') throw new TypeError("Playground's method getCustomGroup accepts only Symbols")
		return this.customGroup[groupSymbol]
	}
	sortObjects(predicate) {
		this.objects.sort(predicate)
		this.requestedSort = null
	}
	requestSortObjectsOnNextUpdate(predicate) {
		this.requestedSort = predicate
	}
}
class Canvas {
	constructor(canvasId, fillcolor="white") {
		this.canvas = document.querySelector("canvas#"+canvasId)
		if (!this.canvas) throw new TypeError("Can't find canvas element with id = " + canvasId)
		this.context = this.canvas.getContext("2d")
		this.fillcolor = fillcolor
		this.setScale(1, 1)
		this.width = this.canvas.width//parseInt(getComputedStyle(this.canvas).width)
		this.height = this.canvas.height
		this.playground = null
	}
	expandToParent() {
		this.width = parseInt(getComputedStyle(this.canvas.parentElement).width)
		this.height = parseInt(getComputedStyle(this.canvas.parentElement).height)
		this.canvas.width = this.width
		this.canvas.height = this.height
	}
	setWidth(width) {
		this.canvas.width = width
		this.width = width
	}
	setHeight(height) {
		this.canvas.height = height
		this.height = height
	}
	setScale(scaleX, scaleY) {
		this.scaleX = scaleX
		this.scaleY = scaleY
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.scale(scaleX, scaleY)
	}
	setTranslation(translateX, translateY) {
		this.translateX = translateX
		this.translateY = translateY
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.translate(translateX, translateY)
	}
	render(obj) {
		obj.render(this)
	}
	getHexColor(x, y) {
		let colorData = this.context.getImageData(x, y, 1, 1).data
		return "#" + ("000000" + ((colorData[0] << 16) | (colorData[1] << 8) | colorData[3]).toString(16)).slice(-6);
	}
	clear() {
		this.context.save()
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.restore()
	}
	fill(color) {
		this.context.save()
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.fillStyle = (color)?color:this.fillcolor
		this.context.fillRect(0, 0, this.width, this.height)
		this.context.restore()
	}
}
class ObjectWidthHashCode {
	constructor() {
		this.hashCode = ObjectWidthHashCode.prototype.hashCodeCounter++
	}
}
ObjectWidthHashCode.prototype.hashCodeCounter = 0
class Timer {
	constructor(interval, callback) {
		this.interval = interval
		this.callback = callback
		this.active = false
		this.prevTimeStamp = null
		this.timeStamp = null
	}
	update(canvas) {
		if (this.active) {
			this.timeStamp += canvas.playground.timeDelta
			if (this.timeStamp - this.prevTimeStamp >= this.interval) {
				this.callback(canvas)
				this.prevTimeStamp = this.timeStamp
			}
		}
	}
	stopTimer() {
		this.active = false
	}
	startTimer() {
		this.prevTimeStamp = Date.now()
		this.timeStamp = Date.now()
		this.active = true
		return this
	}
}
//===============================SHAPE===============================
class Shape extends ObjectWidthHashCode {
	constructor() {
		super()
	}
	render(canvas) {
		throw new TypeError("render(canvas) function should be implemented")
	}
	intersects(shape) {
		if (shape instanceof Rectangle && this instanceof Rectangle)
			return this.x < shape.x+shape.width && this.x+this.width > shape.x && this.y < shape.y+shape.height && this.y+this.height > shape.y
		else if (this instanceof Circle && shape instanceof Rectangle) {
			return shape.intersects(this)
		}
		else if (shape instanceof Circle && this instanceof Rectangle) {
			let distX = Math.abs(shape.x - this.x - this.width/2) + shape.radius
			let distY = Math.abs(shape.y - this.y - this.height/2) + shape.radius

			if (distX >= (this.width/2 + shape.radius) || distY >= (this.height/2 + shape.radius)) return false
			if (distX < (this.width/2) || distY < (this.height/2)) return true

			let dx = distX - this.width/2
			let dy = distY - this.height/2
			return (dx**2 + dy**2 <= shape.radius**2)
		}
		else if (shape instanceof Circle && this instanceof Circle)
			return (shape.getCenterX()-this.getCenterX())**2 + (shape.getCenterY()-this.getCenterY())**2 < (shape.radius+this.radius)**2
	}
	contains(shape) {
		if (shape instanceof Rectangle && this instanceof Rectangle)
			return shape.x >= this.x && shape.y >= this.y && shape.x+shape.width <= this.x+this.width && shape.y+shape.height <= this.y+this.height;
		else if (this instanceof Circle && shape instanceof Rectangle) {
			return (shape.x - this.getCenterX())**2 + (shape.y - this.getCenterY())**2 < this.radius**2 && (shape.x + shape.width - this.getCenterX())**2 + (shape.y + shape.height - this.getCenterY())**2 < this.radius**2
		}
		else if (shape instanceof Circle && this instanceof Rectangle) {
			return this.x < shape.x && this.y < shape.y && this.x + this.width > shape.x + shape.radius*2 && this.y + this.height > shape.y + shape.radius*2
		}
		else if (shape instanceof Circle && this instanceof Circle)
			return (this.getCenterX() - shape.getCenterX())**2 + (this.getCenterY() - shape.getCenterY())**2 < (this.radius - shape.radius)**2;
	}
}
class Circle extends Shape {
	constructor(x, y, radius, fillcolor="black", linewidth=0, linecolor="black") {
		super()
		this.x = x
		this.y = y
		this.radius = radius
		this.fillcolor = fillcolor
		this.linewidth = linewidth
		this.linecolor = linecolor
		this.preRenderedImage = this.preRenderImage()
	}
	preRenderImage() {
		const preCanvas = document.createElement('canvas')
		preCanvas.width = (this.radius + this.linewidth + 1) * 2
		preCanvas.height = (this.radius + this.linewidth + 1) * 2
		const preContext = preCanvas.getContext("2d")
		preContext.fillStyle = this.fillcolor
		preContext.strokeStyle = this.linecolor
		preContext.lineWidth = this.linewidth		
		preContext.beginPath()
		preContext.arc(this.radius + this.linewidth, this.radius + this.linewidth, this.radius, 0,2*Math.PI)
		if (this.linewidth != 0) preContext.stroke()
		preContext.fill()
		return preCanvas
	}
	setFillcolor(fillcolor) {
		this.fillcolor = fillcolor
		this.preRenderedImage = this.preRenderImage()
	}
	getCenterX() {
		return this.x + this.radius// - this.linewidth
	}
	getCenterY() {
		return this.y + this.radius// - this.linewidth
	}
	setCenterX(x) {
		this.x = x - this.radius// + this.linewidth
	}
	setCenterY(y) {
		this.y = y - this.radius// + this.linewidth
	}
	render(canvas) {
		let ctx = canvas.context
		ctx.drawImage(this.preRenderedImage, this.x - this.linewidth - 1, this.y - this.linewidth - 1)
	}
}
class Rectangle extends Shape {
	constructor(x, y, width, height, fillcolor="black", linewidth=0, linecolor="black") {
		super()
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.fillcolor = fillcolor
		this.linewidth = linewidth
		this.linecolor = linecolor
		this.preRenderedImage = this.preRenderImage()
	}
	preRenderImage() {
		const preCanvas = document.createElement('canvas')
		preCanvas.width = this.width
		preCanvas.height = this.height
		const preContext = preCanvas.getContext("2d")
		preContext.fillStyle = this.fillcolor
		preContext.strokeStyle = this.linecolor
		preContext.lineWidth = this.linewidth
		preContext.beginPath()
		preContext.rect(0 + this.linewidth, 0 + this.linewidth, this.width - this.linewidth*2, this.height - this.linewidth*2)
		preContext.stroke()
		preContext.fill()
		return preCanvas
	}
	setFillcolor(fillcolor) {
		this.fillcolor = fillcolor
		this.preRenderedImage = this.preRenderImage()
	}
	getCenterX() {
		return this.x + this.width/2// - this.linewidth
	}
	getCenterY() {
		return this.y + this.height/2// - this.linewidth
	}
	setCenterX(x) {
		this.x = x - this.width/2// + this.linewidth
	}
	setCenterY(y) {
		this.y = y - this.height/2// + this.linewidth
	}
	setWidth(width) {
		this.width = width
		this.preRenderedImage = this.preRenderImage()
	}
	setHeight(height) {
		this.height = height
		this.preRenderedImage = this.preRenderImage()
	}
	render(canvas) {
		let ctx = canvas.context
		ctx.drawImage(this.preRenderedImage, this.x, this.y)
	}
}
//===============================DRAWABLE===============================
class Picture extends ObjectWidthHashCode {
	constructor(x, y, src) {
		super()
		this.x = x
		this.y = y
		this.picture = new Image()
		this.src = src
		this.stretch = false
		this.width = this.picture.width
		this.height = this.picture.height
		this.loaded = false
		
		//wait until image loaded
		this.picture.addEventListener("load", ()=>{
			let cnv = document.createElement("canvas")
			cnv.width = this.width
			cnv.height = this.height
			this.imageContext = cnv.getContext("2d")
			this.imageContext.drawImage(this.picture, x, y)
			if (!this.width) this.width = this.picture.width
			if (!this.height) this.height = this.picture.height
			this.loaded = true
		})
		this.picture.src = src
	}
	getHexColor(x, y) {
		if (this.imageContext) {
			let colorData = this.imageContext.getImageData(x, y, 1, 1).data
			return "#" + ("000000" + ((colorData[0] << 16) | (colorData[1] << 8) | colorData[3]).toString(16)).slice(-6);
		}
		console.debug("Picture is not loaded")
	}
	render(canvas) {
		if (this.stretch) {
			canvas.context.drawImage(this.picture, this.x, this.y, this.width, this.height)
		}
		else {
			canvas.context.drawImage(this.picture, this.x, this.y)
		}
	}
}
class SpriteAnimation extends ObjectWidthHashCode {
	constructor(x, y, src, startX, startY, partWidth, partHeight, partsCount, offsetX, offsetY, frameTime=250, flipped=false) {
		super()
		this.x = x
		this.y = y
		this.picture = new Image()
		this.picture.src = src
		this.src = src
		this.width = this.picture.width
		this.height = this.picture.height
		this.startX = startX
		this.startY = startY
		this.partWidth = partWidth
		this.partHeight = partHeight
		this.partsCount = partsCount
		this.offsetX = offsetX
		this.offsetY = offsetY
		this.frameTime = frameTime
		this.flipped = flipped
		this.currentPart = 0
		this.prevDrawTimestamp = null
		this.callback = null
	}
	resetSequence() {
		this.currentPart = 0
		this.prevDrawTimestamp = null
	}
	setCallback(callback) {
		if (callback instanceof Function)
			this.callback = callback
		else
			throw new TypeError("Callback must be instance of Function")
	}
	render(canvas) {
		let drawTime = new Date().getTime()
		if (this.prevDrawTimestamp == null) this.prevDrawTimestamp = drawTime
		let pX = this.startX + this.currentPart*this.offsetX
		let pY = this.startY + this.currentPart*this.offsetY
		if (this.flipped) {
			//shitty idea to transform canvas. Very slow
			canvas.context.save()
			canvas.context.scale(-1, 1)
			canvas.context.drawImage(this.picture, pX, pY, this.partWidth, this.partHeight, -this.x, this.y, -this.partWidth, this.partHeight)
			canvas.context.restore()
		}
		else {
			canvas.context.drawImage(this.picture, pX, pY, this.partWidth, this.partHeight, this.x, this.y, this.partWidth, this.partHeight)
		}
		if (drawTime - this.prevDrawTimestamp >= this.frameTime) {
			this.currentPart++
			this.prevDrawTimestamp = drawTime
		}
		if (this.currentPart >= this.partsCount) {
			if (this.callback) this.callback(this, canvas)
			this.resetSequence()
		}
	}
}
class SpriteStatic extends ObjectWidthHashCode {
	constructor(x, y, src, startX, startY, partWidth, partHeight, flipped=false) {
		super()
		this.x = x
		this.y = y
		this.picture = new Image()
		this.picture.src = src
		this.src = src
		this.width = this.picture.width
		this.height = this.picture.height
		this.startX = startX
		this.startY = startY
		this.partWidth = partWidth
		this.partHeight = partHeight
		this.flipped = flipped
	}
	render(canvas) {
		let pX = this.startX
		let pY = this.startY
		if (this.flipped) {
			//shitty idea to transform canvas. Very slow
			canvas.context.save()
			canvas.context.scale(-1, 1)
			canvas.context.drawImage(this.picture, pX, pY, this.partWidth, this.partHeight, -this.x, this.y, -this.partWidth, this.partHeight)
			canvas.context.restore()
		}
		else {
			canvas.context.drawImage(this.picture, pX, pY, this.partWidth, this.partHeight, this.x, this.y, this.partWidth, this.partHeight)
		}
	}
}
class StaticText extends ObjectWidthHashCode {
	constructor(x, y, text, font="16px Arial", fillcolor="black", linewidth=5, linecolor="black") {
		super()
		this.x = x
		this.y = y
		this.text = text
		this.font = font
		this.fillcolor = fillcolor
		this.linewidth = linewidth
		this.linecolor = linecolor
		this.width = 0
		this.height = 0
		this.preRenderedImage = this.preRenderImage()
	}
	preRenderImage() {
		const preCanvas = document.createElement('canvas')
		const preContext = preCanvas.getContext("2d")
		preContext.font = this.font
		preContext.fillStyle = this.fillcolor
		preContext.strokeStyle = this.linecolor
		preContext.lineWidth = this.linewidth
		this.width = preContext.measureText(this.text).width
		this.height = parseInt(this.font.replace(/\D/g, ""))
		preCanvas.width = this.width
		preCanvas.height = this.height
		preContext.font = this.font
		preContext.fillStyle = this.fillcolor
		preContext.strokeStyle = this.linecolor
		preContext.lineWidth = this.linewidth
		preContext.textBaseline = "top"
		preContext.textAlign = "left"
		preContext.fillText(this.text, 0, 0);
		return preCanvas
	}
	setText(text) {
		this.text = text
		this.preRenderedImage = this.preRenderImage()
	}
	setFont(font) {
		this.font = font
		this.preRenderedImage = this.preRenderImage()
	}
	setCenterX(x) {
		this.x = x - this.width/2
	}
	render(canvas) {
		let ctx = canvas.context
		ctx.drawImage(this.preRenderedImage, this.x, this.y)
	}
}
class Text extends ObjectWidthHashCode {
	constructor(x, y, text, font="16px Arial", fillcolor="black", linewidth=0, linecolor="black") {
		super()
		this.x = x
		this.y = y
		this.text = text
		this.font = font
		this.fillcolor = fillcolor
		this.linewidth = linewidth
		this.linecolor = linecolor
		this.width = 0
		this.height = 0
	}
	setText(text) {
		this.text = text
	}
	setFont(font) {
		this.font = font
	}
	setFillColor(fillcolor) {
		this.fillcolor = fillcolor
	}
	setCenterX(x) {
		this.x = x - this.width/2
	}
	setCenterY(y) {
		this.y = y - this.height/2
	}
	render(canvas) {
		let ctx = canvas.context
		ctx.font = this.font
		ctx.fillStyle = this.fillcolor
		ctx.strokeStyle = this.linecolor
		ctx.lineWidth = this.linewidth
		this.width = ctx.measureText(this.text).width
		this.height = parseInt(this.font.replace(/\D/g, ""))
		ctx.textBaseline = "top"
		ctx.textAlign = "left"
		ctx.fillText(this.text, this.x, this.y);
		if (this.linewidth != 0) ctx.strokeText(this.text, this.x, this.y);
	}
}
//===============================CONTROLLER===============================
class InputManager {
	constructor(pg) {
		if (pg instanceof Playground)
			this.playground = pg
		else
			throw new TypeError("InputManager contructor needs Playground instance as parameter")
		document.addEventListener("keydown", this)
		document.addEventListener("keyup", this)
		this.playground.canvas.canvas.addEventListener("mousedown", this)
		this.playground.canvas.canvas.addEventListener("mouseup", this)
		this.playground.canvas.canvas.addEventListener("mousemove", this)
		this.downKeys = {}
		this.downMButtons = {}
		this.mouseX = null
		this.mouseY = null
		this.keyCodeConverter = new KeyCodeConverter()
		this.codeSupport = false
	}
	handleEvent(e) {
		const eventType = e.type
		switch(eventType) {
			case "keydown": this.keydownEvent(e); break
			case "keyup": this.keyupEvent(e); break
			case "mousedown": this.mousedownEvent(e); break
			case "mouseup": this.mouseupEvent(e); break
			case "mousemove": this.mousemoveEvent(e); break
		}
	}
	keyDown(keyCode) {
		return this.downKeys[keyCode]
	}
	keyPressed(keyCode) {
		let res = this.downKeys[keyCode]
		if (res) this.downKeys[keyCode] = false
		return res
	}
	mouseDown(keyCode) {
		return this.downMButtons[keyCode]
	}
	mousePressed(keyCode) {
		let res = this.downMButtons[keyCode]
		if (res) this.downMButtons[keyCode] = false
		return res
	}
	keydownEvent(e) {
		this.codeSupport = e.code != undefined
		const keyCode = (this.codeSupport)?e.code:this.keyCodeToCode(e.keyCode)
		this.downKeys[keyCode] = true
	}
	keyupEvent(e) {
		this.codeSupport = e.code != undefined
		const keyCode = (this.codeSupport)?e.code:this.keyCodeToCode(e.keyCode)
		this.downKeys[keyCode] = false
	}
	mousedownEvent(e) {
		const mouseButton = (e.button == 0)?"Left":(e.button == 1)?"Middle":"Right"
		this.downMButtons[mouseButton] = true
	}
	mouseupEvent(e) {
		const mouseButton = (e.button == 0)?"Left":(e.button == 1)?"Middle":"Right"
		this.downMButtons[mouseButton] = false
	}
	mousemoveEvent(e) {
		this.mouseX = e.offsetX*Math.pow(this.playground.canvas.scaleX, -1)
		this.mouseY = e.offsetY*Math.pow(this.playground.canvas.scaleY, -1)
	}
	keyCodeToCode(keyCode) {
		return this.keyCodeConverter.get(keyCode)
	}
}

class KeyCodeConverter {
	constructor() {
		this.map = {
			8: "Backspace",
			9: "Tab",
			16: "ShiftLeft",
			17: "ControlLeft",
			18: "AltLeft",
			20: "CapsLock",
			32: "Space",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			48: "Digit0",
			49: "Digit1",
			50: "Digit2",
			51: "Digit3",
			52: "Digit4",
			53: "Digit5",
			54: "Digit6",
			55: "Digit7",
			56: "Digit8",
			57: "Digit9",
			65: "KeyA",
			66: "KeyB",
			67: "KeyC",
			68: "KeyD",
			69: "KeyE",
			70: "KeyF",
			71: "KeyG",
			72: "KeyH",
			73: "KeyI",
			74: "KeyJ",
			75: "KeyK",
			76: "KeyL",
			77: "KeyM",
			78: "KeyN",
			79: "KeyO",
			80: "KeyP",
			81: "KeyQ",
			82: "KeyR",
			83: "KeyS",
			84: "KeyT",
			85: "KeyU",
			86: "KeyV",
			87: "KeyW",
			88: "KeyX",
			89: "KeyY",
			90: "KeyZ",
			91: "MetaLeft",
			93: "ContextMenu",
			96: "Numpad0",
			97: "Numpad1",
			98: "Numpad2",
			99: "Numpad3",
			100: "Numpad4",
			101: "Numpad5",
			102: "Numpad6",
			103: "Numpad7",
			104: "Numpad8",
			105: "Numpad9",
			106: "NumpadMultiply",
			109: "NumpadSubtract",
			110: "NumpadDecimal",
			111: "NumpadDivide",
			144: "NumLock",
			173: "AudioVolumeMute",
			186: "Semicolon",
			187: "Equal",
			188: "Comma",
			189: "Minus",
			190: "Period",
			191: "Slash",
			219: "BracketLeft",
			220: "Backslash",
			221: "BracketRight",
			222: "Quote",
			255: ""
		}
	}
	get(key) {
		return this.map[key]
	}
}