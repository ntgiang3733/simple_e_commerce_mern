const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categories');
const multer = require('multer');
const { loginCheck } = require('../middleware/auth');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/categories');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/all-category', categoryController.getAllCategory);
router.post(
    '/add-category',
    loginCheck,
    upload.single('cImage'),
    categoryController.postAddCategory
);
router.post('/edit-category', loginCheck, categoryController.postEditCategory);
router.post(
    '/delete-category',
    loginCheck,
    categoryController.getDeleteCategory
);

module.exports = router;