# <a name="import"></a>Import

There are a few ways to import this into your project.

## Pre-Ecmascript Modules

### Common JS

The package's main file is a compiled common JS file.

```javascript
const AsyncEndpoint = require("async-endpoint");
```

```javascript
const AsyncEndpoint = require("async-endpoint/common.js"); //also works
```

This _should_ work with file bundlers, though I haven't had a chance to test it.

```javascript
import * as AsyncEndpoint from = "async-endpoint/common.js";
```

### Browser

There is also a rollup of the package for the browser,
though there are a number of issues getting this to work out of the box.
You're probably better off pointing directly to the files in the "js" or "mjs" folders and using a bundler.

```html
    <script src = ".../async-endpoint/browser.js"></script>
    <script>
        alert(typeof window.AsyncEndpoint);
    </script>
```

## Ecmascript Modules

Ecmascript modules are available in two flavors of ecmascript modules:

### MJS

In a node application, the "import" keyword can be used to import the package.

```javascript
    //index.mjs
    import * as AsyncEndpoint from "async-endpoint/mjs";
```

As of this writing, node requires the the "experimental-modules" and 
"harmony_async_iteration" flags to be set, but this will change once a the 
"import" and "asynchronous iterator" features hae landed.

```bash
node --experimental-modules --harmony_async_iteration index.mjs
```

If you wish to avoid experimental the features, use the above **common.js** module.

### JS

In a browser application, the "import" keyword can be used to import the package.

When using ".mjs" files, a server may fail to serve the proper "application/javascript"
mime type causing the application to fail. As such, the "js" folder is included.


```html
    <script>
        import * as AsyncEndpoint from "async-endpoint/js/index.js";
        <script>
        alert(typeof window.AsyncEndpoint);
        </script>
    </script>
```

As of this writing, only Chrome supports the necessary import and asynchronous interation features
necessary to get this to work.

To ensure compatibility with other browsers use the above **browser.js** module.
You can also re-bundle either the flow, js, or mjs folders.

Note: when importing these into a browser, there ar still specific issues concering importing node-specific modues.
For now, you may import the files directly. 


```javascript
//Use
import map from "async-endpoint/js/array-like/map.js";
//rather than 
import {map} from "async-endpoint/js/index.js";


``` 


# <a name="application-programming-interface"></a> API
