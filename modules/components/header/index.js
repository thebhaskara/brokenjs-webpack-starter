import Broken from "broken";

import Header from "./header";
/** place for imports **/

import css from "./header.scss";
import html from "./header.html";

export default Broken.ViewModel.make({
    name: "header",
    html: html,
    css: css,
}, Header/** place for insert **/);