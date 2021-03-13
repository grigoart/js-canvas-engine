# JSCanvasEngine

JSCanvasEngine is a simple open source HTML5 game framework (based on canvas element). At this point supports desktop and mobile web browsers, but does not support touches. Written completely in plain JavaScript. 

Folder "examples" contains pages with examples of using functionality of framework.

## [Example pages](http://grigorian.hostmeinca.com/index.html)

## [Game example #1](http://grigorian.hostmeinca.com/spaceShooter.html)
![Image of example 1](/pic/GE1.png)

## [Game example #2](http://grigorian.hostmeinca.com/game/game.html)
![Image of example 2](/pic/GE2.png)

## Hello world

```html
<script src="engine.js"></script>

<canvas id="canvasId" width="100" height="20"></canvas>
```

```js
const CANVAS = new Canvas("canvasId")
const PLAYGROUND = new Playground(CANVAS)

PLAYGROUND.putObject(new Text(9, 2, "Hello World"))
```

## Class documentation

```ruby
# Playground is main class and sort of game container, which holds one instance of Canvas class.
# The Playground itself does not provide methods to control the properties of the game rendering
# and update, but on every frame executes update(Canvas canvas) and then render(Canvas canvas)
# function of every stored object (in all presented groups)
#
class Playground {
	Playground(Canvas canvas)

	Canvas canvas
	Float timeDelta
	Float FPS
	
	Void putObject(Object object, [Symbol groupSymbol])
	Void removeObject(Object objToRemove, Symbol groupSymbol)
	Void clearObjects()
	Void clearAllObjects()
	Void createCustomGroup(Symbol groupSymbol)
	Void requestSortObjectsOnNextUpdate(Function sortFunction)
}

# Represents the graphics container for the game. All objects will be drawn here.
#
class Canvas {
	Canvas(String canvasId, [String fillcolor = "white"])

	Playground playground
	Float width
	Float height
	String fillcolor
	
	Void expandToParent()
	Void setWidth(Float width)
	Void setHeight(Float height)
	Void setScale(Float scaleX, Float scaleY)
	Void setTranslation(Float translateX, Float translateY)
	String getHexColor(Float x, Float y)
	Void clear()
	Void fill(String color)
}

# Timer object. Calls callback function every <interval> milliseconds.
# Should be started after creation and be updated.
#
class Timer {
	Timer(Float interval, [Function callback(canvas)])

	Float interval
	Function callback
	Boolean active
	
	Void stopTimer()
	This startTimer()
}

# Every object, that extends ObjectWidthHashCode will have own hashCode
#
class ObjectWidthHashCode {
	String hashCode
}

# Abstract class representing shape.
# Provide functions intersects(shapeT) and contains(shapeT) to say,
# if <this> shape intersects or contains <shapeT>
#
abstract class Shape extends ObjectWidthHashCode {
	Boolean intersects(Shape shape)
	Boolean contains(Shape shape)
}

# Circle shape.
# Can be rendered if needed.
#
class Circle extends Shape {
	Circle(Float x, Float y, Float radius, [String fillcolor="black",
		Float linewidth=0, String linecolor="black"])

	Float x
	Float y
	Float radius
	String fillcolor
	Float linewidth
	String linecolor

	Void setFillcolor(String fillcolor)
	Float getCenterX()
	Float getCenterY()
	Void setCenterX(Float x)
	Void setCenterY(Float y)
	Void render(Canvas canvas)
}

# Rectangle shape.
# Can be rendered if needed.
#
class Rectangle extends Shape {
	Rectangle(Float x, Float y, Float width, Float height,
		[String fillcolor="black", Float linewidth=0, String linecolor="black"])
	
	Float x
	Float y
	Float height
	Float width
	String fillcolor
	Float linewidth
	String linecolor

	Void setFillcolor(String fillcolor)
	Float getCenterX()
	Float getCenterY()
	Void setCenterX(Float x)
	Void setCenterY(Float y)
	Void setWidth(Float width)
	Void setHeight(Float height)
	Void render(Canvas canvas)
}

# Object to represent picture from the URL on the canvas.
#
class Picture extends ObjectWidthHashCode {
	Picture(Float x, Float y, String src)

	Float x
	Float y
	String src
	Image picture
	Boolean stretch
	Boolean loaded

	Float getHexColor(x, y)
	Void render(canvas)
}

# Object to work with animation in spritesheet format.
# Callback function will be called on the end of animation.
#
class SpriteAnimation extends ObjectWidthHashCode {
	SpriteAnimation(Float x, Float y, String src, Float startX, Float startY,
		Float partWidth, Float partHeight, Float partsCount, Float offsetX,
		Float offsetY, [Float frameTime=250, Boolean flipped=false])

	Float x
	Float y
	String src
	Float startX
	Float startY
	Float partWidth
	Float partHeight
	Float partsCount
	Float offsetX
	Float offsetY
	Float frameTime
	Boolean flipped
	Float currentPart
	Function callback

	Void resetSequence()
	Void setCallback(Function callback)
	Void render(Canvas canvas)
}

# Object to draw part of the image or spritesheet on the canvas.
#
class SpriteStatic extends ObjectWidthHashCode {
	SpriteStatic(Float x, Float y, String src, Float startX, Float startY,
		Float partWidth, Float partHeight, [Boolean flipped=false])

	Float x
	Float y
	String src
	Float startX
	Float startY
	Float partWidth
	Float partHeight
	Boolean flipped
	
	Void render(Canvas canvas)
}

# Static text. Should be changed very rarely.
# Fast render, property changes rerender prerendered object.
#
class StaticText extends ObjectWidthHashCode {
	StaticText(Float x, Float y, String text, [String font="16px Arial",
		String fillcolor="black", Float linewidth=5, Float linecolor="black"])

	Float x
	Float y
	String text
	String font
	String fillcolor
	Float linewidth
	String linecolor
	Float width
	Float height

	Void setText(String text)
	Void setFont(String font)
	Void setCenterX(Float x)
	Void setCenterY(Float y)
	Void render(Canvas canvas)
}

# Text to draw on canvas.
# Fast property changes, slower rendering than StaticText.
#
class Text extends ObjectWidthHashCode {
	Text(Float x, Float y, String text, [String font="16px Arial",
		String fillcolor="black", Float linewidth=5, Float linecolor="black"])

	Float x
	Float y
	String text
	String font
	String fillcolor
	Float linewidth
	String linecolor
	Float width
	Float height

	Void setText(String text)
	Void setFont(String font)
	Void setFillColor(String fillcolor)
	Void setCenterX(Float x)
	Void setCenterY(Float y)
	Void render(Canvas canvas)
}

# Used for working with user inputs such as mouse and keyboard.
# Provides arrays of pressed keys and pressed mouse buttons.
# Also provides mouse position [x, y] on canvas element.
#
class InputManager {
	InputManager(Playground playground)

	Float mouseX
	Float mouseY
	Playground playground
	
	Boolean keyDown(String keyCode)
	Boolean keyPressed(String keyCode)
	Boolean mouseDown(String keyCode)
	Boolean mousePressed(String keyCode)
}
```

## [Komentáře k semestrálnímu projektu](https://docs.google.com/spreadsheets/d/1K0EGHbYfYLEt9zwDzMgfLaLZOTxZYmSQFMFLP6h6bXM/edit?usp=sharing)
