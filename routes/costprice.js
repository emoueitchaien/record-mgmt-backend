const router = require("express").Router();
let CostPrice = require("../models/costprice");
const mongoose = require("mongoose");

//Informaiton Get Request
router.get("/", (req, res) =>
  CostPrice.find()
    .then((costprices) => res.json(costprices))
    .catch((err) => res.status(400).json("Error : " + err))
);

//Post request Create Data Item
router.post("/add", (req, res) => {
  const productId = Number(req.body.productId);
  const productName = req.body.productName;
  const quantity = Number(req.body.quantity);
  const amount = Number(req.body.amount);
  const userName = req.body.userName;
  const userPno = Number(req.body.userPno);

  const newData = new CostPrice({
    productId,
    productName,
    quantity,
    amount,
    userName,
    userPno
  });

  newData
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error : " + err));
});

//Read data members
router.get("/:id&:name", (req, res) => {
  let queryById = { productId: req.params.id };
  let queryByName = { userName: req.params.name };

  if (req.params.name === "null") {
    CostPrice.find(queryById)
      .then((costprice) => res.json(costprice))
      .catch((err) => res.status(400).json("Error : " + err));
  } else
    CostPrice.find((queryById, queryByName))
      .then((costprice) => res.json(costprice))
      .catch((err) => res.status(400).json("Error : " + err));
});
//Update a member
router.put("/:id", (req, res) => {
  CostPrice.findById(req.params.id)
    .then((costprice) => {
      (costprice.productId = req.body.productId),
        (costprice.productName = req.body.productName),
        (costprice.quantity = req.body.quantity),
        (costprice.amout = req.body.amount),
        (costprice.userName = req.body.merchantName),
        (costprice.userPno = req.body.merchantPno);

      costprice
        .save()
        .then(() => res.json("Item update succesfully"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

//Delete a member
router.delete("/:id", (req, res) => {
  CostPrice.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item Deleted!"))
    .catch((err) => res.status(400).json("Error : " + err));
});

//Reading total sum
router.get("/total", (req, res) => {
  CostPrice.aggregate([
    {
      $group: {
        _id: "",
        total: {
          $sum: "$amount"
        }
      }
    }
  ]).then(costprice => res.json(costprice));
});

module.exports = router;
