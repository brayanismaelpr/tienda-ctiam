window.onload = getLastProductos;
function getLastProductos() {
    //Productos destacados
    fetch(`${location.origin}/getDestacados`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            for (let i = 0; i < 3; i++) {
                html += `
                <div class="c-product-col">
                <div class="c-product-col__content">
                    <figure class="c-product-col__fig">
                        <img class="w-full h-full object-center object-cover" src="${data.products[i].imagen}">
                    </figure>
                    <div class="c-product-col__info">
                        <p class="c-product-col__info--title">${data.products[i].titulo}</p>
                        <p class="c-product-col__info--p">
                            ${data.products[i].descripcion}
                        </p>
                        <a class="c-product-cols__btn" href="${location.origin}/product/${data.products[i].id}">
                            <p class="c-product-cols__btn--p">Ver más</p>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>`;
            document.getElementById('destacados').innerHTML = html;
            }
        })
    //Productos ultima visita
    let idCategory = localStorage.getItem('ultima_visita');
    fetch(`${location.origin}/getProductoByLastVisit`, {
        method: "post",
        body: JSON.stringify({ idCategory }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => res.json()).then(products => {
        let gridProducts = ""
        products.products.forEach(item => {
            gridProducts += `
                    <a class="c-grid-four__box" href="/product/${item.id}">
                        <img class="w-full h-full object-center object-cover" src="${item.imagen}">
                    </a>
                `;
        });
        document.getElementById("gridProducts").innerHTML = gridProducts;
    });
}