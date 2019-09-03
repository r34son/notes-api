const router = require("express").Router();
const Note = require("../models/note");
const verifyToken = require("../verifyToken");

router.get("/", verifyToken, async (req, res) => {
  Note.find(
    {
      ownerId: req.userId
    },
    (err, result) => {
      if (err) res.status(400).json({ error: err.message });
      res.json(result);
    }
  );
});

router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const createdNote = await Note.create({
      ownerId: req.userId,
      title: req.body.title,
      text: req.body.text
    });
    res.json(createdNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Note.deleteOne({
      ownerId: req.userId,
      _id: req.params.id
    });
    if (deleted.n == 0) return res.status(400).json("Cant delete note");
    res.json(`${req.body.title} deleted`);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/title/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Note.updateOne(
      {
        ownerId: req.userId,
        _id: req.params.id
      },
      {
        $set: {
          title: req.body.title
        }
      }
    );
    if (updated.n == 1) res.json(`Title changed to ${req.body.title}`);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/text/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Note.updateOne(
      {
        ownerId: req.userId,
        _id: req.params.id
      },
      {
        $set: {
          text: req.body.text
        }
      }
    );
    if (updated.n == 1) res.json(`Text changed to ${req.body.text}`);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
