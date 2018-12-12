import Broken from "broken";
import _ from "lodash";
import { ReccursionAvoider } from '../utilities';

Broken.ViewModel.addBinder('bind-checkbox', async function (el, propertyName) {
    let { default: Checkbox } = await import(/* webpackChunkName: "controls-checkbox-index" */ '../controls/checkbox/index')
    let checkbox = this.createChild(Checkbox);
    Broken.Dom.empty(el);
    checkbox._render();
    _.each(checkbox._elements, function (element) {
        Broken.Dom.append(el, element);
    });

    let stopRec = new ReccursionAvoider();
    this.watch(propertyName, stopRec.wrap((value) => checkbox.set('value', value)));

    checkbox.watch('value', stopRec.wrap((value) => this.set(propertyName, value)))
});

