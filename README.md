# task-uglifyjs
> Minify files with UglifyJS.

## The "uglifyjs" task

### Usage Examples

```js
var uglifyjs = new (require('task-uglifyjs'))
uglifyjs.run(inputs, options, logger)
```

### Options

#### options.includeSourceMap
Type: `boolean`
Default: `'false'`

Include source maps in results.

#### options.sourceMapSuffix
Type: `string`
Default: `'.map'`

Source map file suffix.

#### options.output
Type: `object`
Default: `{}`

Pass an object if you wish to specify additional [output 
options](http://lisperator.net/uglifyjs/codegen). The defaults are
optimized for best compression.

#### options.ASCIIOnly
Type: `boolean` 
Default: `true`

A convenience option for `options.output.ascii_only`. Enables to encode non-ASCII characters as \uXXXX.

#### options.preserveComments 
Type: `string`

A convenience option for `options.output.comments`. Defaults to preserving no comments.

- `all`

    Preserve all comments in code blocks

- `some`

    Preserve comments that start with a bang (`!`) or include a Closure
    Compiler directive (`@preserve`, `@license`, `@cc_on`)

- `function`

    Specify your own comment preservation function. You will be passed the
    current node and the current comment and are expected to return either
    `true` or `false`.

## Release History
* 2015-01-19    0.1.1    Add output about options.
* 2014-03-28    0.1.0    Initial release.

## License
Copyright (c) 2015 Yuanyan Cao. Licensed under the MIT license.
