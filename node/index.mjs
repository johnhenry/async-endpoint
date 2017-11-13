/* eslint-disable */
/**
 * @typedef {Function} PairedRequest
 * @description a function that receives it's response from a paired PairedRespond function
 * @return {Promise<*>} response from respond reunction
 */

/**
 * @typedef {Function} PairedRespond
 * @description a function that sends it's input to a paired PairedRequest function
 * @param {*} response - response for request function
 */

/**
 * @typedef {Array} AsyncPair
 * @description a pair of paired PairedRequest and PairedRespond functions
 * @property {PairedRequest} 0 - request function
 * @property {PairedRespond} 1 - respond function
 */

/**
 * @typedef {Function} AsyncTransformer
 * @description stateless asynchronous function that transforms input without side effects
 * @param {*} input - input
 * @return {*} transformed input
 */

/**
 * @typedef {Function} Program
 * @description an iteractive program
 * @param {*} init
 * @param {PairedRequest} request - request function for input
 * @return {AsynchronousIterator} asynchronous iterator result
 */

/**
 * @typedef {Function} AsyncRenderFunction
 * @description a function that renders values from a given [Asynchronous] Iterator
 * @param {AsynchronousIterator} program_return;
 */

/**
 * @typedef {Array} PushPair
 * @description an iterator and a paired function to add to it
 * @property {AsynchornousIterator} 0 - iterator
 * @property {Function} 1 - function used to add to iterator
 */

/**
 * @name createAsyncPair
 * @description creates a pair of asynchronous functions used to transfer objects between programs
 * @returns {AsyncPair} array of paired functions
 * @example
 * import {createAsyncPair} from "async-endpoint";
 * const [request, respond] = createAsyncPair();
 * const main = async()=>{
 *      setTimeout(()=>{
 *          respond("hello");
 *      })
 *      console.log(await request());
 * }
 * main();
 * //logs "hello"
 */
export { default as createAsyncPair } from "./sub-modules/create-async-pair";

/**
 * @function composePrograms
 * @description composes programs sequentially with a single input
 * @param {PairedRequest} request - request function for input
 * @param {...Program} programs - programs to be composed sequentially
 * @returns {AsynchornousIterator} resulting iterator
 * @example
 * import {composePrograms} from "async-endpoint";
 * import porgram1, program1, program3 from "...";
 * const [request, respond] = createAsyncPair();
 * const program = composePrograms(request, program1, program2, program3);
 * window.respond = respond;
 */
export { default as composeProgram } from "./sub-modules/compose-programs";

//array-like
/**
 * @name map
 * @function creates an iterator whose values are mapped from another
 * @param {AsynchornousIterator} iterator - iterator to be mapped
 * @param {AsyncTransformer} mapper - transformation for individual items
 * @returns {AsynchornousIterator} resulting iterator
 * @example
 * import {map, continuousOutput},  from "async-endpoint";
 * let i = 0;
 * const mapped = map(continuousOutput(()=>i++), (n) => n + 2);
 * const main = async ()=>{
 *  for await(item of mapped){
 *      console.log(item);
 *  }
 * }
 * main();
 * logs "2"
 * logs "3"
 * logs "4"
 * ...
 */
export { default as map } from "./sub-modules/array-like/map";

/**
 * @function filter
 * @description creates an iterator whose values are filtered from another
 * @param {AsynchornousIterator} iterator - iterator to be filtered
 * @param {Function} filterer - boolean filtering function
 * @returns {AsynchornousIterator} filtered iterator
 * @example
 * import {filter, continuousOutput} from "async-endpoint";
 * let i = 0;
 * const filtered =filter(continuousOutput(()=>i++),  (n)=>n%2);
 * const main = async ()=>{
 *  for await(item of filtered){
 *      console.log(item);
 *  }
 * }
 * main();
 * logs "1"
 * logs "3"
 * logs "5"
 */
export { default as filter } from "./sub-modules/array-like/filter";

/**
 * @function reduce
 * @description creates an iterator whose values are reduced from another
 * @param {AsynchornousIterator} iterator - iterator to be reduced
 * @param {Function} reducer - reducing function
 * @param {*} [inital] - initial object to reduce into
 * @param {Function} [condition = (item, initial) => false]- boolean filtering function indicating when to start new reduction phase
 * @param {Function} [resetInitial = ()=>initial]- method to reset/replace initial reduction object 
 * @returns {AsynchornousIterator} reduced iterator
 * @example
 * import {reduce, continuousOutput} from "async-endpoint";
 * let i = 0;
 * const reduced = reduce(continuousOutput(()=>i++) , (previous, current)=>previous.push(current),[], (x)=!(x%5), ()=>([]));
 * const main = async ()=>{
 *  for await(item of reduced){
 *      console.log(item);
 *  }
 * }
 * main();
 * logs "[0]"
 * logs "[1, 2, 3, 4, 5]"
 ...
 */
export { default as reduce } from "./sub-modules/array-like/reduce";

/**
 * @function pause
 * @description returns a resolved promise after a given amount of time
 * useful for pausing asynchronous programs
 * @param {Number} milliseconds - time to pause
 * @param {*} value - optional returned value
 * @returns {Promise} promise fulfilled with value
 * @example
 * import {pause} from "async-endopint";
 * const main = async ()=>{
 *  console.log("hello");
 *  await pause(1000);
 *  console.log("goodbye");
 * }
 * main();
 * //logs "hello"
 * //logs "goodbye" (after 1 second)
 */
export { default as pause } from "./sub-modules/pause";

/**
 * @function composeAsyncTransformer
 * @description composes two asynchoronous transformers
 * @param {AsyncTransformer} last - transformer to apply last
 * @param {AsyncTransformer} first - transformer to apply first
 * @returns {AsyncTransformer} asynchonous compositon of current and pre
 * @example
 * import {composeAsyncTransformer} from "async-endopint";
 * const t1 = async (x)=>`<${x}>`;
 * const t2 = async (x)=>`[${x}]`;
 * const t = composeAsyncTransformer(t1, t2);
 * t("hello").then(console.log);
 * //logs "<[hello]>"
 */
export {
  default as composeAsyncTransformer
} from "./sub-modules/compose-async-transformers";

/**
 * @function createQueue
 * @description create a queue iterator
 * @param {...*} initial - initial items in queue
 * @returns {PushPair} queue and push function
 * @example
 * import {createQueue, createAsyncPair, renderer, renderer as createPassThrough} from "async-endpoint";
 * import porgram1, program1, program3 from "...";
 * const [queue, push] createQueue();
 * const passthrough = createPassThrough(push);
 * passthrough(porgram1(), program2(), program3());
 * const render = renderer();
 * render(queue);
 */
export { default as createQueue } from "./sub-modules/queue/create-queue";

/**
 * @function createStack
 * @description create a stack iterator
 * @param {...*} initial - initial items on stack
 * @returns {PushPair} stack and push function
 * @example
 * import {createStack, createAsyncPair, renderer, renderer as createPassThrough} from "async-endpoint";
 * import porgram1, program1, program3 from "...";
 * const [stack, push] createStack();
 * const passthrough = createPassThrough(push);
 * passthrough(porgram1(), program2(), program3());
 * const render = renderer();
 * render(stack);
 */
export { default as createStack } from "./sub-modules/queue/create-stack";

/**
 * @function createProgramQueue
 * @description identity program that outputs what ever is input
 * Like "queue", but accepts program as input
 * @returns {PushPair} iterator and push function
 * @example
 * import {createProgramQueue, createAsyncPair, renderer} from "async-endpoint";
 * import porgram1, program1, program3 from "...";
 * const [queue, push] = createProgramQueue();
 * push(porgram1(), program2(), program3());
 * const render = renderer();
 * render(queue);
 */
export {
  default as programQueue
} from "./sub-modules/queue/create-program-queue";

/**
 * @function createProgramStack
 * @description identity program that outputs what ever is input
 * Like "queue", but accepts program as input
 * @returns {PushPair} iterator and push function
 * @example
 * import {createProgramStack, createAsyncPair, renderer} from "async-endpoint";
 * import porgram1, program1, program3 from "...";
 * const [stack, push] = createProgramStack();
 * push(porgram1(), program2(), program3());
 * const render = renderer();
 * render(stack);
 */
export {
  default as programStack
} from "./sub-modules/queue/create-program-queue";

//take
/**
 * @function take
 * @description extract items from iterator as array
 * @param {AsynchronousIterator} iterator - iterator from which to take
 * @param {Number} num - number of items to take from iterator
 * @param {Number} [skip = 0]- number of items to skip before taking
 * @returns {Promise<Array>} stack and push function
 * @example
 * import {take, continuousOutput} from "async-endpoint";
 * let i = 0;
 * take(continuousOutput(()=>i++), 3,1).then(taken=>console.log(taken));
 * //logs "[1,2,3]"
 */
export { default as take } from "./sub-modules/take";

/**
 * @function takeWhile
 * @description extract first set of items that match a given condition as an array
 * @param {AsynchronousIterator} iterator - iterator from which to take
 * @param {Function} accept - boolean filtering function indicating
 * whether to allow item
 * @param {Number} [skip = 0] - number of items to skip before taking
 * @returns {Promise<Array>} stack and push function
 * @example
 * import {takeWhile, continuousOutput} from "async-endpoint";
 * let i = 0;
 * takeWhile(continuousOutput(()=>i++), x  => x < 5, 2).then(taken=>console.log(taken));
 * //logs "[2,3,4]"
 */
export { default as takeWhile } from "./sub-modules/take/while";

//program
/**
 * @function identity
 * @description program that outputs what ever is put throught
 * @param {*} [delay = 0] - delay between sending output
 * @param {PairedRequest} request - request function for input
 * @returns {AsynchronousIterator} resulting iterator
 * @example
 * import {identity, renderer createAsyncPair} from "async-endpoint";
 * const [request, respond] = createAsyncPair();
 * identity(undefined, request);
 * window.respond = respond
 */
export { default as identity } from "./sub-modules/program/identity";

/**
 * @function continuousOutput
 * @description program that takes no input and contiuously outputs result of calling function
 * @param {*} [sample=()=>{}] - function whose result to output
 * @returns {AsynchronousIterator} resulting iterator
 * @example
 * import {continuousOutput, renderer} from "async-endpoint";
 * const render = renderer();
 * render(continuousOutput(()=>"hello"))
 * logs "hello" (continously)
 * ...
 */
export {
  default as continuousOutput
} from "./sub-modules/program/continuous-output";

//renderers
/**
 * @function renderer
 * @description creates a render function that renders yeilded results from programs
 * to any number of target functions. If no targets are given, objects will be rendered
 * using "console.log"
 * Can be used as a "passthrough" (see "createQueue" example)
 * @param {...Function} [targets] - request function for input
 * @return {AsyncRenderFunction} asychronous render function
 * @example
 * import {renderer, continuousOutput} from "async-input";
 * const render = renderer();
 * render(continuousOutput);
 * //logs "0"
 * //logs "1"
 * ...
 */
export { default as renderer } from "./sub-modules/renderer";

/**
 * @function tee
 * @description creates a render function whos's values are teed on to given
 * It may be advantageous to use this along side a programQueue
 * @param {...Program} programs - programs to be sent values
 * @return {AsyncRenderFunction} asychronous render function
 * @example
 * import {tee, continousOutput, renderer} from "async-endpoint";
 * import porgram1, program1, program3 from "...";
 * const instance1 = program1();
 * const instance2 = program2();
 * const instance3 = program3();
 * const render = renderer();
 * render(instance1, instance2, instance3)
 * const renderTee = tee(porgram1, program1, program3)
 * renderTee(continousOutput())
 */
export { default as tee } from "./sub-modules/renderer/tee";

//input
/**
 * @function inputConsole
 * @description send input typed into console to a PairedRespond function
 * @param {PairedRespond} respond - request function for input
 * @example
 * import {inputConsole, identity, createAsyncPair, renderer} from "async-endpoint";
 * const [request, respond] = creteAsyncPair();
 * const render = renderer();
 * render(identity(undefined, request))
 * inputConsole(respond);
 */
export { default as inputConsole } from "./sub-modules/input/console";

/**
 * @function inputPipe
 * @description send input piped to console to a PairedRespond function
 * @param {PairedRespond} respond - request function for input
 * @example
 * import {inputPipe, identity, createAsyncPair, renderer} from "async-endpoint";
 * const [request, respond] = creteAsyncPair();
 * const render = renderer();
 * render(identity(undefined, request))
 * inputPipe(respond);
 */
export { default as inputPipe } from "./sub-modules/input/pipe";