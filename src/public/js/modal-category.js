function showCategory() {
    var temp;
    var c_categorys = document.getElementById("c-category").innerHTML;
    var html_category = document.getElementById("c-category").innerHTML =
    "<div class=\"modal-category\">" +
        "<div class=\"modal-category__content\">" +
            "<li class=\"modal-category__li\"><a class=\"modal-category__li--a\" href=\"\">Bolsos</a></li>" +
            "<li class=\"modal-category__li\"><a class=\"modal-category__li--a\" href=\"\">Accesorios</a></li>" +
            "<li class=\"modal-category__li\"><a class=\"modal-category__li--a\" href=\"\">Ropa</a></li>" +
            "<li class=\"modal-category__li\"><a class=\"modal-category__li--a\" href=\"\">Postres</a></li>" +
        "</div>" +
    "</div>";

    if(c_categorys.length === 0) {
        return html_category;
    } else {
        temp = document.getElementById("c-category").innerHTML = "";
    }
    return temp;
}