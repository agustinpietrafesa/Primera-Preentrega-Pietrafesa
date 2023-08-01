/********server.js que se encarga unicamente de levantar el servidor  *******/
const app = require("./app");

const port = 8080

app.listen(port, () => {
    console.log(`Running at port ${port}`)
});
