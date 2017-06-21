import express from 'express';
import path from 'path';
import fs from 'fs';
import open from 'open';
import webpack from 'webpack';
import config from './ux/capture/webpack.app.config';
//import compression from 'compression';

const port = 3000;
const app = express();
const compiler = webpack(config);
app.use(express.static(path.join(__dirname, 'wwwroot/')));
//app.use(compression());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  //publicPath: config.output.publicPath
  publicPath: '/capture'
  //publicPath: '/'
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ux/root.html'));
});

app.get('/capture/', function(req, res) {
  res.sendFile(path.join(__dirname, 'wwwroot/capture/index.html'));
});

var flow;
function ReadFlowApi() {
	var json = fs.readFileSync('express.json', 'utf8');
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
		// single config or array of configs?
		/*
		// single config
			// string
			"/capture/sendemail/": "ux/capture/api/responses/capture/sendemail/success.json",
			// object
			"/capture/sendemail/": { response: "ux/capture/api/responses/capture/sendemail/success.json", delay: 1000 }

		// array of configs
			"/capture/emailack/": [
				"ux/capture/api/responses/capture/emailack/wrongpin.json", // string
				{ response: "ux/capture/api/responses/capture/sendemail/success.json", delay: 1000 } // object
			]
		*/
		let config = flow[f][url];

		// array of configs
		if (Array.isArray(config)) {
				let arr = config;
				config = FlowApiStep(f, url, arr);
		}

		// process single config
		let responseJson;
		let delay = 0;
		if (typeof config === 'string') {
			responseJson = config;
		} else {
			responseJson = config.response;
			delay = config.delay;
		}

		let file = path.join(__dirname, responseJson);
		if (delay)  {
			setTimeout(function() {
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
	var x = flow[f]['#'+url];
	let count = (typeof x === 'undefined') ? -1 : x;
	++count;
	count = count % arr.length;
	flow[f]['#'+url] = count;
	return arr[count];
	//for (var i = 0; i < arr.length; ++i) {
	//let config = arr[i];
	//}
}

app.all('/*', FlowApi);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
