# JSCanvasEngine

## Class documentation

```ruby
/**
 ** Playground is main class and sort of game container, which holds one instance of Canvas class.
 ** The Playground itself does not provide methods to control the properties of the game rendering and update, but on every frame executes update(Canvas canvas) and then render(Canvas canvas) function of every stored object (in all presented groups)
 **/
Class Playground {
	Playground(Canvas canvas)

	Canvas canvas
	Integer timeDelta
	Integer FPS
	
	Void putObject(Object object, [Symbol groupSymbol])
	Void removeObject(Object objToRemove, Symbol groupSymbol)
	Void clearObjects()
	Void clearAllObjects()
	Void createCustomGroup(Symbol groupSymbol)
	Void requestSortObjectsOnNextUpdate(Function sortFunction)
}

/**
 ** Represents the graphics container of game. All objects will be drawn here.
 **/
Class Canvas {
	Canvas(String canvasId, [String fillcolor = "white"])

	Playground playground
	Integer width
	Integer height
	String fillcolor
	
	Void expandToParent()
	Void setWidth(Integer width)
	Void setHeight(Integer height)
	Void setScale(Integer scaleX, Integer scaleY)
	Void setTranslation(Integer translateX, Integer translateY)
	String getHexColor(Integer x, Integer y)
	Void clear()
	Void fill(String color)
}

/**
 ** 
 **/
Class Timer {
	Timer(Integer interval, [Function callback(canvas)])

	Integer interval
	Function callback
	Boolean active
	
	Void stopTimer()
	Void startTimer()
}

/**
 ** 
 **/
Interface Shape extends ObjectWidthHashCode {
	Boolean intersects(Shape shape)
	Boolean contains(Shape shape)
}

/**
 ** 
 **/
Class Circle extends Shape {
	Circle(Integer x, Integer y, Integer radius, [String fillcolor="black", Integer linewidth=0, String linecolor="black"])

	Integer x
	Integer y
	Integer radius
	String fillcolor
	Integer linewidth
	String linecolor

	Void setFillcolor(String fillcolor)
	Integer getCenterX()
	Integer getCenterY()
	Void setCenterX(Integer x)
	Void setCenterY(Integer y)
	Void render(Canvas canvas)
}

/**
 ** 
 **/
Class Rectangle extends Shape {
	Rectangle(Integer x, Integer y, Integer width, Integer height, [String fillcolor="black", Integer linewidth=0, String linecolor="black"])
	
	Integer x
	Integer y
	Integer height
	Integer width
	String fillcolor
	Integer linewidth
	String linecolor

	Void setFillcolor(String fillcolor)
	Integer getCenterX()
	Integer getCenterY()
	Void setCenterX(Integer x)
	Void setCenterY(Integer y)
	Void setWidth(Integer width)
	Void setHeight(Integer height)
	Void render(Canvas canvas)
}

/**
 ** 
 **/
Class Picture extends ObjectWidthHashCode {
	Picture(Integer x, Integer y, String src)

	Integer x
	Integer y
	String src
	Image picture
	Boolean stretch
	Boolean loaded

	Integer getHexColor(x, y)
	Void render(canvas)
}

/**
 ** 
 **/
Class SpriteAnimation extends ObjectWidthHashCode {
	SpriteAnimation(Integer x, Integer y, String src, Integer startX, Integer startY, Integer partWidth, Integer partHeight, Integer partsCount, Integer offsetX, Integer offsetY, [Integer frameTime=250, Boolean flipped=false])

	Integer x
	Integer y
	String src
	Integer startX
	Integer startY
	Integer partWidth
	Integer partHeight
	Integer partsCount
	Integer offsetX
	Integer offsetY
	Integer frameTime
	Boolean flipped
	Integer currentPart
	Function callback

	Void resetSequence()
	Void setCallback(Function callback)
	Void render(Canvas canvas)
}

/**
 ** 
 **/
Class SpriteStatic extends ObjectWidthHashCode {
	SpriteStatic(Integer x, Integer y, String src, Integer startX, Integer startY, Integer partWidth, Integer partHeight, [Boolean flipped=false])

	Integer x
	Integer y
	String src
	Integer startX
	Integer startY
	Integer partWidth
	Integer partHeight
	Boolean flipped
	
	Void render(Canvas canvas)
}

/**
 ** 
 **/
Class StaticText extends ObjectWidthHashCode {
	StaticText(Integer x, Integer y, String text, [String font="16px Arial", String fillcolor="black", Integer linewidth=5, Integer linecolor="black"])

	Integer x
	Integer y
	String text
	String font
	String fillcolor
	Integer linewidth
	String linecolor
	Integer width
	Integer height

	Void setText(String text)
	Void setFont(String font)
	Void setCenterX(Integer x)
	Void setCenterY(Integer y)
	Void render(Canvas canvas)
}

/**
 ** 
 **/
Class Text extends ObjectWidthHashCode {
	Text(Integer x, Integer y, String text, [String font="16px Arial", String fillcolor="black", Integer linewidth=5, Integer linecolor="black"])

	Integer x
	Integer y
	String text
	String font
	String fillcolor
	Integer linewidth
	String linecolor
	Integer width
	Integer height
Methods:
	Void setText(String text)
	Void setFont(String font)
	Void setFillColor(String fillcolor)
	Void setCenterX(Integer x)
	Void setCenterY(Integer y)
	Void render(Canvas canvas)
}

/**
 ** 
 **/
Class InputManager {
InputManager(Playground playground)

	Integer mouseX
	Integer mouseY
	Playground playground
	
	Boolean keyDown(String keyCode)
	Boolean keyPressed(String keyCode)
	Boolean mouseDown(String keyCode)
	Boolean mousePressed(String keyCode)
}
```
