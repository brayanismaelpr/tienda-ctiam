window.onload = main;
function main(){
    fetch(`${location.origin}/categories`)
        .then(res => res.json())
        .then(data => {
            let ul = "";
            data.categorias.map(item => {
                ul+=`
                <li class="f__li">
                    <a class="f__li--a" href="${location.origin}/list-product-c/${item.id}">${item.nombre}</a>
                </li>
                `;
            });
            document.getElementById('ulCategorias').innerHTML = ul;
        });
}