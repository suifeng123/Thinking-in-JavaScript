/**
 * Created by Administrator on 2017/6/27.
 */
var formidable = require('formidable');
var form = new formidable.IncomingForm();
form.parse(req,function(err,fields,files){
    res.writeHead(200,{'content-type':'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields,files:files}));
})