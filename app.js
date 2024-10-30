//External imports
const express = require("express");
const mongoose = require("mongoose");

//Internal imports
const usersRoutes = require("./routes/users.routes");

//Variables
const app = express();
const PORT = 3000;

const connect = async () => {
  try {
    const connectdb = await mongoose.connect(
      "mongodb+srv://adminFastVoiture:BJ61wSXO9jYEHDOt@cluster0.44esk.mongodb.net/" //Link de Atlas MongoDB
    );
    console.log(`db connect to : ${connectdb.connection.host}`);
  } catch (error) {
    console.log(`Error mongoDb : ${error}`);
  }
};
connect();

//Body parser
app.use(express.json());

//Router
app.use("/users", usersRoutes);

//Listener
app.listen(PORT, () => {
  console.log(`Server listen on port: ${PORT}`);
});
