const areaFile = document.getElementById("areafile");

areaFile.addEventListener("mouseover", (e) => {
    document.querySelector("#areafile").style.background = "#f1f1f1";
});

areaFile.addEventListener("mouseout", (e) => {
    document.querySelector("#areafile").style.background = "#ffffff";
});

areaFile.addEventListener("click", (e) => {
    document.querySelector("#areafile").querySelector("input").click();
});
areaFile.addEventListener("dragover", (e) => {
    e.preventDefault();
    document.querySelector("#areafile").style.background = "#f1f1f1";
});

areaFile.addEventListener("dragleave", (e) => {
    e.preventDefault();
    document.querySelector("#areafile").style.border = "1px dashed #C50084";
});

areaFile.addEventListener("drop", async (e) => {
    e.preventDefault();
    document.querySelector("#areafile").style.border = "1px dashed #C50084";
    const selectedFile = e.dataTransfer.files[0];
    const task = uploadImage(selectedFile, "profileImages");
    const onProgress = (e) => {};
    const onError = (e) => {
        console.log(e);
    };
    const onComplete = async () => {
        const url = await task.snapshot.ref.getDownloadURL();
        Array.from(document.getElementsByClassName("div-profile--img")).forEach(
            (img) => {
                img.src = url;
            }
        );
        document.querySelector("#avatarUser").value = url;
    };
    task.on("state_changed", onProgress, onError, onComplete);
});
