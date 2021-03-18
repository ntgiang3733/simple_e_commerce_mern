const { toTitleCase } = require('../config/function');
const categoryModel = require('../models/categories');
const fs = require('fs');

class Category {
    async getAllCategory(req, res) {
        try {
            let Categories = await categoryModel.find({}).sort({ _id: -1});
            if(Categories) {
                return res.json({ Categories });
            }
        } catch (err) {
            console.error(err);
        }
    }

    async postAddCategory(req, res) {
        let { cName, cDescription, cStatus } = req.body;
        let cImage = req.file.filename;
        const filePath = `../server/public/uploads/categories/${cImage}`;
        if(!cName || !cDescription || !cStatus || !cImage) {
            fs.unlink(filePath, (err) => {
                if(err) {
                    console.error(err);
                }
                return res.json({ error: 'All fields must be required'});
            });
        } else {
            cName = toTitleCase(cName);
            try {
                let checkCategoryExists = await categoryModel.findOne({ cName: cName });
                if(checkCategoryExists) {
                    fs.unlink(filePath, (err) => {
                        if(err) {
                            console.error(err);
                        }
                        return res.json({ error: 'Category already exists'});
                    });
                } else {
                    let newCategory = new categoryModel({
                        cName,
                        cDescription,
                        cStatus,
                        cImage,
                    });
                    await newCategory.save((err) => {
                        if(!err) {
                            return res.json({ success: "Category created successfully" });
                        }
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    async postEditCategory(req, res) {
        let { cId, cDescription, cStatus } = req.body;
        if(!cId || !cDescription || !cStatus) {
            return res.json({ error: 'All fields must be required' });
        }
        try {
            let editCategory = categoryModel.findByIdAndUpdate(cId, {
                cDescription,
                cStatus,
                updateAt: Date.now(),
            });
            let edit = await editCategory.exec();
            if(edit) {
                return res.json({ success: "Category edit successfully" });
            }
        } catch (err) {
            console.error(err);
        }
    }

    async getDeleteCategory(req, res) {
        let { cId } = req.body;
        if(!cId) {
            return res.json({ error: 'All fields must be required' })
        } else {
            try {
                let deleteCategoryFile = await categoryModel.findById(cId);
                const filePath = `../server/public/uploads/categories/${deleteCategoryFile.cImage}`;

                let deleteCategory = await categoryModel.findByIdAndDelete(cId);
                if (deleteCategory) {
                    // Delete Image from uploads -> categories folder 
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        return res.json({ success: "Category deleted successfully" });
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
}

const categoryController = new Category();
module.exports = categoryController;