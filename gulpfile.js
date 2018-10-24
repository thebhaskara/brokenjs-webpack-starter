var gulp = require('gulp');
var argv = require('yargs').argv;
var fs = require('fs');
var _ = require('lodash');

// Command examples
// gulp add --component componentName
// gulp add --page pageName
// gulp add --utility utilityName

var jsFileContent = `
import Broken from "broken";
import _ from "lodash";

import css from "./--name.scss";
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

var jsIndexFileContent = `
import --upper-name from "./--name";
export default --upper-name;
`;

var jsUtilityFileContent = `
import Broken from "broken";
import _ from "lodash";

var --upper-name = function() {
    
}

--upper-name.prototype = {

}

export default --upper-name;
`;

var jsBinderFileContent = `
import Broken from "broken";
import _ from "lodash";

Broken.ViewModel.addBinder('--name', function (element, propertyName) {

});

export default Broken;
`;

var replaceAll = function (str, search, replace) {
    return str.replace(new RegExp(search, 'g'), replace);
}

var replaceName = function (name, content) {
    content = replaceAll(content, '--name', name);
    content = replaceAll(content, '--upper-name', _.upperFirst(_.camelCase(name)))
    return content;
}

gulp.task('add', function () {
    var dest;
    if (argv.component) dest = 'components';
    else if (argv.control) dest = 'controls';
    else if (argv.bpage) dest = 'pages';
    else if (argv.utility) dest = 'utilities';
    else if (argv.binder) dest = 'binders';
    else throw "specify --component or --control or --page or --utility or --binder";

    var name = argv.component || argv.control || argv.bpage || argv.utility || argv.binder;
    name = _.kebabCase(name);
    if (!_.isString(name)) throw "specify name";

    if (!fs.existsSync('modules/' + dest)) {
        fs.mkdirSync('modules/' + dest);
    }

    if (argv.utility) {

        var content = replaceName(name, jsUtilityFileContent);

        var path = ['modules', dest, name].join('/') + '.js';
        fs.writeFileSync(path, content);

    } else if (argv.binder) {
        
        var content = replaceName(name, jsBinderFileContent);
        
        var path = ['modules', dest, name].join('/') + '.js';
        fs.writeFileSync(path, content);

    } else {

        var dir = ['modules', dest, name].join('/');

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        var subComponentName = argv.sub || name;
        subComponentName = _.kebabCase(subComponentName);

        var path = [dir, subComponentName].join('/')

        fs.writeFileSync(path + '.scss', '.view-name {}');
        fs.writeFileSync(path + '.html', '<div></div>');

        var content = replaceName(subComponentName, jsFileContent);
        fs.writeFileSync(path + '.js', content);

        if (name == subComponentName) {
            var indexFileContent = replaceName(subComponentName, jsIndexFileContent);
            fs.writeFileSync([dir, 'index'].join('/') + '.js', indexFileContent);
        }

    }

    console.log(["Successfully made", dest, dir, "enjoy!"]. join(' '));
})