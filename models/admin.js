var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var adminSchema = new Schema({
    adminName :{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        match:/@/
    },
    password:{
        type:String,
        required:true
    },
    quesId:[{
        type:Schema.Types.ObjectId,
        ref:"Question"
    }]
},{timestamps:true}
)

adminSchema.pre('save',function(next){
    if(this.password && this.isModified("password")){
        bcrypt.hash(this.password,10,(err,password)=>{
            if(err) return next(err);
            this.password = password;
            next();
        })
    }
})

adminSchema.methods.matchPassword = function(plainpassword){
    return bcrypt.compareSync(plainpassword,this.password)
}

module.exports = mongoose.model("Admin",adminSchema)