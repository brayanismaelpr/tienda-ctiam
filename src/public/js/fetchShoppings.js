async function fetchShoppings() {
    const data = await fetch(
        `${location.origin}/user/getShoppings`
    ).then((res) => res.json());
    let str = ``;
    if (data.objectKeys) {
        for (const shopping in data) {
            str += `<div class="c-user-shopping__div">`;
            for (const sale in data[shopping]) {
                str += `<div class="c-user-shopping__box">`;
                data[shopping][sale].forEach((itemSale) => {
                    let fecha = new Date(itemSale.fecha);
                    str += `<h3>${fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()}</h3>
                        <div class="c-user-shopping__info block md:flex">
                            <img class="c-user-shopping__img w-full md:w-1/5" src="${itemSale.imagen}">
                            <div class="c-user-shopping__text pt-4">
                                <p class="c-user-shopping__text--name">${itemSale.titulo}</p>
                                <p class="c-user-shopping__text--description">${itemSale.descripcion}</p>
                                <p class="c-user-shopping__text--price">$ ${itemSale.precio} x 1 unidad</p>
                            </div>
                        </div>`;
                });
                str += `</div>`;
            }
            str += `</div>`;
        }
    }else{
        str+=`<img src="${location.origin}/images/vacio.png" alt="No se encontraron productos">`;
    }
    
    document.querySelector("#content").innerHTML = str;
}
fetchShoppings();

//<img src="{{URL}}/images/vacio.png" alt="No se encontraron productos"></img>