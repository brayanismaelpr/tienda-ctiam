var boolIni = false;

const button = document.querySelector(`[data-type-button="form"]`);
button.addEventListener("click", async () => {
    if (!boolIni) {
        button.setAttribute("disabled", "true");
        const form = document.forms.createProduct;
        const id_categoria = form.querySelector("input[name='id_categoria']")
            .dataset.idValue;
        const id_marca = form.querySelector("input[name='id_marca']").dataset
            .idValue;
        const titulo = form.querySelector("input[name='titulo']").value;
        const stock = form.querySelector("input[name='stock']").value;
        const precio = form.querySelector("input[name='precio']").value;
        const descripcion = form.querySelector("textarea[name='descripcion']")
            .value;
        const detalle = form.querySelector("textarea[name='detalle']").value;
        const imagen = form.querySelector(`input[data-id-image='${1}']`).value;
        const images = [];
        for (let i = 2; i <= 5; i++) {
            if (document.querySelector(`input[data-id-image='${i}']`).value) {
                images.push(
                    document.querySelector(`input[data-id-image='${i}']`).value
                );
            }
        }
        const producto = {
            id_categoria,
            id_marca,
            titulo,
            descripcion,
            detalle,
            precio,
            stock,
            imagen,
            images,
        };
        let bool = true;
        for (const field in producto) {
            if (
                !producto[field] ||
                producto[field] === "undefined" ||
                producto[field] === ""
            ) {
                bool = false;
                break;
            }
        }
        if (bool && !boolIni) {
            boolIni = true;
            const data = await fetch(`${location.origin}/seller/products/`, {
                method: "post",
                body: JSON.stringify(producto),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = await data.json();
            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "ok!",
                    confirmButtonText: "Ok",
                    text: "Producto registrado correctamente",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace(
                            `${location.origin}/seller/my-products`
                        );
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    confirmButtonText: "Ok",
                    text: "Ha ocurrido un error inesperado",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace(`${location.origin}/seller/`);
                    }
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes llenar todos los campos!",
            });
            button.removeAttribute("disabled", "false");
        }
    }
});
