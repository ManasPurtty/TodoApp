const {Router}= require ("express");
const {getTodos,saveTodo, updateTodo, deleteTodo} =require("../controller/Todocontroller");

const router=Router();
router.get("/get",getTodos);

router.post("/save",saveTodo);
router.delete("/delete/:id",deleteTodo);
router.put("/update/:id",updateTodo);
module.exports=router;



