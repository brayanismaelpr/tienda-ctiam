window.onload = getCities;
function getCities() {
    fetch(`${location.origin}/cities`)
        .then(res => res.json())
        .then(cities => {
            let datalist = ""
            cities.cities.map(item => {
                datalist += `<option value="${item.nombre}">`
            });
            document.getElementById("cities").innerHTML = datalist;
        })
}