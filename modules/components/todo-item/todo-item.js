import _ from "lodash";

import { } from '../../utilities';

var TodoItem = {
    initialize_TodoItem: async function () {

        let { default: Checkbox } = await import(/* webpackChunkName: "controls-checkbox-index" */ '../../controls/checkbox/index');
        this.checkbox = this.createAndSetChild('checkbox', Checkbox);

        this.forward(this.checkbox, 'value', this, 'isChecked');

        this.forward(this._root, 'selectAll', this.checkbox, 'value')
    },
    initWatches: [{
        "_internal.render": function () {
            let textElement = this.get('textElement');
            textElement.focus();
        },
        isChecked: function (isChecked) {
            console.log('isChecked', isChecked);
        },
        text: function (text) {
            this.set('placeholderClass.hide', !!text);
        }
    }]
}

export default TodoItem;