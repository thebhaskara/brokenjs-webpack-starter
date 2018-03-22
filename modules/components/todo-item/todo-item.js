
import Broken from "broken";
import _ from "lodash";

import css from "./todo-item.less";
import html from "./todo-item.html";

var TodoItem = function() {
    
}

TodoItem.prototype = {
    name: "todo-item",
    html: html,
    css: css,
    initWatches: {
    	'item': function(item){
    		console.log(item);
    	}
    }
}

export default Broken.ViewModel.make(TodoItem);
