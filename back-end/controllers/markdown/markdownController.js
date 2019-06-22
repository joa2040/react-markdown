var Markdown = require('../../models/markdown');

exports.test = function (req, res) {
    res.send('Mardown server here');
};

exports.markdown_create = function (req, res) {
    let markdown = new Markdown(req.body);
    
    markdown.save().then(business => {
    	res.status(200).send({'markdown': 'markdown in added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
};

exports.markdown_findById = function (req, res) {
	Markdown.findById(req.params.id, function (err, markdown) {
        if (err) {
        	res.status(500).send(err);
        }
        res.send(markdown);
    })
};

exports.markdown_findAll = function (req, res) {
	Markdown.find(null, function (err, markdowns) {
        if (err) res.status(500).send(err);;
        res.send(markdowns);
    })
};

exports.markdown_update = function (req, res) {
	Markdown.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, markdown) {
        if (err) res.status(500).send(err);
        res.send('Markdown udpated.');
    });
};

exports.markdown_delete = function (req, res) {
	Markdown.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.status(500).send(err);
        res.send('Deleted successfully!');
    })
};