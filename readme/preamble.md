# Async Endpoint

**Asynchronous Endpoints**, especially when paired with a __functional style of programming__,
provide a sound method of writing programs in JavaScripts that are

    - testable
    - maintainable
    - extendable
    - composeable
    - easy to reason about
    - standard based*


This repository provides a brief intoduction to asynchronous endpoints**, along with a helper library `async-endpoint` to help make a few things easier.

*Okay... I'm a bit eary on this. This heavily depends upon a [Asynchronous Iterators](), currently a stage 3 ecmascript proposal. Until the spec is finalized, you may use transpilers such as [babel]() or bundleers such as [web pack]() to take advantage of thi feature.

## Table of contents

- <a href="#introduction">Introduction</a>
    - <a href="#introduction-synchronous-endpoints">Synchronous Endpoints</a>
    - <a href="#introduction-synchronous-iteration">Synchronous Iteration</a>
    - <a href="#introduction-asynchronous-iteration">Asynchronous Iteration</a>
    - <a href="#introduction-asynchronous-input">Asynchronous Input</a>

- <a href="#application-programming-interface">API</a>
