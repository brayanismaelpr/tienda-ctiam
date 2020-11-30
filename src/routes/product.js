const { Router } = require("express");
const router = Router();
const { producController } = require("../controllers");

router.get("/:id", producController.getProduct);

router.post("/make-question", producController.makeQuestion);

router.post("/response-question", producController.responseQuestion);

module.exports = router;
