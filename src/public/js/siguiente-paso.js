let siguiente1 = document.querySelectorAll("#siguiente1")[0];
let siguiente2 = document.querySelectorAll("#siguiente2")[0];
let cProfileRegSteps = document.querySelectorAll(".c-profile__reg-steps")[0];

let registro1 = document.querySelectorAll("#reg-step-1")[0];
let registro2 = document.querySelectorAll("#reg-step-2")[0];
let registro3 = document.querySelectorAll("#reg-step-3")[0];

let validar1 = document.querySelectorAll("#reg-step-1 input");
let validar2 = document.querySelectorAll("#reg-step-2 input, textarea");

let atras1 = document.querySelectorAll("#atras1")[0];
let atras2 = document.querySelectorAll("#atras2")[0];

siguiente1.addEventListener("click", function (e) {
    e.preventDefault();
    if (validar1[0].value == "" && validar1[1].value == "") {
        
    } else {
        setTimeout(function () {
            cProfileRegSteps.style.left = "-100%";
            registro1.style.opacity = "0";
            registro2.style.opacity = "1";
        }, 0);

    }
});

siguiente2.addEventListener("click", function (e) {
    e.preventDefault();

    if (
        validar2[0].value == "" &&
        validar2[1].value == "" &&
        validar2[2].value == ""
    ) {
    } else {
        setTimeout(function () {
            cProfileRegSteps.style.left = "-200%";
            registro2.style.opacity = "0";
            registro3.style.opacity = "1";
        }, 0);
    }
});

atras1.addEventListener("click", function (e) {
    e.preventDefault();
    setTimeout(function () {
        cProfileRegSteps.style.left = "0";
        registro1.style.opacity = "1";
        registro2.style.opacity = "0";
    }, 0);
});

atras2.addEventListener("click", function (e) {
    e.preventDefault();
    setTimeout(function () {
        cProfileRegSteps.style.left = "-100%";
        registro2.style.opacity = "1";
        registro3.style.opacity = "0";
    }, 0);
});
