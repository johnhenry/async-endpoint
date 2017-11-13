## Members

<dl>
<dt><a href="#createAsyncPair">createAsyncPair</a> ⇒ <code><a href="#AsyncPair">AsyncPair</a></code></dt>
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

<a name="createAsyncPair"></a>

## createAsyncPair ⇒ [<code>AsyncPair</code>](#AsyncPair)
creates a pair of asynchronous functions used to transfer objects between programs

**Kind**: global variable  
**Returns**: [<code>AsyncPair</code>](#AsyncPair) - array of paired functions  
**Example**  
```js
import {createAsyncPair} from "async-endpoint";
const [request, respond] = createAsyncPair();
const main = async()=>{
     setTimeout(()=>{
         respond("hello");
     })
     console.log(await request());
}
main();
//logs "hello"
```
<a name="composePrograms"></a>

## composePrograms(request, ...programs) ⇒ <code>AsynchornousIterator</code>
composes programs sequentially with a single input

**Kind**: global function  
**Returns**: <code>AsynchornousIterator</code> - resulting iterator  

| Param | Type | Description |
| --- | --- | --- |
| request | [<code>PairedRequest</code>](#PairedRequest) | request function for input |
| ...programs | [<code>Program</code>](#Program) | programs to be composed sequentially |

**Example**  
```js
import {composePrograms} from "async-endpoint";
import porgram1, program1, program3 from "...";
const [request, respond] = createAsyncPair();
const program = composePrograms(request, program1, program2, program3);
window.respond = respond;
```
<a name="creates an iterator whose values are mapped from another"></a>

## creates an iterator whose values are mapped from another(iterator, mapper) ⇒ <code>AsynchornousIterator</code>
**Kind**: global function  
**Returns**: <code>AsynchornousIterator</code> - resulting iterator  

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>AsynchornousIterator</code> | iterator to be mapped |
| mapper | [<code>AsyncTransformer</code>](#AsyncTransformer) | transformation for individual items |

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
<a name="filter"></a>

## filter(iterator, filterer) ⇒ <code>AsynchornousIterator</code>
creates an iterator whose values are filtered from another

**Kind**: global function  
**Returns**: <code>AsynchornousIterator</code> - filtered iterator  

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>AsynchornousIterator</code> | iterator to be filtered |
| filterer | <code>function</code> | boolean filtering function |

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

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterator | <code>AsynchornousIterator</code> |  | iterator to be reduced |
| reducer | <code>function</code> |  | reducing function |
| [inital] | <code>\*</code> |  | initial object to reduce into |
| [condition] | <code>function</code> | <code>(item, initial) =&gt; false</code> | boolean filtering function indicating when to start new reduction phase |
| [resetInitial] | <code>function</code> | <code>()=&gt;initial</code> | method to reset/replace initial reduction object |

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

| Param | Type | Description |
| --- | --- | --- |
| milliseconds | <code>Number</code> | time to pause |
| value | <code>\*</code> | optional returned value |

**Example**  
```js
import {pause} from "async-endopint";
const main = async ()=>{
 console.log("hello");
 await pause(1000);
 console.log("goodbye");
}
main();
//logs "hello"
//logs "goodbye" (after 1 second)
```
<a name="composeAsyncTransformer"></a>

## composeAsyncTransformer(last, first) ⇒ [<code>AsyncTransformer</code>](#AsyncTransformer)
composes two asynchoronous transformers

**Kind**: global function  
**Returns**: [<code>AsyncTransformer</code>](#AsyncTransformer) - asynchonous compositon of current and pre  

| Param | Type | Description |
| --- | --- | --- |
| last | [<code>AsyncTransformer</code>](#AsyncTransformer) | transformer to apply last |
| first | [<code>AsyncTransformer</code>](#AsyncTransformer) | transformer to apply first |

**Example**  
```js
import {composeAsyncTransformer} from "async-endopint";
const t1 = async (x)=>`<${x}>`;
const t2 = async (x)=>`[${x}]`;
const t = composeAsyncTransformer(t1, t2);
t("hello").then(console.log);
//logs "<[hello]>"
```
<a name="createQueue"></a>

## createQueue(...initial) ⇒ [<code>PushPair</code>](#PushPair)
create a queue iterator

**Kind**: global function  
**Returns**: [<code>PushPair</code>](#PushPair) - queue and push function  

| Param | Type | Description |
| --- | --- | --- |
| ...initial | <code>\*</code> | initial items in queue |

**Example**  
```js
import {createQueue, createAsyncPair, renderer, renderer as createPassThrough} from "async-endpoint";
import porgram1, program1, program3 from "...";
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

| Param | Type | Description |
| --- | --- | --- |
| ...initial | <code>\*</code> | initial items on stack |

**Example**  
```js
import {createStack, createAsyncPair, renderer, renderer as createPassThrough} from "async-endpoint";
import porgram1, program1, program3 from "...";
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
import {createProgramQueue, createAsyncPair, renderer} from "async-endpoint";
import porgram1, program1, program3 from "...";
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
import {createProgramStack, createAsyncPair, renderer} from "async-endpoint";
import porgram1, program1, program3 from "...";
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

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterator | <code>AsynchronousIterator</code> |  | iterator from which to take |
| num | <code>Number</code> |  | number of items to take from iterator |
| [skip] | <code>Number</code> | <code>0</code> | number of items to skip before taking |

**Example**  
```js
import {take, continuousOutput} from "async-endpoint";
let i = 0;
take(continuousOutput(()=>i++), 3,1).then(taken=>console.log(taken));
//logs "[1,2,3]"
```
<a name="takeWhile"></a>

## takeWhile(iterator, accept, [skip]) ⇒ <code>Promise.&lt;Array&gt;</code>
extract first set of items that match a given condition as an array

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - stack and push function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterator | <code>AsynchronousIterator</code> |  | iterator from which to take |
| accept | <code>function</code> |  | boolean filtering function indicating whether to allow item |
| [skip] | <code>Number</code> | <code>0</code> | number of items to skip before taking |

**Example**  
```js
import {takeWhile, continuousOutput} from "async-endpoint";
let i = 0;
takeWhile(continuousOutput(()=>i++), x  => x < 5, 2).then(taken=>console.log(taken));
//logs "[2,3,4]"
```
<a name="identity"></a>

## identity([delay], request) ⇒ <code>AsynchronousIterator</code>
program that outputs what ever is put throught

**Kind**: global function  
**Returns**: <code>AsynchronousIterator</code> - resulting iterator  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [delay] | <code>\*</code> | <code>0</code> | delay between sending output |
| request | [<code>PairedRequest</code>](#PairedRequest) |  | request function for input |

**Example**  
```js
import {identity, renderer createAsyncPair} from "async-endpoint";
const [request, respond] = createAsyncPair();
identity(undefined, request);
window.respond = respond
```
<a name="continuousOutput"></a>

## continuousOutput([sample]) ⇒ <code>AsynchronousIterator</code>
program that takes no input and contiuously outputs result of calling function

**Kind**: global function  
**Returns**: <code>AsynchronousIterator</code> - resulting iterator  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [sample] | <code>\*</code> | <code>()=&gt;{}</code> | function whose result to output |

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

| Param | Type | Description |
| --- | --- | --- |
| [...targets] | <code>function</code> | request function for input |

**Example**  
```js
import {renderer, continuousOutput} from "async-input";
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

| Param | Type | Description |
| --- | --- | --- |
| ...programs | [<code>Program</code>](#Program) | programs to be sent values |

**Example**  
```js
import {tee, continousOutput, renderer} from "async-endpoint";
import porgram1, program1, program3 from "...";
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

| Param | Type | Description |
| --- | --- | --- |
| respond | [<code>PairedRespond</code>](#PairedRespond) | request function for input |

**Example**  
```js
import {inputConsole, identity, createAsyncPair, renderer} from "async-endpoint";
const [request, respond] = creteAsyncPair();
const render = renderer();
render(identity(undefined, request))
inputConsole(respond);
```
<a name="inputPipe"></a>

## inputPipe(respond)
send input piped to console to a PairedRespond function

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| respond | [<code>PairedRespond</code>](#PairedRespond) | request function for input |

**Example**  
```js
import {inputPipe, identity, createAsyncPair, renderer} from "async-endpoint";
const [request, respond] = creteAsyncPair();
const render = renderer();
render(identity(undefined, request))
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

| Param | Type | Description |
| --- | --- | --- |
| response | <code>\*</code> | response for request function |

<a name="AsyncPair"></a>

## AsyncPair : <code>Array</code>
a pair of paired PairedRequest and PairedRespond functions

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | [<code>PairedRequest</code>](#PairedRequest) | request function |
| 1 | [<code>PairedRespond</code>](#PairedRespond) | respond function |

<a name="AsyncTransformer"></a>

## AsyncTransformer ⇒ <code>\*</code>
stateless asynchronous function that transforms input without side effects

**Kind**: global typedef  
**Returns**: <code>\*</code> - transformed input  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>\*</code> | input |

<a name="Program"></a>

## Program ⇒ <code>AsynchronousIterator</code>
an iteractive program

**Kind**: global typedef  
**Returns**: <code>AsynchronousIterator</code> - asynchronous iterator result  

| Param | Type | Description |
| --- | --- | --- |
| init | <code>\*</code> |  |
| request | [<code>PairedRequest</code>](#PairedRequest) | request function for input |

<a name="AsyncRenderFunction"></a>

## AsyncRenderFunction : <code>function</code>
a function that renders values from a given [Asynchronous] Iterator

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| program_return; | <code>AsynchronousIterator</code> | 

<a name="PushPair"></a>

## PushPair : <code>Array</code>
an iterator and a paired function to add to it

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>AsynchornousIterator</code> | iterator |
| 1 | <code>function</code> | function used to add to iterator |

