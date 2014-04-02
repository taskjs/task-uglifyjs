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

## Release History
* 2014-03-28    0.1.0    Initial release.

## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.
