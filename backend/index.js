const express = require('express')  //to import
const app = express()
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
// const MongoClient = require('mongodb')
// const MongoClient = require('mongodb').MongoClient
const { MongoClient } = require('mongodb');
const cors = require('cors')
const { default: axios } = require('axios')
app.use(bodyParser.json())
app.use(cors())

var department, facility, designation, clerk;
async function main() {
    const connectionString = 'mongodb+srv://admin:admin@cluster0.regjfxt.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(connectionString);
    try {
        await client.connect();
        console.log("db connected")
        var db = client.db('DigiDues')
        department = db.collection('Departments')
        facility = db.collection('Facilities')
        designation = db.collection('Designations')
        clerk = db.collection('Clerks')
        admin = db.collection('Administrator')
        staff = db.collection('Staff')
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);



app.post('/login', async (req, res) => {
    try {
        let a = await admin.findOne({ secureId: req.body.UserName, securePass: req.body.Password })
        if (a) {
            let suc = { ...a, Type: "Admin" }
            res.send(suc)
        } else {
            let b = await clerk.findOne({ UserName: req.body.UserName, Password: req.body.Password })
            if (b) {
                let suc = { ...b, Type: "Clerk" }
                res.send(suc)
            } else {
                let c = await staff.findOne({ UserName: req.body.Username, Password: req.body.Password })
                if (c) {
                    let suc = { ...c, Type: "Staff" }
                    res.send(suc)
                } else {
                    // res.send("Invalid login attempt!")
                    res.send("Invalid login attempt!");
                }
            }
        }


    } catch (error) {
        res.send(error)
    }
})

app.post('/addep', async (req, res) => {
    try {
        await department.insertOne(req.body).then((succ) => {
            res.send(succ)
        })
    } catch (error) {
        res.send(error)
    }
})
app.get('/getdep', (req, res) => {
    department.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/deldep', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    department.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})
app.post('/updatedep', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.idd);
    department.findOne({
        _id: idd
    }).then((succ) => {
        department.updateOne({ _id: idd }, {
            $set: {
                Department: req.body.dep
            }
        }).then((suc) => {
            res.send(suc)
        })
    })
})


// Facility
app.post('/addfac', async (req, res) => {
    try {
        await facility.insertOne(req.body).then((succ) => {
            res.send(succ)
        })
    } catch (error) {
        res.send(error)
    }
})
app.get('/getfac', (req, res) => {
    facility.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/delfac', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    facility.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})
app.post('/updatefac', (req, res) => {

    var idd = new mongodb.ObjectId(req.body.idd);
    facility.findOne({
        _id: idd
    }
    ).then((succ) => {
        facility.updateOne({ _id: idd }, {
            $set: {
                Department: req.body.dep,
                Facility: req.body.fac
            }
        }).then((suc) => {
            res.send(suc)

        })
    })
})

// Designation
app.post('/adddesig', async (req, res) => {
    try {
        await designation.insertOne(req.body).then((succ) => {
            res.send(succ)
        })
    } catch (error) {
        res.send(error)
    }
})
app.get('/getdesig', (req, res) => {
    designation.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/deldesig', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    designation.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})
app.post('/updatedesig', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.idd);
    designation.findOne({
        _id: idd
    }
    ).then((succ) => {
        designation.updateOne({ _id: idd }, {
            $set: {
                Designation: req.body.desig
            }
        }).then((suc) => {
            res.send(suc)
        })
    })
})

// Clerk
app.post('/addclerk', async (req, res) => {
    try {

        let user = await clerk.findOne({ UserName: req.body.UserName })
        let s = await staff.findOne({ Username: req.body.UserName })
        let a = await admin.findOne({ secureId: req.body.UserName })

        let ra = await admin.findOne({ _id: new mongodb.ObjectId(req.body.RegisteredBy) })
        let rc = await clerk.findOne({ _id: new mongodb.ObjectId(req.body.RegisteredBy) })
        let rs = await staff.findOne({ _id: new mongodb.ObjectId(req.body.RegisteredBy) })
        let obj = {}
        if (ra !== null) {
            obj = { RegisteredByName: ra.Name }
        } else if (rc !== null) {
            obj = { RegisteredByName: rc.FirstName + " " + rc.LastName }
        } else if (rs !== null) {
            obj = { RegisteredByName: rs.FirstName + " " + rs.LastName }
        }

        let combined = { ...req.body, ...obj }

        if (user || s || a) {
            res.send("Sorry,User name already exists!")
        } else {
            await clerk.insertOne(combined).then((succ) => {

                res.send(succ)
            })
        }
    } catch (error) {
        res.send(error)
    }
})
app.get('/getclerk', (req, res) => {
    clerk.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/delclerk', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    clerk.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})
app.post('/updateclerk', async (req, res) => {
    var idd = new mongodb.ObjectId(req.body.idd);
    if (req.body.UserName) {
        let user = await clerk.findOne({ UserName: req.body.UserName })
        let s = await staff.findOne({ Username: req.body.UserName })
        let a = await admin.findOne({ securequeId: req.body.UserName })
        if (user || s || a) {
            res.send("Sorry,User name already exists!")
        } else {
            clerk.findOne({
                _id: idd
            }
            ).then((succ) => {
                clerk.updateOne({ _id: idd }, {
                    $set: {
                        UserName: req.body.UserName,
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        Department: req.body.Department,
                    }
                }).then((suc) => {
                    res.send(suc)
                })
            })
        }
    } else {
        clerk.findOne({
            _id: idd
        }
        ).then((succ) => {
            clerk.updateOne({ _id: idd }, {
                $set: {
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    Department: req.body.Department,
                }
            }).then((suc) => {
                res.send(suc)
            })
        })
    }
})

// Staff
app.post('/addstaff', async (req, res) => {
    try {
        await staff.insertOne(req.body).then((succ) => {
            res.send(succ)
        })
    } catch (error) {
        res.send(error)
    }
})
app.get('/getstaff', (req, res) => {
    staff.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/deldesig', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    designation.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})





app.listen(1000, (req, res) => {
    console.log('Server started')
}) 