import foodModel from "../models/foodModel.js";
import fs from "fs";
//add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error" });
  }
};
//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "error" });
  }
};
//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id); // Use findById instead of find
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addFood, listFood, removeFood };
