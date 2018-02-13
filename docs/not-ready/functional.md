import {dserialize, serialize} from "MLTree";
import {trainingdata, moreTrainingData} from "./data";
import saveData from "./serialized";
const modelTree = await dserialize(saveData);

modelTree();//
{
[id] : {
parent:parentId
},
[id] : {
parent:parentId
}
}

const id0 = await modelTree(undefined, ...trainingData);
const id1 = await modelTree(id0, ...moreTrainingData);
const model = await modelTree(id1);
model ...<choice> -> Map<choice, number>

fs.writeFileSync(
"./serialized",
await serialize(model)
)
//"[0,1,2]..."

function\* player(name, table, done) {
while (true) {
var ball = yield csp.take(table);
if (ball === csp.CLOSED) {
console.log(name + ": table's gone");
return;
}
ball.hits += 1;
//console.log(`hits: ${ball.hits}`);
if (name === 'ping') {
console.log(`${name} ->`);
} else {
console.log(`<- ${name}`);
}
if (ball.hits == 10) {
yield csp.put(done, true);
}
yield csp.timeout(300);
yield csp.put(table, ball);
}
}

csp.go(function\* () {
var table = csp.chan();
var done = csp.chan();

csp.go(player, ["ping", table, done]);
csp.go(player, ["pong", table, done]);

yield csp.put(table, {hits: 0});

yield csp.take(done);
console.log('game over');

table.close();
});

const player = async function \*({message, respond, pauseTime=100}, catchBall){
while(true){
const ball = await catchBall();
ball.message = message;
ball.hits ++;
yield ball
await pause(250);
if(ball.hits === 10){
return;
}
await respond(ball);
}
}
const main = async () =>{
const [fromB, toA] = channel();
const [fromA, toB] = channel();

    const ping = player({message:"ping->", respond:toB}, fromB)
    const pong = player({message:"    <-pong", respond:toA}, fromA)

    genericRenderer(ping);
    genericRenderer(pong);
    toA({hits:0})

}
main();

program(...):iterator<json>
render(<json>):<html?>
style(<html>):DISPLAY

program/
index.js
tests/

Unit testing, including pattern matching, and static type checking
can be used to ensure that outputs of a program match a specific type,
allowing any render function that accepts that type to be used with the program.

renderer/
index.js
tests/

Similarly, when a render function produces HTML, the same techniques
can be used to guarantee the sturcture of the HTML
so that any style sheet can be applied.
You should check for things like "string length".

style/
index.css
tests/

Test can exist outside of the project itself
{  
 "name":"${project}"
"devDependencies":{
"${project}-test":"0.0.0"
},
"scripts"
}

Generic builders shold exist
build <source> [options][template] -> bundle

    source -> options -> template

Prototypin should be easy

Tooling should be minimal

observable -> push

```javascript
const replayer = processor => {
  const replayable = (...args) => {
    processor(...args);
    return replayable.bind(null, ...args);
  };
  return replayable;
};

let logReplayable = replayer((...args) => {
  console.log(...args);
});

for (let i = 0; i < 5; i++) {
  logReplayable = logReplayable(i);
}
```

not functional, but useful with idempotent functions that take immutable values

a: () -> Promise<t>

a': t ->

f: a -> AsynchronousIterator<t>

g: a -> AsynchronousIterator<t>

f . g: a -> AsynchronousIterator<t>

    how do we compose f with g?

f . g: |->
X:a, X':a'
Y:a, Y':a'
f(X)
g(Y).map output |->
X'(output)

---

a: q -> Promise<q'>

f: a -> AsynchronousIterator<Q>

b: r -> Promise<r'>

g: b -> AsynchronousIterator<R>

T: R -> q

    how do we compose f with g?

f . g: |->
X:a, X':a'
Y:a, Y':a'
f(X)
g(Y).map output |->
X'(T(output))

f takes a sequence of inputs, specfiicically responses to requests it makes, and out puts an asynchroous iterator

return : A -> A\*
(a)=>[a]

bind : A -> (A -> B\*) -> B
l => (f) =>

bind takes an elelment from the "monad spance" and produces a mapping
this mapping takes an function mapping
and produces an element in the "monad space"

[request, respond][ask, answer]
[pull, push][pop, unshift]
[take, give][receive, send]
[consume, generate][yield, next]
[source, sink]

a = f => Stream<a>

const fib = (n) => n === 0
? 0
: n === 1
? 1
fib(n -1) + fib(n - 2)

const fib = function \*(){
let fibs = [0, 1];
while(true){
yield fibs[0];
fibs = [fibs[1], fibs[0] + fibs[1] ];
}
}

const fib = function \*(){
const seq = [0, 1];
while(true){
yield seq[0];
seq.unshift(fibs[0] + fibs[1]);
seq.pop();//gc
}
}

const fib = function \*(n){
let first = 0;
if(n > 0){
yield first;
}
let second = 1;
if(n > 1){
yield second;
}
while(n > 1){
n--
const temp = first;
first = second
second = temp+ first
yield second
}
}

const sqrt = function*(n, a0=1, eps=0.0002){
let x = a0;
let y = x;
do{
y = x;
x = (x + n/x)/2;
yield x
} while(Math.abs(x-y) > eps)
}
const sqrt = function *(n, guess=1){
while(true){
yield guess;
guess = (guess + n/guess)/2;
}
}

Tool Theory?

* everything is a tool

const reader = (nodes)=>{
for(const node of nodes){
if(node && typeof node[Symbol.AsyncIterator] === "function"){
yield\* render(nodes)
}else{
yield node
}
}

const input = $
.combine(mouse, keyboar, gamepadd)
.respond(respond)

const prog = $
.compose()
.transform(x=>x+2)
.compose([program2, null])
.fork(consoleRenderer)
.compose(program3)
.fork(consoleRenderer)
.transform(x=>x+3)
.render(renderer)

application.chain(application)

application.

let line = 0

while(true){
switch(line){
start:
case 0:
case 10:
console.log(10);
case 20:
line = 40;
continue start;
console.log(20);
case 30:
console.log(30);
case 40:
console.log(40);
case 50:
console.log(50);
}
}

var i, j;

loop1:
for (;;) { //The first for statement is labeled "loop1"
loop2:
for (j = 0; j < 3; j++) { //The second for statement is labeled "loop2"
if (i === 1 && j === 1) {
continue loop1;
}
console.log('i = ' + i + ', j = ' + j);
}

for (;;) {
start:
switch(line){
case 0:
case 10:
console.log(10);
case 20:
line = 40
continue start;
console.log(20);
case 30:
console.log(30);
case 40:
console.log(40);
case 50:
console.log(50);
}
}

f: inputs<a> -> outputs<b>
a: outputs<b> -> inputs<c>
g: inputs<c> -> outputs<d>

g . a . f : inputs<a> -> outputs<d>
inputs<a> |-> g(a(f(inputs<a>)))

a = <in>

Lift/Unit: a => M(a)
async function\*(init:a, request:()=>a) => M(b);

Flatten/Join: M(a) => a
async (M(a)) => for(const output:a of M(a)){
await respond(output);
}

> enola -h
> enola game and application engine (${version})
> Usage: enola [options][command] [arguments][command-options]
> Commands:

    new         Initialize enola project.
    compose     Compose programs

Common options:
-v|--version Display enola version
-h|--help Show help.
-version Display .NET Core SDK version.

> enola -h new
> create new file
> Usage: enola new [options][type] [type-options]

    type
        renderer
        program
        transformer
        test
        object
        array
        exports-list

> enola -h app
> create new application
> Usage: enola app [options][type] [type-options]

    type
        console
            npx install      Install dependencies.
            npx run          Run application
        react-web
            npx install      Install dependencies.
            npx serve          Run application
        blog
            npx install      Install dependencies.
            npx new-post
            npx new-page
            npx build

> enola -h compose
> Usage: enola compose [options] <program> [program-options] - <program> [program-options] - <program> [program-options] ...

    options
        --stdout
        --prompt
        --pipe
        --renderer

    program-options
        -i|init     Initial object passed to program
        -b|before   Transformation to apply before input
        -a|after    Transformation to apply after output
        -l|log      Log output in addition to passsing to next program

# Why Monad?

Instead of trying to explain what a monad is, it might be easier to start off with why you want to use them.

## New and Different Properties

Monads are useful when you have a type of object and you want them to behave like a second type.

Say, you have three persons; Alice, Bob, and Charlie; and you want to keep track of them in a computer program.
There are a number of reasons preventing you from putting a person in the program directly, so you'll need to
create a corresponding datum in a computer program for each person somehow.

```json
{
  name: "Alice"
}
```

```json
{
  name: "Bob"
}
```

```json
{
  name: "Charlie"
}
```

Now these "persons" are in a format you can manipulate in ways that you couldn't before.

```javascript
const persons = [{
    {
        name:"Alice"
    }
    ,
    {
        name:"Bob"
    }
    ,
    {
        name:"Charlie"
    }
]
persons
.filter(({name})=>name !== "Bob")
.forEach(({name})=>console.log(`hi ${name}`) );
```

The way in which you transform the first type of object into the second type of object is know as a "uint" or a "return" function.
This well be useful, but for now, just know that this imbuing of new properties (and sometimes removing others) that make monads useful.

## Different Behaviors

In addition, for every way in which an object of the first type may be modified,
there should be a corresponding way in which the object of the second type also changes.

Say, Charlie wants to change her name to "Danny". This may take paperwork in the real world,
but in a computer, it would be as simple as defining a procedure:

```javascript
const changeNameToDanny = person => {
  person.name = "Danny";
};
const Charlie = { name: "Charlie" };
changeNameToDanny(Charlie);
```

Although not well defined in this situation, the way in which change from modifying the first type
(the aforementioned paperwork) to modifying the second type is know as a "bind" function.

The bind function, given a way of modifying the first type, will return a way of modifying the second type.

Given two different types, a and A
the unit function transforms an object from the first type to a corresponding type of the second
unit: a -> A

Given a function that modifies an object of the first type, without changing its type
the bind funct returns a function that correspondingly modifies an object of the second type
bind: (a -> a) => (A -> A)

It's important to note that bind and unit do not have to have defined inverses.
You may not always be able to transform from the second type to the first type
and modification to the second type, do not necessarily have corresponding
modifications in the first.

### Identity Monad

The identity monad does nothing neither adds

```javascript
const unit = x => x;
const bind = f => x => unit(f(x));
bind(unit(a));
```

### Empty Monad

the identity monad does less than nothing.
It just removes all distinguishable properties.

```javascript
const unit = x => undefined;
const bind = f => x => undefined;
```

### Container Monad

```javascript
const unit = (x) => [x]
const bind = f => [x] => {
    return unit(f(x))
};
```

### Maybe Monad

this adds the cncept of "nothingness",

```javascript
const unit = x => x;
const bind = f => x => (x === null ? "nothing" : f(X));
const invert = a => 1 / a;
const mapInvert = bind(invert);
mapInvert(1); //1
mapInvert(null); //"nothing"
```

### listmonad

this adds the concept of "being in a list",
as well ass applying functions to an entire group

```javascript
const unit = x => [x];
const bind = f => X => {
  return X.map(f);
};
const add = bind(a => 1 + a);
const mapAdd = bind(add);
mapAdd([1, 2, 3]); //[2, 3, 4]
```

## Co-Monad

//Y=\lambda f.(\lambda x.f\ (x\ x))\ (\lambda x.f\ (x\ x))

const YCombinator = f=>(x=>f(y=>(x(x))(y)))(x=>f(y=>(x(x))(y)));

var Y = function(proc) {
return (function(x) {
return proc(function(y) { return (x(x))(y);});
})(function(x) {
return proc(function(y) { return (x(x))(y);});
});
};

var factgen = function(fact) {
return function(n) {
return (n === 0) ? 1 : n \* fact(n-1); // calls argument, not self
};
};

var fibgen = function(fib) {
// this naive solution has exponential runtime complexity
return function(n) {
return (n <= 2) ? 1 : fib(n-1) + fib(n-2);
};
};

console.log( Y(factgen)(5) ); // returns 120, i.e., 1 _ 2 _ 3 _ 4 _ 5
console.log( Y(fibgen)(7) ); // returns 13, i.e., the 7th fibonacci number

var factorial = Y(factgen); // built entirely with anonymous functions
var fibonacci = Y(fibgen);

console.log( factorial(6) ); // 120
console.log([1,2,3,4,5,6,7,8,9,10].map( fibonacci) ); // the first 10 fibonacci numbers
