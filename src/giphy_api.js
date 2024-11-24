function giphy() {
    async function get_url(q) {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=r5xZ8JcUCD3e8lRUlyp2MfScWR7bkrwq&q=${q}`);
            const data = await response.json();
            if (data.data.length > 0) {
                return data.data[0].images.fixed_height.url;
            } else {
                console.error('No GIFs found for:', q);
                return null;
            }
        } catch (err) {
            console.error('Error:', err);
            return null;
        }
    }

    return { get_url };
}

export const Giphy = giphy();