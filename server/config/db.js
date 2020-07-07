const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:'test2'
        },
        function(err){
            if (err) {
                console.error('mongodb connection error', err);
            } else {
                console.log('mongodb connected');
            }
        });
}