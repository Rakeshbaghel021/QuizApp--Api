var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:{
        type: String,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        match:/@/
    },
    password:{
        type:String,
        required:true
    },
    marksId:[{
        type:Schema.Types.ObjectId,
        ref:"Mark"
    }]
},
{timestamps:true}
)

userSchema.pre('save',function(next){
    if(this.password && this.isModified("password")){
        bcrypt.hash(this.password,10,(err,password)=>{
            if(err) return next(err);
            this.password = password;
            next()
        })
    }
})
userSchema.methods.matchPassword = function(plainPassword){
    return bcrypt.compareSync(plainPassword,this.password)
}

module.exports = mongoose.model("User",userSchema)