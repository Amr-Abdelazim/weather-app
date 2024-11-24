import { Charts } from './visualize';
import { Weather_api } from './weather_api';
import { Giphy } from './giphy_api';
function ui_controller() {
    let isCelsius = true;
    function getDayName(dateString) {
        const date = new Date(dateString);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dayIndex = date.getDay();
        return dayNames[dayIndex];
    }
    function togelTemp(query) {
        isCelsius ^= 1;
        update(query);
    }
    function get_temp(Fahrenheit) {
        if (isCelsius) {
            return (Fahrenheit - 32) / 1.8
        } else {
            return Fahrenheit
        }
    }
    async function update(query) {
        let valid_query = false;
        try {

            const data = await Weather_api.get_data(query);

            console.log(data);
            let days = [];
            let temps = [];
            for (let i = 0; i < Math.min(data.days.length, 7); i++) {
                let temp = get_temp(data.days[i].temp);
                days.push(getDayName(data.days[i].datetime));
                temps.push(temp);
            }
            console.log(days);
            const ctx = document.getElementById('myChart').getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            Charts.line_segment(ctx, days, temps);
            const div_address = document.querySelector(".resolvedAddress");
            div_address.textContent = data.resolvedAddress;
            const div_description = document.querySelector(".description");
            div_description.textContent = data.description;
            let temp = get_temp(data.days[0].temp);
            const div_temp = document.querySelector(".temp");
            let F = '';
            if (!isCelsius) F = 'F';
            div_temp.innerHTML = `${Math.round(temp)}&deg;${F}`;
            /* const img = document.querySelector("img");
             img.src = await Giphy.get_url(data.description);*/
        } catch (err) {
            // alert(err);
            alert("Please enter a valid city name!");
        }
    }
    return { update, togelTemp };
}

export const Ui_controller = ui_controller();