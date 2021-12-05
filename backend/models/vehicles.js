const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const http = require("../services/httpService");
const dbURL = config.get("dbEndpoint") + "/vehicle";
const dbURL1 = config.get("dbEndpoint") + "/vehicleride";

const { User } = require("../models/user");


const scheduleRideArray = [
  {
    email: "hello@gmail.com",
    vid: "12345",
    origin: "Bay",
    passengers: "1",
    destination: "Bae",
  },
];

const vehicleArray = [
  {
    email: "hello@gmail.com",
    vid: "12345",
    vcurrentstatus: "active",
  },
];

class VehicleList {
  //static async getVehicles(email) {
  //   const { data: vehicle } = await http.get(dbURL + "/search?", {
  //     params: {
  //       email: email,
  //     },
  //   });
  //   console.log("Geting vehicles", vehicle);
  //   return (vehicle);
  // }
  static async addVehicle(vehicle) {
    console.log("INSIDE VEHICLE", vehicle);
    const { status: vehicleData } = await http.post(dbURL + "/add", {
            vid: vehicle.vId,
            email: vehicle.email,
            vcolor: vehicle.vColor,
            vmake: vehicle.vMake,
            vmodel: vehicle.vModel,
            vmileage: vehicle.vMileage,
            vpassengerspace: vehicle.vPspace,
            vservicestatus: vehicle.vServiceStatus,
            vcurrentstatus: vehicle.vCurrentStatus,
            location: vehicle.vLocation,
            roadservice: vehicle.vRoadService,
      });
      console.log("status1: ", vehicleData);
      if (vehicleData == 200) {
        return vehicle;
      } else {
          return 200;
      }
      }

      static async deleteVehicle(iD) {

      console.log("INSIDE Delete VEHICLE", iD);

      const { data: vId } = await http.get(dbURL + "/search?", {
        params: {
          vid: iD,
        },
      });
     
      console.log("delete:", {vId});
      if(vId.length == 0)
      {
        console.log("No id");
        return 400;
      }
      else{
         const { status: dvehicle } = await http.delete(dbURL + "/delete/" + iD, {
          params: {
          vid: iD,
        },
      });

      console.log("status2: ", dvehicle);
      if (dvehicle == 200) {
        return dvehicle;
      } else {
          return 200;
      }

      }
      }

  static async scheduleRide(ride) {

    return new Promise((resolve) => {
      setTimeout(() => {
        const scheduleRideA= {
          email: ride.email,
          vid: ride.vId,
          origin: ride.Origin,
          passengers: ride.Passengers,
          destination: ride.Destination,
          vdatetime: ride.Datetime,
        };
        scheduleRideArray.push(scheduleRideA);
        console.log("PUSHED: ", scheduleRideArray);
        resolve(ride);
      }, 300);
    });
  }
  

  static async getRides(email) {

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("EMAIL: ", email);
        const result = {};
        
        const rides = scheduleRideArray
          .filter((ride) => ride.email == email)
        console.log("GETTING: ", rides);
        resolve(rides)

          },300);

    });
  }

    static async getVehicles(email) {

      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("EMAIL: ", email);
          const result = {};
          
          const vehicles = vehicleArray
            .filter((vehicle) => vehicle.email == email)
          console.log("GETTING: ", vehicles);
          resolve(vehicles)
  
            },300);
  
      });

  }
}

module.exports.VehicleList = VehicleList;
