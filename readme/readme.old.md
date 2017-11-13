T# Enola G.A.E. - Game Application Engine

Enola is not a frameworke, per se, but rather a number conventions and libraries used to create extensisible applications 

## Convention: Entry Points 

Many languages use the concept of functions as [entry points](https://en.wikipedia.org/wiki/Entry_point).
We can use a similar concept to structure the main part of our programs.
Instead of plain fuctions, however; we use generator functions use the "yield" keyword to handle our programs ourput.

### Hello world 

We can write a simple 'hello world' as follows:

```javascript
//program-hello-world.js
export default function *(){
    yield "hello world";
}
```

Running the program on its own does not produce output.

#### Renderer

To get the output of our program, we'll also need a simple renderer:

```javascript
//render-to-console.js
export default (program)=>{
    for(const output of program){
        console.log(output);
    }
}
```

We combine the program with the renderer to create a program that produce output.

```javascript
//main1.js
import program from './program-hello-world.js';
import render from './render-to-console.js';
render(program());
```

```bash
>node main1.js
hello world
```

Separating the renderer from the program's logic allows one to easily change how a program is rendered.
By using a different renderer, the same program writes to a file named "output.text" rather than rendering to the console.

```javascript
//render-to-file.js
import fs from 'fs';
const FILE_NAME = './output.text'
export default (program)=>{
    for(const output of program){
        fs.appendFileSync(FILE_NAME, output)
    }
}
```

```javascript
//main2.js
import program from './program-hello-world.js';
import render from './render-to-file.js';
render(program());
```

```bash
>node main2.js
>cat output.text
hello world
```

Output can be yielded multiple times:

```javascript
//hello-world-multiline.js
export default function * (){
    yield "hello";
    yield "world"; 
}
```

```javascript
//main3.js
import program from './program-hello-world-multiline.js';
import render from './render-to-console.js';
render(program())
```

```bash
>node main.js
hello
world
```

```javascript
//program-descriptions.js
export default function *(){
    yield ["Alice", "Alice is smart."]
    yield ["Bob", "Bob is funny."]
}
```

```javascript
//render-to-file-with-names.js
import fs from 'fs';
export default (program)=>{
    for(const [name, description] of program){
        fs.appendFileSync(name, description)
    }
}
```

```javascript
//main4.js
import program from './program-descriptions.js';
import render from './render-to-file-with-names.js';
render(program())
```

```bash
>node main.js
>cat Alice
Alice is smart.
>cat Bob
Bob is funny.
```


```javascript
//program-descriptions-from-input.js
export default function *(state){
    for(const pair of state){
        yield pair
    }
}
```

```javascript
//state.js
export default [
   ["Alice", "Alice is smart."],
   ["Bob", "Bob is funny."]
]
```

```javascript
//main5.js
import program from './program-descriptions-from-input.js';
import render from './render-to-file-with-names.js';
import state from './state.js';
render(program(state));
```

```bash
>node main.js
>cat Alice
Alice is smart.
```
#### Asynchronsity

Buy using an asynchronous render function, we can take advantage of 

```javascript
//program-response-from-initial-state.js
import {fetch} from 'window';
export default async function *(urls){
    for(const input of urls){
        yield [input, await fetch(input)];
    }
}
```

```javascript
//render-to-url-responses-async.js
import fs from 'fs';
export default async (program)=>{
    for await(const [url, response] of program){
        console.log(url, ":" ,response);
    }
}
```

```javascript
//urls.js
export default ["http://www.google.com", "http://www.yahoo.com"]
```

```javascript
//main6.js
import program from './program-response-from-initial-state.js';
import render from './render-to-file-with-names.js';
import state from './urls.js';
render(program(state));
```

```bash
>node main.js
http://www.google.com:[Object Object]
http://www.yahoo.com:[Object Object]
```

### Asynchronous Input

Asynchronous input is tricky, but simple. Let's first look at an asynchronos example and break it down.

By convention, we'll pass a function, **request**, as a second argument, to our program.
When called, request will return a promise. 

```javascript
//program-async-input.js
export default async function *(input, request){
   yield "What is your name?";
   yield `Hello ${await request()}.`;
}
```

Outside of our program, we all, by convention, use a function, **respond**, that's directly connected to **request** in that the promise returned by **request** will be fulfilled with the value passed to **respond**.

```javascript
//console-input.js
import prompt from "prompt";
import {promisify} from "util";
const get = promisify(prompt.get);
export default async(...inputs)=>{
    while(true){
        for(const input of inputs ){
            await input(await get());
        }
    }
}
```


```javascript
//main7.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input.js';
import render from './render-to-console-async.js';
import connectInput from './console-input.js';
const {respond, request} = generatePair();
render(program(null, request));
connectInput(respond);
```


```bash
>node main.js
What is your Name?
>John
Hello John.
```


```javascript
//window-input.js
export default (input)=>{
    window.input = input
}
```


```javascript
//main8.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input.js';
import render from './render-to-console-async.js';
import connectInput from './window-input.js';
const {respond, request} = generatePair();
render(program(null, request));
connectInput(respond);
```

```console
What is your Name
>window.input("John")
Hello John.
```

'generatePair' optinally takes an 

Alternatively, the "input" method can be set on an object via by passing it as the first argument to "generatePair"

```javascript
//main9.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input.js';
import render from './render-to-console-async.js';
const {request} = generatePair(window);
render(program(null, request));
```

```console
What is your Name
>window.input("John")
Hello John.
```

A second argument to "generatePair" controls the name of the input function when attached:

```javascript
//main10.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input.js';
import render from './render-to-console-async.js';
const {request} = generatePair(window, "go");
render(program(null, request));
```

```console
What is your Name
>window.go("John")
Hello John.
```


Input can also be simulated

```javascript
//program-async-input-2.js
export default async function *(input, request){
    yield "What is your name?";
    yield `Hello ${await request()}.`;
    yield "What time is it?";
    yield `The time is now ${await request()}.`;
 };
```

```console
What is your Name?
Hello John.
The time is now 12:00.
```

```javascript
//main11.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input-2.js';
import render from './render-to-console-async.js';
const {respond, request} = generatePair();
render(program(null, request));
const samples = ['John', '12:00'];
setTimeout(async ()=>{
    for(const sample of samples){
        await respond(sample);
    }
});
```

```javascript
//main12.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input-2-ids.js';
import render from './render-to-console-async.js';
const {respond, request} = generatePair();
render(program(null, request));
const samples = ['John', '11:00', 'Me'];
const test = async ()=>{
    const id0 = await respond(samples[0]);
    console.info('debug', id0, sample[0]);
    const id1 = await respond(samples[1]);
    //Bug: last call to respond silently fails without throwing an error.
    console.info('debug', id1, sample[1]);
}
setTimeout(test);
```

Programs can also be composed by passing the output of one to the respond function that corresponds to the request function passed in to another.

```javascript
//render-passthrough.js
export default async (program, respond=console.log, ...rest)=>{
    for await(const output of program){
        await respond(output);
        for (const respond of rest){
            await respond(output)
        }
    }
}
```

```javascript
//program-output-modifier.js
export default async function *(modifier, request){
    while(true){
        yield `${modifier}${await request()}`;
    }
}
```

```javascript
//main13.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input.js';
import program2 from './program-output-modifier.js';
import render from './render-to-console-async';
import renderPassthrough from './render-passthrough';
const {respond:respondB, request:requestA} = generatePair();
const {request:requestB} = generatePair(window);
renderPassthrough(program(null, requestB), respondB);
render(program2(null, requestA));
```
# Composition

Multiple programs can be chained manually:
// respond() = program0(null) | program1(null) | program2("> ")

```javascript
//program-input-modifier.js
export default async function *(input, request){
    while(true){
        yield `{${await request()}}`;
    }
}
```

```javascript
//main14.js
import generatePair from "../../../_shared/AsyncInput";
import program0 from './program-output-modifier.js';
import program1 from './program-async-input.js';
import program2 from './program-output-modifier.js';
import render from './render-to-console-async';
import connectInput from './window-input';
import renderPassthrough from './render-passthrough';
const {request, respond} = generatePair();
const {request:requestB, respond:respondB} = generatePair();
const {request:requestC, respond:respondC} = generatePair();
renderPassthrough(program0(null, request), respondB);
renderPassthrough(program1(null, requestB), respondC);
render(program2('>', requestC));
connectInput(respond);
```


Or automatically using a compose programs function.

```javascript
//transform-function.js
export const post(current, post=_=>_)=>async (...args)=>await post(await current(...args));
export const pre(current, pre=_=>_)=>async (...args)=>await current(await pre(...args));
```


```javascript
//compose-programs.js
import generatePair from "../../../_shared/AsyncInput";
import renderPassthrough from './render-passthrough';
import pre from "./transform-function.js";
export default (...programs) =>(initialRequest)=>{
    const [lastInit, lastProgram] = programs.pop();
    let request = initialRequest
    for(const [program, init] of programs){
        let {request:requestNext, respond} = generatePair();  
        renderPassthrough(program(init, request), respond);
        request = requestNext;
    }
    return lastProgram(lastInit, request);
}
```

```javascript
//main15.js
import generatePair from "../../../_shared/AsyncInput";
import program0 from './program-input-modifier.js';
import program1 from './program-async-input.js';
import program2 from './program-output-modifier.js';
import render from './render-to-console-async';
import connectInput from './window-input';
import composePrograms from './compose-programs';
const {request, respond} = generatePair();
const composedProgram = composePrograms(
    [program0, null],
    [program1, null],
    [program2, "> "]);
render(composedProgram(request));
connectInput(respond);
```

### Forking

//                              |--> programA(null)
// respond() = program(null) --
//                              |--> programB("> ")

```javascript
//main16.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input.js';
import programA from './program-input-modifier.js';
import programB from './program-output-modifier.js';
import render from './render-to-console-async';
import connectInput from './window-input';
import renderPassthrough from './render-passthrough';
const {request, respond} = generatePair();
const {request:requestA, respond:respondA} = generatePair();
const {request:requestB, respond:respondB} = generatePair();
renderPassthrough(program(null, request), respondA, respondB);
render(programA(null, requestA));
render(programB(":", requestB));
connectInput(respond);
```

```javascript
//fork.js
import generatePair from "../../../_shared/AsyncInput";
import renderPassthrough from './render-passthrough';
export default (...programs) => {
    const ps = [];
    for(const [program, init] of programs){
        const {request, respond} = generatePair();
        ps.push({init, program, request, respond});
    }
    return (program) => {
        const responds = ps.map(({respond})=>respond);
        renderPassthrough(program, ...responds);
        return ps.map(({init, program, request})=>program(init, request));
    }
}
```


```javascript
//main17.js
import generatePair from "../../../_shared/AsyncInput";
import program from './program-async-input.js';
import programA from './program-input-modifier.js';
import programB from './program-output-modifier.js';
import render from './render-to-console-async';
import connectInput from './window-input';
import renderPassthrough from './render-passthrough';
import createForkOnto from './fork';
const {request, respond} = generatePair();
const running = program(null, request);
connectInput(respond);
const onto = createForkOnto([programA, null], [programB, "> "]);
for(const fork of onto(running)){
    render(fork);
}
```


## CLI

### enola

### enola run

Enola run 

```bash
>enola run hello-world.js
hello world
```

```bash
>enola run hello-world-multiline.js
hello world
```

```bash
>enola run description-from-input.js --state state.js
Alice is smart.
Bob is tall.
```

```bash
>enola run async-input.js
What is your Name?
>John
Hello John.
```


```bash
enloa run\
    --stdout --stdin --prompt --compile --cycle
    program0.js --init init0.js --before before0.js --after after0.js --spy\
    <program> -i <init> -b <before> -a <after> --syp?\
```

### enola init

Initializes application

```bash
>enola init app
Name?(app)
Renderer? (none, cli, lit , [react])
>ls app
package.json
main.js
program.js
state.js
interface.js
>cat app/package.json
{
    "name":"app",
    "main":"main.js",
    "dependencies":{
        "AsyncInput":"0.0.0"
    }
}
>cat app/main.js
import program from "./program";
import generateInput from "AsyncInput";
import createRender from "enola-react";
import window from "window";
import interface from "./interface.js";
const {respond, request} = generateInput();
const target = window.document.body;
const render = createRender(target, interface, respond);
import state from "./state";
const main = async ()=>{
    for await(const output of program(state, request)){
        render(output);
    }
};
main();
>cat app/program.js
export default async function *(state, request){
    yield state;
    while(true){
        yield await request();
    }
}
>cat app/state.js
export default {};
```
## Renderer Libraries

### enola-lit
```javascript
//lit interface
import { html } from 'lit-html.js';
export default ({counter}, respond)=>html`<body>
<button onclick=${()=>respond({counter:counter === counter ? 1 : 0})}>${counter}</button>
</body>`
```

### enola-react
```javascript
//react interface
import React from "react";
export default ({counter, respond}) => <Body>
        <Button onclick={()=>respond({counter:counter === counter ? "!" : ""})}>{counter}</Button>
    </Body>
```
## Studio

#### electron

#### react-native

