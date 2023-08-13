/********server.js que se encarga unicamente de levantar el servidor  *******/
const app = require("./app");

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Running at port ${PORT}`)
});
