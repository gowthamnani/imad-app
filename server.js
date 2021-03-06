var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('path');
var config = {
    user: 'gowti2011',
    database: 'gowti2011',
    host : 'db.imad.hasura-app.io',
    port:'5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
var articles ={
    'article-one' : {
    title: 'Article One | Gowtham',
    heading: 'Article one',
    date: 'Aug 5,2017',
    content:`  <p>
                 Note :Web Page Is Under Construction
                </p>
                <p>
                     This is the content of my first article,This is the content of my first article,This is the content of my first article,This is the content of my first article,This is the content of my first article,This is the content of my first article
                 </p>
                 <p>
                     This is the content of my first article,This is the content of my first article,This is the content of my first article,This is the content  of my first article,This is the content of my first article,This is the content of my first article
                 </p> 
                 <p>
                     This is the content of my first article,This is the content of my first article,This is the content of my first article,This is the content of my first article,This is the content of my first article,This is the content of my first article
                 </p>
                
    `},
     'article-two' :{
            title: 'Article Two | Gowtham',
    heading: 'Article Two',
    date: 'Aug 15,2017',
    content: `  <p>
                 Note :Web Page Is Under Construction
                </p>
                <p>
                      This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article
                <p>
                       This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article
                </p>
                <p>   This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article,This is the content of my second article
                </p>`
    },
     'article-three':{ title: 'Article three | Gowtham',
    heading: 'Article three',
    date: 'Aug 25,2017',
    content:` <p>
                 Note :Web Page Is Under Construction
                </p>             
                <p>
                    This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article
                </p>
                <p>This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article
                </p>
                <p>
                    This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article,This is the content of my third article
                </p>
                `
        
    }

};
   
function Create_template(data){
    var date = data.date;
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var htmltemplate = `
    <head>
        <title>
            ${title}
        </title>
        <meta name = "viewport" content="width=device-width, initial-scale=1"/>
                <link href="/ui/style.css" rel="stylesheet" />

    </head>
    <body>
        <div class = "container">
         <div>
             <a href="/">Home</a>
         </div>
         <hr/>
         <h3>
           ${heading}
         </h3>
             <div>
               ${date}
             </div>
             <div>
                ${content}
             </div>
        </div>
        
        
    </body>
</html>

`;
return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new pool(config);
app.get('/test-db', function(req,res){
    
    pool.query('SELECT FROM test' , function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
});

var counter = 0;
app.get('/counter', function(req,res){
    counter = counter + 1;
    rex.send(counter.toString());
});

var names = [];
app.get('submit-name',function(req,res){
    var name = req.query.name;
    
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
    // articlename == article-one
    // articles[articleName] == {} content object for article one
    var articleName = req.params.articleName;
   res.send(Create_template(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});