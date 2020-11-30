window.onload = ()=>{
    let newPass = document.getElementById("newPass");
    let confirmPass = document.getElementById("confirm-pass");
    let confPass = document.getElementById("confPass");
    confPass.addEventListener("keyup", e => {
        if (newPass.value === confPass.value) {
            confirmPass.style.backgroundColor = "#ABEBC6";
        }else{
            confirmPass.style.backgroundColor = "#E74C3C";
        }
    });
}

