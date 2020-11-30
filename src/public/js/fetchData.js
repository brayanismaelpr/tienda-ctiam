window.onload = async () => {
    var categories;
    var landMarks;
    Promise.all([
        fetch(`${location.origin}/categories`),
        fetch(`${location.origin}/marks`),
    ]).then(async (responses) => {
        categories = await responses[0].json();
        landMarks = await responses[1].json();
        const datasetCategories = document.querySelector("#category");
        let htmlDataSetCategory = "";
        for (const category of categories.categorias) {
            htmlDataSetCategory += `<option value="${category.nombre}">${category.id}</option>`;
        }
        datasetCategories.innerHTML = htmlDataSetCategory;

        landMarks = await fetch(`${location.origin}/marks`).then((response) =>
            response.json()
        );
        const datasetLandMarks = document.querySelector("#mark");
        let htmlDataSetMarks = "";
        for (const mark of landMarks.marcas) {
            htmlDataSetMarks += `<option value="${mark.nombre}">${mark.id}</option>`;
        }
        datasetLandMarks.innerHTML = htmlDataSetMarks;
    });
};
