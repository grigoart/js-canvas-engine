# JSCanvasEngine

## Class documentation

### Playground
	Playground is main class and sort of game container, which holds one instance of Canvas class.
#### Constructor:
```
	Playground(Canvas canvas)
```
#### Properties:
	canvas
	timeDelta
	FPS
#### Methods:
	putObject(Object object, [Symbol groupSymbol])
	removeObject(objToRemove, groupSymbol)
	clearObjects()
	clearAllObjects()
	createCustomGroup(groupSymbol)
	requestSortObjectsOnNextUpdate(predicate)
#### Functionality:
	The Playground itself does not provide methods to control the properties of the game rendering and update, but on every frame executes update(Canvas canvas) and then render(Canvas canvas) function of every stored object (in all presented groups)

### Canvas
	Represents the graphics container of game. All objects will be drawn here.
#### Constructor:
	Canvas(String canvasId, [String fillcolor = "white"])
#### Properties:
	playground
	width
	height
	fillcolor
#### Methods:
	expandToParent()
	setWidth(Integer width)
	setHeight(Integer height)
	setScale(Integer scaleX, Integer scaleY)
	setTranslation(Integer translateX, Integer translateY)
	getHexColor(Integer x, Integer y)
	clear()
	fill(String color)
#### Functionality:
	//TODO

### Timer
	//TODO
#### Constructor:
	Timer(Integer interval, [Function callback(canvas)])
#### Properties:
	interval
	callback
	active
#### Methods:
	stopTimer()
	startTimer()
#### Functionality:
	//TODO

### Interface Shape extends ObjectWidthHashCode
#### Methods:
	intersects(shape)
	contains(shape)
	
Circle extends Shape
	//TODO
#### Constructor:
	Circle(Integer x, Integer y, Integer radius, [String fillcolor="black", Integer linewidth=0, String linecolor="black"])
#### Properties:
	x
	y
	radius
	fillcolor
	linewidth
	linecolor
#### Methods:
	preRenderImage()	
	setFillcolor(fillcolor)
	getCenterX()
	getCenterY()
	setCenterX(x)
	setCenterY(y)
	render(canvas)
#### Functionality:
	//TODO
	
### Rectangle extends Shape
	//TODO
#### Constructor:
	Rectangle(Integer x, Integer y, Integer width, Integer height, [String fillcolor="black", Integer linewidth=0, String linecolor="black"])
#### Properties:
	x
	y
	height
	width
	fillcolor
	linewidth
	linecolor
#### Methods:
	setFillcolor(fillcolor)
	getCenterX()
	getCenterY()
	setCenterX(x)
	setCenterY(y)
	setWidth(width)
	setHeight(height)
	render(canvas)
#### Functionality:
	//TODO

### Picture extends ObjectWidthHashCode
	//TODO
#### Constructor:
	Picture(Integer x, Integer y, String src)
#### Properties:
	x
	y
	src
	picture
	stretch
	loaded
#### Methods:
	getHexColor(x, y)
	render(canvas)
#### Functionality:
	//TODO

### SpriteAnimation extends ObjectWidthHashCode
	//TODO
#### Constructor:
	SpriteAnimation(Integer x, Integer y, String src, Integer startX, Integer startY, Integer partWidth, Integer partHeight, Integer partsCount, Integer offsetX, Integer offsetY, [Integer frameTime=250, Boolean flipped=false])
#### Properties:
	x
	y
	src
	startX
	startY
	partWidth
	partHeight
	partsCount
	offsetX
	offsetY
	frameTime
	flipped
	currentPart
	callback
#### Methods:
	resetSequence()
	setCallback(callback)
	render(canvas)
#### Functionality:
	//TODO

### SpriteStatic extends ObjectWidthHashCode
	//TODO
#### Constructor:
	SpriteStatic(Integer x, Integer y, String src, Integer startX, Integer startY, Integer partWidth, Integer partHeight, [Boolean flipped=false])
#### Properties:
	x
	y
	src
	startX
	startY
	partWidth
	partHeight
	flipped
#### Methods:
	render(canvas)
#### Functionality:
	//TODO

### StaticText extends ObjectWidthHashCode
	//TODO
#### Constructor:
	StaticText(Integer x, Integer y, String text, [String font="16px Arial", String fillcolor="black", Integer linewidth=5, Integer linecolor="black"])
#### Properties:
	x
	y
	text
	font
	fillcolor
	linewidth
	linecolor
	width
	height
#### Methods:
	setText(text)
	setFont(font)
	setCenterX(x)
	render(canvas)
#### Functionality:
	//TODO

### Text extends ObjectWidthHashCode
	//TODO
#### Constructor:
	Text(Integer x, Integer y, String text, [String font="16px Arial", String fillcolor="black", Integer linewidth=5, Integer linecolor="black"])
#### Properties:
	x
	y
	text
	font
	fillcolor
	linewidth
	linecolor
	width
	height
#### Methods:
	setText(text)
	setFont(font)
	setFillColor(fillcolor)
	setCenterX(x)
	setCenterY(y)
#### Functionality:
	//TODO

### InputManager
	//TODO
#### Constructor:
	InputManager(Playground playground)
#### Properties:
	mouseX
	mouseY
	playground
#### Methods:
	keyDown(keyCode)
	keyPressed(keyCode)
	mouseDown(keyCode)
	mousePressed(keyCode)
#### Functionality:
	//TODO
