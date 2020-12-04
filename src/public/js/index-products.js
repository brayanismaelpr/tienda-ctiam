window.onload = getLastProductos;
function getLastProductos() {
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