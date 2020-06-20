var{mongoose, conn} = require("../Modules/connection");
var mongoosePaginate = require('mongoose-paginate');
let  productSchema  = mongoose.Schema(
    {
        ref_id : {
            type : String,
            require : true,
            default : "N/A"  
        },  
        ref_type : {
            type : String,
            require : true,
            default : "N/A"  
        },  //1 for user id 2 for business id 
        name : {
            type : String,
            require : true,
            default : "N/A"  
        },   
        mrp : {
            type : String,
            require : true,
            default : "N/A"  
        },
        description : {
            type : String,
            require : true,
            default : "N/A"  
        },
        img : []
    },
    {
        strict: true,
        collection: 'Product',
        versionKey: false
    }
    
);
productSchema.index({name : -1})
exports.ProductModel = conn.model('Product', productSchema); 
