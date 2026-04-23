const colorEl = document.getElementById('color');
const getColorsBtn = document.getElementById('get-color-scheme');
const schemeSelectEl = document.getElementById('scheme-select');
const colorsContainer = document.getElementById('scheme-colors');
const schemeFooterEl = document.getElementById('scheme-footer');

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
getColorsBtn.addEventListener('click', async () => {
    const selectedValue = schemeSelectEl.value;
    const colorValue = colorEl.value;
    const colorsArray = await fetchColorScheme(colorValue.slice(1), selectedValue)
    render(colorsArray)
})



function render(colors) {
    let colorsHtml = ''
    let hexHtml = ''
    for (let color of colors) {
        colorsHtml += `<div class="color" style="background-color: ${color};"></div>`
        hexHtml += `<h3>${color}</h3>`
    }
    colorsContainer.innerHTML = colorsHtml;
    schemeFooterEl.innerHTML = hexHtml;

}
