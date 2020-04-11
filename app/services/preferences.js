module.exports = function(db) {
  this.get = (key)=>{
    return new Promise((resolve, reject)=>{
      db.collection("preferences").findOne({}).then((prefs)=>{
        resolve(prefs[key]);
      }).catch(reject);
    });
  };

  this.set = (key, value)=>{
    return new Promise((resolve, reject)=>{
      db.collection("preferences").count({}).then((count)=>{
        if (count == 0) {
          db.collection("preferences").insertOne({[key]: value}).then(()=>{
            resolve();
          }).catch(reject);
        } else {
          db.collection("preferences").updateOne({}, {$set: {[key]: value}}).then(()=>{
            resolve();
          }).catch(reject);
        }
      }).catch(reject);
    });
  };

  return this;
};
