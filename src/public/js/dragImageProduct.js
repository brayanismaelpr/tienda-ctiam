const areaFile = Array.from(document.querySelectorAll("#areafileproducts"));

areaFile.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
        if (el.dataset.drag !== "off") el.style.background = "#f1f1f1";
    });
});

areaFile.forEach((el) => {
    el.addEventListener("mouseout", (e) => {
        if (el.dataset.drag !== "off") el.style.background = "#ffffff";
    });
});

areaFile.forEach((el) => {
    el.addEventListener("click", (e) => {
        el.querySelector("input").click();
    });
});

areaFile.forEach((el) => {
    el.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (el.dataset.drag !== "off") el.style.background = "#f1f1f1";
    });
});

areaFile.forEach((el) => {
    el.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (el.dataset.drag !== "off") el.style.border = "1px dashed #C50084";
    });
});

areaFile.forEach((el) => {
    el.addEventListener("drop", (e) => {
        e.preventDefault();
        el.style.border = "1px dashed #C50084";
        const selectedFile = e.dataTransfer.files[0];
        const idStore = document.querySelector("[data-store-id]").dataset
            .storeId;
        const task = uploadImage(selectedFile, `products/${idStore}`);
        const onProgress = (e) => {};
        const onError = (e) => {
            console.log(e);
        };
        const onComplete = async () => {
            const url = await task.snapshot.ref.getDownloadURL();
            const idImage = el.dataset.idImage;
            const input = document.querySelector(
                `input[data-id-image="${idImage}"]`
            );
            if (input) {
                input.value = url;
                el.dataset.drag = "off";
                el.style.backgroundColor = "#5f2";
            }
        };
        task.on("state_changed", onProgress, onError, onComplete);
    });
});
