var fs = require('fs');
var path = require('path');
var Execution = require('execution');
var Record = require('record');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        includeSourceMap: {
            type: 'boolean',
            default: false,
            label: 'Source Map',
            placeholder: 'include source maps in results'
        },
        sourceMapSuffix: {
            type: 'string',
            default: '.map',
            label: 'Source Map Suffix',
            placeholder: 'source map file suffix'
        },
        ASCIIOnly: {
            type: 'boolean',
            default: true
        },
        output: {
            type: 'object',
            default: {}
        }
    },
    run: function (inputs, options, logger) {
        return this._run(inputs, options, logger);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var logger = this.logger;
        var inputs = this.inputs;
        // Allways from string.
        options.fromString = true;

        if (options.maxLineLen !== undefined) {
            options.output.max_line_len = options.maxLineLen;
        }

        if (options.ASCIIOnly !== undefined) {
            options.output.ascii_only = options.ASCIIOnly;
        }

        if (options.preserveComments === 'all') {
            options.output.comments = true;
        } else if (options.preserveComments === 'some') {
            // preserve comments with directives or that start with a bang (!)
            options.output.comments = /^!|@preserve|@license|@cc_on/i;
        } else if (typeof options.preserveComments === 'function') {
            options.output.comments = options.preserveComments;
        }

        var records = [];
        inputs.forEach(function (record) {
            var input = record.contents.toString();
            var sourceMapPath = record.path + options.sourceMapSuffix;
            // If include source map
            if(options.includeSourceMap || record.sourceMap){
                options.outSourceMap = path.basename(sourceMapPath);
            }
            // Minify files, fail on error.
            try {
                var UglifyJS = require('uglify-js');
                var result = UglifyJS.minify(input, options);
            } catch (e) {
                logger.warn('Uglifying source', record.path, 'failed.');
                var err = new Error;
                if (e.message) {
                    err.message += e.message + ' ';
                    if (e.line) {
                        err.message += 'in ' + record.path + ' [' + e.line + ',' + e.col + ']';
                    }
                }
                err.origError = e;
                throw err;
            }

            records.push(new Record({
                path: record.path,
                // Uglifyjs return result include code and map.
                contents: result.code
            }));

            if(options.includeSourceMap || record.sourceMap){
                records.push(new Record({
                    path: sourceMapPath,
                    // Uglifyjs return result include code and map.
                    contents: result.map
                }));
            }

        });

        resolve(records);
    }
})
