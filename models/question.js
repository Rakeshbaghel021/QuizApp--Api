var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    answers:{
        type:[String],
        required:true
    },
    correctAnswer:{
        type:String,
        required:true
    },
    quizSet:{
        type:String,
        required:true
    },
    adminId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Admin"
    }

})

module.exports = mongoose.model("Question",questionSchema)