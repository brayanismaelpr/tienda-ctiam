function showCategory() {
    var temp;
    var c_categorys = document.getElementById("c-category").innerHTML;
    fetch(`${location.origin}/categories`)
        .then(res => res.json())
        .then(data => {
            let liCategoria = `
            <div class="modal-category"> 
            <div class="modal-category__content">`;
            data.categorias.map(item => {
                liCategoria+=`<li class="modal-category__li"><a class="modal-category__li--a" href="${location.origin}/list-product-c/${item.id}">${item.nombre}</a></li>`;
            });
            liCategoria+=`
                </div>
            </div>`;
            var html_category = document.getElementById("c-category").innerHTML = liCategoria
            if (c_categorys.length === 0) {
                return html_category;
            } else {
                temp = document.getElementById("c-category").innerHTML = "";
            }
            return temp;
        })
}