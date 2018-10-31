import _ from 'lodash';
import Broken from 'broken';

import styles from './scss/index.scss';

var common = Broken.ViewModel.create({
    name: 'common',
    css: styles
});

Broken.ViewModel.strap(common);