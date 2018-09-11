[![NPM version](https://badge.fury.io/js/%40dizmo%2Ffunctions-trace.svg)](https://npmjs.org/package/@dizmo/functions-trace)
[![Build Status](https://travis-ci.org/dizmo/functions-trace.svg?branch=master)](https://travis-ci.org/dizmo/functions-trace)
[![Coverage Status](https://coveralls.io/repos/github/dizmo/functions-trace/badge.svg?branch=master)](https://coveralls.io/github/dizmo/functions-trace?branch=master)

# @dizmo/functions-trace
Provides a `@traceable` decorator, which traces each method invocation (of a class) to a global `CONSOLE` object, which is by default set to the standard `console`.

However, the tracing is *only* performed when the global `TRACE` variable is set to `true`. It is also possible to set `TRACE` to a number, in which case the tracing is deferred by the corresponding amount of milli-seconds. Also, setting it to `0` will imply, that the invocations will be logged as soon as possible.

## Usage
### Install
```sh
npm install @dizmo/functions-trace --save
```
### Require
```javascript
let lib = require('@dizmo/functions-trace');
```
### Examples
```typescript
import { traceable } from '@dizmo/functions-trace';
```
```typescript
class MyClass {

    @traceable
    public method_1() {}
    
    @traceable(true)
    public method_2() {}
    
    @traceable(false)
    public method_3() {}
}
```
```typescript
import { Global } from '@dizmo/functions-trace';
```
```typescript
declare const global: Global;
global.TRACE = true; // or e.g. `200` milli-seconds
```
## Development
### Build
```sh
npm run build
```
#### without linting:
```sh
npm run -- build --no-lint
```
### Lint
```sh
npm run lint
```
#### with auto-fixing (for JavaScript and TypeScript):
```sh
npm run -- lint --fix
```
### Test
```sh
npm run test
```
#### without (re-)building:
```sh
npm run -- test --no-build
```
### Cover
```sh
npm run cover
```
#### without (re-)building:
```sh
npm run -- cover --no-build
```

## Copyright

 © 2018 [dizmo AG](http://dizmo.com/), Switzerland
