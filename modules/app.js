import 'babel-polyfill';

import Broken from "broken";
import _ from "lodash";

import css from "./app.scss";
import html from "./app.html";

// import Header from "./components/header";

const App = Broken.ViewModel.create({
    name: 'app',
    html: html,
    css: css,
    setPage: async function (pageName) {
        let { default: Page } = await import(/* webpackChunkName: "pages-[request]" */ `./pages/${pageName}/index`)
        this.currentPage = App.createAndSetChild('content', Page);
    },
    setComponent: async function (compName) {
        let { default: Component } = await import(/* webpackChunkName: "components-[request]" */ `./components/${compName}/index`)
        this[compName] = App.createAndSetChild(compName, Component);
    }
});

// const header = App.createAndSetChild('header', Header);

App.setPage('todo-page');
App.setComponent('header');

Broken.ViewModel.strap(App);