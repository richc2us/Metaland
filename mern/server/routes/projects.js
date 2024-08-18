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
    let collection = await db.collection("Projects");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Projects");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
    try {
        let data = req.body;
        let newProject = {
            company_id: data.company_id,
            project_id: data.project_id,
            name: data.name,
            address: {
                address1: data.address1,
                address2: data.address2,
                region: data.region,
                province: data.province,
                city: data.city,
                barangay: data.barangay,
                zip: data.zip
            },
            landmark: data.landmark,
            coordinates: {
                latitude: "latitude",
                longitude: "longitude"
            },
            original_owner: {
                last_name: "last_name",
                first_name: "first_name",
                middle_name: "middle_name",
                email: "email",
                phone: "phone",
                social_media: {
                    instagram: "instagram",
                    facebook: "facebook",
                    wechat: "wechat",
                    viber: "viber",
                    line: "line",
                    whatsapp: "whatsapp"
                }
            },
            purchase_scheme: "purchase_scheme",
            title_information: "title_information",
            legal_documentation: "legal_documentation",
            restrictions: "restrictions",
            terrane_information: "terrane_information",
            total_number_of_lots: "total_number_of_lots", 
            date_bought: "date_bought", 
            date_begin_selling: "date_begin_selling", 
            date_begin_grading: "date_begin_grading", 
            investment_amount: "investment_amount", 
            geographic_layer_file: "geographic_layer_file",
            bulk_discount_scheme: "bulk_discount_scheme",
            LTS: "LTS"
        };
        let collection = await db.collection("Projects");
        let result = await collection.insertOne(newProject);
        res.send(result).status(204);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error adding Project");
      }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    let data = req.body;
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
            company_id: data.company_id,
            project_id: data.project_id,
            name: data.name,
            address: {
                address1: data.address1,
                address2: data.address2,
                region: data.region,
                province: data.province,
                city: data.city,
                barangay: data.barangay,
                zip: data.zip
            },
            landmark: data.landmark,
            coordinates: {
                latitude: "latitude",
                longitude: "longitude"
            },
            original_owner: {
                last_name: "last_name",
                first_name: "first_name",
                middle_name: "middle_name",
                email: "email",
                phone: "phone",
                social_media: {
                    instagram: "instagram",
                    facebook: "facebook",
                    wechat: "wechat",
                    viber: "viber",
                    line: "line",
                    whatsapp: "whatsapp"
                }
            },
            purchase_scheme: "purchase_scheme",
            title_information: "title_information",
            legal_documentation: "legal_documentation",
            restrictions: "restrictions",
            terrane_information: "terrane_information",
            total_number_of_lots: "total_number_of_lots", 
            date_bought: "date_bought", 
            date_begin_selling: "date_begin_selling", 
            date_begin_grading: "date_begin_grading", 
            investment_amount: "investment_amount", 
            geographic_layer_file: "geographic_layer_file",
            bulk_discount_scheme: "bulk_discount_scheme",
            LTS: "LTS"
      },
    };

    let collection = await db.collection("Projects");
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

    const collection = db.collection("Projects");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;