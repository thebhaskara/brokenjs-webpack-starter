import _ from 'lodash';
import Broken from 'broken';

// import reset from './broken-styles/src/less/reset.less';
// import font from './broken-styles/src/less/typography.less';
// import button from './broken-styles/src/less/button.less';
// import flex from './broken-styles/src/less/flex-box.less';
// import input from './broken-styles/src/less/input.less';
// import containers from './broken-styles/src/less/containers.less';

var common = Broken.ViewModel.create({
    name:'common',
    css: ''
    // css: reset + font + button + flex + input + containers
});

Broken.ViewModel.strap(common);