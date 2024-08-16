import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("Buyers");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Buyers");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
//  console.log(req.body);
//  console.log(req.body.buyer.middle_name);
  try {
    let newDocument = {
        group_id: req.body.group_id,
        buyer: {
          last_name: req.body.buyer.last_name,
          first_name: req.body.buyer.first_name,
          middle_name: req.body.buyer.middle_name,
          person_entity: req.body.buyer.person_entity,
          tin_no: req.body.buyer.tin_no,
          email: req.body.buyer.email, 
          phone: req.body.buyer.phone,
          id: { 
            type: req.body.buyer.id.type,
            number: req.body.buyer.id.number,
            img_front: req.body.buyer.id.img_front,
            imb_back: req.body.buyer.id.imb_back
          }
        },
        address: {
          address1: req.body.address.address1,
          address2: req.body.address.address2,
          region: req.body.address.region,
          province: req.body.address.province,
          city: req.body.address.city,
          barangay: req.body.address.barangay,
          zip: req.body.address.zip,
        },
        bank: {
          name: req.body.bank.name,
          branch: req.body.bank.branch,
          phone: req.body.bank.phone,
          account_name: req.body.bank.account_name,
          account_no: req.body.bank.account_no,
        }
      };
    let collection = await db.collection("Buyers");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
    console.log("inserted");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        group_id: req.body.group_id,
        buyer: {
          last_name: req.body.buyer.last_name,
          first_name: req.body.buyer.first_name,
          middle_name: req.body.buyer.middle_name,
          person_entity: req.body.buyer.person_entity,
          tin_no: req.body.buyer.tin_no,
          email: req.body.buyer.email, 
          phone: req.body.buyer.phone,
          id: { 
            type: req.body.buyer.id.type,
            number: req.body.buyer.id.number,
            img_front: req.body.buyer.id.img_front,
            imb_back: req.body.buyer.id.imb_back
          }
        },
        address: {
          address1: req.body.address.address1,
          address2: req.body.address.address2,
          region: req.body.address.region,
          province: req.body.address.province,
          city: req.body.address.city,
          barangay: req.body.address.barangay,
          zip: req.body.address.zip,
        },
        bank: {
          name: req.body.bank.name,
          branch: req.body.bank.branch,
          phone: req.body.bank.phone,
          account_name: req.body.bank.account_name,
          account_no: req.body.bank.account_no,
        },
      }
    };

    let collection = await db.collection("Buyers");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("Buyers");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
