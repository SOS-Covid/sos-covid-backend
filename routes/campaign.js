const express = require("express");
const router = express.Router();

const schemaValidator = require("../middlewares/schema-validator");
const { createCampaignSchema } = require("../validators/campaign");
const {
  create,
  findAll,
  findPerPage,
  findByEmail,
  findById,
  remove,
} = require("../controllers/campaign");
const extractJwt = require("../middlewares/extract-jwt");

router.post("/create", extractJwt, schemaValidator(createCampaignSchema), create);
router.delete("/remove/:email", remove);
router.get("/find/all", findAll);
router.get("/find", findPerPage);
router.get("/find/:email", findByEmail);
router.get("/:id", findById);

module.exports = router;
