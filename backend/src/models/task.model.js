import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

},{timestamps:true})

const TaskModel  = mongoose.model('task',taskSchema)

export default TaskModel