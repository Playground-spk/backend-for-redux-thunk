const express = require("express");
const router = express.Router();

const PersonController = require("../controllers/Person");
const passport = require("passport");

const auth = passport.authenticate("jwt", { session: false });

router.get("/get-all", auth, PersonController.getAllPersonBelongToUser);
router.delete("/by-id/:id", auth, PersonController.deletePerson);
router.patch("/by-id/:id", auth, PersonController.editPerson);
router.post("/", auth, PersonController.addPeron);

module.exports = router;
