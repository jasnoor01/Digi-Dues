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
const { request } = require('express')
app.use(bodyParser.json())
app.use(cors())

const paymentRoute = require('./paymentRoute')
app.use('/api', paymentRoute);

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
        student = db.collection('Student')
        requests = db.collection('Requests')
        dues = db.collection('Dues')
        detailedreqstat = db.collection('Detailed-Request-Status')
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);

app.post('/login', async (req, res) => {
    try {
        let a = await admin.findOne({ secureId: req.body.UserName, securePass: req.body.Password })
        let b = await clerk.findOne({ UserName: req.body.UserName, Password: req.body.Password })
        let c = await staff.findOne({ UserName: req.body.UserName, Password: req.body.Password })
        let d = await student.findOne({ UniversityRollNumber: req.body.UserName, Password: req.body.Password })

        if (a) {
            let suc = { ...a, Type: "Admin" }
            res.send(suc)
        } else {
            if (b) {
                let suc = { ...b, Type: "Clerk" }
                res.send(suc)

            } else {
                if (c) {
                    let suc = { ...c, Type: "Staff" }
                    res.send(suc)
                } else {
                    // res.send("Invalid login attempt!");
                    if (d) {
                        let suc = { ...d, Type: "Student" }
                        // console.log(suc)
                        res.send(suc)
                    } else {
                        res.send("Invalid login attempt!");
                    }
                }
            }
        }


    } catch (error) {
        res.send(error)
    }
})

app.post('/loginfo', async (req, res) => {
    try {
        let ra = await admin.findOne({ _id: new mongodb.ObjectId(req.body.idd) })
        let rc = await clerk.findOne({ _id: new mongodb.ObjectId(req.body.idd) })
        let rs = await staff.findOne({ _id: new mongodb.ObjectId(req.body.idd) })
        let rstu = await student.findOne({ _id: new mongodb.ObjectId(req.body.idd) })

        if (ra !== null) {
            res.send(ra)
        } else if (rc !== null) {
            res.send(rc)
        } else if (rs !== null) {
            res.send(rs)
        } else if (rstu !== null) {
            res.send(rstu)
        }

    } catch (error) {
        res.send(error)
    }
})
app.get('/getdash', async (req, res) => {
    const date = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });
    let aa = await requests.find().count()
    let a = await requests.find({ requestStatus: "Pending" }).count()
    let b = await requests.find({ requestStatus: "Approved" }).count()
    // let b= await requests.find({TimeStamp:}).count()
    var c, d
    await dues.find({ Status: "Pending" }).toArray().then((succ) => {
        let result = succ.map(a => a.Dues);
        c = result.reduce(
            (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
            0
        );
    })
    await dues.find({ Status: "Received" }).toArray().then((succ) => {
        let result = succ.map(a => a.Dues);
        d = result.reduce(
            (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
            0

        )
    })

    let obj = {
        TotalReq: aa,
        PendingReq: a,
        AcceptedReq: b,
        DuesPending: c,
        DuesReceived: d,
    }
    // console.log()
    res.send(obj)

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
        let s = await staff.findOne({ UserName: req.body.UserName })
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
            // console.log(s)
            res.send("Sorry,User name already exists!")
        } else {
            let checkdep = await clerk.findOne({ Department: req.body.Department })
            if (!checkdep) {
                await clerk.insertOne(combined).then((succ) => {

                    res.send(succ)
                })
            } else {
                res.send("Sorry,Clerk of this deparment is already registered!")
            }
        }
    } catch (error) {
        res.send(error)
    }
})
app.get('/getclerk', async (req, res) => {
    try {


        clerk.find().toArray().then((succ) => {
            res.send(succ)
        })

    } catch (error) {
        console.log(error)
    }

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
        let checkdep = await clerk.findOne({ Department: req.body.Department })

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
                        // Department: req.body.Department,
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
                    // Department: req.body.Department,
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
        // console.log(req.body)
        let user = await clerk.findOne({ UserName: req.body.UserName })
        let s = await staff.findOne({ UserName: req.body.UserName })
        let a = await admin.findOne({ secureId: req.body.UserName })
        let ra = await admin.findOne({ _id: new mongodb.ObjectId(req.body.RegisteredBy) })
        let rc = await clerk.findOne({ _id: new mongodb.ObjectId(req.body.RegisteredBy) })
        if (ra !== null) {
            obj = { RegisteredByName: ra.Name }
        } else if (rc !== null) {
            obj = { RegisteredByName: rc.FirstName + " " + rc.LastName }
        }
        let combined = { ...req.body, ...obj }

        if (user || s || a) {
            res.send("Sorry,User name already exists!")
        } else {
            await staff.insertOne(combined).then((succ) => {
                res.send(succ)
            })
        }
    } catch (error) {
        res.send(error)
    }
})
app.get('/getstaff', (req, res) => {
    staff.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/delstaff', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    staff.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})
app.post('/updatestaff', async (req, res) => {
    var idd = new mongodb.ObjectId(req.body.idd);
    if (req.body.UserName) {
        let user = await clerk.findOne({ UserName: req.body.UserName })
        let s = await staff.findOne({ Username: req.body.UserName })
        let a = await admin.findOne({ secureId: req.body.UserName })
        if (user || s || a) {
            res.send("Sorry,User name already exists!")
        } else {
            staff.findOne({
                _id: idd
            }
            ).then((succ) => {
                staff.updateOne({ _id: idd }, {
                    $set: {
                        UserName: req.body.UserName,
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        Department: req.body.Department,
                        Facility: req.body.Facility,
                        Designation: req.body.Designation,
                    }
                }).then((suc) => {
                    res.send(suc)
                })
            })
        }
    } else {
        staff.findOne({
            _id: idd
        }
        ).then((succ) => {
            staff.updateOne({ _id: idd }, {
                $set: {
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    Department: req.body.Department,
                    Facility: req.body.Facility,
                    Designation: req.body.Designation,
                }
            }).then((suc) => {
                res.send(suc)
            })
        })
    }
})
// Student
app.post('/addstudent', async (req, res) => {

    try {
        let user = await student.findOne({ UniversityRollNumber: req.body.UniversityRollNumber })
        let ra = await admin.findOne({ _id: new mongodb.ObjectId(req.body.RegisteredBy) })
        let rc = await clerk.findOne({ _id: new mongodb.ObjectId(req.body.RegisteredBy) })
        let rs = await staff.findOne({ _id: new mongodb.ObjectId(req.body.RegisteredBy) })

        if (!user) {
            if (ra !== null) {
                obj = { RegisteredByName: ra.Name }
            } else if (rc !== null) {
                obj = { RegisteredByName: rc.FirstName + " " + rc.LastName }
            }
            else if (rs !== null) {
                obj = { RegisteredByName: rs.FirstName + " " + rs.LastName }
            }
            let combined = { ...req.body, ...obj }
            await student.insertOne(combined).then((succ) => {
                res.send(succ)
            })
        } else {
            res.send("Sorry,University roll number already exists!")
        }

    } catch (error) {
        res.send(error)
    }
})
app.get('/getstudent', (req, res) => {

    student.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/delstudent', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    student.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})
app.post('/updatestudent', async (req, res) => {
    var idd = new mongodb.ObjectId(req.body.idd);
    if (req.body.UniversityRollNumber) {
        let a = await student.findOne({ UniversityRollNumber: req.body.UniversityRollNumber })
        if (a) {
            res.send("Sorry,university roll number already exists!")
        } else {
            student.findOne({
                _id: idd
            }
            ).then((succ) => {
                student.updateOne({ _id: idd }, {
                    $set: {
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        JoiningYear: req.body.JoiningYear,
                        PassingYear: req.body.PassingYear,
                        UniversityRollNumber: req.body.UniversityRollNumber,
                        PermanentAddress: req.body.PermanentAddress,
                        Department: req.body.Department,
                        Password: req.body.Password,
                        Contact: req.body.Contact,
                        BankStatus: req.body.BankStatus,
                        FatherName: req.body.FatherName,
                        CollegeRollNo: req.body.CollegeRollNo,
                        SavingBankAcNo: req.body.SavingBankAcNo,
                        BankName: req.body.BankName,
                        BranchAddress: req.body.BranchAddress,
                        BankPhoneNumber: req.body.BankPhoneNumber,
                        BenificiaryName: req.body.BenificiaryName,
                        CodeType: req.body.CodeType,
                        Code: req.body.Code,
                    }

                }).then((suc) => {
                    res.send(suc)
                })
            })
        }
    }
    else {
        student.findOne({
            _id: idd
        }
        ).then((succ) => {
            student.updateOne({ _id: idd }, {
                $set: {
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    JoiningYear: req.body.JoiningYear,
                    PassingYear: req.body.PassingYear,
                    PermanentAddress: req.body.PermanentAddress,
                    Department: req.body.Department,
                    Password: req.body.Password,
                    Contact: req.body.Contact,
                    BankStatus: req.body.BankStatus,
                    FatherName: req.body.FatherName,
                    CollegeRollNo: req.body.CollegeRollNo,
                    SavingBankAcNo: req.body.SavingBankAcNo,
                    BankName: req.body.BankName,
                    BranchAddress: req.body.BranchAddress,
                    BankPhoneNumber: req.body.BankPhoneNumber,
                    BenificiaryName: req.body.BenificiaryName,
                    CodeType: req.body.CodeType,
                    Code: req.body.Code,
                }
            }
            ).then((suc) => {
                res.send(suc)
            })
        })
    }
}
)
// Request
app.post('/sendrequest', async (req, res) => {

    try {
        var idd = new mongodb.ObjectId(req.body.user);
        const date = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        let a = await student.findOne({ _id: idd })
        let d = await dues.find({ StudentId: req.body.user, Status: "Pending" }).toArray()
        let result = d.map(a => a.Dues);
        c = result.reduce(
            (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
            0
        )
        let obj = {
            studentId: a._id,
            studentFirstName: a.FirstName,
            studentLastName: a.LastName,
            studentContact: a.Contact,
            TimeStamp: date,
            studentDepartment: a.Department,
            studentUniversityRollNumber: a.UniversityRollNumber,
            studentDues: c,
            dueStatus: "Pending",
            requestStatus: "Pending"
        }

        function extractValue(arr, prop) {
            let ob
            let extractedValue = arr.map(item => item[prop]);
            return extractedValue.reduce((a, v) => ({ ...a, [v]: '' }), {})
        }

        let b = await requests.findOne({ studentId: a._id })
        if (!b) {
            requests.insertOne(obj).then((succ) => {
                facility.find().toArray().then(async (succ) => {
                    let abc = {
                        studentId: a._id,
                    }
                    fac = extractValue(succ, 'Facility')
                    abc = { ...abc, ...fac }
                    detailedreqstat.insertOne(abc).then((succ) => {
                        // console.log(succ)
                    })
                })
                res.send(succ)
            })
        } else {
            res.send("Already exists")
        }
    } catch (error) {
        console.log(error)
    }
})
app.get('/getrequests', (req, res) => {
    requests.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/updatereq', async (req, res) => {
    // student id
    var idd = new mongodb.ObjectId(req.body.idd);
    // await requests.findOne({
    //         _id: idd
    //     }
    //     ).then(async(succ)=>{
    //         console.log(succ)
    //     })


    detailedreqstat.findOne({
        studentId: idd
    }).then((succ) => {
        var key = req.body.From;
        var obj = {};
        obj[key] = req.body.Status;
        detailedreqstat.updateOne({ studentId: idd }, {
            $set: obj
        }).then((succ) => {
            res.send(succ)
        })
    })


    // await requests.findOne({
    //     _id: idd
    // }
    // ).then(async (succ) => {
    //     await requests.updateOne({ _id: idd }, {
    //         $set: {
    //             requestStatus: req.body.Status,
    //             Message: req.body.Message
    //         }
    //     }).then((suc) => {
    //         res.send(suc)
    //     })
    // })



})
app.post('/delrequest', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    requests.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})
app.post('/getdetailedreqstat', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.idd)
    detailedreqstat.find({ studentId: idd }).toArray().then((succ) => {
        res.send(succ)
    })
})
// Dues
app.post('/adddues', async (req, res) => {
    try {
        var idd = new mongodb.ObjectId(req.body.StudentId)
        await student.findOne({ _id: idd }).then(async (succ) => {
            student.updateOne({ _id: idd }, {
                $set: {
                    DueStatus: "Pending"
                }
            })
        })
        await dues.insertOne(req.body).then((succ) => {
            res.send(succ)
        })
    } catch (error) {
        res.send(error)
    }
})
app.get('/getdues', (req, res) => {
    dues.find().toArray().then((succ) => {
        res.send(succ)
    })
})
app.post('/deldue', (req, res) => {
    var idd = new mongodb.ObjectId(req.body.id);
    dues.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send(succ);
    })
})
app.post('/cleardue', async (req, res) => {
    var idd = new mongodb.ObjectId(req.body.idd)
    var stuid = new mongodb.ObjectId(req.body.student)
    dues.findOne({
        _id: idd
    }
    ).then(async (succ) => {
        await dues.updateOne({ _id: idd }, {
            $set: {
                Status: "Received",
            }
        }).then(async (suc) => {
            let a = await dues.find({ StudentId: req.body.student, Status: "Pending" }).count()
            if (a === 0) {
                await student.findOne({ _id: stuid }).then(async (succ) => {
                    student.updateOne({ _id: stuid }, {
                        $set: {
                            DueStatus: "Received"
                        }
                    })
                })
            }

            res.send(suc)
        })
    })
})



app.listen(1000, (req, res) => {
    console.log('Server started')
})   