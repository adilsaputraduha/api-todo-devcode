const router = require("express").Router();
const { activity, todo } = require("../controllers");

router.get("/", function (req, res) {
    res.write(`API Todo-List Devcode Worked!`);
});

router.get("/activity-groups", activity.getAllActivity);

router.get("/activity-groups/:id", activity.getActivityById);

router.post("/activity-groups", activity.addActivity);

router.put("/activity-groups/:id", activity.editActivity);

router.delete("/activity-groups/:id", activity.deleteActivity);

router.get("/todo-items", todo.getAllTodo);

router.get("/todo-items/:id", todo.getTodoById);

router.post("/todo-items", todo.addTodo);

router.put("/todo-items/:id", todo.editTodo);

router.delete("/todo-items/:id", todo.deleteTodo);

module.exports = router;
