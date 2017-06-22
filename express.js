import express from 'express';
import path from 'path';
import fs from 'fs';
import open from 'open';
import webpack from 'webpack';
//import compression from 'compression';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Config

const _PORT = 3000;
const _DIST = "dist/";
const _SRC = "src/";
const _MODULE = "pdf-img-viewer-uploader";
const _FLOW_JSON = 'express.json';

var config = require('./src/'+_MODULE+'/webpack.config');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express();
const compiler = webpack(config);
app.use(express.static(path.join(__dirname, _DIST)));
//app.use(compression());

app.use(require('webpack-dev-middleware')(compiler, {
 //noInfo: true,
 publicPath: '/pdf-img-viewer-uploader/'
}));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// URL = /
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, _SRC + 'root.html'));
});

// URL = /_MODULE/
// NOTE: allows ../ relative paths work from dist/module/index.html
app.get('/' + _MODULE + '/', function (req, res) {
  res.sendFile(path.join(__dirname, _DIST + _MODULE + '/index.html'));
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Flow API

// .json specifies:
//  'url': response setting
//
// response setting = response config, or [ response configs ]
//  setting can be a single response config or an array of response configs
//  in the case of an array, iterate through response configs every time url is called
/*
      single response config:
        "/module/api1": "api/module/api1/responses/success.json",                             // string
        "/module/api1/": { response: "api/module/api1/responses/success.json", delay: 1000 }  // object

      array of response configs:
        "/module/api2/": [
          "api/module/api2/responses/wrongpin.json",                                          // string
          { response: "api/module/api2/responses/success.json", delay: 1000 }                 // object
        ]
*/
//
// response config:
//  can be a string (file = response .json)
//  or object (file & delay)

var flow;
function ReadFlowApi() {
  var json = fs.readFileSync(_FLOW_JSON, 'utf8');
  json = json.replace(/\/\*[\s\S]*?\*\//gm, ''); // strip /* .. */ comments
  flow = JSON.parse(json);
}
ReadFlowApi();

function FlowApi(req, res) {
  var q = Object.keys(req.query)[0]; // url?1
  var f = req.query.f ? req.query.f : q ? q : '1'; // url?f=1 || url?1 || 1
  if (typeof x === 'undefined') f = '1';
  var url = req.path;
  url = url.replace(/\/?$/, '/'); // trailling slash
  url = url.toLowerCase();
  f = f.toLowerCase();
  if (flow[f] && flow[f][url]) {

    // 1. setting can be a single config or an array of configs
    let setting = flow[f][url];
    let config;
    if (Array.isArray(setting)) {
      // array of configs
      let arr = setting;
      config = FlowApiStep(f, url, arr); // iterate through configs every time url is called
    } else {
      // single config
      config = setting;
    }

    // 2. Process response config - string || object
    let responseJson;
    let delay = 0;
    if (typeof config === 'string') {
      responseJson = config;
    } else {
      responseJson = config.response;
      delay = config.delay;
    }

    // do response
    let file = path.join(__dirname, responseJson);
    if (delay) {
      setTimeout(function () {
        FlowApiResponse(res, file)
      }, delay);
    } else {
      FlowApiResponse(res, file)
    }
  } else {
    res.sendStatus(404);
  }
}

function FlowApiResponse(res, file) {
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    res.sendStatus(404);
  }
}

function FlowApiStep(f, url, arr) {
  var x = flow[f]['#' + url];
  let count = (typeof x === 'undefined') ? -1 : x;
  ++count;
  count = count % arr.length;
  flow[f]['#' + url] = count;
  return arr[count];
  //for (var i = 0; i < arr.length; ++i) {
  //let config = arr[i];
  //}
}

app.all('/*', FlowApi);

// end Flow API
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(_PORT, function (err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + _PORT);
  }
});
