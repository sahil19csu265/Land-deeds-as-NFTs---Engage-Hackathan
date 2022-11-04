const correctionModel = require("../models/correctionRequest");

module.exports = {
  
  add(correctionObject) {
    let promise = correctionModel.create(correctionObject);
    return promise;
  },

  async getAll() {
    const doc = await correctionModel.find();
    if (doc) {
      return doc;
    }
    else{
        return null;
    }
  },

};
