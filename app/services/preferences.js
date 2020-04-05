module.exports = function(db) {
  this.get = (key)=>{
    return new Promise((resolve, reject)=>{
      db.collection("preferences").findOne({}, (err, prefs)=>{
        if (err) {
          reject(err);
        } else {
          if (!prefs) {
            db.collection("preferences").insertOne({}, function(err, res) {
              if (err) {
                reject(err);
              } else {
                this.get(key).then(resolve).catch(reject);
              }
            });
          } else {
            resolve(prefs[key]);
          }
        }
      });
    });
  };

  this.set = (key, value)=>{
    return new Promise((resolve, reject)=>{
      db.collection("preferences").count({}, (err, count)=>{
        if (err) {
          reject(err);
        } else {
          if (count == 0) {
            db.collection("preferences").insertOne({[key]: value}, (err)=>{
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          } else {
            db.collection("preferences").updateOne({}, {$set: {[key]: value}}, (err)=>{
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          }
        }
      });
    });
  };

  return this;
};
