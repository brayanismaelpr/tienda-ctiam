const areafileCover = document.getElementById("areafileCover");

areafileCover.addEventListener("mouseover", (e) => {
    document.querySelector("#areafileCover").style.background = "#f1f1f1";
});

areafileCover.addEventListener("mouseout", (e) => {
    document.querySelector("#areafileCover").style.background = "#ffffff";
});

areafileCover.addEventListener("click", (e) => {
    document.querySelector("#areafileCover").querySelector("input").click();
});
areafileCover.addEventListener("dragover", (e) => {
    e.preventDefault();
    document.querySelector("#areafileCover").style.background = "#f1f1f1";
});

areafileCover.addEventListener("dragleave", (e) => {
    e.preventDefault();
    document.querySelector("#areafileCover").style.border = "1px dashed #C50084";
});

areafileCover.addEventListener("drop", async (e) => {
    e.preventDefault();
    document.querySelector("#areafileCover").style.border = "1px dashed #C50084";
    const selectedFile = e.dataTransfer.files[0];
    const task = uploadImage(selectedFile, "storeImages");
    const onProgress = (e) => {};
    const onError = (e) => {
        console.log(e);
    };
    const onComplete = async () => {
        const url = await task.snapshot.ref.getDownloadURL();
        document.getElementById("coverUser").src = url;
        document.querySelector("#coverUserForm").value = url;
    };
    task.on("state_changed", onProgress, onError, onComplete);
});
