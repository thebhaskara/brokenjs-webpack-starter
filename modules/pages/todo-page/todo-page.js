
import Broken from "broken";
import _ from "lodash";

import css from "./todo-page.scss";
import html from "./todo-page.html";

import TodoItem from "../../components/todo-item";

var TodoPage = function() {
    this.set('items', []);
    this.addItem();
}

TodoPage.prototype = {
    name: "todo-page",
    html: html,
    css: css,
    
    initWatches: {
        'addEvent': function() {
            this.addItem();
        },
        'isSelectAll': function(){
            this.selectAll()
        }
    },

    selectAll: ['items', 'isSelectAll', function(items, isSelectAll) {
        console.log(items);
        _.each(items, function(item){
            item.set('item.isDone', isSelectAll);
        });
    }],

    addItem: ['items', function(items) {
        var item = new TodoItem();
        // this.watch(item, 'item', this.showContent);
        items.push(item);
        this.set('items', items);
    }],
}

export default Broken.ViewModel.make(TodoPage);
