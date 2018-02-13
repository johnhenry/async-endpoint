# Async Endpoint

![Async Endpoint Logo](logo.png)

**Asynchronous Endpoints**, especially when paired with a **functional style of programming**,
provide a sound method of writing programs in JavaScripts that are

    - testable
    - maintainable
    - extendable
    - composeable
    - easy to reason about
    - standard based*

This repository provides a brief intoduction to asynchronous endpoints\*\*, along with a helper library `async-endpoint` to help make a few things easier.

\*Okay... I'm a bit eary on this. This heavily depends upon a [Asynchronous Iterators](), currently a stage 3 ecmascript proposal. Until the spec is finalized, you may use transpilers such as [babel]() or bundleers such as [web pack]() to take advantage of thi feature.

## Table of contents

* <a href="#introduction">Introduction</a>

  * <a href="#introduction-synchronous-endpoints">Synchronous Endpoints</a>
  * <a href="#introduction-synchronous-iteration">Synchronous Iteration</a>
  * <a href="#introduction-asynchronous-iteration">Asynchronous Iteration</a>
  * <a href="#introduction-asynchronous-input">Asynchronous Input</a>

* <a href="#application-programming-interface">API</a>
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

**Example 5**

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

## Members

<dl>
<dt><a href="#channel">channel</a> ⇒ <code><a href="#AsyncPair">AsyncPair</a></code></dt>
<dd><p>creates a pair of asynchronous functions used to transfer objects between programs</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#composePrograms">composePrograms(request, ...programs)</a> ⇒ <code>AsynchornousIterator</code></dt>
<dd><p>composes programs sequentially with a single input</p>
</dd>
<dt><a href="#creates an iterator whose values are mapped from another">creates an iterator whose values are mapped from another(iterator, mapper)</a> ⇒ <code>AsynchornousIterator</code></dt>
<dd></dd>
<dt><a href="#executes a provided funcition for each item of an iterator">executes a provided funcition for each item of an iterator(iterator, handler)</a> ⇒ <code>undefined</code></dt>
<dd></dd>
<dt><a href="#filter">filter(iterator, filterer)</a> ⇒ <code>AsynchornousIterator</code></dt>
<dd><p>creates an iterator whose values are filtered from another</p>
</dd>
<dt><a href="#reduce">reduce(iterator, reducer, [inital], [condition], [resetInitial])</a> ⇒ <code>AsynchornousIterator</code></dt>
<dd><p>creates an iterator whose values are reduced from another</p>
</dd>
<dt><a href="#pause">pause(milliseconds, value)</a> ⇒ <code>Promise</code></dt>
<dd><p>returns a resolved promise after a given amount of time
useful for pausing asynchronous programs</p>
</dd>
<dt><a href="#composeAsyncTransformer">composeAsyncTransformer(last, first)</a> ⇒ <code><a href="#AsyncTransformer">AsyncTransformer</a></code></dt>
<dd><p>composes two asynchoronous transformers</p>
</dd>
<dt><a href="#createQueue">createQueue(...initial)</a> ⇒ <code><a href="#PushPair">PushPair</a></code></dt>
<dd><p>create a queue iterator</p>
</dd>
<dt><a href="#createStack">createStack(...initial)</a> ⇒ <code><a href="#PushPair">PushPair</a></code></dt>
<dd><p>create a stack iterator</p>
</dd>
<dt><a href="#createProgramQueue">createProgramQueue()</a> ⇒ <code><a href="#PushPair">PushPair</a></code></dt>
<dd><p>identity program that outputs what ever is input
Like &quot;queue&quot;, but accepts program as input</p>
</dd>
<dt><a href="#createProgramStack">createProgramStack()</a> ⇒ <code><a href="#PushPair">PushPair</a></code></dt>
<dd><p>identity program that outputs what ever is input
Like &quot;queue&quot;, but accepts program as input</p>
</dd>
<dt><a href="#take">take(iterator, num, [skip])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>extract items from iterator as array</p>
</dd>
<dt><a href="#takeWhile">takeWhile(iterator, accept, [skip])</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>extract first set of items that match a given condition as an array</p>
</dd>
<dt><a href="#identity">identity([delay], request)</a> ⇒ <code>AsynchronousIterator</code></dt>
<dd><p>program that outputs what ever is put throught</p>
</dd>
<dt><a href="#continuousOutput">continuousOutput([sample])</a> ⇒ <code>AsynchronousIterator</code></dt>
<dd><p>program that takes no input and contiuously outputs result of calling function</p>
</dd>
<dt><a href="#renderer">renderer([...targets])</a> ⇒ <code><a href="#AsyncRenderFunction">AsyncRenderFunction</a></code></dt>
<dd><p>creates a render function that renders yeilded results from programs
to any number of target functions. If no targets are given, objects will be rendered
using &quot;console.log&quot;
Can be used as a &quot;passthrough&quot; (see &quot;createQueue&quot; example)</p>
</dd>
<dt><a href="#tee">tee(...programs)</a> ⇒ <code><a href="#AsyncRenderFunction">AsyncRenderFunction</a></code></dt>
<dd><p>creates a render function whos&#39;s values are teed on to given
It may be advantageous to use this along side a programQueue</p>
</dd>
<dt><a href="#inputConsole">inputConsole(respond)</a></dt>
<dd><p>send input typed into console to a PairedRespond function</p>
</dd>
<dt><a href="#inputPipe">inputPipe(respond)</a></dt>
<dd><p>send input piped to console to a PairedRespond function</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PairedRequest">PairedRequest</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>a function that receives it&#39;s response from a paired PairedRespond function</p>
</dd>
<dt><a href="#PairedRespond">PairedRespond</a> : <code>function</code></dt>
<dd><p>a function that sends it&#39;s input to a paired PairedRequest function</p>
</dd>
<dt><a href="#AsyncPair">AsyncPair</a> : <code>Array</code></dt>
<dd><p>a pair of paired PairedRequest and PairedRespond functions</p>
</dd>
<dt><a href="#AsyncTransformer">AsyncTransformer</a> ⇒ <code>*</code></dt>
<dd><p>stateless asynchronous function that transforms input without side effects</p>
</dd>
<dt><a href="#Program">Program</a> ⇒ <code>AsynchronousIterator</code></dt>
<dd><p>an iteractive program</p>
</dd>
<dt><a href="#AsyncRenderFunction">AsyncRenderFunction</a> : <code>function</code></dt>
<dd><p>a function that renders values from a given [Asynchronous] Iterator</p>
</dd>
<dt><a href="#PushPair">PushPair</a> : <code>Array</code></dt>
<dd><p>an iterator and a paired function to add to it</p>
</dd>
</dl>

<a name="channel"></a>

## channel ⇒ [<code>AsyncPair</code>](#AsyncPair)

creates a pair of asynchronous functions used to transfer objects between programs

**Kind**: global variable  
**Returns**: [<code>AsyncPair</code>](#AsyncPair) - array of paired functions  
**Example**

```js
import { channel } from "async-endpoint";
const [request, respond] = channel();
const main = async () => {
  setTimeout(() => {
    respond("hello");
  });
  console.log(await request());
};
main();
//logs "hello"
```

<a name="composePrograms"></a>

## composePrograms(request, ...programs) ⇒ <code>AsynchornousIterator</code>

composes programs sequentially with a single input

**Kind**: global function  
**Returns**: <code>AsynchornousIterator</code> - resulting iterator

| Param       | Type                                         | Description                          |
| ----------- | -------------------------------------------- | ------------------------------------ |
| request     | [<code>PairedRequest</code>](#PairedRequest) | request function for input           |
| ...programs | [<code>Program</code>](#Program)             | programs to be composed sequentially |

**Example**

```js
import {composePrograms} from "async-endpoint";
import porgram1, program1, program3 from "....js";
const [request, respond] = channel();
const program = composePrograms(request, program1, program2, program3);
window.respond = respond;
```

<a name="creates an iterator whose values are mapped from another"></a>

## creates an iterator whose values are mapped from another(iterator, mapper) ⇒ <code>AsynchornousIterator</code>

**Kind**: global function  
**Returns**: <code>AsynchornousIterator</code> - resulting iterator

| Param    | Type                                               | Description                         |
| -------- | -------------------------------------------------- | ----------------------------------- |
| iterator | <code>AsynchornousIterator</code>                  | iterator to be mapped               |
| mapper   | [<code>AsyncTransformer</code>](#AsyncTransformer) | transformation for individual items |

**Example**

```js
import {map, continuousOutput},  from "async-endpoint";
let i = 0;
const mapped = map(continuousOutput(()=>i++), (n) => n + 2);
const main = async ()=>{
 for await(item of mapped){
     console.log(item);
 }
}
main();
logs "2"
logs "3"
logs "4"
...
```

<a name="executes a provided funcition for each item of an iterator"></a>

## executes a provided funcition for each item of an iterator(iterator, handler) ⇒ <code>undefined</code>

**Kind**: global function

| Param    | Type                                               | Description       |
| -------- | -------------------------------------------------- | ----------------- |
| iterator | <code>AsynchornousIterator</code>                  | iterator          |
| handler  | [<code>AsyncTransformer</code>](#AsyncTransformer) | provided function |

**Example**

```js
import {forEach, continuousOutput},  from "async-endpoint";
let i = 0;
forEach(continuousOutput(()=>i++, console.log));
main();
logs "2"
logs "3"
logs "4"
...
```

<a name="filter"></a>

## filter(iterator, filterer) ⇒ <code>AsynchornousIterator</code>

creates an iterator whose values are filtered from another

**Kind**: global function  
**Returns**: <code>AsynchornousIterator</code> - filtered iterator

| Param    | Type                              | Description                |
| -------- | --------------------------------- | -------------------------- |
| iterator | <code>AsynchornousIterator</code> | iterator to be filtered    |
| filterer | <code>function</code>             | boolean filtering function |

**Example**

```js
import {filter, continuousOutput} from "async-endpoint";
let i = 0;
const filtered =filter(continuousOutput(()=>i++),  (n)=>n%2);
const main = async ()=>{
 for await(item of filtered){
     console.log(item);
 }
}
main();
logs "1"
logs "3"
logs "5"
```

<a name="reduce"></a>

## reduce(iterator, reducer, [inital], [condition], [resetInitial]) ⇒ <code>AsynchornousIterator</code>

creates an iterator whose values are reduced from another

**Kind**: global function  
**Returns**: <code>AsynchornousIterator</code> - reduced iterator

| Param          | Type                              | Default                                       | Description                                                             |
| -------------- | --------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| iterator       | <code>AsynchornousIterator</code> |                                               | iterator to be reduced                                                  |
| reducer        | <code>function</code>             |                                               | reducing function                                                       |
| [inital]       | <code>\*</code>                   |                                               | initial object to reduce into                                           |
| [condition]    | <code>function</code>             | <code>(item, initial) &#x3D;&gt; false</code> | boolean filtering function indicating when to start new reduction phase |
| [resetInitial] | <code>function</code>             | <code>()&#x3D;&gt;initial</code>              | method to reset/replace initial reduction object                        |

**Example**

```js
import {reduce, continuousOutput} from "async-endpoint";
let i = 0;
const reduced = reduce(continuousOutput(()=>i++) , (previous, current)=>previous.push(current),[], (x)=!(x%5), ()=>([]));
const main = async ()=>{
 for await(item of reduced){
     console.log(item);
 }
}
main();
logs "[0]"
logs "[1, 2, 3, 4, 5]"
 ...
```

<a name="pause"></a>

## pause(milliseconds, value) ⇒ <code>Promise</code>

returns a resolved promise after a given amount of time
useful for pausing asynchronous programs

**Kind**: global function  
**Returns**: <code>Promise</code> - promise fulfilled with value

| Param        | Type                | Description             |
| ------------ | ------------------- | ----------------------- |
| milliseconds | <code>Number</code> | time to pause           |
| value        | <code>\*</code>     | optional returned value |

**Example**

```js
import { pause } from "async-endopint.js";
const main = async () => {
  console.log("hello");
  await pause(1000);
  console.log("goodbye");
};
main();
//logs "hello"
//logs "goodbye" (after 1 second)
```

<a name="composeAsyncTransformer"></a>

## composeAsyncTransformer(last, first) ⇒ [<code>AsyncTransformer</code>](#AsyncTransformer)

composes two asynchoronous transformers

**Kind**: global function  
**Returns**: [<code>AsyncTransformer</code>](#AsyncTransformer) - asynchonous compositon of current and pre

| Param | Type                                               | Description                |
| ----- | -------------------------------------------------- | -------------------------- |
| last  | [<code>AsyncTransformer</code>](#AsyncTransformer) | transformer to apply last  |
| first | [<code>AsyncTransformer</code>](#AsyncTransformer) | transformer to apply first |

**Example**

```js
import { composeAsyncTransformer } from "async-endopint.js";
const t1 = async x => `<${x}>`;
const t2 = async x => `[${x}]`;
const t = composeAsyncTransformer(t1, t2);
t("hello").then(console.log);
//logs "<[hello]>"
```

<a name="createQueue"></a>

## createQueue(...initial) ⇒ [<code>PushPair</code>](#PushPair)

create a queue iterator

**Kind**: global function  
**Returns**: [<code>PushPair</code>](#PushPair) - queue and push function

| Param      | Type            | Description            |
| ---------- | --------------- | ---------------------- |
| ...initial | <code>\*</code> | initial items in queue |

**Example**

```js
import {createQueue, channel, renderer, renderer as createPassThrough} from "async-endpoint";
import porgram1, program1, program3 from "....js";
const [queue, push] createQueue();
const passthrough = createPassThrough(push);
passthrough(porgram1(), program2(), program3());
const render = renderer();
render(queue);
```

<a name="createStack"></a>

## createStack(...initial) ⇒ [<code>PushPair</code>](#PushPair)

create a stack iterator

**Kind**: global function  
**Returns**: [<code>PushPair</code>](#PushPair) - stack and push function

| Param      | Type            | Description            |
| ---------- | --------------- | ---------------------- |
| ...initial | <code>\*</code> | initial items on stack |

**Example**

```js
import {createStack, channel, renderer, renderer as createPassThrough} from "async-endpoint";
import porgram1, program1, program3 from "....js";
const [stack, push] createStack();
const passthrough = createPassThrough(push);
passthrough(porgram1(), program2(), program3());
const render = renderer();
render(stack);
```

<a name="createProgramQueue"></a>

## createProgramQueue() ⇒ [<code>PushPair</code>](#PushPair)

identity program that outputs what ever is input
Like "queue", but accepts program as input

**Kind**: global function  
**Returns**: [<code>PushPair</code>](#PushPair) - iterator and push function  
**Example**

```js
import {createProgramQueue, channel, renderer} from "async-endpoint";
import porgram1, program1, program3 from "....js";
const [queue, push] = createProgramQueue();
push(porgram1(), program2(), program3());
const render = renderer();
render(queue);
```

<a name="createProgramStack"></a>

## createProgramStack() ⇒ [<code>PushPair</code>](#PushPair)

identity program that outputs what ever is input
Like "queue", but accepts program as input

**Kind**: global function  
**Returns**: [<code>PushPair</code>](#PushPair) - iterator and push function  
**Example**

```js
import {createProgramStack, channel, renderer} from "async-endpoint";
import porgram1, program1, program3 from "....js";
const [stack, push] = createProgramStack();
push(porgram1(), program2(), program3());
const render = renderer();
render(stack);
```

<a name="take"></a>

## take(iterator, num, [skip]) ⇒ <code>Promise.&lt;Array&gt;</code>

extract items from iterator as array

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - stack and push function

| Param    | Type                              | Default        | Description                           |
| -------- | --------------------------------- | -------------- | ------------------------------------- |
| iterator | <code>AsynchronousIterator</code> |                | iterator from which to take           |
| num      | <code>Number</code>               |                | number of items to take from iterator |
| [skip]   | <code>Number</code>               | <code>0</code> | number of items to skip before taking |

**Example**

```js
import { take, continuousOutput } from "async-endpoint";
let i = 0;
take(continuousOutput(() => i++), 3, 1).then(taken => console.log(taken));
//logs "[1,2,3]"
```

<a name="takeWhile"></a>

## takeWhile(iterator, accept, [skip]) ⇒ <code>Promise.&lt;Array&gt;</code>

extract first set of items that match a given condition as an array

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - stack and push function

| Param    | Type                              | Default        | Description                                                 |
| -------- | --------------------------------- | -------------- | ----------------------------------------------------------- |
| iterator | <code>AsynchronousIterator</code> |                | iterator from which to take                                 |
| accept   | <code>function</code>             |                | boolean filtering function indicating whether to allow item |
| [skip]   | <code>Number</code>               | <code>0</code> | number of items to skip before taking                       |

**Example**

```js
import { takeWhile, continuousOutput } from "async-endpoint";
let i = 0;
takeWhile(continuousOutput(() => i++), x => x < 5, 2).then(taken =>
  console.log(taken)
);
//logs "[2,3,4]"
```

<a name="identity"></a>

## identity([delay], request) ⇒ <code>AsynchronousIterator</code>

program that outputs what ever is put throught

**Kind**: global function  
**Returns**: <code>AsynchronousIterator</code> - resulting iterator

| Param   | Type                                         | Default        | Description                  |
| ------- | -------------------------------------------- | -------------- | ---------------------------- |
| [delay] | <code>\*</code>                              | <code>0</code> | delay between sending output |
| request | [<code>PairedRequest</code>](#PairedRequest) |                | request function for input   |

**Example**

```js
import {identity, renderer channel} from "async-endpoint";
const [request, respond] = channel();
identity(undefined, request);
window.respond = respond
```

<a name="continuousOutput"></a>

## continuousOutput([sample]) ⇒ <code>AsynchronousIterator</code>

program that takes no input and contiuously outputs result of calling function

**Kind**: global function  
**Returns**: <code>AsynchronousIterator</code> - resulting iterator

| Param    | Type            | Default                     | Description                     |
| -------- | --------------- | --------------------------- | ------------------------------- |
| [sample] | <code>\*</code> | <code>()&#x3D;&gt;{}</code> | function whose result to output |

**Example**

```js
import {continuousOutput, renderer} from "async-endpoint";
const render = renderer();
render(continuousOutput(()=>"hello"))
logs "hello" (continously)
...
```

<a name="renderer"></a>

## renderer([...targets]) ⇒ [<code>AsyncRenderFunction</code>](#AsyncRenderFunction)

creates a render function that renders yeilded results from programs
to any number of target functions. If no targets are given, objects will be rendered
using "console.log"
Can be used as a "passthrough" (see "createQueue" example)

**Kind**: global function  
**Returns**: [<code>AsyncRenderFunction</code>](#AsyncRenderFunction) - asychronous render function

| Param        | Type                  | Description                |
| ------------ | --------------------- | -------------------------- |
| [...targets] | <code>function</code> | request function for input |

**Example**

```js
import {renderer, continuousOutput} from "async-input.js";
const render = renderer();
render(continuousOutput);
//logs "0"
//logs "1"
...
```

<a name="tee"></a>

## tee(...programs) ⇒ [<code>AsyncRenderFunction</code>](#AsyncRenderFunction)

creates a render function whos's values are teed on to given
It may be advantageous to use this along side a programQueue

**Kind**: global function  
**Returns**: [<code>AsyncRenderFunction</code>](#AsyncRenderFunction) - asychronous render function

| Param       | Type                             | Description                |
| ----------- | -------------------------------- | -------------------------- |
| ...programs | [<code>Program</code>](#Program) | programs to be sent values |

**Example**

```js
import {tee, continousOutput, renderer} from "async-endpoint";
import porgram1, program1, program3 from "....js";
const instance1 = program1();
const instance2 = program2();
const instance3 = program3();
const render = renderer();
render(instance1, instance2, instance3)
const renderTee = tee(porgram1, program1, program3)
renderTee(continousOutput())
```

<a name="inputConsole"></a>

## inputConsole(respond)

send input typed into console to a PairedRespond function

**Kind**: global function

| Param   | Type                                         | Description                |
| ------- | -------------------------------------------- | -------------------------- |
| respond | [<code>PairedRespond</code>](#PairedRespond) | request function for input |

**Example**

```js
import { inputConsole, identity, channel, renderer } from "async-endpoint";
const [request, respond] = creteAsyncPair();
const render = renderer();
render(identity(undefined, request));
inputConsole(respond);
```

<a name="inputPipe"></a>

## inputPipe(respond)

send input piped to console to a PairedRespond function

**Kind**: global function

| Param   | Type                                         | Description                |
| ------- | -------------------------------------------- | -------------------------- |
| respond | [<code>PairedRespond</code>](#PairedRespond) | request function for input |

**Example**

```js
import { inputPipe, identity, channel, renderer } from "async-endpoint";
const [request, respond] = creteAsyncPair();
const render = renderer();
render(identity(undefined, request));
inputPipe(respond);
```

<a name="PairedRequest"></a>

## PairedRequest ⇒ <code>Promise.&lt;\*&gt;</code>

a function that receives it's response from a paired PairedRespond function

**Kind**: global typedef  
**Returns**: <code>Promise.&lt;\*&gt;</code> - response from respond reunction  
<a name="PairedRespond"></a>

## PairedRespond : <code>function</code>

a function that sends it's input to a paired PairedRequest function

**Kind**: global typedef

| Param    | Type            | Description                   |
| -------- | --------------- | ----------------------------- |
| response | <code>\*</code> | response for request function |

<a name="AsyncPair"></a>

## AsyncPair : <code>Array</code>

a pair of paired PairedRequest and PairedRespond functions

**Kind**: global typedef  
**Properties**

| Name | Type                                         | Description      |
| ---- | -------------------------------------------- | ---------------- |
| 0    | [<code>PairedRequest</code>](#PairedRequest) | request function |
| 1    | [<code>PairedRespond</code>](#PairedRespond) | respond function |

<a name="AsyncTransformer"></a>

## AsyncTransformer ⇒ <code>\*</code>

stateless asynchronous function that transforms input without side effects

**Kind**: global typedef  
**Returns**: <code>\*</code> - transformed input

| Param | Type            | Description |
| ----- | --------------- | ----------- |
| input | <code>\*</code> | input       |

<a name="Program"></a>

## Program ⇒ <code>AsynchronousIterator</code>

an iteractive program

**Kind**: global typedef  
**Returns**: <code>AsynchronousIterator</code> - asynchronous iterator result

| Param   | Type                                         | Description                |
| ------- | -------------------------------------------- | -------------------------- |
| init    | <code>\*</code>                              |                            |
| request | [<code>PairedRequest</code>](#PairedRequest) | request function for input |

<a name="AsyncRenderFunction"></a>

## AsyncRenderFunction : <code>function</code>

a function that renders values from a given [Asynchronous] Iterator

**Kind**: global typedef

| Param           | Type                              |
| --------------- | --------------------------------- |
| program_return; | <code>AsynchronousIterator</code> |

<a name="PushPair"></a>

## PushPair : <code>Array</code>

an iterator and a paired function to add to it

**Kind**: global typedef  
**Properties**

| Name | Type                              | Description                      |
| ---- | --------------------------------- | -------------------------------- |
| 0    | <code>AsynchornousIterator</code> | iterator                         |
| 1    | <code>function</code>             | function used to add to iterator |
