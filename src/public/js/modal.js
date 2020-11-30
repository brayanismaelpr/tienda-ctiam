var content = document.getElementById("modal").innerHTML;

function modal() {
    var html = document.getElementById("modal").innerHTML = 
    "<div class=\"c-modal\">" +
            "<div class=\"c-modal__content\">" +
                "<form class=\"form-modal\">" +
                    "<p class=\"title-modal\">Modal</p>" +
                    "<div class=\"c-modal__box\">" +
                        "<input class=\"c-modal__box--input\" id=\"\" placeholder=\"Dato 1\" type=\"text\" required>" +
                    "</div>" +
                    "<div class=\"c-modal__box\">" +
                        "<input class=\"c-modal__box--input\" id=\"\" placeholder=\"Dato 2\" type=\"text\" required>" +
                    "</div>" +
                    "<button type=\"submit\" class=\"btn-send-modal\">Enviar</button>" +
                    "<button onclick=\"cerrar()\" type=\"button\" class=\"btn-exit-modal\">Cerrar</button>" +
                "</form>" +
            "</div>" +  
        "</div>";

    if (content.length === 0) {
        return html;
        
    } else { content = ""; }
    return content;
}

function cerrar() {
    if (content.length >= 0) {
        return document.getElementById("modal").innerHTML = "";
    }
}
