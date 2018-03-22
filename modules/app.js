import Broken from "broken";
import _ from "lodash";

import css from "./app.less";
import html from "./app.html";

import TodoPage from "pages/todo-page/todo-page";

const App = Broken.ViewModel.create({ 
    name:'app', 
    html: html, 
    css:css 
});

App.set('currentPage', new TodoPage());

Broken.ViewModel.strap(App);