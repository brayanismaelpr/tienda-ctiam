const areafileportada = document.getElementById("areafileportada");

areafileportada.addEventListener("mouseover", (e) => {
    document.querySelector("#areafileportada").style.background = "#f1f1f1";
});

areafileportada.addEventListener("mouseout", (e) => {
    document.querySelector("#areafileportada").style.background = "#ffffff";
});

areafileportada.addEventListener("click", (e) => {
    document.querySelector("#areafileportada").querySelector("input").click();
});
areafileportada.addEventListener("dragover", (e) => {
    e.preventDefault();
    document.querySelector("#areafileportada").style.background = "#f1f1f1";
});

areafileportada.addEventListener("dragleave", (e) => {
    e.preventDefault();
    document.querySelector("#areafileportada").style.border = "1px dashed #C50084";
});

areafileportada.addEventListener("drop", async (e) => {
    e.preventDefault();
    document.querySelector("#areafileportada").style.border = "1px dashed #C50084";
    const selectedFile = e.dataTransfer.files[0];
    const task = uploadImage(selectedFile, "storeImages");
    const onProgress = (e) => {};
    const onError = (e) => {
        console.log(e);
    };
    const onComplete = async () => {
        const url = await task.snapshot.ref.getDownloadURL();
        document.getElementById("coverStore").src = url;
        document.querySelector("#coverStoreForm").value = url;
    };
    task.on("state_changed", onProgress, onError, onComplete);
});
