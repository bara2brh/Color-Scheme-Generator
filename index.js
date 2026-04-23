const colorEl = document.getElementById('color');
const getColorsBtn = document.getElementById('get-color-scheme');
const schemeSelectEl = document.getElementById('color-scheme')

async function fetchColorScheme(hexValue, mode) {
    try {
        const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${mode}&count=5`)
        const data = await response.json();
        let colorsArray = [];
        for (let color of data.colors) {
            colorsArray.push(color.hex.value);
        }
        return colorsArray;
    } catch (error) {
        console.error("Request failed : ", error)
        return null;
    }

}
getColorsBtn.addEventListener('click', () => {
    const selectedValue = schemeSelectEl.value;
    const colorValue = colorEl.value;
    const colorsArray = fetchColorScheme(colorValue.slice(1), selectedValue)
    render(colorsArray)
})




