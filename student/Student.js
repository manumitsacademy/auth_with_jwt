var mongoose = require('mongoose');  
var StudentSchema = new mongoose.Schema({  
  firstname: String,
  lastname: String,
  location: String,
  city: String,
  email: String
});
mongoose.model('Student', StudentSchema);

module.exports = mongoose.model('Student');