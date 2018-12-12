import Broken from "broken";

import TodoItem from "./todo-item";
/** place for imports **/

import css from "./todo-item.scss";
import html from "./todo-item.html";

export default Broken.ViewModel.make({
    name: "todo-item",
    html: html,
    css: css,
}, TodoItem/** place for insert **/);