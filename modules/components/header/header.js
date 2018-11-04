import _ from "lodash";

import { Data } from '../../utilities';

var Header = {
    initialize_Header: function () {

    },
    initWatches: [{
        "_internal.render": function () {
            this.setHeaderHeight()
        }
    }],
    setHeaderHeight: ['headerElement', 'containerElement', function (headerElement, containerElement) {
        let height = headerElement.clientHeight;
        containerElement.style.height = height + 'px';
    }],
}

export default Header;