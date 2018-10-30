import Broken from "broken";
import _ from "lodash";

import css from "./app.less";
import html from "./app.html";
import 'babel-polyfill';

// import TodoPage from "pages/todo-page/todo-page";

const App = Broken.ViewModel.create({
    name: 'app',
    html: html,
    css: css
});

// import ("pages/todo-page/todo-page").then(page => {
//     App.set('currentPage', new page.default());
// })

async function loadCurrentPage() {

	const TodoPage = await import ("pages/todo-page/todo-page")
	console.log(TodoPage);
	App.set('currentPage', new TodoPage.default());
}

loadCurrentPage();

Broken.ViewModel.strap(App);