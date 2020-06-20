var user = require ('../Controllers/userController');
var auth = require ('../Modules/auth');
var multer = require ('multer');
var md5 = require ('md5');
var express = require  ('express')
var path = require ('path');

exports.getRouter = (app) => {

    let storage = multer.diskStorage({
        destination: function(req, file, callback) {
            console.log("multer")
            console.log(file)
            callback(null, './src/Upload');
        },
        filename: function(req, file, callback) {
            let fileUniqueName = md5(Date.now());
            callback(null, fileUniqueName + path.extname(file.originalname));
        }
    });
    let upload = multer({ storage: storage });

    // task 1
    app.route("/user/signup").post(upload.any(), user.signup);    
    app.route("/user/getAllUser").get(user.getAllUser);

    // task2
    app.route("/user/addBusiness").post(auth.requiresLogin, user.addBusiness);
    app.route("/user/getBusinessData").get(user.getBusinessData);

    //task3
    app.route("/user/addProduct").post(upload.any(),user.addProduct);
    app.route("/user/getProductData").get(user.getProductData);
    app.route("/user/updateProductData").put(upload.any(),user.updateProductData);
    app.route("/user/removeProduct").delete(user.removeProduct);
}