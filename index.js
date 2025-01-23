const express = require('express');
const app = express();
const port =  8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
 
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.set('view engine', "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id :uuidv4(),
         username : "prasad hg",
         content : "i love coding",

    },
    {
        id:uuidv4(),
        username : "shashank m",
        content : "i love chatting",

   },
   {
    id:uuidv4(),
    username : "ullas",
    content : "i am ullu from ullahalli",

},
];
app.get("/posts", (req,res) =>{
    res.render('index.ejs', {posts});
});

app.get("/posts/new",(req,res)=>{
    
    res.render('new.ejs');
});

app.post("/posts", (req,res)=>{
    let{username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect('/posts');
});

app.get("/posts/:id",(req,res)=>{
    let{id} = req.params;
    let post = posts.find((a)=> id == a.id);
  res.render('show.ejs',{post});
});

app.patch("/posts/:id",(req,res)=>{
    let{id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((a)=> id == a.id);
    post.content = newcontent;
    console.log(post);
    res.redirect('/posts');
  });

app.get("/posts/:id/edit",(req,res)=>{
    let{id} = req.params;
    let post = posts.find((a)=> id == a.id);
    res.render('edit.ejs',{post});
});

app.delete("/posts/:id",(req,res)=>{
    let{id} = req.params;
     posts = posts.filter((a)=> id !== a.id);
    res.redirect("/posts");
});

app.listen(port ,()=>{
    console.log(`listening to the port${port}`);
});
