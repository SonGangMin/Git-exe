const express = require("express");
const path = require("path");
const fs = require("fs");
const { boards } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("index");
});
router.post("/", async (req, res) => {
  const { name, email, content } = req.body;
  try {
    await boards.create({
      name: name,
      email: email,
      content: content,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "서버 오류가 발생했습니다." });
  }
});

router.get("/list", async (req, res) => {
  try {
    const board = await boards.findAll({});
    res.json(board);
  } catch (err) {
    console.error(err);
  }
});

router.put("/update/:id", async (req, res) => {
  const boardId = req.params.id;
  const { name, email, content } = req.body;
  try {
    const updateboards = await boards.update(
      {
        name: name,
        email: email,
        content: content,
      },
      {
        where: { id: boardId },
      }
    );
    res.json(updateboards);
  } catch (err) {
    console.error(err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const boardId = req.params.id;
    await boards.destroy({
      where: {
        id: boardId,
      },
    });
    res.send({ message: "삭제되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "서버 오류가 발생했습니다." });
  }
});
module.exports = router;
