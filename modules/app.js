import 'babel-polyfill';

import Broken from "broken";
import _ from "lodash";

import css from "./app.scss";
import html from "./app.html";

import Header from "./components/header";

const App = Broken.ViewModel.create({
    name: 'app',
    html: html,
    css: css,
});

const header = App.createAndSetChild('header', Header);

// import ("pages/todo-page/todo-page").then(page => {
//     App.set('currentPage', new page.default());
// })

// async function loadCurrentPage() {

// 	const TodoPage = await import ("pages/todo-page/todo-page")
// 	console.log(TodoPage);
// 	App.set('currentPage', new TodoPage.default());
// }

// loadCurrentPage();

Broken.ViewModel.strap(App);