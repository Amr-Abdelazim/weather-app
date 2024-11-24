function weather_api() {
    async function get_data(q) {
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${q}?unitGroup=us&key=ZYNUVD8HYJ84F3M8UMPH6NCPA&contentType=json`);
            const data = await response.json();
            return await data;
        } catch (err) {
            console.error('Error:', err);
            return null;
        }
    }

    return { get_data };
}

export const Weather_api = weather_api();