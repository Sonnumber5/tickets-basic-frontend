const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(_dirname));
app.use(express.static(path.join(_dirname, 'build')));

app.get('/ping', function (req, res)
{
    return res.send('pong');
});

app.get('/*', function (req, res)
{
    res.sendFiles(path.join(_dirname, 'build', 'index.html'));
});

app.listen(port, function (){
    console.info('React Server App listening on port ' + port);
});