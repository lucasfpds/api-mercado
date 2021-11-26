const app = require('./servidor');
const cors = require('cors');
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)
console.log('cors abilitado')
app.listen(process.env.PORT || 3000);