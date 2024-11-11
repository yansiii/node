let admin = require("../model/dbSchema")

module.exports.homePage = async(req,res) =>{
    let data = await admin.find({})
    data && res.render("index",{data})
}

module.exports.addData = async(req,res) =>{
    req.body.image = req.file.path
    let data = await admin.create(req.body)
    data && res.redirect("/")
}
module.exports.deleteData = async (req, res) => {
    let id = req.query.Id;
    await admin.findByIdAndDelete(id);
    res.redirect("/");
  };
  module.exports.editPage = async (req, res) => {
    let data = await admin.findById(req.query.Id);
    res.render("edit", { data });
  };
  