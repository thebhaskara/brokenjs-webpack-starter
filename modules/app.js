import Broken from "broken";
import _ from "lodash";

import css from "./app.scss";
import html from "./app.html";
import 'babel-polyfill';

const App = Broken.ViewModel.create({
    name: 'app',
    html: html,
    css: css
});

async function loadCurrentPage() {

	const TodoPage = await import ("pages/todo-page")
	console.log(TodoPage);
	App.set('currentPage', new TodoPage.default());
}

loadCurrentPage();

Broken.ViewModel.strap(App);