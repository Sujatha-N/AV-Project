const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

// const { AV } = require("../models/");
const Vehicles  = require("../models/vehicle");

router.get("/numberOfAVs", async (req, res) => {
  const count = await Vehicles.countDocuments();
  res.send({ count: count });
});
 
router.get("/statesOfAVs",  async (req, res) => {
  const avStates = await Vehicles.find({}, {"vid":1, "vservicestatus":1, "vcurrentstatus":1, "location":1, "roadservice":1});
  res.send(avStates);
});

// added
router.get("/avStatus", async (req, res) => {
  const avStates = await Vehicles.find({vservicestatus:"active"});
  // console.log("avst", avStates);
  res.send(avStates);
});


router.get("/listOfAVs", async (req, res) => {
  const avData = await Vehicles.find({vservicestatus:"active"});
  res.send(avData);
});

module.exports = router;
