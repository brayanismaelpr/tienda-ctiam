const error = (msg) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
    });
};

const success = (msg) => {
    Swal.fire({
        icon: "success",
        title: "ok!",
        text: msg,
    });
};

const signingMessage = (msg) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
        target: "#modal-sweet",
    });
};

const signupMessage = (msg) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
        target: "#modal-sweet",
    });
};
