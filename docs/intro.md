# <a name="introduction"></a>Introduction

Many programming languages use the concept of functions as [entry points](https://en.wikipedia.org/wiki/Entry_point) to transfer control between programs.

## <a name="introduction-synchronous-endpoints"></a> Synchronous Endpoints

In javascript, this is as simple as writing a function and calling it:

**Example 1**

```javascript
const program = function() {
  console.log("hello world");
};

program();
//logs "hello world"
```

Taking a queue from functional programming, we can remove the logging side affect from the main program
into a separate **render** function that logs the result retuned from running:

**Example 2**

```javascript
const render = console.log;

const program = function() {
  return "hello world";
};

render(program());
//logs "hello world"
```

## <a name="introduction-synchronous-iteration"></a> Synchronous Iteration

Provided that our render function expects an iterator,
We can construct our program with a **generator function** to yeild multiple results:

**Example 3**

```javascript
const render = iterator => {
  //as the result is an iterator
  //we iterate though it and log each subsequent result
  for (const result of iterator) {
    console.log(result);
  }
};

const program = function*() {
  yield "hello";
  yield "world";
};

render(program());
//logs "hello"
//logs "world"
```

## <a name="introduction-asynchronous-iteration"></a> Asynchronous Iteration

When using **asynchronous generators**, we can **await** asynchronous APIs,
though we must again make sure to modify our fetch function.

**Example 4**

```javascript
const render = async asynchronousIterator => {
  //we use the "for await" construct for Asynchronous Iterators
  for await (const result of asynchronousIterator) {
    console.log(result);
  }
};

const program = async function*() {
  yield "fetching...";
  yield await fetch("https://www.google.com");
  yield "results fetched.";
};
render(program());
//logs "fetching..."
//logs result from fetch.
//logs "results fetched."
```

## <a name="introduction-asynchronous-input"></a> Asynchronous Input and Interactive Programs

With a few small tricks, asynchronous generators can as fully interactive programs.

We'll need a pair of functions: well call them "request" and "respond".

When a program calles _request_, it will return a promise.
This promise will then be fulfilled with the input of the next call to _respond_.
While you can create these functions yourself,
a method of creating them is included with the `async-endpoint` library.

```javascript
import { channel } from "async-endpoint";
const [request, respond] = channel();
```

By convention, we'll pass two arguments to our asynchronous generator function:

    - an _init_ object, which may or may not be ignored
    - the aforementioned _request_ function

```javascript
const program = async function *(init, request){
    ...
}
```

Finally, we need to connect the _respond_ object to user input.
If running in a browser, you could simply attach it to the window object:

```javascript
window.respond = respond;
```

Or, if running in node, you can use the included `inputConsole` function:

```javascript
import { inputConsole } from "async-endpoint";
inputConsole(respond);
```

Puttig it all together, we can write an interactive program like this:
(Note that instead of defining a render function, we're using the
generic `renderer` from the `async-endpoit` library instead of writing our own this time).

**Example 5** --

```javascript
import { channel, inputConsole, renderer } from "async-endpoint";

const render = renderer();

const program = async function*(init, request) {
  yield "What's your name?";
  yield `Hello ${await request()}`;
};

const [request, respond] = channel();

inputConsole(respond);

render(program(undefined, request)); //the init object will be ignored
//logs "
```

# <a name="application-programming-interface"></a> API
