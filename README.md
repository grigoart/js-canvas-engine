# JSCanvasEngine

JSCanvasEngine is a simple open source HTML5 game framework (based on the canvas element). It currently supports desktop and mobile web browsers, but does not support touch. It is written entirely in a plain JavaScript.

The "examples" folder contains pages with examples of using the framework functions.

## [Example pages](https://grigoart.github.io/js-canvas-engine/examples)

## [Game example #1](https://grigoart.github.io/js-canvas-engine/examples/spaceShooter.html)
![Image of example 1](/pic/GE1.png)

## [Game example #2](https://grigoart.github.io/js-canvas-engine/examples/game/game.html)
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
# Playground is the main class and a kind of game container that contains one instance of the Canvas class.
# Playground itself does not provide methods to control the rendering properties of the game, but instead
# it executes `update(Canvas canvas)` and `render(Canvas canvas)` functions of each active object in all presented groups on each frame.
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

# Represents a graphical container for the game. All objects are rendered here.
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

# Timer object. Calls the callback function every <interval> millisecond.
# Expects to be started after creation and updated.
#
class Timer {
	Timer(Float interval, [Function callback(canvas)])

	Float interval
	Function callback
	Boolean active
	
	Void stopTimer()
	This startTimer()
}

# Each object that extends ObjectWidthHashCode will have its own hashCode.
#
class ObjectWidthHashCode {
	String hashCode
}

# Abstract class representing a shape.
# Provide functions `intersects(shapeT)` and `contains(shapeT)` that tell
# whether the shape `<this>` intersects or contains the shape `<shapeT>`.
#
abstract class Shape extends ObjectWidthHashCode {
	Boolean intersects(Shape shape)
	Boolean contains(Shape shape)
}

# Circle shape.
# Represented by 2D coordinates and radius.
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
# Represented by 2D coordinates, width and height.
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

# Object for displaying an image from a URL on the canvas.
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

# Object for working with animation in spritesheet format.
# The callback function will be called at the end of each animation cycle.
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

# Object for drawing a part of an image or spritesheet on the canvas.
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

# Static text. This object is expected to change very rarely or not at all.
# Fast rendering, property changes redraw the pre-rendered object.
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

# Dynamic text.
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

# Used to work with user inputs such as mouse and keyboard.
# Provides an array of keystrokes and mouse button presses at each frame.
# It also provides the mouse position [x, y] on the canvas element.
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

<!-- ## [Komentáře k semestrálnímu projektu](https://docs.google.com/spreadsheets/d/1K0EGHbYfYLEt9zwDzMgfLaLZOTxZYmSQFMFLP6h6bXM/edit?usp=sharing) -->
