const app = require('./servidor');

app.listen(process.env.PORT || 3005);
console.log("server listening on port", process.env.PORT)