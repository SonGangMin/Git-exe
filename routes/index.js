var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  axios
    .get("https://api.example.com/data")
    .then((response) => {
      const data = response.data;
      res.render("index", { data });
    })
    .catch((err) => {
      console.error(err);
      res.render("error");
    });
});

module.exports = router;
