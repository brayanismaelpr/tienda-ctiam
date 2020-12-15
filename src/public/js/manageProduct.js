let btnShow = document.querySelector('#butAplicar');
let selectUser = document.querySelector("[name='selectIdProduct']"); 

function obtenerCheck(){
    const x = document.querySelectorAll('input:checked');
    return Array.from(x).forEach((el=>el.value));
}


function selectProduct(){
    fetch(`${location.origin}/seller/my-products/`, {
        method: "post",
        body: JSON.stringify({ 
            
                id_estado:document.getElementById('#selectIdProduct').value,
                productos: obtenerCheck()
         }),
        headers: {
            "Content-Type": "application/json",
        },
    })

}

