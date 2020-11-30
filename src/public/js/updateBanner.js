document.getElementById("saveBanner").addEventListener("click", (e) => {
    e.preventDefault();
    const img1 = document.querySelector("input[name='imagenPrimaria']");
    const img2 = document.querySelector("input[name='imagenSecundaria']");
    const text1 = document.querySelector("input[name='textoPrincipal']");
    const enlace = document.querySelector("input[name='enlace']");
    let formDataInputs = new FormData();
    formDataInputs.append("primaryText", text1.value);
    formDataInputs.append("link", enlace.value);
    sendFetch(formDataInputs);
    if (img1.files[0]) {
        saveImage(img1, "primaryImage");
    }
    if (img2.files[0]) {
        saveImage(img2, "secondaryImage");
    }
});

function log(e) {
    console.log(e);
}

function saveImage(img, name) {
    const task = uploadImage(img.files[0], "banner");
    task.on(
        "state_changed",
        () => {},
        log,
        async () => {
            const url = await task.snapshot.ref.getDownloadURL();
            let formData = new FormData();
            formData.append(name, url);
            sendFetch(formData);
        }
    );
}
function sendFetch(form) {
    const data = new URLSearchParams(form);
    fetch(`${location.origin}/updateBanner`, {
        method: "POST",
        body: data,
    });
}
