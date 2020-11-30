async function modalEdit(e) {
    const idQuestion = e.dataset.idQuestion;
    const question = await getQuestion(idQuestion);
    console.log(question);
    showModal("modalEdit");
    document.querySelector(
        "#modalEdit form"
    ).action = `/admin/frecuent-questions/${idQuestion}`;
    document.forms["edit"]["pregunta"].value =
        question.frequentQuestion.pregunta;
    document.forms["edit"]["respuesta"].value =
        question.frequentQuestion.respuesta;
}
async function modalDelete(e) {
    const idQuestion = e.dataset.idQuestion;
    const question = await getQuestion(idQuestion);
    showModal("modalDelete");
    document.querySelector(
        "#modalDelete form"
    ).action = `/admin/delete-frecuent-questions/${idQuestion}`;
    document.forms["delete"]["pregunta"].value =
        question.frequentQuestion.pregunta;
}
function showModal(modalName) {
    document.getElementById(modalName).style.display = "block";
}
async function getQuestion(idQuestion) {
    const data = await fetch(
        `${location.origin}/admin/frecuent-questions/${idQuestion}`
    );
    return await data.json();
}
function modalAdd() {
    showModal("modalAdd");
}
