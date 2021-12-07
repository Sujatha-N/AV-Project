const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const Rides = require("../models/ride");
const UserSubscriptions = require("../models/userSubscription");
const Vehicles  = require("../models/vehicle");
const jwt = require("jsonwebtoken");

router.get("/me",async (req, res) => {
  // console.log("req.user: ", req.body.user, " req.user.email: ", req.body.email);
  const user = await Users.findOne({email:req.body.email});
  // console.log(
  //   "Response User is : ",
  //   _.pick(user.data, "id", "name", "username")
  // );
  // res.send(_.pick(user.data, "id", "name", "username"));
  res.send(_.pick(user, "_id", "name", "email", "isadmin"));
});

router.get("/plan", async (req, res) => {
  const plan = await UserSubscriptions.find({email:req.body.email});
  res.send(plan);
});

router.get("/numberOfUsers", async (req, res) => {
  const count = await Users.countDocuments();
  res.send({ count: count });
});

router.post("/plan", async (req, res) => {
  const addNewSubscription = new UserSubscriptions({
      email:req.body.email,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      amount:req.body.amount,
      paymentType:req.body.paymentType,
      tag:req.body.tag

  })
 
const plan = addNewSubscription.save();
  
   if(plan) res.status(200).send(addNewSubscription);
});


  // let user = await VehicleList.getVehicles(req.user.email);
  // console.log("THIS IS ADDED LOG: ", user);
  // if ((user.vId === req.body.vId)) return res.status(400).send("ID already exists");

  // const task_names = user.map(function (task) {
  //   return task.vId;
  // });

  // var n = task_names.includes(req.body.vId);

  // if (n) return res.status(400).send("ID already exists");
  // console.log(req.body);
//   const plan = await VehicleList.addVehicle({
//     email: req.user.email, 
//     ..._.pick(req.body, [
//       "vId",
//       "email",
//       "vColor",
//       "vMake",
//       "vModel",
//       "vMileage",
//       "vPspace",
//       "vServiceStatus",
//       "vCurrentStatus",
//       "vLocation",
//       "vRoadService",
//     ]),
//   });
//   console.log("LAN", plan)
//   if (plan) res.status(200).send(plan);
// });

router.post("/myVehicles", async (req, res) => {
  const av = new Vehicles({
    vid : req.body.vId,
    email:  req.body.email,
    vcolor: req.body.vColor,
    vmake: req.body.vMake,
    vmodel:req.body.vModel,
    vmileage:req.body.vMileage,
    vpassengerspace:req.body.vPspace,
    vservicestatus:req.body.vServiceStatus,
    vcurrentstatus:req.body.vCurrentStatus,
    location:req.body.vLocation,
    roadservice:req.body.vRoadService
  });

  const v = av.save();

  if(v) res.status(200).send(av);

})
router.post("/scheduleRide", async (req, res) => {
  // console.log(
  //   "req.body: ",
  //   _.pick(req.body, ["vId", "Origin", "Passengers", "Destination", "Datetime"])
  // );

  const ride = new Rides({
    email: req.body.email,
    vId: req.body.vId,
    Origin:req.body.Origin,
    Passengers:req.body.Passengers,
    Destination:req.body.Destination,
  })

  ride.save();

  res.status(200).send(ride);

  // let user = await VehicleList.getVehicles(req.user.email);
  // console.log("THIS IS ADDED LOG: ", user);

  // const task_names = user.map(function (task) {
  //   return task.vId;
  // });
  // console.log("THIS IS ADDED: ", task_names);
  // var n = task_names.includes(req.body.vId);

  // if (!n) return res.status(400).send("Vehicle ID Dosent Exist");
  // const plan = await VehicleList.scheduleRide({
  //   email: req.user.email,
  //   ..._.pick(req.body, ["vId", "Origin", "Passengers", "Destination", "Datetime"]),
  // });
  //   if (plan) {
  //     res.status(200).send(plan);
  //   }
  //   else{
  //     res.status(400).send("plan");
  //   }
});

router.get("/myVehicles", async (req, res) => {
  // const plan = await Vehicles.find({email:req.body.email});

  Vehicles.find({ email: req.body.email }, (error, list) => {
      if(list)
          res.send(list);
  });
  // console.log("inside get my vehciles:", plan);
  // res.send(plan);
});

router.get("/myRides",async (req, res) => {
  const rides = await Rides.find({email:req.body.email});
  res.send(rides);
});

// deleted
router.post("/deleteVehicles", async (req, res) => {

  const plan = await Vehicles.deleteOne({vid:req.body.vId});
  // const plan = await VehicleList.deleteVehicle({
  //   ..._.pick(req.body, [
  //     "vId",
  //   ]),
  // });
  res.status(200).send(plan);
});

 router.post("/", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  var isadmin = false;
  if(req.body.isadmin)
     isadmin = req.body.isadmin;


  const encPassword = await bcrypt.hash(password, salt);
  var newuser = new Users({
    name,
    email,
    password: encPassword,
    isadmin
  });

  const user = Users.findOne({ email}, (error, user) => {
    if (user) {
      res.status(400).send("Email already exists")
    }
    else {
     const created =  newuser.save();
      if(created){
          // const token = jwt.sign(
          //   {
          //     name,
          //     email,
          //     isadmin: isadmin
          //   },
          //   "unsecureKey"
          // );
          // res.send(token);

            const token = generateAuthToken(name, email, isadmin);

res.header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(created, ["name", "email"]));
        }
      }
      
    })});
//   console.log("req.body: ", _.pick(req.body, ["name", "email", "password"]));
//   const result = User.findByEmail
//   if (result.error)
//     return res.status(400).send(result.error.details[0].message);

//   let user = await User.findByEmail(req.body.email);
//   // console.log("IF USER EXISTS: ", user, " Leng: ", user.length);
//   if (user) return res.status(400).send("Email already exists");

//   const { name, email, password } = req.body;

//   //   user = new User(_.pick(req.body, ["name", "email", "password"]));
//   const salt = await bcrypt.genSalt(10);
//   const encPassword = await bcrypt.hash(password, salt);

//   user = await User.addNew(name, email, encPassword);
//   // console.log("USER: ", userObj);

//   const { isadmin } = user;
//   const token = User.generateAuthToken(name, email, isadmin);

//   console.log("Sending response...", token);
//   res
//     .header("x-auth-token", token)
//     .header("access-control-expose-headers", "x-auth-token")
//     .send(_.pick(user, ["name", "email"]));
// });

function generateAuthToken(name, email, isadmin) {
  const isAdmin = isadmin == "true" ? true : false;
  const token = jwt.sign(
    {
      name: name,
      email: email,
      isadmin: isAdmin,
    },
    "unsecure"
  );
  return token;
}

module.exports = router;
