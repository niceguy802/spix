// 引入包
var express = require('express');
// 读文件
var fs = require('fs');
// 创建服务器，相当于http.createServer
var app = express();

app.engine('html', require('express-art-template'));
// express为response的相应对象提供方法render
// render方法默认不可使用，单配置了模板引擎后可以使用
// res.render('html模板名',{模板数据})
// 第一个参数不能写路径，默认区项目中的views目录中去查找该模板文件
// 所有视图文件都放到views目录中

app.get('/', function (req, res) {

  fs.readFile('./db.json', function (err, data) {
    if (err) {
      return res.send('err');
    }

    res.render('index.html', {
      boxContent: JSON.parse(data).boxContent,
      singleServers: JSON.parse(data).singleServers,
      tabCurrent: JSON.parse(data).tabCurrent,
      areaTabContent: JSON.parse(data).areaTabContent,
      area6Img: JSON.parse(data).area6Img
    });
  })
})

app.use('/node_modules/', express.static('./node_modules'));
app.use('/public/', express.static('./public'));


// 端口号
app.listen('3000', function () {
  console.log('app is running at port 3000');
})