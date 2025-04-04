const List = require("../models/listModel");

const createList = async (req, res) => {
  const { name, codes, images } = req.body;
  const userId = req.user._id;

  try {
    const newList = await List.create({ userId, name, codes, images });
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user._id });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getListById = async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!list) return res.status(404).json({ error: "List not found" });

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateList = async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedList) return res.status(404).json({ error: "List not found" });

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteList = async (req, res) => {
  try {
    const deletedList = await List.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deletedList) return res.status(404).json({ error: "List not found" });

    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
};
