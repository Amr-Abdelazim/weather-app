import '../styles/style.css'
import '../static/weather.png'
import favpng from '../static/weather.png'

import { Ui_controller } from './UI_controller';



const favicon = document.getElementById('favicon');
favicon.href = favpng;


const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search");
const togelButton = document.getElementById("togelButton");


searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    Ui_controller.update(query);
    togelButton.query = query;
});

togelButton.addEventListener("click", async () => {
    if (togelButton.query) {
        Ui_controller.togelTemp(togelButton.query);
    }
});



//Charts.line_segment(ctx, [1, 2, 3, 4, 5, 6, 7], [65, 78, 24, 31, 54, 12, 20]);