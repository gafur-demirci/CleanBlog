const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/clean-blog-test-db', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

// Template Engine Starter

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

// Routes (with template engine ejs)

app.get("/" , async (req,res) => {

    const posts = await Post.find({})

    res.render('index',{
        posts
    });
})

// db de yakalanın id li sayfasını render eder
app.get('/posts/:id', async (req, res) => {

    // console.log(req.params.id)  db deki photonun id sini döndürür.
    // res.render('about');
    // ilgli resmin id sini tutab photo oluşturduk ve photo sayfasına bunu gönderdik
    const post = await Post.findById(req.params.id); 
    res.render('post', {
        post
    } )
});

app.get("/about" , (req,res) => {
    res.render('about');
})

app.get("/add_post" , (req,res) => {
    res.render('add_post');
})

// Post yakalama

app.post("/posts" , async (req,res) => {

    await Post.create(req.body)
    res.redirect('/add_post')
});


/* app.get('/index.html', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/index.html'));
})

app.get('/about.html', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/about.html'));

})

app.get('/post.html', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/post.html'));

})

app.get('/add_post.html', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/add_post.html'));

}) */

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});