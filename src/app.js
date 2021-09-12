const express = require("express");
const path = require("path");
var cookieParser = require('cookie-parser')
const hbs = require("hbs");
const bcrypt = require("bcrypt");
require("./db/conn");
const singup = require("./models/singup");
const category = require("./models/category");
const port = process.env.PORT || 3000;

const app = express();

// paths
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partails_path = path.join(__dirname, "../templates/partials");

// console.log();
// app.use(express.urlencoded({extendex:false}));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partails_path);
hbs.registerHelper('substr', function(length, context, options) {
    if ( context.length > length ) {
     return context.substring(0, length) + "...";
    } else {
     return context;
    }
   });
app.get("/", async(req, res) => {
    let cookie_id = req.cookies.jwt;
    var error_status = false;
    var login_status = true;
    var username;
    const categories = await category.find();
    // console.log(categories[0].title);
    // console.log();
    if (cookie_id === undefined) {
        login_status = false;
    }
    else{
        const results = await singup.findById(cookie_id);
        // console.log(results.fisrtname);
        username = results.fisrtname;
    }
    if (req.query.errr) {
        error_status = true;
    }
    // console.log(login_status);
    // console.log(error_status);
    res.render("index", {
        singupstatus: error_status,
        loginstatus: login_status,
        username:username,
        catlist:categories
    });
});
app.get("/category", async(req, res) => {
    let cookie_id = req.cookies.jwt;
    var login_status = true;

    if (cookie_id === undefined) {
        login_status = false;
    }
    else{
        const results = await singup.findById(cookie_id);
        var username = results.fisrtname;
        
        // console.log(results.fisrtname);
        // username = results.fisrtname;
    }
    res.render('category',{
        loginstatus: login_status,
        username:username,


    });
});

app.post("/login_status", async (req, res) => {
    const email = req.body.Loginemail;
    const pass = req.body.Loginpass;
    try {
        const results = await singup.findOne({ email: email });
        if (results !== null) {
            const isMatch = await bcrypt.compare(pass, results.pass);
            if (isMatch) {

                res.cookie(`jwt`, results._id);
                res.redirect("/");
            } else {
                res.redirect("/?" + "errr=" + true);
            }
        } else {
            res.redirect("/?" + "errr=" + true);
        }
    } catch (error) {
        res.send(error);
    }
});

app.post("/singup", async (req, res) => {
    try {
        const pass = req.body.pass;
        const cpass = req.body.cpass;
        console.log(pass);
        console.log(cpass);

        if (pass === cpass) {
            const insert = new singup({
                fisrtname: req.body.fname,
                lastname: req.body.lname,
                gender: req.body.gender,
                email: req.body.email,
                pass: req.body.pass,
            });
            const result = insert.save();
            res.redirect("/");
        } else {
            // console.log("wrong");
            res.redirect("/?" + "errr=" + true);
        }

        // res.send("dadad");
    } catch (error) {
        res.redirect("/?" + "errr=" + true);
    }
});






app.get("/logout",(req,res)=>{
    res.clearCookie('jwt');
    res.redirect('/');
});



// const fun  = async()=>{
//     const insert = new category({
//         title: "Queue ",
//         description: ""
//     });
//     const result = insert.save();
// }
// fun();

app.listen(port, () => {
    console.log(`server runnng on port ${port}`);
});
