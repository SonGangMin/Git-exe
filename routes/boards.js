const express = require("express");
const path = require("path");
const fs = require("fs");
const { board } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("board");
});
router.post("/", async (req, res) => {
  const { name, email, content } = req.body;
  try {
    await board.create({
      name: name,
      email: email,
      content: content,
    });
    res.redirect("/board");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "서버 오류가 발생했습니다." });
  }
});

router.get("/list", async (req, res) => {
  try {
    const boards = await board.findAll({});
    res.json(boards);
  } catch (err) {
    console.error(err);
  }
});

router.put("/update/:id", async (req, res) => {
  const boardId = req.params.id;
  const { name, email, content } = req.body;
  try {
    const updateboards = await board.update(
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
    await board.destroy({
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
