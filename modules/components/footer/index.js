import Broken from "broken";

import Footer from "./footer";
/** place for imports **/

import css from "./footer.scss";
import html from "./footer.html";

export default Broken.ViewModel.make({
    name: "footer",
    html: html,
    css: css,
}, Footer/** place for insert **/);