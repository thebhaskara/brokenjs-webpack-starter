import Broken from "broken";

import Checkbox from "./checkbox";
/** place for imports **/

import css from "./checkbox.scss";
import html from "./checkbox.html";

export default Broken.ViewModel.make({
    name: "checkbox",
    html: html,
    css: css,
}, Checkbox/** place for insert **/);