let btnShow = document.querySelector("#butAplicar");
let selectUser = document.querySelector("[name='selectIdProduct']");

Array.from(document.getElementsByClassName("products-check")).forEach((el) => {
    el.addEventListener("change", () => {
        console.log(el.dataset.state);
        if (el.dataset.state == "En revisión") {
            error("No puedes editar un producto en estado de revisión");
            el.checked = false;
        }
    });
});

function obtenerCheck() {
    const x = document.querySelectorAll("input:checked");
    return Array.from(x).forEach((el) => el.value);
}

function selectProduct() {
    fetch(`${location.origin}/seller/my-products/`, {
        method: "post",
        body: JSON.stringify({
            id_estado: document.getElementById("#selectIdProduct").value,
            productos: obtenerCheck(),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
