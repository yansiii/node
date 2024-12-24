let Schema = require("../model/Schema");
const fs = require("fs")

module.exports.getRecord = async(req,res)=>{
    await Schema.find({}).then((data)=>{
        res.status(200).json({msg:"this is your data"});
    })
 
}

module.exports.addRecord = async(req,res)=>{
 await Schema.create(req.body).then((data)=>{
    res.status(200).json({msg:"i get your data"});
})
}
module.exports.deleteData = async(req,res)=>{
    let singleData = await Schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)
    await Schema.findByIdAndDelete(req.query.id).then((data)=>{
        res.status(200).json({msg:"data deleted"})
    })
}

module.exports.EditData=async(req,res)=>{
    console.log(req.file);
    let singleData = await Schema.findById(req.query.id)
    req.file ? img = req.file.path : img = singleData.image
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img

    await Schema.findByIdAndUpdate(req.query.id,req.body).then((data)=>{
        res.status(200).json({msg:"data updated"})
    })
    
}