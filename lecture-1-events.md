# 2.4.1 - JS Events

---

## Situation

Open the door, when someone is there.

<img src='./assets/door.gif' />

---

## Event-driven Programming

<img src='./assets/fig1_event.png' />

---

### Event Types

<img src='./assets/event_types.jpg' />

[Source](https://data-flair.training/blogs/javascript-event-types/)

---

#### User Interface Events

- `load` - when this 'node' is loaded
- `unload` - when this 'node' is removed
- `error` - when there is an error
- `resize` - when the screen is being resized
- `scroll` - when scrolling 

---

#### Focus and Blur Events

These events fire when the HTML elements you can interact with gain/ lose focus.

- `focus` - gainning focus
- `blur` - gainning blur (for example, let the user know that the email wrong only after they "click away" from the input box)
- `focusin` (_new; not supported by Firefox_)
- `focusout` (_new; same as blur; not supported by Firefox_)

---

##### Mouse Events

- `click`
- `dblclick`
- `mousedown` - holding it down
- `mouseup` - 
- `mouseover` - hover in - entering an element
- `mouseout` - hover away - leavs an element
- `mousemove` - anytime a mouse moves anywhere (when ending a screen saver)

---

##### Keyboard Events

- `input`
- `keydown` - multiple events as long as the key is down
- `keypress` - single
- `keyup` - when the key is "unpressed"

---

### Form Events

- `submit` - the 'submit' input in a form element will triger the submit event
- `change` - checking 'live'
- `input` - a listener like change, only just when an input happens

---

### HTML5 Events

- `DOMContentLoaded` - when the contant of this element is loaded
- `hashchange` - listening for the change within a page (when you have an href="#LocationOnPage")
- `beforeunload` - when someone wants to leave your website.

---

### CSS Events

- `transitionend` - when a CSS transition ends
- `animationstart` - when an animation starts
- `animationend` - when an animation ends

---

### Events and DOM Nodes

All DOM nodes have methods we can use to _notify_ us of an event.

- [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) - 2 required arguments: (WhatImListeningFor, WhatToDoWhenCalled)
- [`removeEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

```js
// Example
function handleOuch = function (event) {
    event.prevetDefault();
    console.log("ouch!");
}

const button = document.createElement('button');
button.id = "btn";
button.addEventListener('click', handleOuch);
button.removeEventListener('click', handleOuch);
```
very common to call our event handler function "handleAction"

---

### [Event Object](https://www.w3schools.com/jsref/obj_event.asp)

Event handler functions are passed an argument, when events are triggered.

This object includes lots of stuff.

- `preventDefault()`
- `target`
- `stopPropagation()`

---
    
### Default Actions

Some events have _default_ actions associated to them.

- click a link
- press down arrow
- click `submit` in a Form

In most cases handlers are called _before_ the default action takes place.

You can prevent the _default_ action from happening by calling `event.preventDefault();` in the eventListener function.

---
    
### target

- The  `target` property refers to the node where they originated. (example)
- With an `input`, use `event.target.value` to read what was entered into an `input`.

---

### Propagation

Handlers registered on nodes with children will also receive events that happen in the children.

```html
<div>
    <ul>
        <li><a href="#"><img scr="..."></a></li>
        ...
    </ul>
</div>
```
by clicking on a child, I'm actually also clicking on the paret. 
when I click on the img, I'm also clicking on the `<li>`
---

### 3 Phases of Event Propagation

- The Event Capture Phase
- The Event Target Phase
- The Event Bubbling Phase

**most** events bubble

---

<img src='./assets/propagation_bubbling.png' />

[Source](https://www.sitepoint.com/event-bubbling-javascript/)

---

`<p>A paragraph with a <button id="the-btn">button</button>.</p>`

```js
    
let para = document.querySelector("p");
let button = document.querySelector("button");

para.addEventListener("mousedown", () => {
    console.log("Handler for paragraph.");
});

button.addEventListener("mousedown", event => {
    console.log("Handler for button.");
    if (event.button == 2) event.stopPropagation();
});
```

the node that has the vent listener will trigger first.
th function triggers when you hit the target.
event.button == 2 (right button)
event.button default is left
event.target IS A READ ONLY

---

## Events and the Event Loop

Events can only be processed when _nothing_ else is running.

This means that other page processes will be delayed until there is time to process it.

This can occur if you have long-running event handlers, or _lots_ of short-running ones.

---

[Read a little more deeply...](https://eloquentjavascript.net/15_event.html)

---
