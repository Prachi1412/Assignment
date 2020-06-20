var{mongoose, conn} = require("../Modules/connection");
var mongoosePaginate = require('mongoose-paginate');
let  userSchema  = mongoose.Schema(
    {
        access_token : {
            type : String,
            require : true
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
        bio : {
            type : String,
            require : true,
            default : "N/A"  
        },   
        profile_img : {
            type : String,
            require : true,
            default : "N/A"  
        }
    },
    {
        strict: true,
        collection: 'User',
        versionKey: false
    }
    
);
userSchema.index({name : -1})
exports.UserModel = conn.model('User', userSchema); 
