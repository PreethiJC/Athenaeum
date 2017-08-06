module.exports = function (app) {
    var goodreads = require('goodreads');
    app.get('/api/project/book/:title', findBookByTitle);
    app.get('http://localhost:3000/api/project/services', function () {
        console.log("I am here");
    });

    function findBookByTitle(req, res) {
        var title = req.params['title'];
        var url = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=AIzaSyCgSKEdri_DRhHgtj7_oSfPbNlcQC5odiE";


        // //var dump = json  {json && res.write(JSON.stringify(json)); res.end()}
        //
        // gr = goodreads.client({ 'key': 'T3XmyOG438rZNaDB6kTcHQ', 'secret': 'D3voCuGGxlGhZpcze8KyhT4N8Zx2I2io3mWKhoG70g' })
        //
        // gr.searchBooks(title, function (out) {
        //     out && res.write(JSON.stringify(out));
        //     res.end();
        //
        // });
    }
};
// app.listen(3000);