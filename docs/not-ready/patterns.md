const [combined, combine] = combiner();
combine(program1(init1, request1), program2(init2, request2));
const renderToConsole = genericRenderer();
renderToConsole(combined);
consoleInput(respond1, respond2)

const square = x\*\*2;

const normalizeDomain = ()=>{}
const windowToDomain = ()=>{}
const renderWindow = \*(func, getWindow){
for await(const window of getWindow()){
yield await normalizeDomain(await map(await windowToDomain(window), func));
}
};

# API

## APPENDIX

## Rendrerers

A simple renderer, [rendererAsync](), is included with this API. By default, This will render any output directly to the console.

```javascript
//render-async.js
export default async (program, respond = console.log, ...rest) => {
  for await (const output of program) {
    await respond(output);
    for (const respond of rest) {
      await respond(output);
    }
  }
};
```

Creating your own renderer should be pretty straight forward based on the source code for this function. Keep in mind that we've only rendered to the console in the given examples, but you cuould render to anything from DOM elements to sound, depending upon the demands of your application.

Here's a [renderer for react](renderer-async-react). It incrporates the respond function into the renderer, so you can make interactive, self contained graphical applications.

### Forking Renderer

While multiple renders cannot technically, be attached to a single program (
it will break), a renderer can render the output from one program as the input for any numbe of others. Each program can its own individual rendere, effectively allowing, with some overhead, attaching multiple renderes to a single program.

An implementation, [rendererForkAsync](), is included with this API.

## Composition

Control can be yielded from an outer program to an inner program by passing in the respond function. When the instance of the inner program stops running, control will return to the outer program.

inner-program.js

```javascript
export default async function*(name, respond) {
  yield `Hello ${name}!`;
  yield `How old are you (in years)?`;
  yield `You'll be ${Number(await repond()) + 3} in three years`;
}
```

outer-program.js

```javascript
import inner from "inner-program.js";
export default async function *(null, respond){
    yield `What's your name?`
    const name = await respond();
    yield `Hello ${name}`;
    yield `Let's use the Age program for a bit...`;
    for await(const output of inner(name, respond)){
        yield `Age: ${output}`;
    };
    yield `Goodbye ${name}!`;
};
```

```javascript
import program from "outer-program.js";
import {
  channel,
  rendererConsoleAsync,
  respondFromPrompt
} from "async-endpoints";
const [request, respond] = channel();
rendererConsoleAsync(program(null, request));
respondFromPrompt(respond);
// What's your name?
// >John
// Hello John
// Let's use the Age program for a bit...
// Age: Hello John!.
// Age: How old are you (in years)?
// >18
// Age: You'll be 21 in three years
// Goodbye John
```

Rather than yielding control, a pogram may spawn and excnange messages with any number of programs while running.

worker-program.js

```javascript
export default async function*(init, request) {
  while (true) {
    yield `+${init}:${await request()}`;
    yield `-${init}:${await request()}`;
  }
}
```

manager-program.js

```javascript
import worker from "worker-program.js";
export default async function*(receivers, request) {
  for (const receiver of receivers) {
    const [request, respond] = channel();
    receiver.instance = worker(receivers.init, request);
    receiver.respond = respond;
  }
  while (true) {
    yield "Choose a receiver";
    const receiver = receivers[await request()];
    if (receiver) {
      if (receiver.done) {
        continue;
      }
      yield "Choose a message";
      receiver.respond(await request());
      const { value, done } = await receiver.instance.next();
      reciever.done = done;
      yield value;
    } else {
      break;
    }
  }
  yield "goodbye!";
}
```

```javascript
import program from "outemanagerr-program.js";
import {
  channel,
  rendererConsoleAsync,
  respondFromPrompt
} from "async-endpoints";
const [request, respond] = channel();
const receivers = { a: { init: "A" }, b: { init: "B" } };
rendererConsoleAsync(program(receivers, request));
respondFromPrompt(respond);
// Choose a receiver
// >a
// Choose a message
// >1
// +A:1
// Choose a receiver
// >b
// Choose a message
// >2
// +B:2
// Choose a receiver
// >b
// Choose a message
// >3
// -B:3
// Choose a receiver
// >b
// Choose a message
// >4
// -A:4
// Choose a receiver
// >c
// Choose a receiver
// goodbye!
```

### Chaining

Programs can also be chained by using the output of one as the input of another.

```javascript
```

Chaining multiple programs can be cumbersome, so [chain](), is included with this API.

```javascript
import program0 from "...";
import program1 from "...";
import program2 from "...";
import {
  channel,
  rendererConsoleAsync,
  respondFromPrompt,
  chain
} from "async-endpoints";
const [request, respond] = channel();
const instance = chain(request, program0, program1, program2);
rendererConsoleAsync(program(null, request));
respondFromPrompt(instance);
```

identity.js

```javascript
async function *(init, request){
    while(true){
        yield await request();
    }
}
```

for await(program of programs){
queue.push(program.next())
}

...

while(true){
await pause()
if(queue.length){
await respond(await queue.unshift())
}
}

# API

## channel

## rendererConsoleAsync

##

## Create Async Pair

### Console Renderer

### Browser Console Renderer

### Fork Renderer

## Input

### Bowser

# CLI

## Run

# Appendix

https://www.youtube.com/watch?v=0cJqiO_Q0KA

identity.js

```javascript
export default async function *(null, request){
    while(true){
        yield await request();
    }
}
```

#(window async)

pause.js

```javascript
export default (time, debug) =>
  new Promise(resolve => setTimeout(() => resolve(debug)));
```

controller.js

```javascript
import pause
export default async function *(rate=0){
    while(true){
        await pause(rate);
        yield window.navigator.getGamepads();
    }
}

const startControllers = async () => {
    for await (const output of controllerIterator()){
        await respond(output);
    }
}
startControllers();
export default async function *(init, request){
    const gamestate =  new GameState(init);
    while(true){
        const [controller1, controller2, controller3, controller4]
        = await request()
    }
}
```

wsiterator.js

```javascript
```

sseiterator

```javascript
```

https://leanpub.com/purescript/read : Libraries such as React and virtual-dom model views as pure functions of application state.
