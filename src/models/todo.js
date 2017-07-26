let mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todolist"
    }
});