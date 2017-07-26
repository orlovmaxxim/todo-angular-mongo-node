let mongoose = require('mongoose');

module.exports = mongoose.model('Todolist', {
    name: String,
    tasks: [
      // {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Todo"
      // }
    ]
});