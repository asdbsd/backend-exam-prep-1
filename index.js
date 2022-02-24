const app = require('./appConfig');
const initDb = require('./models');
const port = 3000;

const start = async () => {
    await initDb();

    app.listen(port, () => console.log(`Listening on port ${port}`));
}

start();