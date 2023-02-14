const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
    const {id} = req.params;
    const todo = await TodoModel.findById(id);
    if (!todo) {
        return res.status(404).json({error: "Todo item not found"});
    }
    await todo.remove();
    res.status(204).json(todo);
};