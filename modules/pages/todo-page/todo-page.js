import _ from "lodash";

import { } from '../../utilities';

var TodoPage = {
    initialize_TodoPage: async function () {
        this.forward(this, 'selectAll', this._root, 'selectAll')
        this.addTodoItem();
    },
    initWatches: [{
        'addTodoItem': function () {
            this.addTodoItem();
        },
    }],
    addTodoItem: ['todoItems', async function (todoItems) {
        let { default: TodoItem } = await import(/* webpackChunkName: "components-todo-item-index" */"../../components/todo-item/index");

        todoItems = todoItems || [];
        let todoItem = this.createChild(TodoItem);
        todoItems.push(todoItem);

        this.set('todoItems', todoItems);
    }]
}

export default TodoPage;