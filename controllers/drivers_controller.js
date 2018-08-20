module.exports = {
  main(req, res) {
    res.send({ test: 'hello' });
  },

  create(req, res) {
    console.log(req.body);
    res.send({ test: 'testable' });
  }
};
