const TodoModel = require("../models/TodoModel");
const ToDoModel=require("../models/TodoModel");

module.exports.getTodos=async(req,res)=>{
    const toDos=await ToDoModel.find();
    res.send(toDos);
};


module.exports.saveTodo=(req,res)=>{
const {toDo}=req.body

ToDoModel.create({toDo})
.then((data)=>{
    console.log("saved successfully");
res.status(201).send(data);
})
.catch((err) => {
    console.log(err);
    res.send({ error: err, msg: "Something went wrong" });
});
};

module.exports.updateTodo=(req,res)=>{
    const{id}=req.params;
    const {toDo}=req.body;

    
    TodoModel.findByIdAndUpdate(id,{toDo}) 
    .then(()=>{
    res.send("updated successfully");
    })
    .catch((err) => {
        console.log(err);
        res.send({ error: err, msg: "Something went wrong" });
    });
};

    module.exports.deleteTodo=(req,res)=>{
        const{id}=req.params;
    
        
        TodoModel.findByIdAndDelete(id) 
        .then(()=>{
        res.send("Deleted successfully");
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong" });
        });
    };