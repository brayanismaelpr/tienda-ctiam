async function modalEdit(e) {
    const idCategory = e.dataset.idCategory;
    const category = await getCategory(idCategory);
    showModal("modalEdit");
    document.querySelector(
        "#modalEdit form"
    ).action = `/admin/categorys/${idCategory}`;
    document.forms["edit"]["nombre"].value = category.category.nombre;
    document.forms["edit"]["descripcion"].value = category.category.descripcion;
}
async function modalDelete(e) {
    const idCategory = e.dataset.idCategory;
    const category = await getCategory(idCategory);
    showModal("modalDelete");
    document.querySelector(
        "#modalDelete form"
    ).action = `/admin/delete-categorys/${idCategory}`;
    document.forms["delete"]["nombre"].value = category.category.nombre;
}
function showModal(modalName) {
    document.getElementById(modalName).style.display = "block";
}
async function getCategory(idCategory) {
    const data = await fetch(
        `${location.origin}/admin/categorys/${idCategory}`
    );
    return await data.json();
}
function modalAdd() {
    showModal("modalAdd");
}
