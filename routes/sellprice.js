const router = require("express").Router();
let SellPrice = require("../models/sellprice");

//Informaiton Get Request
router.get("/", (req, res) =>
  SellPrice.find()
    .then((sellprices) => res.json(sellprices))
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

  const newData = new SellPrice({
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

  if(req.params.name === 'null'){
    SellPrice.find(queryById)
    .then((sellprice) => res.json(sellprice))
    .catch((err) => res.status(400).json("Error : " + err));
  }
  else
    SellPrice.find((queryById, queryByName))
      .then((sellprice) => res.json(sellprice))
      .catch((err) => res.status(400).json("Error : " + err));
});

//Update a member
router.put("/:id", (req, res) => {
  SellPrice.findById(req.params.id)
    .then((sellprice) => {
      (sellprice.productId = req.body.productId),
        (sellprice.productName = req.body.productName),
        (sellprice.quantity = req.body.quantity),
        (sellprice.amout = req.body.amount),
        (sellprice.userName = req.body.customerName),
        (sellprice.userPno = req.body.customerPno);

      sellprice
        .save()
        .then(() => res.json("Item update succesfully"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

//Delete a member
router.delete("/:id", (req, res) => {
  SellPrice.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item Deleted!"))
    .catch((err) => res.status(400).json("Error : " + err));
});
//Reading Total sum
router.get("/total", (req, res) => {
  SellPrice.aggregate([
    {
      $group: {
        _id: "",
        total: {
          $sum: "$amount"
        }
      }
    }
  ]).then(sellprice => res.json(sellprice));
});

module.exports = router;
