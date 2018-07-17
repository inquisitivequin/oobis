const express = require('express');

const app = express();

app.get('/api', (req, res) => {
	res.send({wow: 'Hey fool!'})
})

module.exports = app