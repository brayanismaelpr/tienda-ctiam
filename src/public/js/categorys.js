$(".c-categorias__li").on("click", function () {
    if (!$("#" + $(this).data("resp_id")).hasClass("resp_act")) {
        $(".ico_resp").removeClass("ico_resp_act");
        $(".resp_act").css("height", 0);
        $(".resp_act").removeClass("resp_act");
        $("#" + $(this).data("resp_id")).css({ height: "auto" });
        $("#" + $(this).data("resp_id")).addClass("resp_act");
        $("i", this).addClass("ico_resp_act");
    } else {
        $(".ico_resp").removeClass("ico_resp_act");
        $(".resp_act").css("height", 0);
        $(".resp_act").removeClass("resp_act");
    }
});
