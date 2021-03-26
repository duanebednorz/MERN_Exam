const Item = require("../models/items.model");

module.exports = {
  findAll: (request, response) => {
    Item.find()
      .then((items) => {
        response.json({ results: items });
      })
      .catch((error) => response.json(error));
  },
  create: (request, response) => {
    Item.create(request.body)
      .then((items) => {
        response.json({ results: items });
      })
      .catch((error) => response.json(error));
  },
  findOne: (request, response) => {
    Item.findOne({ _id: request.params.id })
      .then((result) => response.json({ results: result }))
      .catch((error) =>
        response.json({ message: "********Find One Error**********", error: error })
      );
  },
  updateItem: (request, response) => {
    Item.findOneAndUpdate({ _id: request.params.id }, request.body, {
      new: true,
      runValidators: true,
    })
      .then((result) => response.json({ results: result }))
      .catch((error) =>
        response.json({ message: "********Update One Error**********", error: error })
      );
  },
  deleteAnExistingItem: (request, response) => {
    Item.deleteOne({ _id: request.params.id })
      .then((result) => response.json({ results: result }))
      .catch((error) =>
        response.json({ message: "********Delete One Error**********", error: error })
      );
  },
  randomItem: (request, response) => {
    Item.aggregate([{ $sample: { size: 1 } }])
      .then((result) => response.json({ results: result }))
      .catch((error) =>
        response.json({ message: "********Random Item Error**********", error: error })
      );
  },
};