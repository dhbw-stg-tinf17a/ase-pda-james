module.exports = function (db) {
  this.get = (key) => {
    return new Promise((resolve, reject) => {
      db.collection("preferences").findOne({}).then((prefs) => {
        if (!prefs) {
          db.collection("preferences").insertOne({}, (err) => {
            if (err) {
              reject(err);
            } else {
              this.get(key).then(resolve).catch(reject);
            }
          });
        } else {
          resolve(prefs[key]);
        }
      }).catch(reject);
    });
  };

  this.set = (key, value) => {
    return new Promise((resolve, reject) => {
      db.collection("preferences").countDocuments({}).then((count) => {
        if (count === 0) {
          db.collection("preferences").insertOne({ [key]: value }).then(() => {
            resolve();
          }).catch(reject);
        } else {
          db.collection("preferences").updateOne({}, { $set: { [key]: value } }).then(() => {
            resolve();
          }).catch(reject);
        }
      }).catch(reject);
    });
  };

  return this;
};
