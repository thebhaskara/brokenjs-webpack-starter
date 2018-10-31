
import Broken from "broken";
import _ from "lodash";

import css from "./header.scss";
import html from "./header.html";

import { MDCTabBar } from '@material/tab-bar';

var Header = function () {
    this.watch('events.tabClick.favorites', () => {
        console.log('events.tabClick.favorites');
    })
    this.watch('events.tabClick.favorites1', () => {
        console.log('events.tabClick.favorites1');
    })
    this.watch('events.tabClick.favorites2', () => {
        console.log('events.tabClick.favorites2');
    })
}

Header.prototype = {
    name: "header",
    html: html,
    css: css,
    initWatches: {
        tabBarElement: function (tabBarElement) {
            setTimeout(() => {
                this.tabBar = new MDCTabBar(tabBarElement);
                // tabBarElement.addEventListener("MDCTabBar:activated", function (data) {
                //     console.log("MDCTabBar:activated", data);
                // });
            }, 300);
        }
    },
    initialize_title: function () {
        this.set('title', 'new title');
    }
}

export default Broken.ViewModel.make(Header);
