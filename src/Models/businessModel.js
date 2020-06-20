var{mongoose, conn} = require("../Modules/connection");
var mongoosePaginate = require('mongoose-paginate');
let  businessSchema  = mongoose.Schema(
    {
        user_id : {
            type : mongoose.Schema.ObjectId,
            ref : "User",
            require : true,
            default : null
        },   
        name : {
            type : String,
            require : true,
            default : "N/A"  
        },   
        email : {
            type : String,
            require : true,
            default : "N/A"  
        },   
        reg_no : {
            type : String,
            require : true,
            default : "N/A"  
        }
    },
    {
        strict: true,
        collection: 'Business',
        versionKey: false
    }
    
);
businessSchema.index({name : -1})
exports.BusinessModel = conn.model('Business', businessSchema); 
