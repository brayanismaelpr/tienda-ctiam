async function modalEdit(e) {
    const idLandMark = e.dataset.idCategory;
    const  landMark = await getLandMark(idLandMark);
    showModal("modalEdit");
    document.querySelector(
        "#modalEdit form"
    ).action = `/admin/LandMarks/${idLandMark}`;
    console.log(landMark)
    document.forms["edit"]["nombre"].value = landMark.landMark.nombre;
}
async function modalDelete(e) {
   
    const idLandMark = e.dataset.idLandMark;
    console.log(idLandMark)
    const landMark = await getLandMark(idLandMark);
    showModal("modalDelete");
    document.querySelector(
        "#modalDelete form"
    ).action = `/admin/delete-landMarks/${idLandMark}`;
    document.forms["delete"]["nombre"].value = landMark.landMark.nombre;
}
function showModal(modalName) {
    document.getElementById(modalName).style.display = "block";
}
async function getLandMark(idlandMark) {
    const data = await fetch(
        `${location.origin}/admin/landMarks/${idlandMark}`
    );
    return await data.json();
}
function modalAdd() {
    showModal("modalAdd");
}
