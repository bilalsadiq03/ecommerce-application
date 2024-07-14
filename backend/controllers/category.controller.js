// Controller for creating the category
const category_model = require("../models/category.model")
const mongoose = require("mongoose")

exports.createNewCategory = async (req, res)=>{

    const categoryData = {
        name: req.body.name, 
    } 
    try {
        const category = await category_model.create(categoryData)
        res.status(201).send(category)
    } catch (error) {
        console.log("Error while creating the category",error)
        return res.status(500).send({
            message: "Error while creating the category"
        })
    }
}

exports.updateCategory  =async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
    
        const category = await category_model.findOne({ _id: categoryId });
    
        if (!category) {
          return res.status(404).send({ 
            error: "Category not found" 
        });
        }
    
        category.name = name;
    
        const updatedCategory = await category.save();
        res.send(updatedCategory);
      } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: "Internal server error" 
        });
      }
}

exports.removeCategory = async (req, res) => {
    try {
        const removed = await category_model.findByIdAndDelete(req.params._id);
        res.status(200).send({
            message: "Category removed successfully!"
        });

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
      }
} 

exports.listCategory = async (req, res) => {
    try {
        const all = await category_model.find();
        res.status(200).send(all);
      } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
}

exports.readCategory = async (req, res) => {
   
    try {
        const category = await category_model.findOne({_id: req.params.id});
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.status(200).send({category});
      } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
}



