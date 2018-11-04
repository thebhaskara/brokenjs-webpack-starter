import Broken from "broken";

import TodoPage from "./todo-page";
/** place for imports **/

import css from "./todo-page.scss";
import html from "./todo-page.html";

export default Broken.ViewModel.make({
    name: "todo-page",
    html: html,
    css: css,
}, TodoPage/** place for insert **/);