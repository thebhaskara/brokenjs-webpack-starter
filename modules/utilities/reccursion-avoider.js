import Broken from "broken";
import _ from "lodash";

var ReccursionAvoider = function () {
    this.inprogress = false;
}

ReccursionAvoider.prototype.wrap = function (fn) {
    let self = this;
    return function () {
        if (!this.inprogress) {
            this.inprogress = true;
            var result = fn.apply(this, arguments);
            this.inprogress = false;
        }
        return result;
    }
}

export default ReccursionAvoider;