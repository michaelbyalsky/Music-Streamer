const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log("Server is listening in port 8080");
});
