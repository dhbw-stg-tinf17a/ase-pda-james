module.exports = function(app, db) {
  app.post("/example", (req, res)=>{
    res.status(500).send("not implemented");
  });
};
