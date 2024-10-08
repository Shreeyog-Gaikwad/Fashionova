const port = 4000;
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const a = require("./target");


const app = express();

// All request will be parsed into Json.
app.use(express.json());

// Used to connect project to 4000 port.
app.use(cors());

// Database Connectivity by Mongodb
mongoose.connect(`mongodb+srv://shreeyoggaikwad:02052003@cluster0.qpqci.mongodb.net/Fshionova?retryWrites=true&w=majority&appName=Cluster0`)

//API creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
})


// Image storage engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const upload = multer({ storage: storage });

// API endpoint for Image Upload
app.use("/images", express.static('upload/images'))
app.post('/upload', upload.single('product'), function (req, res) {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
})

// API endpoint for Adding Product to Database
app.post('/addproduct', async function (req, res) {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name
    })
})

// API endpoint for Removing Product from Database
app.post("/removeproduct", async function (req, res) {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// API endpoint for getting All Products from Database
app.get('/allproducts', async function (req, res) {
    let products = await Product.find({});
    console.log("All Products Fetched...");
    res.json(products);
})


// Schema for Users
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// API Endpoint for registering the user
app.post('/signup', async function (req, res) {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same Email address..." });
    }

    let cart = {};

    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });

});

// API Endpoint for User Login
app.post('/login', async function (req, res) {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, "secret_ecom");
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password!!" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id!!" });
    }
})

// API Endpoint for Displaying New Collections
app.get('/newcollections', async function (req, res) {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Added");
    res.send(newcollection);
})

// API Endpoint for Displaying Popular in Womens
app.get('/popularinwomens', async function (req, res) {
    let products = await Product.find({ category: "women" });
    let popular = products.slice(0, 4);
    console.log("Popular in Womens Added");
    res.send(popular);
})

// Middleware for getting user.
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please Authenticate using valid token" });
    }
    else {
        try {
            const data = jwt.verify(token, "secret_ecom");
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please Authenticate using valid token" });
        }
    }
}

// API endpoint for adding products in cart.
app.post("/addtocart", fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
})

// API Endpoint to remove the product from cart.
app.post('/removefromcart', fetchUser, async function (req, res) {
    console.log("Removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
})

// API Endpoint for getting the cart data.
app.post('/getcart', fetchUser, async (req,res) =>{
    console.log("Getcart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    }
    else {
        console.log("Error : " + error);
    }
})
