var commFunc = require('../Modules/commonFunction');
var responses = require('../Modules/responses');
var constant = require('../Modules/constant');
var config = require('../Config/production')
const { UserModel } = require('../Models/userModel')
const { BusinessModel } = require('../Models/businessModel')
const { ProductModel } = require('../Models/productModel')
var jwt  = require('jsonwebtoken')
var Joi = require('joi')
let created_on = Math.round((new Date()).getTime() / 1000);
var md5 = require('md5')


/*-------------------------------------------------
++++++++++++++++ Create User ++++++++++++++++++++++
--------------------------------------------------*/

exports.signup = async (req, res) => {
	try {
		let {name, email, bio, profile_img} = req.body
		var jwt_token
		const user = {
            access_token : Math.round((new Date()).getTime() / 1000)
        }
        await jwt.sign({user}, 'secretkey', (err, token) => {
            if(err) {
                throw new Error(err)
            } else {
                jwt_token = token
            }
		});
		const schema = Joi.object().keys({
            name: Joi.string().required(),
            email : Joi.string().required(),
            bio : Joi.string().optional().allow(''),
            profile_img : Joi.string().optional().allow('')
        })
        const result = Joi.validate(req.body, schema, {
            abortEarly: true
        });
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                response.parameterMissing(res, result.error.details[0].message);
            } else {
                response.parameterMissing(res, result.error.message);
            }
            return;
        }
        let checkEmail = await UserModel.findOne({email})
        if(checkEmail) {
        	throw new Error('Email already exist')
        }
        let data = req.body
        data['access_token'] = jwt_token
        req.files.forEach(file => {
            data[file.fieldname] = `/Upload/${file.filename}`;
        })
        let saveData = new UserModel(data)
        let saveUser = await saveData.save()
        if(!saveUser) {
            throw new Error('Unable to save data')
        } res.Success(saveUser, "Saved successfully.")
	} catch (error) {
		res.status(403).Error(error.message)
	}
}


/*-------------------------------------------------
++++++++++++++++ Add Business ++++++++++++++++++++++
--------------------------------------------------*/

exports.addBusiness = async(req, res) => {
    try {
        let user_id = req.userData._id
        let {name, email, reg_no} = req.body
        let data = req.body
        data['user_id'] = user_id
        let saveData = new BusinessModel(data)
        let saveBusiness = await saveData.save()
        if(!saveBusiness) {
            throw new Error('Unable to save business.')
        } res.Success(saveBusiness, "Business saved")
    } catch(error) {
        res.status(403).Error(error.message)
    }
}

/*----------------------------------------------
++++++++++++++++= addProduct +++++++++++++++++++
-----------------------------------------------*/
exports.addProduct = async(req, res) => {
    try {
        let {ref_id, ref_type, name, mrp, description} = req.body
        let data = req.body;
        let arr = []
        req.files.forEach(file => {
            let img = `/Upload/${file.filename}`;
            arr.push(img)
        })
        data['img'] = arr
        let saveData = new ProductModel(data)
        let saveProduct = await saveData.save()
        if(!saveProduct) {
            throw new error('Unable to save product')
        }res.Success(saveProduct, "Product saved")
    } catch(error) {
         res.status(403).Error(error.message)
    }
}


//Functionalities for different collection
// 1. User - C, R
// Create User Done
/*------------------------------------------------------
++++++++++++++++++++++ getUserData +++++++++++++++++++++
-------------------------------------------------------*/

exports.getAllUser = async(req, res) => {
    try {
        let data = await UserModel.find({}).sort({_id : -1})
        res.Success(data, "User Data")
    } catch(error) {
        res.status(403).Error(error.message)
    }
}

// 2. Business - C, R
// add Business Done
/*----------------------------------------------------------
++++++++++++++++++++++ getBusinessData +++++++++++++++++++++
-----------------------------------------------------------*/
exports.getBusinessData = async(req, res) => {
    try {
        let data = await BusinessModel.find({}).sort({_id : -1})
        res.Success(data, "Business Data")
    } catch(error) {
        res.status(403).Error(error.message)
    }
}

// 3. Products - C, R, U, D
// add Product Done
/*----------------------------------------------------------
++++++++++++++++++++++ getProductData +++++++++++++++++++++
-----------------------------------------------------------*/
exports.getProductData = async(req, res) => {
    try {
        let data = await ProductModel.find({}).sort({_id : -1})
        res.Success(data, "Product Data")
    } catch(error) {
        res.status(403).Error(error.message)
    }
}


// Add product Done
// Get product Done
/*----------------------------------------------------------
++++++++++++++++++++++ updateProductData +++++++++++++++++++++
-----------------------------------------------------------*/
exports.updateProductData = async(req, res) => {
    try {
        let {product_id, name, mrp, description} = req.body
        let data = req.body;
        let arr = []
        req.files.forEach(file => {
            let img = `/Upload/${file.filename}`;
            arr.push(img)
        })
        data['img'] = arr
        let updateData = await ProductModel.findOneAndUpdate({_id : product_id}, data, {new : true})
        if(!updateData) {
            throw new Error('Unable to update product')
        }
        res.Success(updateData, "Product Data upadted")
    } catch(error) {
        res.status(403).Error(error.message)
    }
}


// Add product Done
// Get product Done
//update product done
/*----------------------------------------------------------
++++++++++++++++++++++ removeProduct +++++++++++++++++++++
-----------------------------------------------------------*/
exports.removeProduct = async(req, res) => {
    try {
        let {product_id} = req.body
        let removeProduct = await ProductModel.findOneAndRemove({_id : product_id})
        if(!removeProduct) {
            throw new Error('Invalid product id')
        }
        res.Success({}, "Product removed.")
    } catch(error) {
        res.status(403).Error(error.message)
    }
}