const express = require('express');
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require('dotenv')
const categorieRouter = require("./routes/categorie.route")
const scategorieRouter = require("./routes/scategorie.route")
const articleRouter = require("./routes/article.route")
const paymentRouter = require("./routes/payement.route")
const userRouter = require("./routes/user.route")
dotenv.config()
const app = express();
//BodyParser Middleware
app.use(express.json());
app.use(cors());
app.use('/api/articles', articleRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/users', userRouter);
mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexion à la base de données réussie");
    }).catch(err => {
        console.log('Impossible de se connecter à la base de données', err);
        process.exit();
    });
app.get("/", (req, res) => {
    res.send("bonjour");
});
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

module.exports = app;



