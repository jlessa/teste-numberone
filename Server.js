const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors');

const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://localhost:27017';
const urlAtlas = 'mongodb+srv://leandroguimaraes:cloud123836@numberonegamespubg-crlwx.mongodb.net/test?retryWrites=true&w=majority'

// const uri = "mongodb://<dbuser:<dbpassword>@ds133279.mlab.com:33279/crud-nodejs";
// bd_string: 'mongodb+srv://usuario_admin:55kdjSKGMOda3@clusterapi-3katt.mongodb.net/test?retryWrites=true'

MongoClient.connect(urlAtlas, (err, client) => {
    if (err) return console.log(err)
    db = client.db('pubg') // coloque o nome do seu DB

    app.listen(3001, () => {
        console.log('Server NumberOneGamesAPI running on port 3001')
    })
})

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    findAll(null,null,null,0,null).then((docs) =>{
        res.send(docs);
    })
    // res.send({message:"conectado"});
})
app.post('/findAll', (req, res) => {
    const {collection, field, projectionFields, limit,sort} = req.body;

    findAll(
        collection,
        field,
        projectionFields,
        limit,
        sort
        )
        .then((docs) =>{

            res.send({code:200, data:docs});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})

app.post('/findOne', (req, res) => {
    const {collection, field, projectionFields} = req.body;
    
    findOne(
        collection,
        field,
        projectionFields
        )
        .then((doc) =>{

            res.send({code:200, data:doc});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})

app.post('/updateOne', (req, res) => {

    const {collection, filter, fieldAndValue} = req.body;
   
    updateOne(collection,filter,fieldAndValue).then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})

app.post('/updateMany', (req, res) => {
    const {collection, filter, fieldAndValue} = req.body;

    updateMany(collection,filter,fieldAndValue).then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})

app.post('/insertOne', (req, res) => {
    const {collection, doc} = req.body;

    insertOne(collection,doc)
    .then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})

app.post('/insertMany', (req, res) => {
    const {collection, docs} = req.body;

    insertMany(collection,docs)
    .then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})

app.post('/insertDocInOneArrayExisting', (req, res) => {
    const {collection, filter, fieldAndValue} = req.body;

    insertDocInOneArrayExisting(collection,filter, fieldAndValue)
    .then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})
app.post('/insertDocInManyArrayExisting', (req, res) => {
    const {collection, filter, fieldAndValue} = req.body;

    insertDocInManyArrayExisting(collection,filter, fieldAndValue)
    .then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})
app.post('/removeElementInOneArrayExisting', (req, res) => {
    const {collection, filter, fieldAndValue} = req.body;

    removeElementInOneArrayExisting(collection,filter, fieldAndValue)
    .then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})
app.post('/removeElementInManyArrayExisting', (req, res) => {
    const {collection, filter, fieldAndValue} = req.body;

    removeElementInManyArrayExisting(collection,filter, fieldAndValue)
    .then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})

app.post('/deleteOne', (req, res) => {
    const {collection, filter} = req.body;

    deleteOne(collection,filter)
    .then((result) => {
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
})

app.post('/deleteMany', (req, res) => {
    const {collection, filter} = req.body;
    deleteMany(collection,filter)
    .then((result) =>{
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
   
})
app.post('/aggregate', (req, res) => {
    const {collection,expression} = req.body;
    console.log(req.body);
    aggregate(collection, expression)
    .then((result) =>{
        res.send({code:200, data:result});
    })
    .catch((err) => {
        res.send({code: 500, message :err})
    })
   
})

const updateOne = (collection, filter, fieldAndValue) => {
        return new Promise((resolve,reject) => {
            db.collection(collection).updateOne(
                filter,
                {
                $set: fieldAndValue,
                $currentDate: { lastModified: true }
                },
                (err,result) =>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
    
                    }
                }
            );
        })
    }
     const updateMany = (collection, filter, fieldAndValue) =>{
        return new Promise((resolve,reject) => {
            db.collection(collection).updateMany(
                filter,
                {
                $set: fieldAndValue,
                $currentDate: { lastModified: true }
                },
                (err,result) =>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
    
                    }
                }
            );
        })
    }
     const insertOne = (collection, doc) =>{
        return new Promise((resolve,reject) => {
            db.collection(collection).insertOne(doc,(err, result) =>{
                resolve(result);
            });
        })
    }
     const insertMany = (collection, docs) =>{
        return new Promise((resolve,reject) => {
            db.collection(collection).insertMany(docs,(err, result) =>{
                if(err) reject(err);
                resolve(result);
            });
        })
    }
     const insertDocInOneArrayExisting = (collection,filter, fieldAndvalue) => {
        
        return new Promise((resolve,reject) => {
            db.collection(collection).updateOne(
                filter,
                {
                  $push: fieldAndvalue
                },
                (err,result) =>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
    
                    }
                }
              );
        })
        
    }
    const insertDocInManyArrayExisting = (collection,filter, fieldAndvalue) => {
        
        return new Promise((resolve,reject) => {
            db.collection(collection).updateMany(
                filter,
                {
                  $push: fieldAndvalue
                },
                (err,result) =>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
    
                    }
                }
              );
        })
        
    }
    const removeElementInOneArrayExisting = (collection,filter, fieldAndvalue) => {
        
        return new Promise((resolve,reject) => {
            db.collection(collection).updateOne(
                filter,
                {
                  $pull: fieldAndvalue
                },
                (err,result) =>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
    
                    }
                }
              );
        })
        
    }
    const removeElementInManyArrayExisting = (collection,filter, fieldAndvalue) => {
        
        return new Promise((resolve,reject) => {
            db.collection(collection).updateMany(
                filter,
                {
                  $pull: fieldAndvalue
                },
                (err,result) =>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
    
                    }
                }
              );
        })
        
    }
    
    //Retorna um array de documentos
     const findAll = (collection, field, projectionFields, limit = 0, sort) =>{
      
        return new Promise((resolve, reject) => {
            db.collection(collection).find(field).project(projectionFields).limit(parseInt(limit)).sort(sort).toArray(function(err, docs) {
                if(err) reject(err);
                resolve(docs);
              });
        })
    }
    
    //Retorna um único documento
     const findOne = (collection,field,projectionFields) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).find(field).project(projectionFields).toArray((err, doc) => {
                if (err) reject(err);
                else{
                resolve(doc[0]);
                }
              });
        })
    }
     const deleteOne = (collection, filter) =>{
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteOne(filter, (err, result) =>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        })
    }
     const deleteMany = (collection, filter) =>{
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteMany(filter, (err, result) =>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        })
    }
    
    const aggregate = (collection, expression) => {
        return new Promise((resolve,reject) => {
            console.log("entrou");
            db.collection(collection).aggregate(expression)
            .toArray(function(err, res) {
                if(err){
                    console.log(err);
                    reject(err);
                }
                else{
                    console.log(res);
                    resolve(res);
                }
               
            });   
                
         
        //     db.collection(collection)
        //     .aggregate( expression.toArray(function(err, res){
        //         if(err){
        //             reject(err);
        //         }
        //         else{
        //             resolve(result);
        //         }

        //      }))
        // })
    })}
    // app.get('/show', (req, res) => {
//     db.collection('data').find().toArray((err, results) => {
//         if (err) return console.log(err)
//         res.render('show.ejs', { data: results })

//     })
// })

// app.post('/show', (req, res) => {
//     db.collection('data').save(req.body, (err, result) => {
//         if (err) return console.log(err)

//         console.log('Salvo no Banco de Dados')
//         res.redirect('/show')
//     })
// })