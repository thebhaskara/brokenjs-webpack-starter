var gulp = require('gulp');
var argv = require('yargs').argv;
var fs = require('fs');
var _ = require('lodash');

var jsFileContent = `
import Broken from "broken";
import _ from "lodash";

import css from "./--name.less";
import html from "./--name.html";

var --upper-name = function() {
    
}

--upper-name.prototype = {
    name: "--name",
    html: html,
    css: css,
    initWatches: {}
}

export default Broken.ViewModel.make(--upper-name);
`;

var replaceAll = function(str, search, replace) {
    return str.replace(new RegExp(search, 'g'), replace);
}

gulp.task('add', function() {
    var dest;
    if (argv.component) dest = 'components';
    else if (argv.page) dest = 'pages';
    else throw "specify --component or --page";

    var name = argv.component || argv.page;
    name = _.kebabCase(name);
    if (!_.isString(name)) throw "specify name";

    var dir = ['modules', dest, name].join('/');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var path = [dir, name].join('/')

    fs.writeFileSync(path + '.less', '.view-name {}');
    fs.writeFileSync(path + '.html', '<div></div>');

    var content = replaceAll(jsFileContent, '--name', name);
    content = replaceAll(content, '--upper-name', _.upperFirst(_.camelCase(name)))
    fs.writeFileSync(path + '.js', content);

    console.log('made ' + dir + ', enjoy!');
})