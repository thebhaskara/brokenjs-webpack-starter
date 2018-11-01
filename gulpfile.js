var gulp = require('gulp');
var argv = require('yargs').argv;
var fs = require('fs');
var _ = require('lodash');

// Command examples
// gulp add --component componentName
// gulp add --page pageName
// gulp add --utility utilityName

const componentFileContent = fs.readFileSync('./gulp-add/component-file.js.txt').toString();
const componentIndexFileContent = fs.readFileSync('./gulp-add/component-index-file.js.txt').toString();
const utilityFileContent = fs.readFileSync('./gulp-add/utility-file.js.txt').toString();
const binderFileContent = fs.readFileSync('./gulp-add/binder-file.js.txt').toString();
const indexImportFileContent = fs.readFileSync('./gulp-add/index-import-file.js.txt').toString();
const indexImportExportFileContent = fs.readFileSync('./gulp-add/index-import-export-file.js.txt').toString();
const importComment = '/** place for imports **/';
const exportComment = '/** place for exports **/';
const insertComment = '/** place for insert **/';

const replaceAll = function (str, search, replace) {
    return str.replace(new RegExp(search, 'g'), replace);
}

const kebabCase = function (name) {
    return _.kebabCase(name)
}

const upperCamelCase = function (name) {
    return _.upperFirst(_.camelCase(name));
}

const replaceName = function (name, content) {
    content = replaceAll(content, '--name', name);
    content = replaceAll(content, '--upper-name', upperCamelCase(name));
    return content;
}

gulp.task('add', function (cb) {
    var dest;
    if (argv.component) dest = 'components';
    else if (argv.control) dest = 'controls';
    else if (argv.page) dest = 'pages';
    else if (argv.utility) dest = 'utilities';
    else if (argv.binder) dest = 'binders';
    else throw "specify --component or --control or --page or --utility or --binder";

    var name = argv.component || argv.control || argv.page || argv.utility || argv.binder;
    name = kebabCase(name);
    if (!_.isString(name)) throw "specify name";

    if (!fs.existsSync('modules/' + dest)) {
        fs.mkdirSync('modules/' + dest);
    }

    var destDir = ['modules', dest].join('/');
    var dir = ['modules', dest, name].join('/');

    if (argv.utility) {

        var content = replaceName(name, utilityFileContent);
        fs.writeFileSync(dir + '.js', content);

        var indexPath = [destDir, 'index.js'].join('/');
        if (!fs.existsSync(indexPath)) {
            fs.writeFileSync(indexPath, indexImportExportFileContent);
        }

        var indexContent = fs.readFileSync(indexPath).toString();
        indexContent = indexContent.replace(importComment, `${importComment}
import ${upperCamelCase(name)} from './${name}'`);
        indexContent = indexContent.replace(exportComment, `${exportComment}
    ${upperCamelCase(name)},`);
        fs.writeFileSync(indexPath, indexContent);

    } else if (argv.binder) {

        var content = replaceName(name, binderFileContent);
        fs.writeFileSync(dir + '.js', content);

        var indexPath = [destDir, 'index.js'].join('/');
        if (!fs.existsSync(indexPath)) {
            fs.writeFileSync(indexPath, indexImportFileContent);
        }

        var indexContent = fs.readFileSync(indexPath).toString();
        indexContent = indexContent.replace(importComment, `${importComment}
import './${name}'`);
        fs.writeFileSync(indexPath, indexContent);

    } else {

        var componentName = argv.sub || name;
        componentName = kebabCase(componentName);

        var path = [dir, componentName].join('/')

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            let content = replaceName(componentName, componentIndexFileContent);
            fs.writeFileSync([dir, 'index.js'].join('/'), content);
        }

        var content = replaceName(componentName, componentFileContent);
        fs.writeFileSync(path + '.js', content);

        if (name == componentName) {

            fs.writeFileSync(path + '.scss', '.view-name {}');
            fs.writeFileSync(path + '.html', '<div></div>');
        } else {
            let indexPath = [dir, 'index.js'].join('/');
            let indexContent = fs.readFileSync(indexPath).toString();

            indexContent = indexContent.replace(importComment, `${importComment}
import ${upperCamelCase(componentName)} from './${componentName}'`);
            indexContent = indexContent.replace(insertComment, `, ${upperCamelCase(componentName)}${insertComment}`);

            fs.writeFileSync(indexPath, indexContent);
        }

    }

    console.log(["Successfully made", dest, dir, "enjoy!"].join(' '));

    cb();
})