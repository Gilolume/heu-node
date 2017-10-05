module.exports = function(app) {

    app.get('/speechtotext', function (req, res) {
        res.json({success: true, message: "test route speech"});
    });
};