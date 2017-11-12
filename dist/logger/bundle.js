/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* Riot v3.6.0, @license MIT */
(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.riot = global.riot || {})));
}(this, (function (exports) { 'use strict';

var __TAGS_CACHE = [];
var __TAG_IMPL = {};
var GLOBAL_MIXIN = '__global_mixin';
var ATTRS_PREFIX = 'riot-';
var REF_DIRECTIVES = ['ref', 'data-ref'];
var IS_DIRECTIVE = 'data-is';
var CONDITIONAL_DIRECTIVE = 'if';
var LOOP_DIRECTIVE = 'each';
var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
var SHOW_DIRECTIVE = 'show';
var HIDE_DIRECTIVE = 'hide';
var RIOT_EVENTS_KEY = '__riot-events__';
var T_STRING = 'string';
var T_OBJECT = 'object';
var T_UNDEF  = 'undefined';
var T_FUNCTION = 'function';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_REGEX = /^xlink:(\w+)/;
var WIN = typeof window === T_UNDEF ? undefined : window;
var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
var RE_EVENTS_PREFIX = /^on/;
var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

/**
 * Check Check if the passed argument is undefined
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isBoolAttr(value) {
  return RE_BOOL_ATTRS.test(value)
}

/**
 * Check if passed argument is a function
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isFunction(value) {
  return typeof value === T_FUNCTION
}

/**
 * Check if passed argument is an object, exclude null
 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isObject(value) {
  return value && typeof value === T_OBJECT // typeof null is 'object'
}

/**
 * Check if passed argument is undefined
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isUndefined(value) {
  return typeof value === T_UNDEF
}

/**
 * Check if passed argument is a string
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isString(value) {
  return typeof value === T_STRING
}

/**
 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
 * @param { * } value -
 * @returns { Boolean } -
 */
function isBlank(value) {
  return isUndefined(value) || value === null || value === ''
}

/**
 * Check if passed argument is a kind of array
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array
}

/**
 * Check whether object's property could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } -
 */
function isWritable(obj, key) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return isUndefined(obj[key]) || descriptor && descriptor.writable
}

/**
 * Check if passed argument is a reserved name
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isReservedName(value) {
  return RE_RESERVED_NAMES.test(value)
}

var check = Object.freeze({
	isBoolAttr: isBoolAttr,
	isFunction: isFunction,
	isObject: isObject,
	isUndefined: isUndefined,
	isString: isString,
	isBlank: isBlank,
	isArray: isArray,
	isWritable: isWritable,
	isReservedName: isReservedName
});

/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(selector))
}

/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector)
}

/**
 * Create a document fragment
 * @returns { Object } document fragment
 */
function createFrag() {
  return document.createDocumentFragment()
}

/**
 * Create a document text node
 * @returns { Object } create a text node to use as placeholder
 */
function createDOMPlaceholder() {
  return document.createTextNode('')
}

/**
 * Check if a DOM node is an svg tag
 * @param   { HTMLElement }  el - node we want to test
 * @returns {Boolean} true if it's an svg node
 */
function isSvg(el) {
  return !!el.ownerSVGElement
}

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @param   { Boolean } isSvg - true if we need to use an svg node
 * @returns { Object } DOM node just created
 */
function mkEl(name) {
  return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name)
}

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we'll inject new html
 * @param { String } html - html to inject
 */
/* istanbul ignore next */
function setInnerHTML(container, html) {
  if (!isUndefined(container.innerHTML))
    { container.innerHTML = html; }
    // some browsers do not support innerHTML on the SVGs tags
  else {
    var doc = new DOMParser().parseFromString(html, 'application/xml');
    var node = container.ownerDocument.importNode(doc.documentElement, true);
    container.appendChild(node);
  }
}

/**
 * Toggle the visibility of any DOM node
 * @param   { Object }  dom - DOM node we want to hide
 * @param   { Boolean } show - do we want to show it?
 */

function toggleVisibility(dom, show) {
  dom.style.display = show ? '' : 'none';
  dom['hidden'] = show ? false : true;
}

/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function remAttr(dom, name) {
  dom.removeAttribute(name);
}

/**
 * Convert a style object to a string
 * @param   { Object } style - style object we need to parse
 * @returns { String } resulting css string
 * @example
 * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
 */
function styleObjectToString(style) {
  return Object.keys(style).reduce(function (acc, prop) {
    return (acc + " " + prop + ": " + (style[prop]) + ";")
  }, '')
}

/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttr(dom, name) {
  return dom.getAttribute(name)
}

/**
 * Set any DOM attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttr(dom, name, val) {
  var xlink = XLINK_REGEX.exec(name);
  if (xlink && xlink[1])
    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
  else
    { dom.setAttribute(name, val); }
}

/**
 * Insert safely a tag to fix #1962 #1649
 * @param   { HTMLElement } root - children container
 * @param   { HTMLElement } curr - node to insert
 * @param   { HTMLElement } next - node that should preceed the current node inserted
 */
function safeInsert(root, curr, next) {
  root.insertBefore(curr, next.parentNode && next);
}

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttrs(html, fn) {
  if (!html)
    { return }
  var m;
  while (m = RE_HTML_ATTRS.exec(html))
    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
}

/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 * @param   { Object }   context - fn can optionally return an object, which is passed to children
 */
function walkNodes(dom, fn, context) {
  if (dom) {
    var res = fn(dom, context);
    var next;
    // stop the recursion
    if (res === false) { return }

    dom = dom.firstChild;

    while (dom) {
      next = dom.nextSibling;
      walkNodes(dom, fn, res);
      dom = next;
    }
  }
}

var dom = Object.freeze({
	$$: $$,
	$: $,
	createFrag: createFrag,
	createDOMPlaceholder: createDOMPlaceholder,
	isSvg: isSvg,
	mkEl: mkEl,
	setInnerHTML: setInnerHTML,
	toggleVisibility: toggleVisibility,
	remAttr: remAttr,
	styleObjectToString: styleObjectToString,
	getAttr: getAttr,
	setAttr: setAttr,
	safeInsert: safeInsert,
	walkAttrs: walkAttrs,
	walkNodes: walkNodes
});

var styleNode;
var cssTextProp;
var byName = {};
var remainder = [];
var needsInject = false;

// skip the following code on the server
if (WIN) {
  styleNode = (function () {
    // create a new style element with the correct type
    var newNode = mkEl('style');
    setAttr(newNode, 'type', 'text/css');

    // replace any user node or insert the new one into the head
    var userNode = $('style[type=riot]');
    /* istanbul ignore next */
    if (userNode) {
      if (userNode.id) { newNode.id = userNode.id; }
      userNode.parentNode.replaceChild(newNode, userNode);
    }
    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

    return newNode
  })();
  cssTextProp = styleNode.styleSheet;
}

/**
 * Object that will be used to inject and manage the css of every tag instance
 */
var styleManager = {
  styleNode: styleNode,
  /**
   * Save a tag style to be later injected into DOM
   * @param { String } css - css string
   * @param { String } name - if it's passed we will map the css to a tagname
   */
  add: function add(css, name) {
    if (name) { byName[name] = css; }
    else { remainder.push(css); }
    needsInject = true;
  },
  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   */
  inject: function inject() {
    if (!WIN || !needsInject) { return }
    needsInject = false;
    var style = Object.keys(byName)
      .map(function(k) { return byName[k] })
      .concat(remainder).join('\n');
    /* istanbul ignore next */
    if (cssTextProp) { cssTextProp.cssText = style; }
    else { styleNode.innerHTML = style; }
  }
};

/**
 * The riot template engine
 * @version v3.0.8
 */

var skipRegex = (function () { //eslint-disable-line no-unused-vars

  var beforeReChars = '[{(,;:?=|&!^~>%*/';

  var beforeReWords = [
    'case',
    'default',
    'do',
    'else',
    'in',
    'instanceof',
    'prefix',
    'return',
    'typeof',
    'void',
    'yield'
  ];

  var wordsLastChar = beforeReWords.reduce(function (s, w) {
    return s + w.slice(-1)
  }, '');

  var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
  var RE_VN_CHAR = /[$\w]/;

  function prev (code, pos) {
    while (--pos >= 0 && /\s/.test(code[pos])){  }
    return pos
  }

  function _skipRegex (code, start) {

    var re = /.*/g;
    var pos = re.lastIndex = start++;
    var match = re.exec(code)[0].match(RE_REGEX);

    if (match) {
      var next = pos + match[0].length;

      pos = prev(code, pos);
      var c = code[pos];

      if (pos < 0 || ~beforeReChars.indexOf(c)) {
        return next
      }

      if (c === '.') {

        if (code[pos - 1] === '.') {
          start = next;
        }

      } else if (c === '+' || c === '-') {

        if (code[--pos] !== c ||
            (pos = prev(code, pos)) < 0 ||
            !RE_VN_CHAR.test(code[pos])) {
          start = next;
        }

      } else if (~wordsLastChar.indexOf(c)) {

        var end = pos + 1;

        while (--pos >= 0 && RE_VN_CHAR.test(code[pos])){  }
        if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
          start = next;
        }
      }
    }

    return start
  }

  return _skipRegex

})();

/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

/* global riot */

/* istanbul ignore next */
var brackets = (function (UNDEF) {

  var
    REGLOB = 'g',

    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

    S_QBLOCKS = R_STRINGS.source + '|' +
      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,

    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

    S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,

    FINDBRACES = {
      '(': RegExp('([()])|'   + S_QBLOCK2, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
      '{': RegExp('([{}])|'   + S_QBLOCK2, REGLOB)
    },

    DEFAULT = '{ }';

  var _pairs = [
    '{', '}',
    '{', '}',
    /{[^}]*}/,
    /\\([{}])/g,
    /\\({)|{/g,
    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB),
    DEFAULT,
    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
    /(^|[^\\]){=[\S\s]*?}/
  ];

  var
    cachedBrackets = UNDEF,
    _regex,
    _cache = [],
    _settings;

  function _loopback (re) { return re }

  function _rewrite (re, bp) {
    if (!bp) { bp = _cache; }
    return new RegExp(
      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
    )
  }

  function _create (pair) {
    if (pair === DEFAULT) { return _pairs }

    var arr = pair.split(' ');

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"')
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
    arr[6] = _rewrite(_pairs[6], arr);
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
    arr[8] = pair;
    return arr
  }

  function _brackets (reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
  }

  _brackets.split = function split (str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) { _bp = _cache; }

    var
      parts = [],
      match,
      isexpr,
      start,
      pos,
      re = _bp[6];

    var qblocks = [];
    var prevStr = '';
    var mark, lastIndex;

    isexpr = start = re.lastIndex = 0;

    while ((match = re.exec(str))) {

      lastIndex = re.lastIndex;
      pos = match.index;

      if (isexpr) {

        if (match[2]) {

          var ch = match[2];
          var rech = FINDBRACES[ch];
          var ix = 1;

          rech.lastIndex = lastIndex;
          while ((match = rech.exec(str))) {
            if (match[1]) {
              if (match[1] === ch) { ++ix; }
              else if (!--ix) { break }
            } else {
              rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
            }
          }
          re.lastIndex = ix ? str.length : rech.lastIndex;
          continue
        }

        if (!match[3]) {
          re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
          continue
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos));
        start = re.lastIndex;
        re = _bp[6 + (isexpr ^= 1)];
        re.lastIndex = start;
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start));
    }

    parts.qblocks = qblocks;

    return parts

    function unescapeStr (s) {
      if (prevStr) {
        s = prevStr + s;
        prevStr = '';
      }
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'));
      } else {
        parts.push(s);
      }
    }

    function pushQBlock(_pos, _lastIndex, slash) { //eslint-disable-line
      if (slash) {
        _lastIndex = skipRegex(str, _pos);
      }

      if (tmpl && _lastIndex > _pos + 2) {
        mark = '\u2057' + qblocks.length + '~';
        qblocks.push(str.slice(_pos, _lastIndex));
        prevStr += str.slice(start, _pos) + mark;
        start = _lastIndex;
      }
      return _lastIndex
    }
  };

  _brackets.hasExpr = function hasExpr (str) {
    return _cache[4].test(str)
  };

  _brackets.loopKeys = function loopKeys (expr) {
    var m = expr.match(_cache[9]);

    return m
      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
      : { val: expr.trim() }
  };

  _brackets.array = function array (pair) {
    return pair ? _create(pair) : _cache
  };

  function _reset (pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair);
      _regex = pair === DEFAULT ? _loopback : _rewrite;
      _cache[9] = _regex(_pairs[9]);
    }
    cachedBrackets = pair;
  }

  function _setSettings (o) {
    var b;

    o = o || {};
    b = o.brackets;
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () { return cachedBrackets },
      enumerable: true
    });
    _settings = o;
    _reset(b);
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () { return _settings }
  });

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
  _brackets.set = _reset;
  _brackets.skipRegex = skipRegex;

  _brackets.R_STRINGS = R_STRINGS;
  _brackets.R_MLCOMMS = R_MLCOMMS;
  _brackets.S_QBLOCKS = S_QBLOCKS;
  _brackets.S_QBLOCK2 = S_QBLOCK2;

  return _brackets

})();

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

/* istanbul ignore next */
var tmpl = (function () {

  var _cache = {};

  function _tmpl (str, data) {
    if (!str) { return str }

    return (_cache[str] || (_cache[str] = _create(str))).call(
      data, _logErr.bind({
        data: data,
        tmpl: str
      })
    )
  }

  _tmpl.hasExpr = brackets.hasExpr;

  _tmpl.loopKeys = brackets.loopKeys;

  // istanbul ignore next
  _tmpl.clearCache = function () { _cache = {}; };

  _tmpl.errorHandler = null;

  function _logErr (err, ctx) {

    err.riotData = {
      tagName: ctx && ctx.__ && ctx.__.tagName,
      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
    };

    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
    else if (
      typeof console !== 'undefined' &&
      typeof console.error === 'function'
    ) {
      console.error(err.message);
      console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
      console.log(this.data); // eslint-disable-line
    }
  }

  function _create (str) {
    var expr = _getTmpl(str);

    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
  }

  var RE_DQUOTE = /\u2057/g;
  var RE_QBMARK = /\u2057(\d+)~/g;

  function _getTmpl (str) {
    var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
    var qstr = parts.qblocks;
    var expr;

    if (parts.length > 2 || parts[0]) {
      var i, j, list = [];

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i];

        if (expr && (expr = i & 1

            ? _parseExpr(expr, 1, qstr)

            : '"' + expr
                .replace(/\\/g, '\\\\')
                .replace(/\r\n?|\n/g, '\\n')
                .replace(/"/g, '\\"') +
              '"'

          )) { list[j++] = expr; }

      }

      expr = j < 2 ? list[0]
           : '[' + list.join(',') + '].join("")';

    } else {

      expr = _parseExpr(parts[1], 0, qstr);
    }

    if (qstr.length) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos]
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
      });
    }
    return expr
  }

  var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
  var
    RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

  function _parseExpr (expr, asText, qstr) {

    expr = expr
      .replace(/\s+/g, ' ').trim()
      .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

    if (expr) {
      var
        list = [],
        cnt = 0,
        match;

      while (expr &&
            (match = expr.match(RE_CSNAME)) &&
            !match.index
        ) {
        var
          key,
          jsb,
          re = /,|([[{(])|$/g;

        expr = RegExp.rightContext;
        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

        jsb  = expr.slice(0, match.index);
        expr = RegExp.rightContext;

        list[cnt++] = _wrapExpr(jsb, 1, key);
      }

      expr = !cnt ? _wrapExpr(expr, asText)
           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
    }
    return expr

    function skipBraces (ch, re) {
      var
        mm,
        lv = 1,
        ir = RE_BREND[ch];

      ir.lastIndex = re.lastIndex;
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) { ++lv; }
        else if (!--lv) { break }
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex;
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

  function _wrapExpr (expr, asText, key) {
    var tb;

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length;

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar;
          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos));
        }
      }
      return match
    });

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
    }

    if (key) {

      expr = (tb
          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
        ) + '?"' + key + '":""';

    } else if (asText) {

      expr = 'function(v){' + (tb
          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
        ) + ';return v||v===0?v:""}.call(this)';
    }

    return expr
  }

  _tmpl.version = brackets.version = 'v3.0.8';

  return _tmpl

})();

/* istanbul ignore next */
var observable$1 = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {};

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice;

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          { (callbacks[event] = callbacks[event] || []).push(fn); }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) { callbacks = {}; }
        else {
          if (fn) {
            var arr = callbacks[event];
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) { arr.splice(i--, 1); }
            }
          } else { delete callbacks[event]; }
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on);
          fn.apply(el, arguments);
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {
        var arguments$1 = arguments;


        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i;

        for (i = 0; i < arglen; i++) {
          args[i] = arguments$1[i + 1]; // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0);

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args);
        }

        if (callbacks['*'] && event != '*')
          { el.trigger.apply(el, ['*', event].concat(args)); }

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });

  return el

};

/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } list - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(list, fn) {
  var len = list ? list.length : 0;
  var i = 0;
  for (; i < len; ++i) {
    fn(list[i], i);
  }
  return list
}

/**
 * Check whether an array contains an item
 * @param   { Array } array - target array
 * @param   { * } item - item to test
 * @returns { Boolean } -
 */
function contains(array, item) {
  return array.indexOf(item) !== -1
}

/**
 * Convert a string containing dashes to camel case
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
function toCamel(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
}

/**
 * Faster String startsWith alternative
 * @param   { String } str - source string
 * @param   { String } value - test string
 * @returns { Boolean } -
 */
function startsWith(str, value) {
  return str.slice(0, value.length) === value
}

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
 * @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function defineProperty(el, key, value, options) {
  Object.defineProperty(el, key, extend({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return el
}

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  var obj, args = arguments;
  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key))
          { src[key] = obj[key]; }
      }
    }
  }
  return src
}

var misc = Object.freeze({
	each: each,
	contains: contains,
	toCamel: toCamel,
	startsWith: startsWith,
	defineProperty: defineProperty,
	extend: extend
});

var settings$1 = extend(Object.create(brackets.settings), {
  skipAnonymousTags: true,
  // handle the auto updates on any DOM event
  autoUpdate: true
});

/**
 * Trigger DOM events
 * @param   { HTMLElement } dom - dom element target of the event
 * @param   { Function } handler - user function
 * @param   { Object } e - event object
 */
function handleEvent(dom, handler, e) {
  var ptag = this.__.parent,
    item = this.__.item;

  if (!item)
    { while (ptag && !item) {
      item = ptag.__.item;
      ptag = ptag.__.parent;
    } }

  // override the event properties
  /* istanbul ignore next */
  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
  /* istanbul ignore next */
  if (isWritable(e, 'target')) { e.target = e.srcElement; }
  /* istanbul ignore next */
  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

  e.item = item;

  handler.call(this, e);

  // avoid auto updates
  if (!settings$1.autoUpdate) { return }

  if (!e.preventUpdate) {
    var p = getImmediateCustomParentTag(this);
    // fixes #2083
    if (p.isMounted) { p.update(); }
  }
}

/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {
  var eventName,
    cb = handleEvent.bind(tag, dom, handler);

  // avoid to bind twice the same event
  // possible fix for #2332
  dom[name] = null;

  // normalize event name
  eventName = name.replace(RE_EVENTS_PREFIX, '');

  // cache the listener into the listeners array
  if (!contains(tag.__.listeners, dom)) { tag.__.listeners.push(dom); }
  if (!dom[RIOT_EVENTS_KEY]) { dom[RIOT_EVENTS_KEY] = {}; }
  if (dom[RIOT_EVENTS_KEY][name]) { dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]); }

  dom[RIOT_EVENTS_KEY][name] = cb;
  dom.addEventListener(eventName, cb, false);
}

/**
 * Update dynamically created data-is tags with changing expressions
 * @param { Object } expr - expression tag and expression info
 * @param { Tag }    parent - parent for tag creation
 * @param { String } tagName - tag implementation we want to use
 */
function updateDataIs(expr, parent, tagName) {
  var conf, isVirtual, head, ref;

  if (expr.tag && expr.tagName === tagName) {
    expr.tag.update();
    return
  }

  isVirtual = expr.dom.tagName === 'VIRTUAL';
  // sync _parent to accommodate changing tagnames
  if (expr.tag) {
    // need placeholder before unmount
    if(isVirtual) {
      head = expr.tag.__.head;
      ref = createDOMPlaceholder();
      head.parentNode.insertBefore(ref, head);
    }

    expr.tag.unmount(true);
  }

  if (!isString(tagName)) { return }

  expr.impl = __TAG_IMPL[tagName];
  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
  each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
  expr.tagName = tagName;
  expr.tag.mount();
  if (isVirtual)
    { makeReplaceVirtual(expr.tag, ref || expr.tag.root); } // root exist first time, after use placeholder

  // parent is the placeholder tag, not the dynamic tag so clean up
  parent.__.onUnmount = function() {
    var delName = expr.tag.opts.dataIs,
      tags = expr.tag.parent.tags,
      _tags = expr.tag.__.parent.tags;
    arrayishRemove(tags, delName, expr.tag);
    arrayishRemove(_tags, delName, expr.tag);
    expr.tag.unmount();
  };
}

/**
 * Nomalize any attribute removing the "riot-" prefix
 * @param   { String } attrName - original attribute name
 * @returns { String } valid html attribute name
 */
function normalizeAttrName(attrName) {
  if (!attrName) { return null }
  attrName = attrName.replace(ATTRS_PREFIX, '');
  if (CASE_SENSITIVE_ATTRIBUTES[attrName]) { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
  return attrName
}

/**
 * Update on single tag expression
 * @this Tag
 * @param { Object } expr - expression logic
 * @returns { undefined }
 */
function updateExpression(expr) {
  if (this.root && getAttr(this.root,'virtualized')) { return }

  var dom = expr.dom,
    // remove the riot- prefix
    attrName = normalizeAttrName(expr.attr),
    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
    parent = dom && (expr.parent || dom.parentNode),
    // detect the style attributes
    isStyleAttr = attrName === 'style',
    isClassAttr = attrName === 'class',
    hasValue,
    isObj,
    value;

  // if it's a tag we could totally skip the rest
  if (expr._riot_id) {
    if (expr.isMounted) {
      expr.update();
    // if it hasn't been mounted yet, do that now.
    } else {
      expr.mount();
      if (isVirtual) {
        makeReplaceVirtual(expr, expr.root);
      }
    }
    return
  }
  // if this expression has the update method it means it can handle the DOM changes by itself
  if (expr.update) { return expr.update() }

  // ...it seems to be a simple expression so we try to calculat its value
  value = tmpl(expr.expr, isToggle ? extend({}, Object.create(this.parent), this) : this);
  hasValue = !isBlank(value);
  isObj = isObject(value);

  // convert the style/class objects to strings
  if (isObj) {
    isObj = !isClassAttr && !isStyleAttr;
    if (isClassAttr) {
      value = tmpl(JSON.stringify(value), this);
    } else if (isStyleAttr) {
      value = styleObjectToString(value);
    }
  }

  // remove original attribute
  if (expr.attr && (!expr.isAttrRemoved || !hasValue || value === false)) {
    remAttr(dom, expr.attr);
    expr.isAttrRemoved = true;
  }

  // for the boolean attributes we don't need the value
  // we can convert it to checked=true to checked=checked
  if (expr.bool) { value = value ? attrName : false; }
  if (expr.isRtag) { return updateDataIs(expr, this, value) }
  if (expr.wasParsedOnce && expr.value === value) { return }

  // update the expression value
  expr.value = value;
  expr.wasParsedOnce = true;

  // if the value is an object we can not do much more with it
  if (isObj && !isToggle) { return }
  // avoid to render undefined/null values
  if (isBlank(value)) { value = ''; }

  // textarea and text nodes have no attribute name
  if (!attrName) {
    // about #815 w/o replace: the browser converts the value to a string,
    // the comparison by "==" does too, but not in the server
    value += '';
    // test for parent avoids error with invalid assignment to nodeValue
    if (parent) {
      // cache the parent node because somehow it will become null on IE
      // on the next iteration
      expr.parent = parent;
      if (parent.tagName === 'TEXTAREA') {
        parent.value = value;                    // #1113
        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
      }                                         // will be available on 'updated'
      else { dom.nodeValue = value; }
    }
    return
  }


  // event handler
  if (isFunction(value)) {
    setEventHandler(attrName, value, dom, this);
  // show / hide
  } else if (isToggle) {
    toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
  // handle attributes
  } else {
    if (expr.bool) {
      dom[attrName] = value;
    }

    if (attrName === 'value' && dom.value !== value) {
      dom.value = value;
    }

    if (hasValue && value !== false) {
      setAttr(dom, attrName, value);
    }

    // make sure that in case of style changes
    // the element stays hidden
    if (isStyleAttr && dom.hidden) { toggleVisibility(dom, false); }
  }
}

/**
 * Update all the expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
function updateAllExpressions(expressions) {
  each(expressions, updateExpression.bind(this));
}

var IfExpr = {
  init: function init(dom, tag, expr) {
    remAttr(dom, CONDITIONAL_DIRECTIVE);
    this.tag = tag;
    this.expr = expr;
    this.stub = createDOMPlaceholder();
    this.pristine = dom;

    var p = dom.parentNode;
    p.insertBefore(this.stub, dom);
    p.removeChild(dom);

    return this
  },
  update: function update() {
    this.value = tmpl(this.expr, this.tag);

    if (this.value && !this.current) { // insert
      this.current = this.pristine.cloneNode(true);
      this.stub.parentNode.insertBefore(this.current, this.stub);
      this.expressions = [];
      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
    } else if (!this.value && this.current) { // remove
      unmountAll(this.expressions);
      if (this.current._tag) {
        this.current._tag.unmount();
      } else if (this.current.parentNode) {
        this.current.parentNode.removeChild(this.current);
      }
      this.current = null;
      this.expressions = [];
    }

    if (this.value) { updateAllExpressions.call(this.tag, this.expressions); }
  },
  unmount: function unmount() {
    unmountAll(this.expressions || []);
  }
};

var RefExpr = {
  init: function init(dom, parent, attrName, attrValue) {
    this.dom = dom;
    this.attr = attrName;
    this.rawValue = attrValue;
    this.parent = parent;
    this.hasExp = tmpl.hasExpr(attrValue);
    return this
  },
  update: function update() {
    var old = this.value;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
    var tagOrDom = this.dom.__ref || this.tag || this.dom;

    this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

    // the name changed, so we need to remove it from the old key (if present)
    if (!isBlank(old) && customParent) { arrayishRemove(customParent.refs, old, tagOrDom); }
    if (!isBlank(this.value) && isString(this.value)) {
      // add it to the refs of parent tag (this behavior was changed >=3.0)
      if (customParent) { arrayishAdd(
        customParent.refs,
        this.value,
        tagOrDom,
        // use an array if it's a looped node and the ref is not an expression
        null,
        this.parent.__.index
      ); }

      if (this.value !== old) {
        setAttr(this.dom, this.attr, this.value);
      }
    } else {
      remAttr(this.dom, this.attr);
    }

    // cache the ref bound to this dom node
    // to reuse it in future (see also #2329)
    if (!this.dom.__ref) { this.dom.__ref = tagOrDom; }
  },
  unmount: function unmount() {
    var tagOrDom = this.tag || this.dom;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    if (!isBlank(this.value) && customParent)
      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
  }
};

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @param   { Object } base - prototype object for the new item
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val, base) {
  var item = base ? Object.create(base) : {};
  item[expr.key] = key;
  if (expr.pos) { item[expr.pos] = val; }
  return item
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 */
function unmountRedundant(items, tags) {
  var i = tags.length,
    j = items.length;

  while (i > j) {
    i--;
    remove.apply(tags[i], [tags, i]);
  }
}


/**
 * Remove a child tag
 * @this Tag
 * @param   { Array } tags - tags collection
 * @param   { Number } i - index of the tag to remove
 */
function remove(tags, i) {
  tags.splice(i, 1);
  this.unmount();
  arrayishRemove(this.parent, this, this.__.tagName, true);
}

/**
 * Move the nested custom tags in non custom loop tags
 * @this Tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(i) {
  var this$1 = this;

  each(Object.keys(this.tags), function (tagName) {
    moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
  });
}

/**
 * Move a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function move(root, nextTag, isVirtual) {
  if (isVirtual)
    { moveVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Insert and mount a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function insert(root, nextTag, isVirtual) {
  if (isVirtual)
    { makeVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Append a new tag into the DOM
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function append(root, isVirtual) {
  if (isVirtual)
    { makeVirtual.call(this, root); }
  else
    { root.appendChild(this.root); }
}

/**
 * Manage tags having the 'each'
 * @param   { HTMLElement } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 * @returns { Object } expression object for this each loop
 */
function _each(dom, parent, expr) {

  // remove the each property from the original tag
  remAttr(dom, LOOP_DIRECTIVE);

  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
    tagName = getTagName(dom),
    impl = __TAG_IMPL[tagName],
    parentNode = dom.parentNode,
    placeholder = createDOMPlaceholder(),
    child = getTag(dom),
    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
    tags = [],
    oldItems = [],
    hasKeys,
    isLoop = true,
    isAnonymous = !__TAG_IMPL[tagName],
    isVirtual = dom.tagName === 'VIRTUAL';

  // parse the each expression
  expr = tmpl.loopKeys(expr);
  expr.isLoop = true;

  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }

  // insert a marked where the loop tags will be injected
  parentNode.insertBefore(placeholder, dom);
  parentNode.removeChild(dom);

  expr.update = function updateEach() {
    // get the new items collection
    expr.value = tmpl(expr.val, parent);

    var frag = createFrag(),
      items = expr.value,
      isObject$$1 = !isArray(items) && !isString(items),
      root = placeholder.parentNode;

    // if this DOM was removed the update here is useless
    // this condition fixes also a weird async issue on IE in our unit test
    if (!root) { return }

    // object loop. any changes cause full redraw
    if (isObject$$1) {
      hasKeys = items || false;
      items = hasKeys ?
        Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key)
        }) : [];
    } else {
      hasKeys = false;
    }

    if (ifExpr) {
      items = items.filter(function(item, i) {
        if (expr.key && !isObject$$1)
          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }

        return !!tmpl(ifExpr, extend(Object.create(parent), item))
      });
    }

    // loop all the new items
    each(items, function(item, i) {
      // reorder only if the items are objects
      var
        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
        oldPos = oldItems.indexOf(item),
        isNew = oldPos === -1,
        pos = !isNew && doReorder ? oldPos : i,
        // does a tag exist in this position?
        tag = tags[pos],
        mustAppend = i >= oldItems.length,
        mustCreate =  doReorder && isNew || !doReorder && !tag;

      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

      // new tag
      if (mustCreate) {
        tag = new Tag$1(impl, {
          parent: parent,
          isLoop: isLoop,
          isAnonymous: isAnonymous,
          tagName: tagName,
          root: dom.cloneNode(isAnonymous),
          item: item,
          index: i,
        }, dom.innerHTML);

        // mount the tag
        tag.mount();

        if (mustAppend)
          { append.apply(tag, [frag || root, isVirtual]); }
        else
          { insert.apply(tag, [root, tags[i], isVirtual]); }

        if (!mustAppend) { oldItems.splice(i, 0, item); }
        tags.splice(i, 0, tag);
        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
      } else if (pos !== i && doReorder) {
        // move
        if (contains(items, oldItems[pos])) {
          move.apply(tag, [root, tags[i], isVirtual]);
          // move the old tag instance
          tags.splice(i, 0, tags.splice(pos, 1)[0]);
          // move the old item
          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
        }

        // update the position attribute if it exists
        if (expr.pos) { tag[expr.pos] = i; }

        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      tag.__.item = item;
      tag.__.index = i;
      tag.__.parent = parent;

      if (!mustCreate) { tag.update(item); }
    });

    // remove the redundant tags
    unmountRedundant(items, tags);

    // clone the items array
    oldItems = items.slice();

    // this condition is weird u
    root.insertBefore(frag, placeholder);
  };

  expr.unmount = function() {
    each(tags, function(t) { t.unmount(); });
  };

  return expr
}

/**
 * Walk the tag DOM to detect the expressions to evaluate
 * @this Tag
 * @param   { HTMLElement } root - root tag where we will start digging the expressions
 * @param   { Array } expressions - empty array where the expressions will be added
 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
 * @returns { Object } an object containing the root noode and the dom tree
 */
function parseExpressions(root, expressions, mustIncludeRoot) {
  var this$1 = this;

  var tree = {parent: {children: expressions}};

  walkNodes(root, function (dom, ctx) {
    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

    // text node
    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

    if (type !== 1) { return ctx } // not an element

    var isVirtual = dom.tagName === 'VIRTUAL';

    // loop. each does it's own thing (for now)
    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
      if(isVirtual) { setAttr(dom, 'loopVirtual', true); } // ignore here, handled in _each
      parent.children.push(_each(dom, this$1, attr));
      return false
    }

    // if-attrs become the new parent. Any following expressions (either on the current
    // element, or below it) become children of this expression.
    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
      return false
    }

    if (expr = getAttr(dom, IS_DIRECTIVE)) {
      if (tmpl.hasExpr(expr)) {
        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
        return false
      }
    }

    // if this is a tag, stop traversing here.
    // we ignore the root, since parseExpressions is called while we're mounting that root
    tagImpl = getTag(dom);
    if(isVirtual) {
      if(getAttr(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
      if(!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual'))  // ok to create virtual tag
        { tagImpl = { tmpl: dom.outerHTML }; }
    }

    if (tagImpl && (dom !== root || mustIncludeRoot)) {
      if(isVirtual && !getAttr(dom, IS_DIRECTIVE)) { // handled in update
        // can not remove attribute like directives
        // so flag for removal after creation to prevent maximum stack error
        setAttr(dom, 'virtualized', true);

        var tag = new Tag$1({ tmpl: dom.outerHTML },
          {root: dom, parent: this$1},
          dom.innerHTML);
        parent.children.push(tag); // no return, anonymous tag, keep parsing
      } else {
        var conf = {root: dom, parent: this$1, hasImpl: true};
        parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
        return false
      }
    }

    // attribute expressions
    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
      if (!expr) { return }
      parent.children.push(expr);
    }]);

    // whatever the parent is, all child elements get the same parent.
    // If this element had an if-attr, that's the parent for all child elements
    return {parent: parent}
  }, tree);
}

/**
 * Calls `fn` for every attribute on an element. If that attr has an expression,
 * it is also passed to fn.
 * @this Tag
 * @param   { HTMLElement } dom - dom node to parse
 * @param   { Array } attrs - array of attributes
 * @param   { Function } fn - callback to exec on any iteration
 */
function parseAttributes(dom, attrs, fn) {
  var this$1 = this;

  each(attrs, function (attr) {
    if (!attr) { return false }

    var name = attr.name, bool = isBoolAttr(name), expr;

    if (contains(REF_DIRECTIVES, name)) {
      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
    } else if (tmpl.hasExpr(attr.value)) {
      expr = {dom: dom, expr: attr.value, attr: name, bool: bool};
    }

    fn(attr, expr);
  });
}

/*
  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/

var reHasYield  = /<yield\b/i;
var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
var GENERIC = 'div';
var SVG = 'svg';


/*
  Creates the root element for table or select child elements:
  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
*/
function specialTags(el, tmpl, tagName) {

  var
    select = tagName[0] === 'o',
    parent = select ? 'select>' : 'table>';

  // trim() is important here, this ensures we don't have artifacts,
  // so we can check if we have only one element inside the parent
  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
  parent = el.firstChild;

  // returns the immediate parent if tr/th/td/col is the only element, if not
  // returns the whole tree, as this can include additional elements
  /* istanbul ignore next */
  if (select) {
    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
  } else {
    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
    var tname = rootEls[tagName];
    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
  }
  return parent
}

/*
  Replace the yield tag from any tag template with the innerHTML of the
  original tag in the page
*/
function replaceYield(tmpl, html) {
  // do nothing if no yield
  if (!reHasYield.test(tmpl)) { return tmpl }

  // be careful with #1343 - string on the source having `$1`
  var src = {};

  html = html && html.replace(reYieldSrc, function (_, ref, text) {
    src[ref] = src[ref] || text;   // preserve first definition
    return ''
  }).trim();

  return tmpl
    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
      return src[ref] || def || ''
    })
    .replace(reYieldAll, function (_, def) {        // yield without any "from"
      return html || def || ''
    })
}

/**
 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
 *
 * @param   { String } tmpl  - The template coming from the custom tag definition
 * @param   { String } html - HTML content that comes from the DOM element where you
 *           will mount the tag, mostly the original tag in the page
 * @param   { Boolean } isSvg - true if the root node is an svg
 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
 */
function mkdom(tmpl, html, isSvg$$1) {
  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
    tagName = match && match[1].toLowerCase(),
    el = mkEl(isSvg$$1 ? SVG : GENERIC);

  // replace all the yield tags with the tag inner html
  tmpl = replaceYield(tmpl, html);

  /* istanbul ignore next */
  if (tblTags.test(tagName))
    { el = specialTags(el, tmpl, tagName); }
  else
    { setInnerHTML(el, tmpl); }

  return el
}

/**
 * Another way to create a riot tag a bit more es6 friendly
 * @param { HTMLElement } el - tag DOM selector or DOM node/s
 * @param { Object } opts - tag logic
 * @returns { Tag } new riot tag instance
 */
function Tag$2(el, opts) {
  // get the tag properties from the class constructor
  var ref = this;
  var name = ref.name;
  var tmpl = ref.tmpl;
  var css = ref.css;
  var attrs = ref.attrs;
  var onCreate = ref.onCreate;
  // register a new tag and cache the class prototype
  if (!__TAG_IMPL[name]) {
    tag$1(name, tmpl, css, attrs, onCreate);
    // cache the class constructor
    __TAG_IMPL[name].class = this.constructor;
  }

  // mount the tag using the class instance
  mountTo(el, name, opts, this);
  // inject the component css
  if (css) { styleManager.inject(); }

  return this
}

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag$1(name, tmpl, css, attrs, fn) {
  if (isFunction(attrs)) {
    fn = attrs;

    if (/^[\w\-]+\s?=/.test(css)) {
      attrs = css;
      css = '';
    } else
      { attrs = ''; }
  }

  if (css) {
    if (isFunction(css))
      { fn = css; }
    else
      { styleManager.add(css); }
  }

  name = name.toLowerCase();
  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag2$1(name, tmpl, css, attrs, fn) {
  if (css) { styleManager.add(css, name); }

  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { * } selector - tag DOM selector or DOM node/s
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
function mount$1(selector, tagName, opts) {
  var tags = [];
  var elem, allTags;

  function pushTagsTo(root) {
    if (root.tagName) {
      var riotTag = getAttr(root, IS_DIRECTIVE), tag;

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName;
        setAttr(root, IS_DIRECTIVE, tagName);
      }

      tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

      if (tag)
        { tags.push(tag); }
    } else if (root.length)
      { each(root, pushTagsTo); } // assume nodeList
  }

  // inject styles into DOM
  styleManager.inject();

  if (isObject(tagName)) {
    opts = tagName;
    tagName = 0;
  }

  // crawl the DOM to find the tag
  if (isString(selector)) {
    selector = selector === '*' ?
      // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = selectTags() :
      // or just the ones named like the selector
      selector + selectTags(selector.split(/, */));

    // make sure to pass always a selector
    // to the querySelectorAll function
    elem = selector ? $$(selector) : [];
  }
  else
    // probably you have passed already a tag or a NodeList
    { elem = selector; }

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || selectTags();
    // if the root els it's just a single tag
    if (elem.tagName)
      { elem = $$(tagName, elem); }
    else {
      // select all the children for all the different root elements
      var nodeList = [];

      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

      elem = nodeList;
    }
    // get rid of the tagName
    tagName = 0;
  }

  pushTagsTo(elem);

  return tags
}

// Create a mixin that could be globally shared across all the tags
var mixins = {};
var globals = mixins[GLOBAL_MIXIN] = {};
var mixins_id = 0;

/**
 * Create/Return a mixin by its name
 * @param   { String }  name - mixin name (global mixin if object)
 * @param   { Object }  mix - mixin logic
 * @param   { Boolean } g - is global?
 * @returns { Object }  the mixin logic
 */
function mixin$1(name, mix, g) {
  // Unnamed global
  if (isObject(name)) {
    mixin$1(("__" + (mixins_id++) + "__"), name, true);
    return
  }

  var store = g ? globals : mixins;

  // Getter
  if (!mix) {
    if (isUndefined(store[name]))
      { throw new Error(("Unregistered mixin: " + name)) }

    return store[name]
  }

  // Setter
  store[name] = isFunction(mix) ?
    extend(mix.prototype, store[name] || {}) && mix :
    extend(store[name] || {}, mix);
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
function update$1() {
  return each(__TAGS_CACHE, function (tag) { return tag.update(); })
}

function unregister$1(name) {
  __TAG_IMPL[name] = null;
}

var version$1 = 'v3.6.0';


var core = Object.freeze({
	Tag: Tag$2,
	tag: tag$1,
	tag2: tag2$1,
	mount: mount$1,
	mixin: mixin$1,
	update: update$1,
	unregister: unregister$1,
	version: version$1
});

// counter to give a unique id to all the Tag instances
var __uid = 0;

/**
 * We need to update opts for this tag. That requires updating the expressions
 * in any attributes on the tag, and then copying the result onto opts.
 * @this Tag
 * @param   {Boolean} isLoop - is it a loop tag?
 * @param   { Tag }  parent - parent tag node
 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
 * @param   { Object }  opts - tag options
 * @param   { Array }  instAttrs - tag attributes array
 */
function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
  // (and only this case) we don't need to do updateOpts, because the regular parse
  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
  if (isLoop && isAnonymous) { return }

  var ctx = !isAnonymous && isLoop ? this : parent || this;
  each(instAttrs, function (attr) {
    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
    // normalize the attribute names
    opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
  });
}


/**
 * Tag class
 * @constructor
 * @param { Object } impl - it contains the tag template, and logic
 * @param { Object } conf - tag options
 * @param { String } innerHTML - html that eventually we need to inject in the tag
 */
function Tag$1(impl, conf, innerHTML) {
  if ( impl === void 0 ) impl = {};
  if ( conf === void 0 ) conf = {};

  var opts = extend({}, conf.opts),
    parent = conf.parent,
    isLoop = conf.isLoop,
    isAnonymous = !!conf.isAnonymous,
    skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
    item = cleanUpData(conf.item),
    index = conf.index, // available only for the looped nodes
    instAttrs = [], // All attributes on the Tag when it's first parsed
    implAttrs = [], // expressions on this type of Tag
    expressions = [],
    root = conf.root,
    tagName = conf.tagName || getTagName(root),
    isVirtual = tagName === 'virtual',
    isInline = !isVirtual && !impl.tmpl,
    propsInSyncWithParent = [],
    dom;

  // make this tag observable
  if (!skipAnonymous) { observable$1(this); }
  // only call unmount if we have a valid __TAG_IMPL (has name property)
  if (impl.name && root._tag) { root._tag.unmount(true); }

  // not yet mounted
  this.isMounted = false;

  defineProperty(this, '__', {
    isAnonymous: isAnonymous,
    instAttrs: instAttrs,
    innerHTML: innerHTML,
    tagName: tagName,
    index: index,
    isLoop: isLoop,
    isInline: isInline,
    // tags having event listeners
    // it would be better to use weak maps here but we can not introduce breaking changes now
    listeners: [],
    // these vars will be needed only for the virtual tags
    virts: [],
    tail: null,
    head: null,
    parent: null,
    item: null
  });

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
  defineProperty(this, 'root', root);
  extend(this, { opts: opts }, item);
  // protect the "tags" and "refs" property from being overridden
  defineProperty(this, 'parent', parent || null);
  defineProperty(this, 'tags', {});
  defineProperty(this, 'refs', {});

  if (isInline || isLoop && isAnonymous) {
    dom = root;
  } else {
    if (!isVirtual) { root.innerHTML = ''; }
    dom = mkdom(impl.tmpl, innerHTML, isSvg(root));
  }

  /**
   * Update the tag expressions and options
   * @param   { * }  data - data we want to use to extend the tag properties
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'update', function tagUpdate(data) {
    var nextOpts = {},
      canTrigger = this.isMounted && !skipAnonymous;

    // make sure the data passed will not override
    // the component core methods
    data = cleanUpData(data);
    extend(this, data);
    updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);

    if (canTrigger && this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) {
      return this
    }

    // inherit properties from the parent, but only for isAnonymous tags
    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
    extend(opts, nextOpts);
    if (canTrigger) { this.trigger('update', data); }
    updateAllExpressions.call(this, expressions);
    if (canTrigger) { this.trigger('updated'); }

    return this

  }.bind(this));

  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mixin', function tagMixin() {
    var this$1 = this;

    each(arguments, function (mix) {
      var instance, obj;
      var props = [];

      // properties blacklisted and will not be bound to the tag instance
      var propsBlacklist = ['init', '__proto__'];

      mix = isString(mix) ? mixin$1(mix) : mix;

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else { instance = mix; }

      var proto = Object.getPrototypeOf(instance);

      // build multilevel prototype inheritance chain property list
      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function (key) {
        // bind methods to this
        // allow mixins to override other properties/parent mixins
        if (!contains(propsBlacklist, key)) {
          // check for getters/setters
          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

          // apply method only if it does not already exist on the instance
          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(this$1, key, descriptor);
          } else {
            this$1[key] = isFunction(instance[key]) ?
              instance[key].bind(this$1) :
              instance[key];
          }
        }
      });

      // init method will be called automatically
      if (instance.init)
        { instance.init.bind(this$1)(); }
    });
    return this
  }.bind(this));

  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mount', function tagMount() {
    var this$1 = this;

    root._tag = this; // keep a reference to the tag just created

    // Read all the attrs on this instance. This give us the info we need for updateOpts
    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
      attr.expr = expr;
      instAttrs.push(attr);
    }]);

    // update the root adding custom attributes coming from the compiler
    implAttrs = [];
    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
      if (expr) { expressions.push(expr); }
      else { setAttr(root, attr.name, attr.value); }
    }]);

    // initialiation
    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

    // add global mixins
    var globalMixin = mixin$1(GLOBAL_MIXIN);

    if (globalMixin && !skipAnonymous) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          this$1.mixin(globalMixin[i]);
        }
      }
    }

    if (impl.fn) { impl.fn.call(this, opts); }

    if (!skipAnonymous) { this.trigger('before-mount'); }

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions.apply(this, [dom, expressions, isAnonymous]);

    this.update(item);

    if (!isAnonymous && !isInline) {
      while (dom.firstChild) { root.appendChild(dom.firstChild); }
    }

    defineProperty(this, 'root', root);
    defineProperty(this, 'isMounted', true);

    if (skipAnonymous) { return }

    // if it's not a child tag we can trigger its mount event
    if (!this.parent) {
      this.trigger('mount');
    }
    // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
    else {
      var p = getImmediateCustomParentTag(this.parent);
      p.one(!p.isMounted ? 'mount' : 'updated', function () {
        this$1.trigger('mount');
      });
    }

    return this

  }.bind(this));

  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
    var this$1 = this;

    var el = this.root,
      p = el.parentNode,
      ptag,
      tagIndex = __TAGS_CACHE.indexOf(this);

    if (!skipAnonymous) { this.trigger('before-unmount'); }

    // clear all attributes coming from the mounted tag
    walkAttrs(impl.attrs, function (name) {
      if (startsWith(name, ATTRS_PREFIX))
        { name = name.slice(ATTRS_PREFIX.length); }

      remAttr(root, name);
    });

    // remove all the event listeners
    this.__.listeners.forEach(function (dom) {
      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
      });
    });

    // remove this tag instance from the global virtualDom variable
    if (tagIndex !== -1)
      { __TAGS_CACHE.splice(tagIndex, 1); }

    if (p || isVirtual) {
      if (parent) {
        ptag = getImmediateCustomParentTag(parent);

        if (isVirtual) {
          Object.keys(this.tags).forEach(function (tagName) {
            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
          });
        } else {
          arrayishRemove(ptag.tags, tagName, this);
          // remove from _parent too
          if(parent !== ptag) {
            arrayishRemove(parent.tags, tagName, this);
          }
        }
      } else {
        // remove the tag contents
        setInnerHTML(el, '');
      }

      if (p && !mustKeepRoot) { p.removeChild(el); }
    }

    if (this.__.virts) {
      each(this.__.virts, function (v) {
        if (v.parentNode) { v.parentNode.removeChild(v); }
      });
    }

    // allow expressions to unmount themselves
    unmountAll(expressions);
    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

    // custom internal unmount function to avoid relying on the observable
    if (this.__.onUnmount) { this.__.onUnmount(); }

    if (!skipAnonymous) {
      this.trigger('unmount');
      this.off('*');
    }

    defineProperty(this, 'isMounted', false);

    delete this.root._tag;

    return this

  }.bind(this));
}

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function getTag(dom) {
  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
}

/**
 * Inherit properties from a target tag instance
 * @this Tag
 * @param   { Tag } target - tag where we will inherit properties
 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
 */
function inheritFrom(target, propsInSyncWithParent) {
  var this$1 = this;

  each(Object.keys(target), function (k) {
    // some properties must be always in sync with the parent tag
    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

    if (isUndefined(this$1[k]) || mustSync) {
      // track the property to keep in sync
      // so we can keep it updated
      if (!mustSync) { propsInSyncWithParent.push(k); }
      this$1[k] = target[k];
    }
  });
}

/**
 * Move the position of a custom tag in its parent tag
 * @this Tag
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChildTag(tagName, newPos) {
  var parent = this.parent,
    tags;
  // no parent no move
  if (!parent) { return }

  tags = parent.tags[tagName];

  if (isArray(tags))
    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
  else { arrayishAdd(parent.tags, tagName, this); }
}

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChildTag(child, opts, innerHTML, parent) {
  var tag = new Tag$1(child, opts, innerHTML),
    tagName = opts.tagName || getTagName(opts.root, true),
    ptag = getImmediateCustomParentTag(parent);
  // fix for the parent attribute in the looped elements
  defineProperty(tag, 'parent', ptag);
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag.__.parent = parent;

  // add this tag to the custom parent tag
  arrayishAdd(ptag.tags, tagName, tag);

  // and also to the real parent tag
  if (ptag !== parent)
    { arrayishAdd(parent.tags, tagName, tag); }

  return tag
}

/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParentTag(tag) {
  var ptag = tag;
  while (ptag.__.isAnonymous) {
    if (!ptag.parent) { break }
    ptag = ptag.parent;
  }
  return ptag
}

/**
 * Trigger the unmount method on all the expressions
 * @param   { Array } expressions - DOM expressions
 */
function unmountAll(expressions) {
  each(expressions, function(expr) {
    if (expr instanceof Tag$1) { expr.unmount(true); }
    else if (expr.tagName) { expr.tag.unmount(true); }
    else if (expr.unmount) { expr.unmount(); }
  });
}

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
 * @returns { String } name to identify this dom node in riot
 */
function getTagName(dom, skipDataIs) {
  var child = getTag(dom),
    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
  return namedTag && !tmpl.hasExpr(namedTag) ?
                namedTag :
              child ? child.name : dom.tagName.toLowerCase()
}

/**
 * With this function we avoid that the internal Tag methods get overridden
 * @param   { Object } data - options we want to use to extend the tag instance
 * @returns { Object } clean object without containing the riot internal reserved words
 */
function cleanUpData(data) {
  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
    { return data }

  var o = {};
  for (var key in data) {
    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
  }
  return o
}

/**
 * Set the property of an object for a given key. If something already
 * exists there, then it becomes an array containing both the old and new value.
 * @param { Object } obj - object on which to set the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be set
 * @param { Boolean } ensureArray - ensure that the property remains an array
 * @param { Number } index - add the new item in a certain array position
 */
function arrayishAdd(obj, key, value, ensureArray, index) {
  var dest = obj[key];
  var isArr = isArray(dest);
  var hasIndex = !isUndefined(index);

  if (dest && dest === value) { return }

  // if the key was never set, set it once
  if (!dest && ensureArray) { obj[key] = [value]; }
  else if (!dest) { obj[key] = value; }
  // if it was an array and not yet set
  else {
    if (isArr) {
      var oldIndex = dest.indexOf(value);
      // this item never changed its position
      if (oldIndex === index) { return }
      // remove the item from its old position
      if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
      // move or add the item
      if (hasIndex) {
        dest.splice(index, 0, value);
      } else {
        dest.push(value);
      }
    } else { obj[key] = [dest, value]; }
  }
}

/**
 * Removes an item from an object at a given key. If the key points to an array,
 * then the item is just removed from the array.
 * @param { Object } obj - object on which to remove the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be removed
 * @param { Boolean } ensureArray - ensure that the property remains an array
*/
function arrayishRemove(obj, key, value, ensureArray) {
  if (isArray(obj[key])) {
    var index = obj[key].indexOf(value);
    if (index !== -1) { obj[key].splice(index, 1); }
    if (!obj[key].length) { delete obj[key]; }
    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
  } else
    { delete obj[key]; } // otherwise just delete the key
}

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
 * @returns { Tag } a new Tag instance
 */
function mountTo(root, tagName, opts, ctx) {
  var impl = __TAG_IMPL[tagName],
    implClass = __TAG_IMPL[tagName].class,
    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

  var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }

  if (tag && tag.mount) {
    tag.mount(true);
    // add this tag to the virtualDom variable
    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
  }

  return tag
}

/**
 * makes a tag virtual and replaces a reference in the dom
 * @this Tag
 * @param { tag } the tag to make virtual
 * @param { ref } the dom reference location
 */
function makeReplaceVirtual(tag, ref) {
  var frag = createFrag();
  makeVirtual.call(tag, frag);
  ref.parentNode.replaceChild(frag, ref);
}

/**
 * Adds the elements for a virtual tag
 * @this Tag
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function makeVirtual(src, target) {
  var this$1 = this;

  var head = createDOMPlaceholder(),
    tail = createDOMPlaceholder(),
    frag = createFrag(),
    sib, el;

  this.root.insertBefore(head, this.root.firstChild);
  this.root.appendChild(tail);

  this.__.head = el = head;
  this.__.tail = tail;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    this$1.__.virts.push(el); // hold for unmounting
    el = sib;
  }

  if (target)
    { src.insertBefore(frag, target.__.head); }
  else
    { src.appendChild(frag); }
}

/**
 * Move virtual tag and all child nodes
 * @this Tag
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 */
function moveVirtual(src, target) {
  var this$1 = this;

  var el = this.__.head,
    frag = createFrag(),
    sib;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    el = sib;
    if (el === this$1.__.tail) {
      frag.appendChild(el);
      src.insertBefore(frag, target.__.head);
      break
    }
  }
}

/**
 * Get selectors for tags
 * @param   { Array } tags - tag names to select
 * @returns { String } selector
 */
function selectTags(tags) {
  // select all tags
  if (!tags) {
    var keys = Object.keys(__TAG_IMPL);
    return keys + selectTags(keys)
  }

  return tags
    .filter(function (t) { return !/[^-\w]/.test(t); })
    .reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
    }, '')
}


var tags = Object.freeze({
	getTag: getTag,
	inheritFrom: inheritFrom,
	moveChildTag: moveChildTag,
	initChildTag: initChildTag,
	getImmediateCustomParentTag: getImmediateCustomParentTag,
	unmountAll: unmountAll,
	getTagName: getTagName,
	cleanUpData: cleanUpData,
	arrayishAdd: arrayishAdd,
	arrayishRemove: arrayishRemove,
	mountTo: mountTo,
	makeReplaceVirtual: makeReplaceVirtual,
	makeVirtual: makeVirtual,
	moveVirtual: moveVirtual,
	selectTags: selectTags
});

/**
 * Riot public api
 */
var settings = settings$1;
var util = {
  tmpl: tmpl,
  brackets: brackets,
  styleManager: styleManager,
  vdom: __TAGS_CACHE,
  styleNode: styleManager.styleNode,
  // export the riot internal utils as well
  dom: dom,
  check: check,
  misc: misc,
  tags: tags
};

// export the core props/methods
var Tag$$1 = Tag$2;
var tag$$1 = tag$1;
var tag2$$1 = tag2$1;
var mount$$1 = mount$1;
var mixin$$1 = mixin$1;
var update$$1 = update$1;
var unregister$$1 = unregister$1;
var version$$1 = version$1;
var observable = observable$1;

var riot$1 = extend({}, core, {
  observable: observable$1,
  settings: settings,
  util: util,
});

exports.settings = settings;
exports.util = util;
exports.Tag = Tag$$1;
exports.tag = tag$$1;
exports.tag2 = tag2$$1;
exports.mount = mount$$1;
exports.mixin = mixin$$1;
exports.update = update$$1;
exports.unregister = unregister$$1;
exports.version = version$$1;
exports.observable = observable;
exports['default'] = riot$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__(0)) :
	typeof define === 'function' && define.amd ? define(['exports', 'riot'], factory) :
	(factory((global.riotHotReload = global.riotHotReload || {}),global.riot));
}(this, (function (exports,riot) { 'use strict';

var nonState = 'isMounted opts'.split(' ');

function reload(name) {
  riot.util.styleManager.inject();

  var elems = document.querySelectorAll((name + ", [data-is=" + name + "]"));
  var tags = [];

  for (var i = 0; i < elems.length; i++) {
    var el = elems[i], oldTag = el._tag, v;
    reload.trigger('before-unmount', oldTag);
    oldTag.unmount(true); // detach the old tag

    // reset the innerHTML and attributes to how they were before mount
    el.innerHTML = oldTag.__.innerHTML;
    (oldTag.__.instAttrs || []).map(function(attr) {
      el.setAttribute(attr.name, attr.value);
    });

    // copy options for creating the new tag
    var newOpts = {};
    for(key in oldTag.opts) {
      newOpts[key] = oldTag.opts[key];
    }
    newOpts.parent = oldTag.parent;

    // create the new tag
    reload.trigger('before-mount', newOpts, oldTag);
    var newTag = riot.mount(el, newOpts)[0];

    // copy state from the old to new tag
    for(var key in oldTag) {
      v = oldTag[key];
      if (~nonState.indexOf(key)) { continue }
      newTag[key] = v;
    }
    newTag.update();
    tags.push(newTag);
    reload.trigger('after-mount', newTag, oldTag);
  }

  return tags
}

riot.observable(reload);
riot.reload = reload;
if (riot.default) { riot.default.reload = reload; }

exports.reload = reload;
exports['default'] = reload;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logs_tag_html__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logs_tag_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__logs_tag_html__);

    var riot = __webpack_require__(0)
    //src: src/logger/app.tag.html

riot.tag2('app',
  '<h1>Logger</h1> <button onclick="{generate}">Add</button> <button onclick="{clearLogs}">Clear</button> <logs logs="{logs}"></logs>',
  '',
  '', function(opts) {

    this.logs = []

    this.generate = (e) => {
      this.logs.push({ title: 'hello', body: 'some panel body text' })
    }

    this.clearLogs = (e) => {
      this.logs = []
    }
});

    
  if (false) {
    module.hot.accept()
    if (module.hot.data) {
      riot.reload('app')
    }
  }
  

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _riot = __webpack_require__(0);

var _riot2 = _interopRequireDefault(_riot);

__webpack_require__(1);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_riot2.default.mount('app');

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    //src: src/logger/logs.tag.html
riot.tag2('logs',
  '<div each="{opts.logs}" class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title"> {title} <button type="button" class="close" aria-hidden="true" style="text-shadow: none;">&times;</button> </h3> </div> <div class="panel-body"> {body} </div> </div>',
  '',
  '', function(opts) {
});

    
  if (false) {
    module.hot.accept()
    if (module.hot.data) {
      riot.reload('logs')
    }
  }
  

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2NiNmJlM2JhMjdhN2FiZDUzZTIiLCJ3ZWJwYWNrOi8vLy4vfi9yaW90L3Jpb3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yaW90LWhvdC1yZWxvYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2dlci9hcHAudGFnLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2dlci9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2dlci9sb2dzLnRhZy5odG1sIl0sIm5hbWVzIjpbIm1vdW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUMsQ0FBQyw0QkFBNEI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxHQUFHLEdBQUc7QUFDL0QsaUNBQWlDO0FBQ2pDO0FBQ0EsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLElBQUk7QUFDZixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsYUFB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aUYsU0FBUyxpREFBaUQsS0FBSztBQUNwUTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2NiNmJlM2JhMjdhN2FiZDUzZTIiLCIvKiBSaW90IHYzLjYuMCwgQGxpY2Vuc2UgTUlUICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwucmlvdCA9IGdsb2JhbC5yaW90IHx8IHt9KSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgX19UQUdTX0NBQ0hFID0gW107XG52YXIgX19UQUdfSU1QTCA9IHt9O1xudmFyIEdMT0JBTF9NSVhJTiA9ICdfX2dsb2JhbF9taXhpbic7XG52YXIgQVRUUlNfUFJFRklYID0gJ3Jpb3QtJztcbnZhciBSRUZfRElSRUNUSVZFUyA9IFsncmVmJywgJ2RhdGEtcmVmJ107XG52YXIgSVNfRElSRUNUSVZFID0gJ2RhdGEtaXMnO1xudmFyIENPTkRJVElPTkFMX0RJUkVDVElWRSA9ICdpZic7XG52YXIgTE9PUF9ESVJFQ1RJVkUgPSAnZWFjaCc7XG52YXIgTE9PUF9OT19SRU9SREVSX0RJUkVDVElWRSA9ICduby1yZW9yZGVyJztcbnZhciBTSE9XX0RJUkVDVElWRSA9ICdzaG93JztcbnZhciBISURFX0RJUkVDVElWRSA9ICdoaWRlJztcbnZhciBSSU9UX0VWRU5UU19LRVkgPSAnX19yaW90LWV2ZW50c19fJztcbnZhciBUX1NUUklORyA9ICdzdHJpbmcnO1xudmFyIFRfT0JKRUNUID0gJ29iamVjdCc7XG52YXIgVF9VTkRFRiAgPSAndW5kZWZpbmVkJztcbnZhciBUX0ZVTkNUSU9OID0gJ2Z1bmN0aW9uJztcbnZhciBYTElOS19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcbnZhciBTVkdfTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xudmFyIFhMSU5LX1JFR0VYID0gL154bGluazooXFx3KykvO1xudmFyIFdJTiA9IHR5cGVvZiB3aW5kb3cgPT09IFRfVU5ERUYgPyB1bmRlZmluZWQgOiB3aW5kb3c7XG52YXIgUkVfU1BFQ0lBTF9UQUdTID0gL14oPzp0KD86Ym9keXxoZWFkfGZvb3R8W3JoZF0pfGNhcHRpb258Y29sKD86Z3JvdXApP3xvcHQoPzppb258Z3JvdXApKSQvO1xudmFyIFJFX1NQRUNJQUxfVEFHU19OT19PUFRJT04gPSAvXig/OnQoPzpib2R5fGhlYWR8Zm9vdHxbcmhkXSl8Y2FwdGlvbnxjb2woPzpncm91cCk/KSQvO1xudmFyIFJFX0VWRU5UU19QUkVGSVggPSAvXm9uLztcbnZhciBSRV9SRVNFUlZFRF9OQU1FUyA9IC9eKD86Xyg/Oml0ZW18aWR8cGFyZW50KXx1cGRhdGV8cm9vdHwoPzp1bik/bW91bnR8bWl4aW58aXMoPzpNb3VudGVkfExvb3ApfHRhZ3N8cmVmc3xwYXJlbnR8b3B0c3x0cmlnZ2VyfG8oPzpufGZmfG5lKSkkLztcbnZhciBSRV9IVE1MX0FUVFJTID0gLyhbLVxcd10rKSA/PSA/KD86XCIoW15cIl0qKXwnKFteJ10qKXwoe1tefV0qfSkpL2c7XG52YXIgQ0FTRV9TRU5TSVRJVkVfQVRUUklCVVRFUyA9IHsgJ3ZpZXdib3gnOiAndmlld0JveCcgfTtcbnZhciBSRV9CT09MX0FUVFJTID0gL14oPzpkaXNhYmxlZHxjaGVja2VkfHJlYWRvbmx5fHJlcXVpcmVkfGFsbG93ZnVsbHNjcmVlbnxhdXRvKD86Zm9jdXN8cGxheSl8Y29tcGFjdHxjb250cm9sc3xkZWZhdWx0fGZvcm1ub3ZhbGlkYXRlfGhpZGRlbnxpc21hcHxpdGVtc2NvcGV8bG9vcHxtdWx0aXBsZXxtdXRlZHxubyg/OnJlc2l6ZXxzaGFkZXx2YWxpZGF0ZXx3cmFwKT98b3BlbnxyZXZlcnNlZHxzZWFtbGVzc3xzZWxlY3RlZHxzb3J0YWJsZXx0cnVlc3BlZWR8dHlwZW11c3RtYXRjaCkkLztcbnZhciBJRV9WRVJTSU9OID0gKFdJTiAmJiBXSU4uZG9jdW1lbnQgfHwge30pLmRvY3VtZW50TW9kZSB8IDA7XG5cbi8qKlxuICogQ2hlY2sgQ2hlY2sgaWYgdGhlIHBhc3NlZCBhcmd1bWVudCBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0Jvb2xBdHRyKHZhbHVlKSB7XG4gIHJldHVybiBSRV9CT09MX0FUVFJTLnRlc3QodmFsdWUpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb25cbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX0ZVTkNUSU9OXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGFuIG9iamVjdCwgZXhjbHVkZSBudWxsXG4gKiBOT1RFOiB1c2UgaXNPYmplY3QoeCkgJiYgIWlzQXJyYXkoeCkgdG8gZXhjbHVkZXMgYXJyYXlzLlxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBUX09CSkVDVCAvLyB0eXBlb2YgbnVsbCBpcyAnb2JqZWN0J1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gVF9VTkRFRlxufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIHN0cmluZ1xuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX1NUUklOR1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBlbXB0eS4gRGlmZmVyZW50IGZyb20gZmFsc3ksIGJlY2F1c2Ugd2UgZG9udCBjb25zaWRlciAwIG9yIGZhbHNlIHRvIGJlIGJsYW5rXG4gKiBAcGFyYW0geyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0JsYW5rKHZhbHVlKSB7XG4gIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEga2luZCBvZiBhcnJheVxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbHVlKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBvYmplY3QncyBwcm9wZXJ0eSBjb3VsZCBiZSBvdmVycmlkZGVuXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBvYmogLSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICBrZXkgLSBvYmplY3QgcHJvcGVydHlcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNXcml0YWJsZShvYmosIGtleSkge1xuICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICByZXR1cm4gaXNVbmRlZmluZWQob2JqW2tleV0pIHx8IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci53cml0YWJsZVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIHJlc2VydmVkIG5hbWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1Jlc2VydmVkTmFtZSh2YWx1ZSkge1xuICByZXR1cm4gUkVfUkVTRVJWRURfTkFNRVMudGVzdCh2YWx1ZSlcbn1cblxudmFyIGNoZWNrID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGlzQm9vbEF0dHI6IGlzQm9vbEF0dHIsXG5cdGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG5cdGlzT2JqZWN0OiBpc09iamVjdCxcblx0aXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuXHRpc1N0cmluZzogaXNTdHJpbmcsXG5cdGlzQmxhbms6IGlzQmxhbmssXG5cdGlzQXJyYXk6IGlzQXJyYXksXG5cdGlzV3JpdGFibGU6IGlzV3JpdGFibGUsXG5cdGlzUmVzZXJ2ZWROYW1lOiBpc1Jlc2VydmVkTmFtZVxufSk7XG5cbi8qKlxuICogU2hvcnRlciBhbmQgZmFzdCB3YXkgdG8gc2VsZWN0IG11bHRpcGxlIG5vZGVzIGluIHRoZSBET01cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc2VsZWN0b3IgLSBET00gc2VsZWN0b3JcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gRE9NIG5vZGUgd2hlcmUgdGhlIHRhcmdldHMgb2Ygb3VyIHNlYXJjaCB3aWxsIGlzIGxvY2F0ZWRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9tIG5vZGVzIGZvdW5kXG4gKi9cbmZ1bmN0aW9uICQkKHNlbGVjdG9yLCBjdHgpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxufVxuXG4vKipcbiAqIFNob3J0ZXIgYW5kIGZhc3Qgd2F5IHRvIHNlbGVjdCBhIHNpbmdsZSBub2RlIGluIHRoZSBET01cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc2VsZWN0b3IgLSB1bmlxdWUgZG9tIHNlbGVjdG9yXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIERPTSBub2RlIHdoZXJlIHRoZSB0YXJnZXQgb2Ygb3VyIHNlYXJjaCB3aWxsIGlzIGxvY2F0ZWRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9tIG5vZGUgZm91bmRcbiAqL1xuZnVuY3Rpb24gJChzZWxlY3RvciwgY3R4KSB7XG4gIHJldHVybiAoY3R4IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvY3VtZW50IGZyYWdtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZyYWcoKSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkb2N1bWVudCB0ZXh0IG5vZGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gY3JlYXRlIGEgdGV4dCBub2RlIHRvIHVzZSBhcyBwbGFjZWhvbGRlclxuICovXG5mdW5jdGlvbiBjcmVhdGVET01QbGFjZWhvbGRlcigpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIGEgRE9NIG5vZGUgaXMgYW4gc3ZnIHRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9ICBlbCAtIG5vZGUgd2Ugd2FudCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBpdCdzIGFuIHN2ZyBub2RlXG4gKi9cbmZ1bmN0aW9uIGlzU3ZnKGVsKSB7XG4gIHJldHVybiAhIWVsLm93bmVyU1ZHRWxlbWVudFxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGdlbmVyaWMgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIERPTSBub2RlIHdlIHdhbnQgdG8gY3JlYXRlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1N2ZyAtIHRydWUgaWYgd2UgbmVlZCB0byB1c2UgYW4gc3ZnIG5vZGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gRE9NIG5vZGUganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIG1rRWwobmFtZSkge1xuICByZXR1cm4gbmFtZSA9PT0gJ3N2ZycgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCBuYW1lKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSlcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGlubmVyIGh0bWwgb2YgYW55IERPTSBub2RlIFNWR3MgaW5jbHVkZWRcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGNvbnRhaW5lciAtIERPTSBub2RlIHdoZXJlIHdlJ2xsIGluamVjdCBuZXcgaHRtbFxuICogQHBhcmFtIHsgU3RyaW5nIH0gaHRtbCAtIGh0bWwgdG8gaW5qZWN0XG4gKi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBzZXRJbm5lckhUTUwoY29udGFpbmVyLCBodG1sKSB7XG4gIGlmICghaXNVbmRlZmluZWQoY29udGFpbmVyLmlubmVySFRNTCkpXG4gICAgeyBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDsgfVxuICAgIC8vIHNvbWUgYnJvd3NlcnMgZG8gbm90IHN1cHBvcnQgaW5uZXJIVE1MIG9uIHRoZSBTVkdzIHRhZ3NcbiAgZWxzZSB7XG4gICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ2FwcGxpY2F0aW9uL3htbCcpO1xuICAgIHZhciBub2RlID0gY29udGFpbmVyLm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkb2MuZG9jdW1lbnRFbGVtZW50LCB0cnVlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgYW55IERPTSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIGhpZGVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IHNob3cgLSBkbyB3ZSB3YW50IHRvIHNob3cgaXQ/XG4gKi9cblxuZnVuY3Rpb24gdG9nZ2xlVmlzaWJpbGl0eShkb20sIHNob3cpIHtcbiAgZG9tLnN0eWxlLmRpc3BsYXkgPSBzaG93ID8gJycgOiAnbm9uZSc7XG4gIGRvbVsnaGlkZGVuJ10gPSBzaG93ID8gZmFsc2UgOiB0cnVlO1xufVxuXG4vKipcbiAqIFJlbW92ZSBhbnkgRE9NIGF0dHJpYnV0ZSBmcm9tIGEgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHVwZGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byByZW1vdmVcbiAqL1xuZnVuY3Rpb24gcmVtQXR0cihkb20sIG5hbWUpIHtcbiAgZG9tLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3R5bGUgb2JqZWN0IHRvIGEgc3RyaW5nXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHN0eWxlIC0gc3R5bGUgb2JqZWN0IHdlIG5lZWQgdG8gcGFyc2VcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gcmVzdWx0aW5nIGNzcyBzdHJpbmdcbiAqIEBleGFtcGxlXG4gKiBzdHlsZU9iamVjdFRvU3RyaW5nKHsgY29sb3I6ICdyZWQnLCBoZWlnaHQ6ICcxMHB4J30pIC8vID0+ICdjb2xvcjogcmVkOyBoZWlnaHQ6IDEwcHgnXG4gKi9cbmZ1bmN0aW9uIHN0eWxlT2JqZWN0VG9TdHJpbmcoc3R5bGUpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xuICAgIHJldHVybiAoYWNjICsgXCIgXCIgKyBwcm9wICsgXCI6IFwiICsgKHN0eWxlW3Byb3BdKSArIFwiO1wiKVxuICB9LCAnJylcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHZhbHVlIG9mIGFueSBET00gYXR0cmlidXRlIG9uIGEgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgd2Ugd2FudCB0byBnZXRcbiAqIEByZXR1cm5zIHsgU3RyaW5nIHwgdW5kZWZpbmVkIH0gbmFtZSBvZiB0aGUgbm9kZSBhdHRyaWJ1dGUgd2hldGhlciBpdCBleGlzdHNcbiAqL1xuZnVuY3Rpb24gZ2V0QXR0cihkb20sIG5hbWUpIHtcbiAgcmV0dXJuIGRvbS5nZXRBdHRyaWJ1dGUobmFtZSlcbn1cblxuLyoqXG4gKiBTZXQgYW55IERPTSBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byBzZXRcbiAqIEBwYXJhbSB7IFN0cmluZyB9IHZhbCAtIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHNldFxuICovXG5mdW5jdGlvbiBzZXRBdHRyKGRvbSwgbmFtZSwgdmFsKSB7XG4gIHZhciB4bGluayA9IFhMSU5LX1JFR0VYLmV4ZWMobmFtZSk7XG4gIGlmICh4bGluayAmJiB4bGlua1sxXSlcbiAgICB7IGRvbS5zZXRBdHRyaWJ1dGVOUyhYTElOS19OUywgeGxpbmtbMV0sIHZhbCk7IH1cbiAgZWxzZVxuICAgIHsgZG9tLnNldEF0dHJpYnV0ZShuYW1lLCB2YWwpOyB9XG59XG5cbi8qKlxuICogSW5zZXJ0IHNhZmVseSBhIHRhZyB0byBmaXggIzE5NjIgIzE2NDlcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gY2hpbGRyZW4gY29udGFpbmVyXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gY3VyciAtIG5vZGUgdG8gaW5zZXJ0XG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gbmV4dCAtIG5vZGUgdGhhdCBzaG91bGQgcHJlY2VlZCB0aGUgY3VycmVudCBub2RlIGluc2VydGVkXG4gKi9cbmZ1bmN0aW9uIHNhZmVJbnNlcnQocm9vdCwgY3VyciwgbmV4dCkge1xuICByb290Lmluc2VydEJlZm9yZShjdXJyLCBuZXh0LnBhcmVudE5vZGUgJiYgbmV4dCk7XG59XG5cbi8qKlxuICogTWluaW1pemUgcmlzazogb25seSB6ZXJvIG9yIG9uZSBfc3BhY2VfIGJldHdlZW4gYXR0ciAmIHZhbHVlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgaHRtbCAtIGh0bWwgc3RyaW5nIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFwcGx5IG9uIGFueSBhdHRyaWJ1dGUgZm91bmRcbiAqL1xuZnVuY3Rpb24gd2Fsa0F0dHJzKGh0bWwsIGZuKSB7XG4gIGlmICghaHRtbClcbiAgICB7IHJldHVybiB9XG4gIHZhciBtO1xuICB3aGlsZSAobSA9IFJFX0hUTUxfQVRUUlMuZXhlYyhodG1sKSlcbiAgICB7IGZuKG1bMV0udG9Mb3dlckNhc2UoKSwgbVsyXSB8fCBtWzNdIHx8IG1bNF0pOyB9XG59XG5cbi8qKlxuICogV2FsayBkb3duIHJlY3Vyc2l2ZWx5IGFsbCB0aGUgY2hpbGRyZW4gdGFncyBzdGFydGluZyBkb20gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgIGRvbSAtIHN0YXJ0aW5nIG5vZGUgd2hlcmUgd2Ugd2lsbCBzdGFydCB0aGUgcmVjdXJzaW9uXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayB0byB0cmFuc2Zvcm0gdGhlIGNoaWxkIG5vZGUganVzdCBmb3VuZFxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgIGNvbnRleHQgLSBmbiBjYW4gb3B0aW9uYWxseSByZXR1cm4gYW4gb2JqZWN0LCB3aGljaCBpcyBwYXNzZWQgdG8gY2hpbGRyZW5cbiAqL1xuZnVuY3Rpb24gd2Fsa05vZGVzKGRvbSwgZm4sIGNvbnRleHQpIHtcbiAgaWYgKGRvbSkge1xuICAgIHZhciByZXMgPSBmbihkb20sIGNvbnRleHQpO1xuICAgIHZhciBuZXh0O1xuICAgIC8vIHN0b3AgdGhlIHJlY3Vyc2lvblxuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cbiAgICBkb20gPSBkb20uZmlyc3RDaGlsZDtcblxuICAgIHdoaWxlIChkb20pIHtcbiAgICAgIG5leHQgPSBkb20ubmV4dFNpYmxpbmc7XG4gICAgICB3YWxrTm9kZXMoZG9tLCBmbiwgcmVzKTtcbiAgICAgIGRvbSA9IG5leHQ7XG4gICAgfVxuICB9XG59XG5cbnZhciBkb20gPSBPYmplY3QuZnJlZXplKHtcblx0JCQ6ICQkLFxuXHQkOiAkLFxuXHRjcmVhdGVGcmFnOiBjcmVhdGVGcmFnLFxuXHRjcmVhdGVET01QbGFjZWhvbGRlcjogY3JlYXRlRE9NUGxhY2Vob2xkZXIsXG5cdGlzU3ZnOiBpc1N2Zyxcblx0bWtFbDogbWtFbCxcblx0c2V0SW5uZXJIVE1MOiBzZXRJbm5lckhUTUwsXG5cdHRvZ2dsZVZpc2liaWxpdHk6IHRvZ2dsZVZpc2liaWxpdHksXG5cdHJlbUF0dHI6IHJlbUF0dHIsXG5cdHN0eWxlT2JqZWN0VG9TdHJpbmc6IHN0eWxlT2JqZWN0VG9TdHJpbmcsXG5cdGdldEF0dHI6IGdldEF0dHIsXG5cdHNldEF0dHI6IHNldEF0dHIsXG5cdHNhZmVJbnNlcnQ6IHNhZmVJbnNlcnQsXG5cdHdhbGtBdHRyczogd2Fsa0F0dHJzLFxuXHR3YWxrTm9kZXM6IHdhbGtOb2Rlc1xufSk7XG5cbnZhciBzdHlsZU5vZGU7XG52YXIgY3NzVGV4dFByb3A7XG52YXIgYnlOYW1lID0ge307XG52YXIgcmVtYWluZGVyID0gW107XG52YXIgbmVlZHNJbmplY3QgPSBmYWxzZTtcblxuLy8gc2tpcCB0aGUgZm9sbG93aW5nIGNvZGUgb24gdGhlIHNlcnZlclxuaWYgKFdJTikge1xuICBzdHlsZU5vZGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8vIGNyZWF0ZSBhIG5ldyBzdHlsZSBlbGVtZW50IHdpdGggdGhlIGNvcnJlY3QgdHlwZVxuICAgIHZhciBuZXdOb2RlID0gbWtFbCgnc3R5bGUnKTtcbiAgICBzZXRBdHRyKG5ld05vZGUsICd0eXBlJywgJ3RleHQvY3NzJyk7XG5cbiAgICAvLyByZXBsYWNlIGFueSB1c2VyIG5vZGUgb3IgaW5zZXJ0IHRoZSBuZXcgb25lIGludG8gdGhlIGhlYWRcbiAgICB2YXIgdXNlck5vZGUgPSAkKCdzdHlsZVt0eXBlPXJpb3RdJyk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAodXNlck5vZGUpIHtcbiAgICAgIGlmICh1c2VyTm9kZS5pZCkgeyBuZXdOb2RlLmlkID0gdXNlck5vZGUuaWQ7IH1cbiAgICAgIHVzZXJOb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIHVzZXJOb2RlKTtcbiAgICB9XG4gICAgZWxzZSB7IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobmV3Tm9kZSk7IH1cblxuICAgIHJldHVybiBuZXdOb2RlXG4gIH0pKCk7XG4gIGNzc1RleHRQcm9wID0gc3R5bGVOb2RlLnN0eWxlU2hlZXQ7XG59XG5cbi8qKlxuICogT2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGluamVjdCBhbmQgbWFuYWdlIHRoZSBjc3Mgb2YgZXZlcnkgdGFnIGluc3RhbmNlXG4gKi9cbnZhciBzdHlsZU1hbmFnZXIgPSB7XG4gIHN0eWxlTm9kZTogc3R5bGVOb2RlLFxuICAvKipcbiAgICogU2F2ZSBhIHRhZyBzdHlsZSB0byBiZSBsYXRlciBpbmplY3RlZCBpbnRvIERPTVxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBjc3MgLSBjc3Mgc3RyaW5nXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBpZiBpdCdzIHBhc3NlZCB3ZSB3aWxsIG1hcCB0aGUgY3NzIHRvIGEgdGFnbmFtZVxuICAgKi9cbiAgYWRkOiBmdW5jdGlvbiBhZGQoY3NzLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHsgYnlOYW1lW25hbWVdID0gY3NzOyB9XG4gICAgZWxzZSB7IHJlbWFpbmRlci5wdXNoKGNzcyk7IH1cbiAgICBuZWVkc0luamVjdCA9IHRydWU7XG4gIH0sXG4gIC8qKlxuICAgKiBJbmplY3QgYWxsIHByZXZpb3VzbHkgc2F2ZWQgdGFnIHN0eWxlcyBpbnRvIERPTVxuICAgKiBpbm5lckhUTUwgc2VlbXMgc2xvdzogaHR0cDovL2pzcGVyZi5jb20vcmlvdC1pbnNlcnQtc3R5bGVcbiAgICovXG4gIGluamVjdDogZnVuY3Rpb24gaW5qZWN0KCkge1xuICAgIGlmICghV0lOIHx8ICFuZWVkc0luamVjdCkgeyByZXR1cm4gfVxuICAgIG5lZWRzSW5qZWN0ID0gZmFsc2U7XG4gICAgdmFyIHN0eWxlID0gT2JqZWN0LmtleXMoYnlOYW1lKVxuICAgICAgLm1hcChmdW5jdGlvbihrKSB7IHJldHVybiBieU5hbWVba10gfSlcbiAgICAgIC5jb25jYXQocmVtYWluZGVyKS5qb2luKCdcXG4nKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChjc3NUZXh0UHJvcCkgeyBjc3NUZXh0UHJvcC5jc3NUZXh0ID0gc3R5bGU7IH1cbiAgICBlbHNlIHsgc3R5bGVOb2RlLmlubmVySFRNTCA9IHN0eWxlOyB9XG4gIH1cbn07XG5cbi8qKlxuICogVGhlIHJpb3QgdGVtcGxhdGUgZW5naW5lXG4gKiBAdmVyc2lvbiB2My4wLjhcbiAqL1xuXG52YXIgc2tpcFJlZ2V4ID0gKGZ1bmN0aW9uICgpIHsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgdmFyIGJlZm9yZVJlQ2hhcnMgPSAnW3soLDs6Pz18JiFefj4lKi8nO1xuXG4gIHZhciBiZWZvcmVSZVdvcmRzID0gW1xuICAgICdjYXNlJyxcbiAgICAnZGVmYXVsdCcsXG4gICAgJ2RvJyxcbiAgICAnZWxzZScsXG4gICAgJ2luJyxcbiAgICAnaW5zdGFuY2VvZicsXG4gICAgJ3ByZWZpeCcsXG4gICAgJ3JldHVybicsXG4gICAgJ3R5cGVvZicsXG4gICAgJ3ZvaWQnLFxuICAgICd5aWVsZCdcbiAgXTtcblxuICB2YXIgd29yZHNMYXN0Q2hhciA9IGJlZm9yZVJlV29yZHMucmVkdWNlKGZ1bmN0aW9uIChzLCB3KSB7XG4gICAgcmV0dXJuIHMgKyB3LnNsaWNlKC0xKVxuICB9LCAnJyk7XG5cbiAgdmFyIFJFX1JFR0VYID0gL15cXC8oPz1bXio+L10pW15bL1xcXFxdKig/Oig/OlxcXFwufFxcWyg/OlxcXFwufFteXFxdXFxcXF0qKSpcXF0pW15bXFxcXC9dKikqP1xcL1tnaW11eV0qLztcbiAgdmFyIFJFX1ZOX0NIQVIgPSAvWyRcXHddLztcblxuICBmdW5jdGlvbiBwcmV2IChjb2RlLCBwb3MpIHtcbiAgICB3aGlsZSAoLS1wb3MgPj0gMCAmJiAvXFxzLy50ZXN0KGNvZGVbcG9zXSkpeyAgfVxuICAgIHJldHVybiBwb3NcbiAgfVxuXG4gIGZ1bmN0aW9uIF9za2lwUmVnZXggKGNvZGUsIHN0YXJ0KSB7XG5cbiAgICB2YXIgcmUgPSAvLiovZztcbiAgICB2YXIgcG9zID0gcmUubGFzdEluZGV4ID0gc3RhcnQrKztcbiAgICB2YXIgbWF0Y2ggPSByZS5leGVjKGNvZGUpWzBdLm1hdGNoKFJFX1JFR0VYKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgdmFyIG5leHQgPSBwb3MgKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgIHBvcyA9IHByZXYoY29kZSwgcG9zKTtcbiAgICAgIHZhciBjID0gY29kZVtwb3NdO1xuXG4gICAgICBpZiAocG9zIDwgMCB8fCB+YmVmb3JlUmVDaGFycy5pbmRleE9mKGMpKSB7XG4gICAgICAgIHJldHVybiBuZXh0XG4gICAgICB9XG5cbiAgICAgIGlmIChjID09PSAnLicpIHtcblxuICAgICAgICBpZiAoY29kZVtwb3MgLSAxXSA9PT0gJy4nKSB7XG4gICAgICAgICAgc3RhcnQgPSBuZXh0O1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJysnIHx8IGMgPT09ICctJykge1xuXG4gICAgICAgIGlmIChjb2RlWy0tcG9zXSAhPT0gYyB8fFxuICAgICAgICAgICAgKHBvcyA9IHByZXYoY29kZSwgcG9zKSkgPCAwIHx8XG4gICAgICAgICAgICAhUkVfVk5fQ0hBUi50ZXN0KGNvZGVbcG9zXSkpIHtcbiAgICAgICAgICBzdGFydCA9IG5leHQ7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmICh+d29yZHNMYXN0Q2hhci5pbmRleE9mKGMpKSB7XG5cbiAgICAgICAgdmFyIGVuZCA9IHBvcyArIDE7XG5cbiAgICAgICAgd2hpbGUgKC0tcG9zID49IDAgJiYgUkVfVk5fQ0hBUi50ZXN0KGNvZGVbcG9zXSkpeyAgfVxuICAgICAgICBpZiAofmJlZm9yZVJlV29yZHMuaW5kZXhPZihjb2RlLnNsaWNlKHBvcyArIDEsIGVuZCkpKSB7XG4gICAgICAgICAgc3RhcnQgPSBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0XG4gIH1cblxuICByZXR1cm4gX3NraXBSZWdleFxuXG59KSgpO1xuXG4vKipcbiAqIHJpb3QudXRpbC5icmFja2V0c1xuICpcbiAqIC0gYGJyYWNrZXRzICAgIGAgLSBSZXR1cm5zIGEgc3RyaW5nIG9yIHJlZ2V4IGJhc2VkIG9uIGl0cyBwYXJhbWV0ZXJcbiAqIC0gYGJyYWNrZXRzLnNldGAgLSBDaGFuZ2UgdGhlIGN1cnJlbnQgcmlvdCBicmFja2V0c1xuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG4vKiBnbG9iYWwgcmlvdCAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIGJyYWNrZXRzID0gKGZ1bmN0aW9uIChVTkRFRikge1xuXG4gIHZhclxuICAgIFJFR0xPQiA9ICdnJyxcblxuICAgIFJfTUxDT01NUyA9IC9cXC9cXCpbXipdKlxcKisoPzpbXipcXC9dW14qXSpcXCorKSpcXC8vZyxcblxuICAgIFJfU1RSSU5HUyA9IC9cIlteXCJcXFxcXSooPzpcXFxcW1xcU1xcc11bXlwiXFxcXF0qKSpcInwnW14nXFxcXF0qKD86XFxcXFtcXFNcXHNdW14nXFxcXF0qKSonfGBbXmBcXFxcXSooPzpcXFxcW1xcU1xcc11bXmBcXFxcXSopKmAvZyxcblxuICAgIFNfUUJMT0NLUyA9IFJfU1RSSU5HUy5zb3VyY2UgKyAnfCcgK1xuICAgICAgLyg/OlxcYnJldHVyblxccyt8KD86WyRcXHdcXClcXF1dfFxcK1xcK3wtLSlcXHMqKFxcLykoPyFbKlxcL10pKS8uc291cmNlICsgJ3wnICtcbiAgICAgIC9cXC8oPz1bXipcXC9dKVteW1xcL1xcXFxdKig/Oig/OlxcWyg/OlxcXFwufFteXFxdXFxcXF0qKSpcXF18XFxcXC4pW15bXFwvXFxcXF0qKSo/KFtePF1cXC8pW2dpbV0qLy5zb3VyY2UsXG5cbiAgICBVTlNVUFBPUlRFRCA9IFJlZ0V4cCgnW1xcXFwnICsgJ3gwMC1cXFxceDFGPD5hLXpBLVowLTlcXCdcIiw7XFxcXFxcXFxdJyksXG5cbiAgICBORUVEX0VTQ0FQRSA9IC8oPz1bW1xcXSgpKis/Ll4kfF0pL2csXG5cbiAgICBTX1FCTE9DSzIgPSBSX1NUUklOR1Muc291cmNlICsgJ3wnICsgLyhcXC8pKD8hWypcXC9dKS8uc291cmNlLFxuXG4gICAgRklOREJSQUNFUyA9IHtcbiAgICAgICcoJzogUmVnRXhwKCcoWygpXSl8JyAgICsgU19RQkxPQ0syLCBSRUdMT0IpLFxuICAgICAgJ1snOiBSZWdFeHAoJyhbW1xcXFxdXSl8JyArIFNfUUJMT0NLMiwgUkVHTE9CKSxcbiAgICAgICd7JzogUmVnRXhwKCcoW3t9XSl8JyAgICsgU19RQkxPQ0syLCBSRUdMT0IpXG4gICAgfSxcblxuICAgIERFRkFVTFQgPSAneyB9JztcblxuICB2YXIgX3BhaXJzID0gW1xuICAgICd7JywgJ30nLFxuICAgICd7JywgJ30nLFxuICAgIC97W159XSp9LyxcbiAgICAvXFxcXChbe31dKS9nLFxuICAgIC9cXFxcKHspfHsvZyxcbiAgICBSZWdFeHAoJ1xcXFxcXFxcKH0pfChbWyh7XSl8KH0pfCcgKyBTX1FCTE9DSzIsIFJFR0xPQiksXG4gICAgREVGQVVMVCxcbiAgICAvXlxccyp7XFxeP1xccyooWyRcXHddKykoPzpcXHMqLFxccyooXFxTKykpP1xccytpblxccysoXFxTLiopXFxzKn0vLFxuICAgIC8oXnxbXlxcXFxdKXs9W1xcU1xcc10qP30vXG4gIF07XG5cbiAgdmFyXG4gICAgY2FjaGVkQnJhY2tldHMgPSBVTkRFRixcbiAgICBfcmVnZXgsXG4gICAgX2NhY2hlID0gW10sXG4gICAgX3NldHRpbmdzO1xuXG4gIGZ1bmN0aW9uIF9sb29wYmFjayAocmUpIHsgcmV0dXJuIHJlIH1cblxuICBmdW5jdGlvbiBfcmV3cml0ZSAocmUsIGJwKSB7XG4gICAgaWYgKCFicCkgeyBicCA9IF9jYWNoZTsgfVxuICAgIHJldHVybiBuZXcgUmVnRXhwKFxuICAgICAgcmUuc291cmNlLnJlcGxhY2UoL3svZywgYnBbMl0pLnJlcGxhY2UoL30vZywgYnBbM10pLCByZS5nbG9iYWwgPyBSRUdMT0IgOiAnJ1xuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGUgKHBhaXIpIHtcbiAgICBpZiAocGFpciA9PT0gREVGQVVMVCkgeyByZXR1cm4gX3BhaXJzIH1cblxuICAgIHZhciBhcnIgPSBwYWlyLnNwbGl0KCcgJyk7XG5cbiAgICBpZiAoYXJyLmxlbmd0aCAhPT0gMiB8fCBVTlNVUFBPUlRFRC50ZXN0KHBhaXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGJyYWNrZXRzIFwiJyArIHBhaXIgKyAnXCInKVxuICAgIH1cbiAgICBhcnIgPSBhcnIuY29uY2F0KHBhaXIucmVwbGFjZShORUVEX0VTQ0FQRSwgJ1xcXFwnKS5zcGxpdCgnICcpKTtcblxuICAgIGFycls0XSA9IF9yZXdyaXRlKGFyclsxXS5sZW5ndGggPiAxID8gL3tbXFxTXFxzXSo/fS8gOiBfcGFpcnNbNF0sIGFycik7XG4gICAgYXJyWzVdID0gX3Jld3JpdGUocGFpci5sZW5ndGggPiAzID8gL1xcXFwoe3x9KS9nIDogX3BhaXJzWzVdLCBhcnIpO1xuICAgIGFycls2XSA9IF9yZXdyaXRlKF9wYWlyc1s2XSwgYXJyKTtcbiAgICBhcnJbN10gPSBSZWdFeHAoJ1xcXFxcXFxcKCcgKyBhcnJbM10gKyAnKXwoW1soe10pfCgnICsgYXJyWzNdICsgJyl8JyArIFNfUUJMT0NLMiwgUkVHTE9CKTtcbiAgICBhcnJbOF0gPSBwYWlyO1xuICAgIHJldHVybiBhcnJcbiAgfVxuXG4gIGZ1bmN0aW9uIF9icmFja2V0cyAocmVPcklkeCkge1xuICAgIHJldHVybiByZU9ySWR4IGluc3RhbmNlb2YgUmVnRXhwID8gX3JlZ2V4KHJlT3JJZHgpIDogX2NhY2hlW3JlT3JJZHhdXG4gIH1cblxuICBfYnJhY2tldHMuc3BsaXQgPSBmdW5jdGlvbiBzcGxpdCAoc3RyLCB0bXBsLCBfYnApIHtcbiAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogX2JwIGlzIGZvciB0aGUgY29tcGlsZXJcbiAgICBpZiAoIV9icCkgeyBfYnAgPSBfY2FjaGU7IH1cblxuICAgIHZhclxuICAgICAgcGFydHMgPSBbXSxcbiAgICAgIG1hdGNoLFxuICAgICAgaXNleHByLFxuICAgICAgc3RhcnQsXG4gICAgICBwb3MsXG4gICAgICByZSA9IF9icFs2XTtcblxuICAgIHZhciBxYmxvY2tzID0gW107XG4gICAgdmFyIHByZXZTdHIgPSAnJztcbiAgICB2YXIgbWFyaywgbGFzdEluZGV4O1xuXG4gICAgaXNleHByID0gc3RhcnQgPSByZS5sYXN0SW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoc3RyKSkpIHtcblxuICAgICAgbGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgcG9zID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgIGlmIChpc2V4cHIpIHtcblxuICAgICAgICBpZiAobWF0Y2hbMl0pIHtcblxuICAgICAgICAgIHZhciBjaCA9IG1hdGNoWzJdO1xuICAgICAgICAgIHZhciByZWNoID0gRklOREJSQUNFU1tjaF07XG4gICAgICAgICAgdmFyIGl4ID0gMTtcblxuICAgICAgICAgIHJlY2gubGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICAgIHdoaWxlICgobWF0Y2ggPSByZWNoLmV4ZWMoc3RyKSkpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0gPT09IGNoKSB7ICsraXg7IH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAoIS0taXgpIHsgYnJlYWsgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVjaC5sYXN0SW5kZXggPSBwdXNoUUJsb2NrKG1hdGNoLmluZGV4LCByZWNoLmxhc3RJbmRleCwgbWF0Y2hbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZS5sYXN0SW5kZXggPSBpeCA/IHN0ci5sZW5ndGggOiByZWNoLmxhc3RJbmRleDtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtYXRjaFszXSkge1xuICAgICAgICAgIHJlLmxhc3RJbmRleCA9IHB1c2hRQmxvY2socG9zLCBsYXN0SW5kZXgsIG1hdGNoWzRdKTtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghbWF0Y2hbMV0pIHtcbiAgICAgICAgdW5lc2NhcGVTdHIoc3RyLnNsaWNlKHN0YXJ0LCBwb3MpKTtcbiAgICAgICAgc3RhcnQgPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlID0gX2JwWzYgKyAoaXNleHByIF49IDEpXTtcbiAgICAgICAgcmUubGFzdEluZGV4ID0gc3RhcnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0ciAmJiBzdGFydCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgIHVuZXNjYXBlU3RyKHN0ci5zbGljZShzdGFydCkpO1xuICAgIH1cblxuICAgIHBhcnRzLnFibG9ja3MgPSBxYmxvY2tzO1xuXG4gICAgcmV0dXJuIHBhcnRzXG5cbiAgICBmdW5jdGlvbiB1bmVzY2FwZVN0ciAocykge1xuICAgICAgaWYgKHByZXZTdHIpIHtcbiAgICAgICAgcyA9IHByZXZTdHIgKyBzO1xuICAgICAgICBwcmV2U3RyID0gJyc7XG4gICAgICB9XG4gICAgICBpZiAodG1wbCB8fCBpc2V4cHIpIHtcbiAgICAgICAgcGFydHMucHVzaChzICYmIHMucmVwbGFjZShfYnBbNV0sICckMScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRzLnB1c2gocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVzaFFCbG9jayhfcG9zLCBfbGFzdEluZGV4LCBzbGFzaCkgeyAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGlmIChzbGFzaCkge1xuICAgICAgICBfbGFzdEluZGV4ID0gc2tpcFJlZ2V4KHN0ciwgX3Bvcyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0bXBsICYmIF9sYXN0SW5kZXggPiBfcG9zICsgMikge1xuICAgICAgICBtYXJrID0gJ1xcdTIwNTcnICsgcWJsb2Nrcy5sZW5ndGggKyAnfic7XG4gICAgICAgIHFibG9ja3MucHVzaChzdHIuc2xpY2UoX3BvcywgX2xhc3RJbmRleCkpO1xuICAgICAgICBwcmV2U3RyICs9IHN0ci5zbGljZShzdGFydCwgX3BvcykgKyBtYXJrO1xuICAgICAgICBzdGFydCA9IF9sYXN0SW5kZXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gX2xhc3RJbmRleFxuICAgIH1cbiAgfTtcblxuICBfYnJhY2tldHMuaGFzRXhwciA9IGZ1bmN0aW9uIGhhc0V4cHIgKHN0cikge1xuICAgIHJldHVybiBfY2FjaGVbNF0udGVzdChzdHIpXG4gIH07XG5cbiAgX2JyYWNrZXRzLmxvb3BLZXlzID0gZnVuY3Rpb24gbG9vcEtleXMgKGV4cHIpIHtcbiAgICB2YXIgbSA9IGV4cHIubWF0Y2goX2NhY2hlWzldKTtcblxuICAgIHJldHVybiBtXG4gICAgICA/IHsga2V5OiBtWzFdLCBwb3M6IG1bMl0sIHZhbDogX2NhY2hlWzBdICsgbVszXS50cmltKCkgKyBfY2FjaGVbMV0gfVxuICAgICAgOiB7IHZhbDogZXhwci50cmltKCkgfVxuICB9O1xuXG4gIF9icmFja2V0cy5hcnJheSA9IGZ1bmN0aW9uIGFycmF5IChwYWlyKSB7XG4gICAgcmV0dXJuIHBhaXIgPyBfY3JlYXRlKHBhaXIpIDogX2NhY2hlXG4gIH07XG5cbiAgZnVuY3Rpb24gX3Jlc2V0IChwYWlyKSB7XG4gICAgaWYgKChwYWlyIHx8IChwYWlyID0gREVGQVVMVCkpICE9PSBfY2FjaGVbOF0pIHtcbiAgICAgIF9jYWNoZSA9IF9jcmVhdGUocGFpcik7XG4gICAgICBfcmVnZXggPSBwYWlyID09PSBERUZBVUxUID8gX2xvb3BiYWNrIDogX3Jld3JpdGU7XG4gICAgICBfY2FjaGVbOV0gPSBfcmVnZXgoX3BhaXJzWzldKTtcbiAgICB9XG4gICAgY2FjaGVkQnJhY2tldHMgPSBwYWlyO1xuICB9XG5cbiAgZnVuY3Rpb24gX3NldFNldHRpbmdzIChvKSB7XG4gICAgdmFyIGI7XG5cbiAgICBvID0gbyB8fCB7fTtcbiAgICBiID0gby5icmFja2V0cztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgJ2JyYWNrZXRzJywge1xuICAgICAgc2V0OiBfcmVzZXQsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhY2hlZEJyYWNrZXRzIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgX3NldHRpbmdzID0gbztcbiAgICBfcmVzZXQoYik7XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2JyYWNrZXRzLCAnc2V0dGluZ3MnLCB7XG4gICAgc2V0OiBfc2V0U2V0dGluZ3MsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfc2V0dGluZ3MgfVxuICB9KTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogaW4gdGhlIGJyb3dzZXIgcmlvdCBpcyBhbHdheXMgaW4gdGhlIHNjb3BlICovXG4gIF9icmFja2V0cy5zZXR0aW5ncyA9IHR5cGVvZiByaW90ICE9PSAndW5kZWZpbmVkJyAmJiByaW90LnNldHRpbmdzIHx8IHt9O1xuICBfYnJhY2tldHMuc2V0ID0gX3Jlc2V0O1xuICBfYnJhY2tldHMuc2tpcFJlZ2V4ID0gc2tpcFJlZ2V4O1xuXG4gIF9icmFja2V0cy5SX1NUUklOR1MgPSBSX1NUUklOR1M7XG4gIF9icmFja2V0cy5SX01MQ09NTVMgPSBSX01MQ09NTVM7XG4gIF9icmFja2V0cy5TX1FCTE9DS1MgPSBTX1FCTE9DS1M7XG4gIF9icmFja2V0cy5TX1FCTE9DSzIgPSBTX1FCTE9DSzI7XG5cbiAgcmV0dXJuIF9icmFja2V0c1xuXG59KSgpO1xuXG4vKipcbiAqIEBtb2R1bGUgdG1wbFxuICpcbiAqIHRtcGwgICAgICAgICAgLSBSb290IGZ1bmN0aW9uLCByZXR1cm5zIHRoZSB0ZW1wbGF0ZSB2YWx1ZSwgcmVuZGVyIHdpdGggZGF0YVxuICogdG1wbC5oYXNFeHByICAtIFRlc3QgdGhlIGV4aXN0ZW5jZSBvZiBhIGV4cHJlc3Npb24gaW5zaWRlIGEgc3RyaW5nXG4gKiB0bXBsLmxvb3BLZXlzIC0gR2V0IHRoZSBrZXlzIGZvciBhbiAnZWFjaCcgbG9vcCAodXNlZCBieSBgX2VhY2hgKVxuICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG52YXIgdG1wbCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9jYWNoZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIF90bXBsIChzdHIsIGRhdGEpIHtcbiAgICBpZiAoIXN0cikgeyByZXR1cm4gc3RyIH1cblxuICAgIHJldHVybiAoX2NhY2hlW3N0cl0gfHwgKF9jYWNoZVtzdHJdID0gX2NyZWF0ZShzdHIpKSkuY2FsbChcbiAgICAgIGRhdGEsIF9sb2dFcnIuYmluZCh7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIHRtcGw6IHN0clxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBfdG1wbC5oYXNFeHByID0gYnJhY2tldHMuaGFzRXhwcjtcblxuICBfdG1wbC5sb29wS2V5cyA9IGJyYWNrZXRzLmxvb3BLZXlzO1xuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gIF90bXBsLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7IF9jYWNoZSA9IHt9OyB9O1xuXG4gIF90bXBsLmVycm9ySGFuZGxlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gX2xvZ0VyciAoZXJyLCBjdHgpIHtcblxuICAgIGVyci5yaW90RGF0YSA9IHtcbiAgICAgIHRhZ05hbWU6IGN0eCAmJiBjdHguX18gJiYgY3R4Ll9fLnRhZ05hbWUsXG4gICAgICBfcmlvdF9pZDogY3R4ICYmIGN0eC5fcmlvdF9pZCAgLy9lc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAgIH07XG5cbiAgICBpZiAoX3RtcGwuZXJyb3JIYW5kbGVyKSB7IF90bXBsLmVycm9ySGFuZGxlcihlcnIpOyB9XG4gICAgZWxzZSBpZiAoXG4gICAgICB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgICAgIGNvbnNvbGUubG9nKCc8JXM+ICVzJywgZXJyLnJpb3REYXRhLnRhZ05hbWUgfHwgJ1Vua25vd24gdGFnJywgdGhpcy50bXBsKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGUgKHN0cikge1xuICAgIHZhciBleHByID0gX2dldFRtcGwoc3RyKTtcblxuICAgIGlmIChleHByLnNsaWNlKDAsIDExKSAhPT0gJ3RyeXtyZXR1cm4gJykgeyBleHByID0gJ3JldHVybiAnICsgZXhwcjsgfVxuXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbignRScsIGV4cHIgKyAnOycpICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcbiAgfVxuXG4gIHZhciBSRV9EUVVPVEUgPSAvXFx1MjA1Ny9nO1xuICB2YXIgUkVfUUJNQVJLID0gL1xcdTIwNTcoXFxkKyl+L2c7XG5cbiAgZnVuY3Rpb24gX2dldFRtcGwgKHN0cikge1xuICAgIHZhciBwYXJ0cyA9IGJyYWNrZXRzLnNwbGl0KHN0ci5yZXBsYWNlKFJFX0RRVU9URSwgJ1wiJyksIDEpO1xuICAgIHZhciBxc3RyID0gcGFydHMucWJsb2NrcztcbiAgICB2YXIgZXhwcjtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAyIHx8IHBhcnRzWzBdKSB7XG4gICAgICB2YXIgaSwgaiwgbGlzdCA9IFtdO1xuXG4gICAgICBmb3IgKGkgPSBqID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgZXhwciA9IHBhcnRzW2ldO1xuXG4gICAgICAgIGlmIChleHByICYmIChleHByID0gaSAmIDFcblxuICAgICAgICAgICAgPyBfcGFyc2VFeHByKGV4cHIsIDEsIHFzdHIpXG5cbiAgICAgICAgICAgIDogJ1wiJyArIGV4cHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHJcXG4/fFxcbi9nLCAnXFxcXG4nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgK1xuICAgICAgICAgICAgICAnXCInXG5cbiAgICAgICAgICApKSB7IGxpc3RbaisrXSA9IGV4cHI7IH1cblxuICAgICAgfVxuXG4gICAgICBleHByID0gaiA8IDIgPyBsaXN0WzBdXG4gICAgICAgICAgIDogJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiXCIpJztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGV4cHIgPSBfcGFyc2VFeHByKHBhcnRzWzFdLCAwLCBxc3RyKTtcbiAgICB9XG5cbiAgICBpZiAocXN0ci5sZW5ndGgpIHtcbiAgICAgIGV4cHIgPSBleHByLnJlcGxhY2UoUkVfUUJNQVJLLCBmdW5jdGlvbiAoXywgcG9zKSB7XG4gICAgICAgIHJldHVybiBxc3RyW3Bvc11cbiAgICAgICAgICAucmVwbGFjZSgvXFxyL2csICdcXFxccicpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBleHByXG4gIH1cblxuICB2YXIgUkVfQ1NOQU1FID0gL14oPzooLT9bX0EtWmEtelxceEEwLVxceEZGXVstXFx3XFx4QTAtXFx4RkZdKil8XFx1MjA1NyhcXGQrKX4pOi87XG4gIHZhclxuICAgIFJFX0JSRU5EID0ge1xuICAgICAgJygnOiAvWygpXS9nLFxuICAgICAgJ1snOiAvW1tcXF1dL2csXG4gICAgICAneyc6IC9be31dL2dcbiAgICB9O1xuXG4gIGZ1bmN0aW9uIF9wYXJzZUV4cHIgKGV4cHIsIGFzVGV4dCwgcXN0cikge1xuXG4gICAgZXhwciA9IGV4cHJcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpXG4gICAgICAucmVwbGFjZSgvXFwgPyhbW1xcKHt9LD9cXC46XSlcXCA/L2csICckMScpO1xuXG4gICAgaWYgKGV4cHIpIHtcbiAgICAgIHZhclxuICAgICAgICBsaXN0ID0gW10sXG4gICAgICAgIGNudCA9IDAsXG4gICAgICAgIG1hdGNoO1xuXG4gICAgICB3aGlsZSAoZXhwciAmJlxuICAgICAgICAgICAgKG1hdGNoID0gZXhwci5tYXRjaChSRV9DU05BTUUpKSAmJlxuICAgICAgICAgICAgIW1hdGNoLmluZGV4XG4gICAgICAgICkge1xuICAgICAgICB2YXJcbiAgICAgICAgICBrZXksXG4gICAgICAgICAganNiLFxuICAgICAgICAgIHJlID0gLyx8KFtbeyhdKXwkL2c7XG5cbiAgICAgICAgZXhwciA9IFJlZ0V4cC5yaWdodENvbnRleHQ7XG4gICAgICAgIGtleSAgPSBtYXRjaFsyXSA/IHFzdHJbbWF0Y2hbMl1dLnNsaWNlKDEsIC0xKS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpIDogbWF0Y2hbMV07XG5cbiAgICAgICAgd2hpbGUgKGpzYiA9IChtYXRjaCA9IHJlLmV4ZWMoZXhwcikpWzFdKSB7IHNraXBCcmFjZXMoanNiLCByZSk7IH1cblxuICAgICAgICBqc2IgID0gZXhwci5zbGljZSgwLCBtYXRjaC5pbmRleCk7XG4gICAgICAgIGV4cHIgPSBSZWdFeHAucmlnaHRDb250ZXh0O1xuXG4gICAgICAgIGxpc3RbY250KytdID0gX3dyYXBFeHByKGpzYiwgMSwga2V5KTtcbiAgICAgIH1cblxuICAgICAgZXhwciA9ICFjbnQgPyBfd3JhcEV4cHIoZXhwciwgYXNUZXh0KVxuICAgICAgICAgICA6IGNudCA+IDEgPyAnWycgKyBsaXN0LmpvaW4oJywnKSArICddLmpvaW4oXCIgXCIpLnRyaW0oKScgOiBsaXN0WzBdO1xuICAgIH1cbiAgICByZXR1cm4gZXhwclxuXG4gICAgZnVuY3Rpb24gc2tpcEJyYWNlcyAoY2gsIHJlKSB7XG4gICAgICB2YXJcbiAgICAgICAgbW0sXG4gICAgICAgIGx2ID0gMSxcbiAgICAgICAgaXIgPSBSRV9CUkVORFtjaF07XG5cbiAgICAgIGlyLmxhc3RJbmRleCA9IHJlLmxhc3RJbmRleDtcbiAgICAgIHdoaWxlIChtbSA9IGlyLmV4ZWMoZXhwcikpIHtcbiAgICAgICAgaWYgKG1tWzBdID09PSBjaCkgeyArK2x2OyB9XG4gICAgICAgIGVsc2UgaWYgKCEtLWx2KSB7IGJyZWFrIH1cbiAgICAgIH1cbiAgICAgIHJlLmxhc3RJbmRleCA9IGx2ID8gZXhwci5sZW5ndGggOiBpci5sYXN0SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgLy8gaXN0YW5idWwgaWdub3JlIG5leHQ6IG5vdCBib3RoXG4gIHZhciAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIEpTX0NPTlRFWFQgPSAnXCJpbiB0aGlzP3RoaXM6JyArICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyA/ICdnbG9iYWwnIDogJ3dpbmRvdycpICsgJykuJyxcbiAgICBKU19WQVJOQU1FID0gL1sse11bXFwkXFx3XSsoPz06KXwoXiAqfFteJFxcd1xcLntdKSg/ISg/OnR5cGVvZnx0cnVlfGZhbHNlfG51bGx8dW5kZWZpbmVkfGlufGluc3RhbmNlb2Z8aXMoPzpGaW5pdGV8TmFOKXx2b2lkfE5hTnxuZXd8RGF0ZXxSZWdFeHB8TWF0aCkoPyFbJFxcd10pKShbJF9BLVphLXpdWyRcXHddKikvZyxcbiAgICBKU19OT1BST1BTID0gL14oPz0oXFwuWyRcXHddKykpXFwxKD86W14uWyhdfCQpLztcblxuICBmdW5jdGlvbiBfd3JhcEV4cHIgKGV4cHIsIGFzVGV4dCwga2V5KSB7XG4gICAgdmFyIHRiO1xuXG4gICAgZXhwciA9IGV4cHIucmVwbGFjZShKU19WQVJOQU1FLCBmdW5jdGlvbiAobWF0Y2gsIHAsIG12YXIsIHBvcywgcykge1xuICAgICAgaWYgKG12YXIpIHtcbiAgICAgICAgcG9zID0gdGIgPyAwIDogcG9zICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICAgIGlmIChtdmFyICE9PSAndGhpcycgJiYgbXZhciAhPT0gJ2dsb2JhbCcgJiYgbXZhciAhPT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICBtYXRjaCA9IHAgKyAnKFwiJyArIG12YXIgKyBKU19DT05URVhUICsgbXZhcjtcbiAgICAgICAgICBpZiAocG9zKSB7IHRiID0gKHMgPSBzW3Bvc10pID09PSAnLicgfHwgcyA9PT0gJygnIHx8IHMgPT09ICdbJzsgfVxuICAgICAgICB9IGVsc2UgaWYgKHBvcykge1xuICAgICAgICAgIHRiID0gIUpTX05PUFJPUFMudGVzdChzLnNsaWNlKHBvcykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hcbiAgICB9KTtcblxuICAgIGlmICh0Yikge1xuICAgICAgZXhwciA9ICd0cnl7cmV0dXJuICcgKyBleHByICsgJ31jYXRjaChlKXtFKGUsdGhpcyl9JztcbiAgICB9XG5cbiAgICBpZiAoa2V5KSB7XG5cbiAgICAgIGV4cHIgPSAodGJcbiAgICAgICAgICA/ICdmdW5jdGlvbigpeycgKyBleHByICsgJ30uY2FsbCh0aGlzKScgOiAnKCcgKyBleHByICsgJyknXG4gICAgICAgICkgKyAnP1wiJyArIGtleSArICdcIjpcIlwiJztcblxuICAgIH0gZWxzZSBpZiAoYXNUZXh0KSB7XG5cbiAgICAgIGV4cHIgPSAnZnVuY3Rpb24odil7JyArICh0YlxuICAgICAgICAgID8gZXhwci5yZXBsYWNlKCdyZXR1cm4gJywgJ3Y9JykgOiAndj0oJyArIGV4cHIgKyAnKSdcbiAgICAgICAgKSArICc7cmV0dXJuIHZ8fHY9PT0wP3Y6XCJcIn0uY2FsbCh0aGlzKSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIF90bXBsLnZlcnNpb24gPSBicmFja2V0cy52ZXJzaW9uID0gJ3YzLjAuOCc7XG5cbiAgcmV0dXJuIF90bXBsXG5cbn0pKCk7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG52YXIgb2JzZXJ2YWJsZSQxID0gZnVuY3Rpb24oZWwpIHtcblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBvcmlnaW5hbCBvYmplY3Qgb3IgY3JlYXRlIGEgbmV3IGVtcHR5IG9uZVxuICAgKiBAdHlwZSB7IE9iamVjdCB9XG4gICAqL1xuXG4gIGVsID0gZWwgfHwge307XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGVzXG4gICAqL1xuICB2YXIgY2FsbGJhY2tzID0ge30sXG4gICAgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBBcGlcbiAgICovXG5cbiAgLy8gZXh0ZW5kIHRoZSBlbCBvYmplY3QgYWRkaW5nIHRoZSBvYnNlcnZhYmxlIG1ldGhvZHNcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZWwsIHtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIGBldmVudGAgYW5kc1xuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgZWFjaCB0aW1lIGFuIGV2ZW50IGlzIHRyaWdnZXJlZC5cbiAgICAgKiBAcGFyYW0gIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb246IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIHsgKGNhbGxiYWNrc1tldmVudF0gPSBjYWxsYmFja3NbZXZlbnRdIHx8IFtdKS5wdXNoKGZuKTsgfVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gYGV2ZW50YCBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvZmY6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgaWYgKGV2ZW50ID09ICcqJyAmJiAhZm4pIHsgY2FsbGJhY2tzID0ge307IH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gY2FsbGJhY2tzW2V2ZW50XTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBjYjsgY2IgPSBhcnIgJiYgYXJyW2ldOyArK2kpIHtcbiAgICAgICAgICAgICAgaWYgKGNiID09IGZuKSB7IGFyci5zcGxpY2UoaS0tLCAxKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7IGRlbGV0ZSBjYWxsYmFja3NbZXZlbnRdOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gYGV2ZW50YCBhbmRcbiAgICAgKiBleGVjdXRlIHRoZSBgY2FsbGJhY2tgIGF0IG1vc3Qgb25jZVxuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9uZToge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBmdW5jdGlvbiBvbigpIHtcbiAgICAgICAgICBlbC5vZmYoZXZlbnQsIG9uKTtcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWwub24oZXZlbnQsIG9uKVxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGFsbCBjYWxsYmFjayBmdW5jdGlvbnMgdGhhdCBsaXN0ZW4gdG9cbiAgICAgKiB0aGUgZ2l2ZW4gYGV2ZW50YFxuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICB0cmlnZ2VyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG5cbiAgICAgICAgLy8gZ2V0dGluZyB0aGUgYXJndW1lbnRzXG4gICAgICAgIHZhciBhcmdsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMSxcbiAgICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFyZ2xlbiksXG4gICAgICAgICAgZm5zLFxuICAgICAgICAgIGZuLFxuICAgICAgICAgIGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ2xlbjsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50cyQxW2kgKyAxXTsgLy8gc2tpcCBmaXJzdCBhcmd1bWVudFxuICAgICAgICB9XG5cbiAgICAgICAgZm5zID0gc2xpY2UuY2FsbChjYWxsYmFja3NbZXZlbnRdIHx8IFtdLCAwKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBmbiA9IGZuc1tpXTsgKytpKSB7XG4gICAgICAgICAgZm4uYXBwbHkoZWwsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrc1snKiddICYmIGV2ZW50ICE9ICcqJylcbiAgICAgICAgICB7IGVsLnRyaWdnZXIuYXBwbHkoZWwsIFsnKicsIGV2ZW50XS5jb25jYXQoYXJncykpOyB9XG5cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZWxcblxufTtcblxuLyoqXG4gKiBTcGVjaWFsaXplZCBmdW5jdGlvbiBmb3IgbG9vcGluZyBhbiBhcnJheS1saWtlIGNvbGxlY3Rpb24gd2l0aCBgZWFjaD17fWBcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBsaXN0IC0gY29sbGVjdGlvbiBvZiBpdGVtc1xuICogQHBhcmFtICAge0Z1bmN0aW9ufSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IEFycmF5IH0gdGhlIGFycmF5IGxvb3BlZFxuICovXG5mdW5jdGlvbiBlYWNoKGxpc3QsIGZuKSB7XG4gIHZhciBsZW4gPSBsaXN0ID8gbGlzdC5sZW5ndGggOiAwO1xuICB2YXIgaSA9IDA7XG4gIGZvciAoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBmbihsaXN0W2ldLCBpKTtcbiAgfVxuICByZXR1cm4gbGlzdFxufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gYXJyYXkgY29udGFpbnMgYW4gaXRlbVxuICogQHBhcmFtICAgeyBBcnJheSB9IGFycmF5IC0gdGFyZ2V0IGFycmF5XG4gKiBAcGFyYW0gICB7ICogfSBpdGVtIC0gaXRlbSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtKSB7XG4gIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pICE9PSAtMVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgY29udGFpbmluZyBkYXNoZXMgdG8gY2FtZWwgY2FzZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzdHIgLSBpbnB1dCBzdHJpbmdcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbXktc3RyaW5nIC0+IG15U3RyaW5nXG4gKi9cbmZ1bmN0aW9uIHRvQ2FtZWwoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvLShcXHcpL2csIGZ1bmN0aW9uIChfLCBjKSB7IHJldHVybiBjLnRvVXBwZXJDYXNlKCk7IH0pXG59XG5cbi8qKlxuICogRmFzdGVyIFN0cmluZyBzdGFydHNXaXRoIGFsdGVybmF0aXZlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHN0ciAtIHNvdXJjZSBzdHJpbmdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdmFsdWUgLSB0ZXN0IHN0cmluZ1xuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0ciwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0ci5zbGljZSgwLCB2YWx1ZS5sZW5ndGgpID09PSB2YWx1ZVxufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgYW4gaW1tdXRhYmxlIHByb3BlcnR5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGVsIC0gb2JqZWN0IHdoZXJlIHRoZSBuZXcgcHJvcGVydHkgd2lsbCBiZSBzZXRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0ga2V5IC0gb2JqZWN0IGtleSB3aGVyZSB0aGUgbmV3IHByb3BlcnR5IHdpbGwgYmUgc3RvcmVkXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtIHZhbHVlIG9mIHRoZSBuZXcgcHJvcGVydHlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0aW9ucyAtIHNldCB0aGUgcHJvcGVyeSBvdmVycmlkaW5nIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gLSB0aGUgaW5pdGlhbCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoZWwsIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsLCBrZXksIGV4dGVuZCh7XG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSwgb3B0aW9ucykpO1xuICByZXR1cm4gZWxcbn1cblxuLyoqXG4gKiBFeHRlbmQgYW55IG9iamVjdCB3aXRoIG90aGVyIHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gc3JjIC0gc291cmNlIG9iamVjdFxuICogQHJldHVybnMgeyBPYmplY3QgfSB0aGUgcmVzdWx0aW5nIGV4dGVuZGVkIG9iamVjdFxuICpcbiAqIHZhciBvYmogPSB7IGZvbzogJ2JheicgfVxuICogZXh0ZW5kKG9iaiwge2JhcjogJ2JhcicsIGZvbzogJ2Jhcid9KVxuICogY29uc29sZS5sb2cob2JqKSA9PiB7YmFyOiAnYmFyJywgZm9vOiAnYmFyJ31cbiAqXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChzcmMpIHtcbiAgdmFyIG9iaiwgYXJncyA9IGFyZ3VtZW50cztcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKG9iaiA9IGFyZ3NbaV0pIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBwcm9wZXJ0eSBvZiB0aGUgc291cmNlIG9iamVjdCBjb3VsZCBiZSBvdmVycmlkZGVuXG4gICAgICAgIGlmIChpc1dyaXRhYmxlKHNyYywga2V5KSlcbiAgICAgICAgICB7IHNyY1trZXldID0gb2JqW2tleV07IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNyY1xufVxuXG52YXIgbWlzYyA9IE9iamVjdC5mcmVlemUoe1xuXHRlYWNoOiBlYWNoLFxuXHRjb250YWluczogY29udGFpbnMsXG5cdHRvQ2FtZWw6IHRvQ2FtZWwsXG5cdHN0YXJ0c1dpdGg6IHN0YXJ0c1dpdGgsXG5cdGRlZmluZVByb3BlcnR5OiBkZWZpbmVQcm9wZXJ0eSxcblx0ZXh0ZW5kOiBleHRlbmRcbn0pO1xuXG52YXIgc2V0dGluZ3MkMSA9IGV4dGVuZChPYmplY3QuY3JlYXRlKGJyYWNrZXRzLnNldHRpbmdzKSwge1xuICBza2lwQW5vbnltb3VzVGFnczogdHJ1ZSxcbiAgLy8gaGFuZGxlIHRoZSBhdXRvIHVwZGF0ZXMgb24gYW55IERPTSBldmVudFxuICBhdXRvVXBkYXRlOiB0cnVlXG59KTtcblxuLyoqXG4gKiBUcmlnZ2VyIERPTSBldmVudHNcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBkb20gZWxlbWVudCB0YXJnZXQgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gaGFuZGxlciAtIHVzZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZSAtIGV2ZW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBoYW5kbGVFdmVudChkb20sIGhhbmRsZXIsIGUpIHtcbiAgdmFyIHB0YWcgPSB0aGlzLl9fLnBhcmVudCxcbiAgICBpdGVtID0gdGhpcy5fXy5pdGVtO1xuXG4gIGlmICghaXRlbSlcbiAgICB7IHdoaWxlIChwdGFnICYmICFpdGVtKSB7XG4gICAgICBpdGVtID0gcHRhZy5fXy5pdGVtO1xuICAgICAgcHRhZyA9IHB0YWcuX18ucGFyZW50O1xuICAgIH0gfVxuXG4gIC8vIG92ZXJyaWRlIHRoZSBldmVudCBwcm9wZXJ0aWVzXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChpc1dyaXRhYmxlKGUsICdjdXJyZW50VGFyZ2V0JykpIHsgZS5jdXJyZW50VGFyZ2V0ID0gZG9tOyB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChpc1dyaXRhYmxlKGUsICd0YXJnZXQnKSkgeyBlLnRhcmdldCA9IGUuc3JjRWxlbWVudDsgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoaXNXcml0YWJsZShlLCAnd2hpY2gnKSkgeyBlLndoaWNoID0gZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7IH1cblxuICBlLml0ZW0gPSBpdGVtO1xuXG4gIGhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcblxuICAvLyBhdm9pZCBhdXRvIHVwZGF0ZXNcbiAgaWYgKCFzZXR0aW5ncyQxLmF1dG9VcGRhdGUpIHsgcmV0dXJuIH1cblxuICBpZiAoIWUucHJldmVudFVwZGF0ZSkge1xuICAgIHZhciBwID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMpO1xuICAgIC8vIGZpeGVzICMyMDgzXG4gICAgaWYgKHAuaXNNb3VudGVkKSB7IHAudXBkYXRlKCk7IH1cbiAgfVxufVxuXG4vKipcbiAqIEF0dGFjaCBhbiBldmVudCB0byBhIERPTSBub2RlXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gZXZlbnQgbmFtZVxuICogQHBhcmFtIHsgRnVuY3Rpb24gfSBoYW5kbGVyIC0gZXZlbnQgY2FsbGJhY2tcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGRvbSAtIGRvbSBub2RlXG4gKiBAcGFyYW0geyBUYWcgfSB0YWcgLSB0YWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gc2V0RXZlbnRIYW5kbGVyKG5hbWUsIGhhbmRsZXIsIGRvbSwgdGFnKSB7XG4gIHZhciBldmVudE5hbWUsXG4gICAgY2IgPSBoYW5kbGVFdmVudC5iaW5kKHRhZywgZG9tLCBoYW5kbGVyKTtcblxuICAvLyBhdm9pZCB0byBiaW5kIHR3aWNlIHRoZSBzYW1lIGV2ZW50XG4gIC8vIHBvc3NpYmxlIGZpeCBmb3IgIzIzMzJcbiAgZG9tW25hbWVdID0gbnVsbDtcblxuICAvLyBub3JtYWxpemUgZXZlbnQgbmFtZVxuICBldmVudE5hbWUgPSBuYW1lLnJlcGxhY2UoUkVfRVZFTlRTX1BSRUZJWCwgJycpO1xuXG4gIC8vIGNhY2hlIHRoZSBsaXN0ZW5lciBpbnRvIHRoZSBsaXN0ZW5lcnMgYXJyYXlcbiAgaWYgKCFjb250YWlucyh0YWcuX18ubGlzdGVuZXJzLCBkb20pKSB7IHRhZy5fXy5saXN0ZW5lcnMucHVzaChkb20pOyB9XG4gIGlmICghZG9tW1JJT1RfRVZFTlRTX0tFWV0pIHsgZG9tW1JJT1RfRVZFTlRTX0tFWV0gPSB7fTsgfVxuICBpZiAoZG9tW1JJT1RfRVZFTlRTX0tFWV1bbmFtZV0pIHsgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBkb21bUklPVF9FVkVOVFNfS0VZXVtuYW1lXSk7IH1cblxuICBkb21bUklPVF9FVkVOVFNfS0VZXVtuYW1lXSA9IGNiO1xuICBkb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNiLCBmYWxzZSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGR5bmFtaWNhbGx5IGNyZWF0ZWQgZGF0YS1pcyB0YWdzIHdpdGggY2hhbmdpbmcgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGV4cHIgLSBleHByZXNzaW9uIHRhZyBhbmQgZXhwcmVzc2lvbiBpbmZvXG4gKiBAcGFyYW0geyBUYWcgfSAgICBwYXJlbnQgLSBwYXJlbnQgZm9yIHRhZyBjcmVhdGlvblxuICogQHBhcmFtIHsgU3RyaW5nIH0gdGFnTmFtZSAtIHRhZyBpbXBsZW1lbnRhdGlvbiB3ZSB3YW50IHRvIHVzZVxuICovXG5mdW5jdGlvbiB1cGRhdGVEYXRhSXMoZXhwciwgcGFyZW50LCB0YWdOYW1lKSB7XG4gIHZhciBjb25mLCBpc1ZpcnR1YWwsIGhlYWQsIHJlZjtcblxuICBpZiAoZXhwci50YWcgJiYgZXhwci50YWdOYW1lID09PSB0YWdOYW1lKSB7XG4gICAgZXhwci50YWcudXBkYXRlKCk7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpc1ZpcnR1YWwgPSBleHByLmRvbS50YWdOYW1lID09PSAnVklSVFVBTCc7XG4gIC8vIHN5bmMgX3BhcmVudCB0byBhY2NvbW1vZGF0ZSBjaGFuZ2luZyB0YWduYW1lc1xuICBpZiAoZXhwci50YWcpIHtcbiAgICAvLyBuZWVkIHBsYWNlaG9sZGVyIGJlZm9yZSB1bm1vdW50XG4gICAgaWYoaXNWaXJ0dWFsKSB7XG4gICAgICBoZWFkID0gZXhwci50YWcuX18uaGVhZDtcbiAgICAgIHJlZiA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCk7XG4gICAgICBoZWFkLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlZiwgaGVhZCk7XG4gICAgfVxuXG4gICAgZXhwci50YWcudW5tb3VudCh0cnVlKTtcbiAgfVxuXG4gIGlmICghaXNTdHJpbmcodGFnTmFtZSkpIHsgcmV0dXJuIH1cblxuICBleHByLmltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdO1xuICBjb25mID0ge3Jvb3Q6IGV4cHIuZG9tLCBwYXJlbnQ6IHBhcmVudCwgaGFzSW1wbDogdHJ1ZSwgdGFnTmFtZTogdGFnTmFtZX07XG4gIGV4cHIudGFnID0gaW5pdENoaWxkVGFnKGV4cHIuaW1wbCwgY29uZiwgZXhwci5kb20uaW5uZXJIVE1MLCBwYXJlbnQpO1xuICBlYWNoKGV4cHIuYXR0cnMsIGZ1bmN0aW9uIChhKSB7IHJldHVybiBzZXRBdHRyKGV4cHIudGFnLnJvb3QsIGEubmFtZSwgYS52YWx1ZSk7IH0pO1xuICBleHByLnRhZ05hbWUgPSB0YWdOYW1lO1xuICBleHByLnRhZy5tb3VudCgpO1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVJlcGxhY2VWaXJ0dWFsKGV4cHIudGFnLCByZWYgfHwgZXhwci50YWcucm9vdCk7IH0gLy8gcm9vdCBleGlzdCBmaXJzdCB0aW1lLCBhZnRlciB1c2UgcGxhY2Vob2xkZXJcblxuICAvLyBwYXJlbnQgaXMgdGhlIHBsYWNlaG9sZGVyIHRhZywgbm90IHRoZSBkeW5hbWljIHRhZyBzbyBjbGVhbiB1cFxuICBwYXJlbnQuX18ub25Vbm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRlbE5hbWUgPSBleHByLnRhZy5vcHRzLmRhdGFJcyxcbiAgICAgIHRhZ3MgPSBleHByLnRhZy5wYXJlbnQudGFncyxcbiAgICAgIF90YWdzID0gZXhwci50YWcuX18ucGFyZW50LnRhZ3M7XG4gICAgYXJyYXlpc2hSZW1vdmUodGFncywgZGVsTmFtZSwgZXhwci50YWcpO1xuICAgIGFycmF5aXNoUmVtb3ZlKF90YWdzLCBkZWxOYW1lLCBleHByLnRhZyk7XG4gICAgZXhwci50YWcudW5tb3VudCgpO1xuICB9O1xufVxuXG4vKipcbiAqIE5vbWFsaXplIGFueSBhdHRyaWJ1dGUgcmVtb3ZpbmcgdGhlIFwicmlvdC1cIiBwcmVmaXhcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gYXR0ck5hbWUgLSBvcmlnaW5hbCBhdHRyaWJ1dGUgbmFtZVxuICogQHJldHVybnMgeyBTdHJpbmcgfSB2YWxpZCBodG1sIGF0dHJpYnV0ZSBuYW1lXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZUF0dHJOYW1lKGF0dHJOYW1lKSB7XG4gIGlmICghYXR0ck5hbWUpIHsgcmV0dXJuIG51bGwgfVxuICBhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoQVRUUlNfUFJFRklYLCAnJyk7XG4gIGlmIChDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTW2F0dHJOYW1lXSkgeyBhdHRyTmFtZSA9IENBU0VfU0VOU0lUSVZFX0FUVFJJQlVURVNbYXR0ck5hbWVdOyB9XG4gIHJldHVybiBhdHRyTmFtZVxufVxuXG4vKipcbiAqIFVwZGF0ZSBvbiBzaW5nbGUgdGFnIGV4cHJlc3Npb25cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZXhwciAtIGV4cHJlc3Npb24gbG9naWNcbiAqIEByZXR1cm5zIHsgdW5kZWZpbmVkIH1cbiAqL1xuZnVuY3Rpb24gdXBkYXRlRXhwcmVzc2lvbihleHByKSB7XG4gIGlmICh0aGlzLnJvb3QgJiYgZ2V0QXR0cih0aGlzLnJvb3QsJ3ZpcnR1YWxpemVkJykpIHsgcmV0dXJuIH1cblxuICB2YXIgZG9tID0gZXhwci5kb20sXG4gICAgLy8gcmVtb3ZlIHRoZSByaW90LSBwcmVmaXhcbiAgICBhdHRyTmFtZSA9IG5vcm1hbGl6ZUF0dHJOYW1lKGV4cHIuYXR0ciksXG4gICAgaXNUb2dnbGUgPSBjb250YWlucyhbU0hPV19ESVJFQ1RJVkUsIEhJREVfRElSRUNUSVZFXSwgYXR0ck5hbWUpLFxuICAgIGlzVmlydHVhbCA9IGV4cHIucm9vdCAmJiBleHByLnJvb3QudGFnTmFtZSA9PT0gJ1ZJUlRVQUwnLFxuICAgIHBhcmVudCA9IGRvbSAmJiAoZXhwci5wYXJlbnQgfHwgZG9tLnBhcmVudE5vZGUpLFxuICAgIC8vIGRldGVjdCB0aGUgc3R5bGUgYXR0cmlidXRlc1xuICAgIGlzU3R5bGVBdHRyID0gYXR0ck5hbWUgPT09ICdzdHlsZScsXG4gICAgaXNDbGFzc0F0dHIgPSBhdHRyTmFtZSA9PT0gJ2NsYXNzJyxcbiAgICBoYXNWYWx1ZSxcbiAgICBpc09iaixcbiAgICB2YWx1ZTtcblxuICAvLyBpZiBpdCdzIGEgdGFnIHdlIGNvdWxkIHRvdGFsbHkgc2tpcCB0aGUgcmVzdFxuICBpZiAoZXhwci5fcmlvdF9pZCkge1xuICAgIGlmIChleHByLmlzTW91bnRlZCkge1xuICAgICAgZXhwci51cGRhdGUoKTtcbiAgICAvLyBpZiBpdCBoYXNuJ3QgYmVlbiBtb3VudGVkIHlldCwgZG8gdGhhdCBub3cuXG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cHIubW91bnQoKTtcbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgbWFrZVJlcGxhY2VWaXJ0dWFsKGV4cHIsIGV4cHIucm9vdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG4gIC8vIGlmIHRoaXMgZXhwcmVzc2lvbiBoYXMgdGhlIHVwZGF0ZSBtZXRob2QgaXQgbWVhbnMgaXQgY2FuIGhhbmRsZSB0aGUgRE9NIGNoYW5nZXMgYnkgaXRzZWxmXG4gIGlmIChleHByLnVwZGF0ZSkgeyByZXR1cm4gZXhwci51cGRhdGUoKSB9XG5cbiAgLy8gLi4uaXQgc2VlbXMgdG8gYmUgYSBzaW1wbGUgZXhwcmVzc2lvbiBzbyB3ZSB0cnkgdG8gY2FsY3VsYXQgaXRzIHZhbHVlXG4gIHZhbHVlID0gdG1wbChleHByLmV4cHIsIGlzVG9nZ2xlID8gZXh0ZW5kKHt9LCBPYmplY3QuY3JlYXRlKHRoaXMucGFyZW50KSwgdGhpcykgOiB0aGlzKTtcbiAgaGFzVmFsdWUgPSAhaXNCbGFuayh2YWx1ZSk7XG4gIGlzT2JqID0gaXNPYmplY3QodmFsdWUpO1xuXG4gIC8vIGNvbnZlcnQgdGhlIHN0eWxlL2NsYXNzIG9iamVjdHMgdG8gc3RyaW5nc1xuICBpZiAoaXNPYmopIHtcbiAgICBpc09iaiA9ICFpc0NsYXNzQXR0ciAmJiAhaXNTdHlsZUF0dHI7XG4gICAgaWYgKGlzQ2xhc3NBdHRyKSB7XG4gICAgICB2YWx1ZSA9IHRtcGwoSlNPTi5zdHJpbmdpZnkodmFsdWUpLCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGlzU3R5bGVBdHRyKSB7XG4gICAgICB2YWx1ZSA9IHN0eWxlT2JqZWN0VG9TdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHJlbW92ZSBvcmlnaW5hbCBhdHRyaWJ1dGVcbiAgaWYgKGV4cHIuYXR0ciAmJiAoIWV4cHIuaXNBdHRyUmVtb3ZlZCB8fCAhaGFzVmFsdWUgfHwgdmFsdWUgPT09IGZhbHNlKSkge1xuICAgIHJlbUF0dHIoZG9tLCBleHByLmF0dHIpO1xuICAgIGV4cHIuaXNBdHRyUmVtb3ZlZCA9IHRydWU7XG4gIH1cblxuICAvLyBmb3IgdGhlIGJvb2xlYW4gYXR0cmlidXRlcyB3ZSBkb24ndCBuZWVkIHRoZSB2YWx1ZVxuICAvLyB3ZSBjYW4gY29udmVydCBpdCB0byBjaGVja2VkPXRydWUgdG8gY2hlY2tlZD1jaGVja2VkXG4gIGlmIChleHByLmJvb2wpIHsgdmFsdWUgPSB2YWx1ZSA/IGF0dHJOYW1lIDogZmFsc2U7IH1cbiAgaWYgKGV4cHIuaXNSdGFnKSB7IHJldHVybiB1cGRhdGVEYXRhSXMoZXhwciwgdGhpcywgdmFsdWUpIH1cbiAgaWYgKGV4cHIud2FzUGFyc2VkT25jZSAmJiBleHByLnZhbHVlID09PSB2YWx1ZSkgeyByZXR1cm4gfVxuXG4gIC8vIHVwZGF0ZSB0aGUgZXhwcmVzc2lvbiB2YWx1ZVxuICBleHByLnZhbHVlID0gdmFsdWU7XG4gIGV4cHIud2FzUGFyc2VkT25jZSA9IHRydWU7XG5cbiAgLy8gaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdCB3ZSBjYW4gbm90IGRvIG11Y2ggbW9yZSB3aXRoIGl0XG4gIGlmIChpc09iaiAmJiAhaXNUb2dnbGUpIHsgcmV0dXJuIH1cbiAgLy8gYXZvaWQgdG8gcmVuZGVyIHVuZGVmaW5lZC9udWxsIHZhbHVlc1xuICBpZiAoaXNCbGFuayh2YWx1ZSkpIHsgdmFsdWUgPSAnJzsgfVxuXG4gIC8vIHRleHRhcmVhIGFuZCB0ZXh0IG5vZGVzIGhhdmUgbm8gYXR0cmlidXRlIG5hbWVcbiAgaWYgKCFhdHRyTmFtZSkge1xuICAgIC8vIGFib3V0ICM4MTUgdy9vIHJlcGxhY2U6IHRoZSBicm93c2VyIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBhIHN0cmluZyxcbiAgICAvLyB0aGUgY29tcGFyaXNvbiBieSBcIj09XCIgZG9lcyB0b28sIGJ1dCBub3QgaW4gdGhlIHNlcnZlclxuICAgIHZhbHVlICs9ICcnO1xuICAgIC8vIHRlc3QgZm9yIHBhcmVudCBhdm9pZHMgZXJyb3Igd2l0aCBpbnZhbGlkIGFzc2lnbm1lbnQgdG8gbm9kZVZhbHVlXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgLy8gY2FjaGUgdGhlIHBhcmVudCBub2RlIGJlY2F1c2Ugc29tZWhvdyBpdCB3aWxsIGJlY29tZSBudWxsIG9uIElFXG4gICAgICAvLyBvbiB0aGUgbmV4dCBpdGVyYXRpb25cbiAgICAgIGV4cHIucGFyZW50ID0gcGFyZW50O1xuICAgICAgaWYgKHBhcmVudC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIHBhcmVudC52YWx1ZSA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgLy8gIzExMTNcbiAgICAgICAgaWYgKCFJRV9WRVJTSU9OKSB7IGRvbS5ub2RlVmFsdWUgPSB2YWx1ZTsgfSAgLy8gIzE2MjUgSUUgdGhyb3dzIGhlcmUsIG5vZGVWYWx1ZVxuICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBhdmFpbGFibGUgb24gJ3VwZGF0ZWQnXG4gICAgICBlbHNlIHsgZG9tLm5vZGVWYWx1ZSA9IHZhbHVlOyB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cblxuICAvLyBldmVudCBoYW5kbGVyXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHNldEV2ZW50SGFuZGxlcihhdHRyTmFtZSwgdmFsdWUsIGRvbSwgdGhpcyk7XG4gIC8vIHNob3cgLyBoaWRlXG4gIH0gZWxzZSBpZiAoaXNUb2dnbGUpIHtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KGRvbSwgYXR0ck5hbWUgPT09IEhJREVfRElSRUNUSVZFID8gIXZhbHVlIDogdmFsdWUpO1xuICAvLyBoYW5kbGUgYXR0cmlidXRlc1xuICB9IGVsc2Uge1xuICAgIGlmIChleHByLmJvb2wpIHtcbiAgICAgIGRvbVthdHRyTmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoYXR0ck5hbWUgPT09ICd2YWx1ZScgJiYgZG9tLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgZG9tLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGhhc1ZhbHVlICYmIHZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgc2V0QXR0cihkb20sIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgaW4gY2FzZSBvZiBzdHlsZSBjaGFuZ2VzXG4gICAgLy8gdGhlIGVsZW1lbnQgc3RheXMgaGlkZGVuXG4gICAgaWYgKGlzU3R5bGVBdHRyICYmIGRvbS5oaWRkZW4pIHsgdG9nZ2xlVmlzaWJpbGl0eShkb20sIGZhbHNlKTsgfVxuICB9XG59XG5cbi8qKlxuICogVXBkYXRlIGFsbCB0aGUgZXhwcmVzc2lvbnMgaW4gYSBUYWcgaW5zdGFuY2VcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIGV4cHJlc3Npb24gdGhhdCBtdXN0IGJlIHJlIGV2YWx1YXRlZFxuICovXG5mdW5jdGlvbiB1cGRhdGVBbGxFeHByZXNzaW9ucyhleHByZXNzaW9ucykge1xuICBlYWNoKGV4cHJlc3Npb25zLCB1cGRhdGVFeHByZXNzaW9uLmJpbmQodGhpcykpO1xufVxuXG52YXIgSWZFeHByID0ge1xuICBpbml0OiBmdW5jdGlvbiBpbml0KGRvbSwgdGFnLCBleHByKSB7XG4gICAgcmVtQXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSk7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5leHByID0gZXhwcjtcbiAgICB0aGlzLnN0dWIgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpO1xuICAgIHRoaXMucHJpc3RpbmUgPSBkb207XG5cbiAgICB2YXIgcCA9IGRvbS5wYXJlbnROb2RlO1xuICAgIHAuaW5zZXJ0QmVmb3JlKHRoaXMuc3R1YiwgZG9tKTtcbiAgICBwLnJlbW92ZUNoaWxkKGRvbSk7XG5cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB0aGlzLnZhbHVlID0gdG1wbCh0aGlzLmV4cHIsIHRoaXMudGFnKTtcblxuICAgIGlmICh0aGlzLnZhbHVlICYmICF0aGlzLmN1cnJlbnQpIHsgLy8gaW5zZXJ0XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnByaXN0aW5lLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIHRoaXMuc3R1Yi5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLmN1cnJlbnQsIHRoaXMuc3R1Yik7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zID0gW107XG4gICAgICBwYXJzZUV4cHJlc3Npb25zLmFwcGx5KHRoaXMudGFnLCBbdGhpcy5jdXJyZW50LCB0aGlzLmV4cHJlc3Npb25zLCB0cnVlXSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy52YWx1ZSAmJiB0aGlzLmN1cnJlbnQpIHsgLy8gcmVtb3ZlXG4gICAgICB1bm1vdW50QWxsKHRoaXMuZXhwcmVzc2lvbnMpO1xuICAgICAgaWYgKHRoaXMuY3VycmVudC5fdGFnKSB7XG4gICAgICAgIHRoaXMuY3VycmVudC5fdGFnLnVubW91bnQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudCA9IG51bGw7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zID0gW107XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmFsdWUpIHsgdXBkYXRlQWxsRXhwcmVzc2lvbnMuY2FsbCh0aGlzLnRhZywgdGhpcy5leHByZXNzaW9ucyk7IH1cbiAgfSxcbiAgdW5tb3VudDogZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICB1bm1vdW50QWxsKHRoaXMuZXhwcmVzc2lvbnMgfHwgW10pO1xuICB9XG59O1xuXG52YXIgUmVmRXhwciA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdChkb20sIHBhcmVudCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIHRoaXMuZG9tID0gZG9tO1xuICAgIHRoaXMuYXR0ciA9IGF0dHJOYW1lO1xuICAgIHRoaXMucmF3VmFsdWUgPSBhdHRyVmFsdWU7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5oYXNFeHAgPSB0bXBsLmhhc0V4cHIoYXR0clZhbHVlKTtcbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgb2xkID0gdGhpcy52YWx1ZTtcbiAgICB2YXIgY3VzdG9tUGFyZW50ID0gdGhpcy5wYXJlbnQgJiYgZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcbiAgICAvLyBpZiB0aGUgcmVmZXJlbmNlZCBlbGVtZW50IGlzIGEgY3VzdG9tIHRhZywgdGhlbiB3ZSBzZXQgdGhlIHRhZyBpdHNlbGYsIHJhdGhlciB0aGFuIERPTVxuICAgIHZhciB0YWdPckRvbSA9IHRoaXMuZG9tLl9fcmVmIHx8IHRoaXMudGFnIHx8IHRoaXMuZG9tO1xuXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuaGFzRXhwID8gdG1wbCh0aGlzLnJhd1ZhbHVlLCB0aGlzLnBhcmVudCkgOiB0aGlzLnJhd1ZhbHVlO1xuXG4gICAgLy8gdGhlIG5hbWUgY2hhbmdlZCwgc28gd2UgbmVlZCB0byByZW1vdmUgaXQgZnJvbSB0aGUgb2xkIGtleSAoaWYgcHJlc2VudClcbiAgICBpZiAoIWlzQmxhbmsob2xkKSAmJiBjdXN0b21QYXJlbnQpIHsgYXJyYXlpc2hSZW1vdmUoY3VzdG9tUGFyZW50LnJlZnMsIG9sZCwgdGFnT3JEb20pOyB9XG4gICAgaWYgKCFpc0JsYW5rKHRoaXMudmFsdWUpICYmIGlzU3RyaW5nKHRoaXMudmFsdWUpKSB7XG4gICAgICAvLyBhZGQgaXQgdG8gdGhlIHJlZnMgb2YgcGFyZW50IHRhZyAodGhpcyBiZWhhdmlvciB3YXMgY2hhbmdlZCA+PTMuMClcbiAgICAgIGlmIChjdXN0b21QYXJlbnQpIHsgYXJyYXlpc2hBZGQoXG4gICAgICAgIGN1c3RvbVBhcmVudC5yZWZzLFxuICAgICAgICB0aGlzLnZhbHVlLFxuICAgICAgICB0YWdPckRvbSxcbiAgICAgICAgLy8gdXNlIGFuIGFycmF5IGlmIGl0J3MgYSBsb29wZWQgbm9kZSBhbmQgdGhlIHJlZiBpcyBub3QgYW4gZXhwcmVzc2lvblxuICAgICAgICBudWxsLFxuICAgICAgICB0aGlzLnBhcmVudC5fXy5pbmRleFxuICAgICAgKTsgfVxuXG4gICAgICBpZiAodGhpcy52YWx1ZSAhPT0gb2xkKSB7XG4gICAgICAgIHNldEF0dHIodGhpcy5kb20sIHRoaXMuYXR0ciwgdGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbUF0dHIodGhpcy5kb20sIHRoaXMuYXR0cik7XG4gICAgfVxuXG4gICAgLy8gY2FjaGUgdGhlIHJlZiBib3VuZCB0byB0aGlzIGRvbSBub2RlXG4gICAgLy8gdG8gcmV1c2UgaXQgaW4gZnV0dXJlIChzZWUgYWxzbyAjMjMyOSlcbiAgICBpZiAoIXRoaXMuZG9tLl9fcmVmKSB7IHRoaXMuZG9tLl9fcmVmID0gdGFnT3JEb207IH1cbiAgfSxcbiAgdW5tb3VudDogZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICB2YXIgdGFnT3JEb20gPSB0aGlzLnRhZyB8fCB0aGlzLmRvbTtcbiAgICB2YXIgY3VzdG9tUGFyZW50ID0gdGhpcy5wYXJlbnQgJiYgZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcbiAgICBpZiAoIWlzQmxhbmsodGhpcy52YWx1ZSkgJiYgY3VzdG9tUGFyZW50KVxuICAgICAgeyBhcnJheWlzaFJlbW92ZShjdXN0b21QYXJlbnQucmVmcywgdGhpcy52YWx1ZSwgdGFnT3JEb20pOyB9XG4gIH1cbn07XG5cbi8qKlxuICogQ29udmVydCB0aGUgaXRlbSBsb29wZWQgaW50byBhbiBvYmplY3QgdXNlZCB0byBleHRlbmQgdGhlIGNoaWxkIHRhZyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGV4cHIgLSBvYmplY3QgY29udGFpbmluZyB0aGUga2V5cyB1c2VkIHRvIGV4dGVuZCB0aGUgY2hpbGRyZW4gdGFnc1xuICogQHBhcmFtICAgeyAqIH0ga2V5IC0gdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBuZXcgb2JqZWN0IHJldHVybmVkXG4gKiBAcGFyYW0gICB7ICogfSB2YWwgLSB2YWx1ZSBjb250YWluaW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gYmFzZSAtIHByb3RvdHlwZSBvYmplY3QgZm9yIHRoZSBuZXcgaXRlbVxuICogQHJldHVybnMgeyBPYmplY3QgfSAtIG5ldyBvYmplY3QgY29udGFpbmluZyB0aGUgdmFsdWVzIG9mIHRoZSBvcmlnaW5hbCBpdGVtXG4gKlxuICogVGhlIHZhcmlhYmxlcyAna2V5JyBhbmQgJ3ZhbCcgYXJlIGFyYml0cmFyeS5cbiAqIFRoZXkgZGVwZW5kIG9uIHRoZSBjb2xsZWN0aW9uIHR5cGUgbG9vcGVkIChBcnJheSwgT2JqZWN0KVxuICogYW5kIG9uIHRoZSBleHByZXNzaW9uIHVzZWQgb24gdGhlIGVhY2ggdGFnXG4gKlxuICovXG5mdW5jdGlvbiBta2l0ZW0oZXhwciwga2V5LCB2YWwsIGJhc2UpIHtcbiAgdmFyIGl0ZW0gPSBiYXNlID8gT2JqZWN0LmNyZWF0ZShiYXNlKSA6IHt9O1xuICBpdGVtW2V4cHIua2V5XSA9IGtleTtcbiAgaWYgKGV4cHIucG9zKSB7IGl0ZW1bZXhwci5wb3NdID0gdmFsOyB9XG4gIHJldHVybiBpdGVtXG59XG5cbi8qKlxuICogVW5tb3VudCB0aGUgcmVkdW5kYW50IHRhZ3NcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBpdGVtcyAtIGFycmF5IGNvbnRhaW5pbmcgdGhlIGN1cnJlbnQgaXRlbXMgdG8gbG9vcFxuICogQHBhcmFtICAgeyBBcnJheSB9IHRhZ3MgLSBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgY2hpbGRyZW4gdGFnc1xuICovXG5mdW5jdGlvbiB1bm1vdW50UmVkdW5kYW50KGl0ZW1zLCB0YWdzKSB7XG4gIHZhciBpID0gdGFncy5sZW5ndGgsXG4gICAgaiA9IGl0ZW1zLmxlbmd0aDtcblxuICB3aGlsZSAoaSA+IGopIHtcbiAgICBpLS07XG4gICAgcmVtb3ZlLmFwcGx5KHRhZ3NbaV0sIFt0YWdzLCBpXSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFJlbW92ZSBhIGNoaWxkIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gdGFncyAtIHRhZ3MgY29sbGVjdGlvblxuICogQHBhcmFtICAgeyBOdW1iZXIgfSBpIC0gaW5kZXggb2YgdGhlIHRhZyB0byByZW1vdmVcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKHRhZ3MsIGkpIHtcbiAgdGFncy5zcGxpY2UoaSwgMSk7XG4gIHRoaXMudW5tb3VudCgpO1xuICBhcnJheWlzaFJlbW92ZSh0aGlzLnBhcmVudCwgdGhpcywgdGhpcy5fXy50YWdOYW1lLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBNb3ZlIHRoZSBuZXN0ZWQgY3VzdG9tIHRhZ3MgaW4gbm9uIGN1c3RvbSBsb29wIHRhZ3NcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBOdW1iZXIgfSBpIC0gY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgbG9vcCB0YWdcbiAqL1xuZnVuY3Rpb24gbW92ZU5lc3RlZFRhZ3MoaSkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBlYWNoKE9iamVjdC5rZXlzKHRoaXMudGFncyksIGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gICAgbW92ZUNoaWxkVGFnLmFwcGx5KHRoaXMkMS50YWdzW3RhZ05hbWVdLCBbdGFnTmFtZSwgaV0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBNb3ZlIGEgY2hpbGQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gZG9tIG5vZGUgY29udGFpbmluZyBhbGwgdGhlIGxvb3AgY2hpbGRyZW5cbiAqIEBwYXJhbSAgIHsgVGFnIH0gbmV4dFRhZyAtIGluc3RhbmNlIG9mIHRoZSBuZXh0IHRhZyBwcmVjZWRpbmcgdGhlIG9uZSB3ZSB3YW50IHRvIG1vdmVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzVmlydHVhbCAtIGlzIGl0IGEgdmlydHVhbCB0YWc/XG4gKi9cbmZ1bmN0aW9uIG1vdmUocm9vdCwgbmV4dFRhZywgaXNWaXJ0dWFsKSB7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtb3ZlVmlydHVhbC5hcHBseSh0aGlzLCBbcm9vdCwgbmV4dFRhZ10pOyB9XG4gIGVsc2VcbiAgICB7IHNhZmVJbnNlcnQocm9vdCwgdGhpcy5yb290LCBuZXh0VGFnLnJvb3QpOyB9XG59XG5cbi8qKlxuICogSW5zZXJ0IGFuZCBtb3VudCBhIGNoaWxkIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGRvbSBub2RlIGNvbnRhaW5pbmcgYWxsIHRoZSBsb29wIGNoaWxkcmVuXG4gKiBAcGFyYW0gICB7IFRhZyB9IG5leHRUYWcgLSBpbnN0YW5jZSBvZiB0aGUgbmV4dCB0YWcgcHJlY2VkaW5nIHRoZSBvbmUgd2Ugd2FudCB0byBpbnNlcnRcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzVmlydHVhbCAtIGlzIGl0IGEgdmlydHVhbCB0YWc/XG4gKi9cbmZ1bmN0aW9uIGluc2VydChyb290LCBuZXh0VGFnLCBpc1ZpcnR1YWwpIHtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1ha2VWaXJ0dWFsLmFwcGx5KHRoaXMsIFtyb290LCBuZXh0VGFnXSk7IH1cbiAgZWxzZVxuICAgIHsgc2FmZUluc2VydChyb290LCB0aGlzLnJvb3QsIG5leHRUYWcucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBBcHBlbmQgYSBuZXcgdGFnIGludG8gdGhlIERPTVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGRvbSBub2RlIGNvbnRhaW5pbmcgYWxsIHRoZSBsb29wIGNoaWxkcmVuXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBhcHBlbmQocm9vdCwgaXNWaXJ0dWFsKSB7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtYWtlVmlydHVhbC5jYWxsKHRoaXMsIHJvb3QpOyB9XG4gIGVsc2VcbiAgICB7IHJvb3QuYXBwZW5kQ2hpbGQodGhpcy5yb290KTsgfVxufVxuXG4vKipcbiAqIE1hbmFnZSB0YWdzIGhhdmluZyB0aGUgJ2VhY2gnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBsb29wXG4gKiBAcGFyYW0gICB7IFRhZyB9IHBhcmVudCAtIHBhcmVudCB0YWcgaW5zdGFuY2Ugd2hlcmUgdGhlIGRvbSBub2RlIGlzIGNvbnRhaW5lZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBleHByIC0gc3RyaW5nIGNvbnRhaW5lZCBpbiB0aGUgJ2VhY2gnIGF0dHJpYnV0ZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBleHByZXNzaW9uIG9iamVjdCBmb3IgdGhpcyBlYWNoIGxvb3BcbiAqL1xuZnVuY3Rpb24gX2VhY2goZG9tLCBwYXJlbnQsIGV4cHIpIHtcblxuICAvLyByZW1vdmUgdGhlIGVhY2ggcHJvcGVydHkgZnJvbSB0aGUgb3JpZ2luYWwgdGFnXG4gIHJlbUF0dHIoZG9tLCBMT09QX0RJUkVDVElWRSk7XG5cbiAgdmFyIG11c3RSZW9yZGVyID0gdHlwZW9mIGdldEF0dHIoZG9tLCBMT09QX05PX1JFT1JERVJfRElSRUNUSVZFKSAhPT0gVF9TVFJJTkcgfHwgcmVtQXR0cihkb20sIExPT1BfTk9fUkVPUkRFUl9ESVJFQ1RJVkUpLFxuICAgIHRhZ05hbWUgPSBnZXRUYWdOYW1lKGRvbSksXG4gICAgaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV0sXG4gICAgcGFyZW50Tm9kZSA9IGRvbS5wYXJlbnROb2RlLFxuICAgIHBsYWNlaG9sZGVyID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSxcbiAgICBjaGlsZCA9IGdldFRhZyhkb20pLFxuICAgIGlmRXhwciA9IGdldEF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpLFxuICAgIHRhZ3MgPSBbXSxcbiAgICBvbGRJdGVtcyA9IFtdLFxuICAgIGhhc0tleXMsXG4gICAgaXNMb29wID0gdHJ1ZSxcbiAgICBpc0Fub255bW91cyA9ICFfX1RBR19JTVBMW3RhZ05hbWVdLFxuICAgIGlzVmlydHVhbCA9IGRvbS50YWdOYW1lID09PSAnVklSVFVBTCc7XG5cbiAgLy8gcGFyc2UgdGhlIGVhY2ggZXhwcmVzc2lvblxuICBleHByID0gdG1wbC5sb29wS2V5cyhleHByKTtcbiAgZXhwci5pc0xvb3AgPSB0cnVlO1xuXG4gIGlmIChpZkV4cHIpIHsgcmVtQXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSk7IH1cblxuICAvLyBpbnNlcnQgYSBtYXJrZWQgd2hlcmUgdGhlIGxvb3AgdGFncyB3aWxsIGJlIGluamVjdGVkXG4gIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCBkb20pO1xuICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvbSk7XG5cbiAgZXhwci51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGVFYWNoKCkge1xuICAgIC8vIGdldCB0aGUgbmV3IGl0ZW1zIGNvbGxlY3Rpb25cbiAgICBleHByLnZhbHVlID0gdG1wbChleHByLnZhbCwgcGFyZW50KTtcblxuICAgIHZhciBmcmFnID0gY3JlYXRlRnJhZygpLFxuICAgICAgaXRlbXMgPSBleHByLnZhbHVlLFxuICAgICAgaXNPYmplY3QkJDEgPSAhaXNBcnJheShpdGVtcykgJiYgIWlzU3RyaW5nKGl0ZW1zKSxcbiAgICAgIHJvb3QgPSBwbGFjZWhvbGRlci5wYXJlbnROb2RlO1xuXG4gICAgLy8gaWYgdGhpcyBET00gd2FzIHJlbW92ZWQgdGhlIHVwZGF0ZSBoZXJlIGlzIHVzZWxlc3NcbiAgICAvLyB0aGlzIGNvbmRpdGlvbiBmaXhlcyBhbHNvIGEgd2VpcmQgYXN5bmMgaXNzdWUgb24gSUUgaW4gb3VyIHVuaXQgdGVzdFxuICAgIGlmICghcm9vdCkgeyByZXR1cm4gfVxuXG4gICAgLy8gb2JqZWN0IGxvb3AuIGFueSBjaGFuZ2VzIGNhdXNlIGZ1bGwgcmVkcmF3XG4gICAgaWYgKGlzT2JqZWN0JCQxKSB7XG4gICAgICBoYXNLZXlzID0gaXRlbXMgfHwgZmFsc2U7XG4gICAgICBpdGVtcyA9IGhhc0tleXMgP1xuICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gbWtpdGVtKGV4cHIsIGl0ZW1zW2tleV0sIGtleSlcbiAgICAgICAgfSkgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFzS2V5cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpZkV4cHIpIHtcbiAgICAgIGl0ZW1zID0gaXRlbXMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgaWYgKGV4cHIua2V5ICYmICFpc09iamVjdCQkMSlcbiAgICAgICAgICB7IHJldHVybiAhIXRtcGwoaWZFeHByLCBta2l0ZW0oZXhwciwgaXRlbSwgaSwgcGFyZW50KSkgfVxuXG4gICAgICAgIHJldHVybiAhIXRtcGwoaWZFeHByLCBleHRlbmQoT2JqZWN0LmNyZWF0ZShwYXJlbnQpLCBpdGVtKSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxvb3AgYWxsIHRoZSBuZXcgaXRlbXNcbiAgICBlYWNoKGl0ZW1zLCBmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAvLyByZW9yZGVyIG9ubHkgaWYgdGhlIGl0ZW1zIGFyZSBvYmplY3RzXG4gICAgICB2YXJcbiAgICAgICAgZG9SZW9yZGVyID0gbXVzdFJlb3JkZXIgJiYgdHlwZW9mIGl0ZW0gPT09IFRfT0JKRUNUICYmICFoYXNLZXlzLFxuICAgICAgICBvbGRQb3MgPSBvbGRJdGVtcy5pbmRleE9mKGl0ZW0pLFxuICAgICAgICBpc05ldyA9IG9sZFBvcyA9PT0gLTEsXG4gICAgICAgIHBvcyA9ICFpc05ldyAmJiBkb1Jlb3JkZXIgPyBvbGRQb3MgOiBpLFxuICAgICAgICAvLyBkb2VzIGEgdGFnIGV4aXN0IGluIHRoaXMgcG9zaXRpb24/XG4gICAgICAgIHRhZyA9IHRhZ3NbcG9zXSxcbiAgICAgICAgbXVzdEFwcGVuZCA9IGkgPj0gb2xkSXRlbXMubGVuZ3RoLFxuICAgICAgICBtdXN0Q3JlYXRlID0gIGRvUmVvcmRlciAmJiBpc05ldyB8fCAhZG9SZW9yZGVyICYmICF0YWc7XG5cbiAgICAgIGl0ZW0gPSAhaGFzS2V5cyAmJiBleHByLmtleSA/IG1raXRlbShleHByLCBpdGVtLCBpKSA6IGl0ZW07XG5cbiAgICAgIC8vIG5ldyB0YWdcbiAgICAgIGlmIChtdXN0Q3JlYXRlKSB7XG4gICAgICAgIHRhZyA9IG5ldyBUYWckMShpbXBsLCB7XG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgaXNMb29wOiBpc0xvb3AsXG4gICAgICAgICAgaXNBbm9ueW1vdXM6IGlzQW5vbnltb3VzLFxuICAgICAgICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgICAgICAgcm9vdDogZG9tLmNsb25lTm9kZShpc0Fub255bW91cyksXG4gICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgfSwgZG9tLmlubmVySFRNTCk7XG5cbiAgICAgICAgLy8gbW91bnQgdGhlIHRhZ1xuICAgICAgICB0YWcubW91bnQoKTtcblxuICAgICAgICBpZiAobXVzdEFwcGVuZClcbiAgICAgICAgICB7IGFwcGVuZC5hcHBseSh0YWcsIFtmcmFnIHx8IHJvb3QsIGlzVmlydHVhbF0pOyB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB7IGluc2VydC5hcHBseSh0YWcsIFtyb290LCB0YWdzW2ldLCBpc1ZpcnR1YWxdKTsgfVxuXG4gICAgICAgIGlmICghbXVzdEFwcGVuZCkgeyBvbGRJdGVtcy5zcGxpY2UoaSwgMCwgaXRlbSk7IH1cbiAgICAgICAgdGFncy5zcGxpY2UoaSwgMCwgdGFnKTtcbiAgICAgICAgaWYgKGNoaWxkKSB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0YWcsIHRydWUpOyB9XG4gICAgICB9IGVsc2UgaWYgKHBvcyAhPT0gaSAmJiBkb1Jlb3JkZXIpIHtcbiAgICAgICAgLy8gbW92ZVxuICAgICAgICBpZiAoY29udGFpbnMoaXRlbXMsIG9sZEl0ZW1zW3Bvc10pKSB7XG4gICAgICAgICAgbW92ZS5hcHBseSh0YWcsIFtyb290LCB0YWdzW2ldLCBpc1ZpcnR1YWxdKTtcbiAgICAgICAgICAvLyBtb3ZlIHRoZSBvbGQgdGFnIGluc3RhbmNlXG4gICAgICAgICAgdGFncy5zcGxpY2UoaSwgMCwgdGFncy5zcGxpY2UocG9zLCAxKVswXSk7XG4gICAgICAgICAgLy8gbW92ZSB0aGUgb2xkIGl0ZW1cbiAgICAgICAgICBvbGRJdGVtcy5zcGxpY2UoaSwgMCwgb2xkSXRlbXMuc3BsaWNlKHBvcywgMSlbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwb3NpdGlvbiBhdHRyaWJ1dGUgaWYgaXQgZXhpc3RzXG4gICAgICAgIGlmIChleHByLnBvcykgeyB0YWdbZXhwci5wb3NdID0gaTsgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBsb29wIHRhZ3MgYXJlIG5vdCBjdXN0b21cbiAgICAgICAgLy8gd2UgbmVlZCB0byBtb3ZlIGFsbCB0aGVpciBjdXN0b20gdGFncyBpbnRvIHRoZSByaWdodCBwb3NpdGlvblxuICAgICAgICBpZiAoIWNoaWxkICYmIHRhZy50YWdzKSB7IG1vdmVOZXN0ZWRUYWdzLmNhbGwodGFnLCBpKTsgfVxuICAgICAgfVxuXG4gICAgICAvLyBjYWNoZSB0aGUgb3JpZ2luYWwgaXRlbSB0byB1c2UgaXQgaW4gdGhlIGV2ZW50cyBib3VuZCB0byB0aGlzIG5vZGVcbiAgICAgIC8vIGFuZCBpdHMgY2hpbGRyZW5cbiAgICAgIHRhZy5fXy5pdGVtID0gaXRlbTtcbiAgICAgIHRhZy5fXy5pbmRleCA9IGk7XG4gICAgICB0YWcuX18ucGFyZW50ID0gcGFyZW50O1xuXG4gICAgICBpZiAoIW11c3RDcmVhdGUpIHsgdGFnLnVwZGF0ZShpdGVtKTsgfVxuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSByZWR1bmRhbnQgdGFnc1xuICAgIHVubW91bnRSZWR1bmRhbnQoaXRlbXMsIHRhZ3MpO1xuXG4gICAgLy8gY2xvbmUgdGhlIGl0ZW1zIGFycmF5XG4gICAgb2xkSXRlbXMgPSBpdGVtcy5zbGljZSgpO1xuXG4gICAgLy8gdGhpcyBjb25kaXRpb24gaXMgd2VpcmQgdVxuICAgIHJvb3QuaW5zZXJ0QmVmb3JlKGZyYWcsIHBsYWNlaG9sZGVyKTtcbiAgfTtcblxuICBleHByLnVubW91bnQgPSBmdW5jdGlvbigpIHtcbiAgICBlYWNoKHRhZ3MsIGZ1bmN0aW9uKHQpIHsgdC51bm1vdW50KCk7IH0pO1xuICB9O1xuXG4gIHJldHVybiBleHByXG59XG5cbi8qKlxuICogV2FsayB0aGUgdGFnIERPTSB0byBkZXRlY3QgdGhlIGV4cHJlc3Npb25zIHRvIGV2YWx1YXRlXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gcm9vdCB0YWcgd2hlcmUgd2Ugd2lsbCBzdGFydCBkaWdnaW5nIHRoZSBleHByZXNzaW9uc1xuICogQHBhcmFtICAgeyBBcnJheSB9IGV4cHJlc3Npb25zIC0gZW1wdHkgYXJyYXkgd2hlcmUgdGhlIGV4cHJlc3Npb25zIHdpbGwgYmUgYWRkZWRcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IG11c3RJbmNsdWRlUm9vdCAtIGZsYWcgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIHJvb3QgbXVzdCBiZSBwYXJzZWQgYXMgd2VsbFxuICogQHJldHVybnMgeyBPYmplY3QgfSBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgcm9vdCBub29kZSBhbmQgdGhlIGRvbSB0cmVlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbnMocm9vdCwgZXhwcmVzc2lvbnMsIG11c3RJbmNsdWRlUm9vdCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgdHJlZSA9IHtwYXJlbnQ6IHtjaGlsZHJlbjogZXhwcmVzc2lvbnN9fTtcblxuICB3YWxrTm9kZXMocm9vdCwgZnVuY3Rpb24gKGRvbSwgY3R4KSB7XG4gICAgdmFyIHR5cGUgPSBkb20ubm9kZVR5cGUsIHBhcmVudCA9IGN0eC5wYXJlbnQsIGF0dHIsIGV4cHIsIHRhZ0ltcGw7XG4gICAgaWYgKCFtdXN0SW5jbHVkZVJvb3QgJiYgZG9tID09PSByb290KSB7IHJldHVybiB7cGFyZW50OiBwYXJlbnR9IH1cblxuICAgIC8vIHRleHQgbm9kZVxuICAgIGlmICh0eXBlID09PSAzICYmIGRvbS5wYXJlbnROb2RlLnRhZ05hbWUgIT09ICdTVFlMRScgJiYgdG1wbC5oYXNFeHByKGRvbS5ub2RlVmFsdWUpKVxuICAgICAgeyBwYXJlbnQuY2hpbGRyZW4ucHVzaCh7ZG9tOiBkb20sIGV4cHI6IGRvbS5ub2RlVmFsdWV9KTsgfVxuXG4gICAgaWYgKHR5cGUgIT09IDEpIHsgcmV0dXJuIGN0eCB9IC8vIG5vdCBhbiBlbGVtZW50XG5cbiAgICB2YXIgaXNWaXJ0dWFsID0gZG9tLnRhZ05hbWUgPT09ICdWSVJUVUFMJztcblxuICAgIC8vIGxvb3AuIGVhY2ggZG9lcyBpdCdzIG93biB0aGluZyAoZm9yIG5vdylcbiAgICBpZiAoYXR0ciA9IGdldEF0dHIoZG9tLCBMT09QX0RJUkVDVElWRSkpIHtcbiAgICAgIGlmKGlzVmlydHVhbCkgeyBzZXRBdHRyKGRvbSwgJ2xvb3BWaXJ0dWFsJywgdHJ1ZSk7IH0gLy8gaWdub3JlIGhlcmUsIGhhbmRsZWQgaW4gX2VhY2hcbiAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKF9lYWNoKGRvbSwgdGhpcyQxLCBhdHRyKSk7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBpZi1hdHRycyBiZWNvbWUgdGhlIG5ldyBwYXJlbnQuIEFueSBmb2xsb3dpbmcgZXhwcmVzc2lvbnMgKGVpdGhlciBvbiB0aGUgY3VycmVudFxuICAgIC8vIGVsZW1lbnQsIG9yIGJlbG93IGl0KSBiZWNvbWUgY2hpbGRyZW4gb2YgdGhpcyBleHByZXNzaW9uLlxuICAgIGlmIChhdHRyID0gZ2V0QXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSkpIHtcbiAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKE9iamVjdC5jcmVhdGUoSWZFeHByKS5pbml0KGRvbSwgdGhpcyQxLCBhdHRyKSk7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoZXhwciA9IGdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpKSB7XG4gICAgICBpZiAodG1wbC5oYXNFeHByKGV4cHIpKSB7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHtpc1J0YWc6IHRydWUsIGV4cHI6IGV4cHIsIGRvbTogZG9tLCBhdHRyczogW10uc2xpY2UuY2FsbChkb20uYXR0cmlidXRlcyl9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhpcyBpcyBhIHRhZywgc3RvcCB0cmF2ZXJzaW5nIGhlcmUuXG4gICAgLy8gd2UgaWdub3JlIHRoZSByb290LCBzaW5jZSBwYXJzZUV4cHJlc3Npb25zIGlzIGNhbGxlZCB3aGlsZSB3ZSdyZSBtb3VudGluZyB0aGF0IHJvb3RcbiAgICB0YWdJbXBsID0gZ2V0VGFnKGRvbSk7XG4gICAgaWYoaXNWaXJ0dWFsKSB7XG4gICAgICBpZihnZXRBdHRyKGRvbSwgJ3ZpcnR1YWxpemVkJykpIHtkb20ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkb20pOyB9IC8vIHRhZyBjcmVhdGVkLCByZW1vdmUgZnJvbSBkb21cbiAgICAgIGlmKCF0YWdJbXBsICYmICFnZXRBdHRyKGRvbSwgJ3ZpcnR1YWxpemVkJykgJiYgIWdldEF0dHIoZG9tLCAnbG9vcFZpcnR1YWwnKSkgIC8vIG9rIHRvIGNyZWF0ZSB2aXJ0dWFsIHRhZ1xuICAgICAgICB7IHRhZ0ltcGwgPSB7IHRtcGw6IGRvbS5vdXRlckhUTUwgfTsgfVxuICAgIH1cblxuICAgIGlmICh0YWdJbXBsICYmIChkb20gIT09IHJvb3QgfHwgbXVzdEluY2x1ZGVSb290KSkge1xuICAgICAgaWYoaXNWaXJ0dWFsICYmICFnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKSkgeyAvLyBoYW5kbGVkIGluIHVwZGF0ZVxuICAgICAgICAvLyBjYW4gbm90IHJlbW92ZSBhdHRyaWJ1dGUgbGlrZSBkaXJlY3RpdmVzXG4gICAgICAgIC8vIHNvIGZsYWcgZm9yIHJlbW92YWwgYWZ0ZXIgY3JlYXRpb24gdG8gcHJldmVudCBtYXhpbXVtIHN0YWNrIGVycm9yXG4gICAgICAgIHNldEF0dHIoZG9tLCAndmlydHVhbGl6ZWQnLCB0cnVlKTtcblxuICAgICAgICB2YXIgdGFnID0gbmV3IFRhZyQxKHsgdG1wbDogZG9tLm91dGVySFRNTCB9LFxuICAgICAgICAgIHtyb290OiBkb20sIHBhcmVudDogdGhpcyQxfSxcbiAgICAgICAgICBkb20uaW5uZXJIVE1MKTtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2godGFnKTsgLy8gbm8gcmV0dXJuLCBhbm9ueW1vdXMgdGFnLCBrZWVwIHBhcnNpbmdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjb25mID0ge3Jvb3Q6IGRvbSwgcGFyZW50OiB0aGlzJDEsIGhhc0ltcGw6IHRydWV9O1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChpbml0Q2hpbGRUYWcodGFnSW1wbCwgY29uZiwgZG9tLmlubmVySFRNTCwgdGhpcyQxKSk7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGF0dHJpYnV0ZSBleHByZXNzaW9uc1xuICAgIHBhcnNlQXR0cmlidXRlcy5hcHBseSh0aGlzJDEsIFtkb20sIGRvbS5hdHRyaWJ1dGVzLCBmdW5jdGlvbihhdHRyLCBleHByKSB7XG4gICAgICBpZiAoIWV4cHIpIHsgcmV0dXJuIH1cbiAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGV4cHIpO1xuICAgIH1dKTtcblxuICAgIC8vIHdoYXRldmVyIHRoZSBwYXJlbnQgaXMsIGFsbCBjaGlsZCBlbGVtZW50cyBnZXQgdGhlIHNhbWUgcGFyZW50LlxuICAgIC8vIElmIHRoaXMgZWxlbWVudCBoYWQgYW4gaWYtYXR0ciwgdGhhdCdzIHRoZSBwYXJlbnQgZm9yIGFsbCBjaGlsZCBlbGVtZW50c1xuICAgIHJldHVybiB7cGFyZW50OiBwYXJlbnR9XG4gIH0sIHRyZWUpO1xufVxuXG4vKipcbiAqIENhbGxzIGBmbmAgZm9yIGV2ZXJ5IGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50LiBJZiB0aGF0IGF0dHIgaGFzIGFuIGV4cHJlc3Npb24sXG4gKiBpdCBpcyBhbHNvIHBhc3NlZCB0byBmbi5cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIGRvbSBub2RlIHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gYXR0cnMgLSBhcnJheSBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayB0byBleGVjIG9uIGFueSBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGVzKGRvbSwgYXR0cnMsIGZuKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goYXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgaWYgKCFhdHRyKSB7IHJldHVybiBmYWxzZSB9XG5cbiAgICB2YXIgbmFtZSA9IGF0dHIubmFtZSwgYm9vbCA9IGlzQm9vbEF0dHIobmFtZSksIGV4cHI7XG5cbiAgICBpZiAoY29udGFpbnMoUkVGX0RJUkVDVElWRVMsIG5hbWUpKSB7XG4gICAgICBleHByID0gIE9iamVjdC5jcmVhdGUoUmVmRXhwcikuaW5pdChkb20sIHRoaXMkMSwgbmFtZSwgYXR0ci52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0bXBsLmhhc0V4cHIoYXR0ci52YWx1ZSkpIHtcbiAgICAgIGV4cHIgPSB7ZG9tOiBkb20sIGV4cHI6IGF0dHIudmFsdWUsIGF0dHI6IG5hbWUsIGJvb2w6IGJvb2x9O1xuICAgIH1cblxuICAgIGZuKGF0dHIsIGV4cHIpO1xuICB9KTtcbn1cblxuLypcbiAgSW5jbHVkZXMgaGFja3MgbmVlZGVkIGZvciB0aGUgSW50ZXJuZXQgRXhwbG9yZXIgdmVyc2lvbiA5IGFuZCBiZWxvd1xuICBTZWU6IGh0dHA6Ly9rYW5nYXguZ2l0aHViLmlvL2NvbXBhdC10YWJsZS9lczUvI2llOFxuICAgICAgIGh0dHA6Ly9jb2RlcGxhbmV0LmlvL2Ryb3BwaW5nLWllOC9cbiovXG5cbnZhciByZUhhc1lpZWxkICA9IC88eWllbGRcXGIvaTtcbnZhciByZVlpZWxkQWxsICA9IC88eWllbGRcXHMqKD86XFwvPnw+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj58PikvaWc7XG52YXIgcmVZaWVsZFNyYyAgPSAvPHlpZWxkXFxzK3RvPVsnXCJdKFteJ1wiPl0qKVsnXCJdXFxzKj4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPi9pZztcbnZhciByZVlpZWxkRGVzdCA9IC88eWllbGRcXHMrZnJvbT1bJ1wiXT8oWy1cXHddKylbJ1wiXT9cXHMqKD86XFwvPnw+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj4pL2lnO1xudmFyIHJvb3RFbHMgPSB7IHRyOiAndGJvZHknLCB0aDogJ3RyJywgdGQ6ICd0cicsIGNvbDogJ2NvbGdyb3VwJyB9O1xudmFyIHRibFRhZ3MgPSBJRV9WRVJTSU9OICYmIElFX1ZFUlNJT04gPCAxMCA/IFJFX1NQRUNJQUxfVEFHUyA6IFJFX1NQRUNJQUxfVEFHU19OT19PUFRJT047XG52YXIgR0VORVJJQyA9ICdkaXYnO1xudmFyIFNWRyA9ICdzdmcnO1xuXG5cbi8qXG4gIENyZWF0ZXMgdGhlIHJvb3QgZWxlbWVudCBmb3IgdGFibGUgb3Igc2VsZWN0IGNoaWxkIGVsZW1lbnRzOlxuICB0ci90aC90ZC90aGVhZC90Zm9vdC90Ym9keS9jYXB0aW9uL2NvbC9jb2xncm91cC9vcHRpb24vb3B0Z3JvdXBcbiovXG5mdW5jdGlvbiBzcGVjaWFsVGFncyhlbCwgdG1wbCwgdGFnTmFtZSkge1xuXG4gIHZhclxuICAgIHNlbGVjdCA9IHRhZ05hbWVbMF0gPT09ICdvJyxcbiAgICBwYXJlbnQgPSBzZWxlY3QgPyAnc2VsZWN0PicgOiAndGFibGU+JztcblxuICAvLyB0cmltKCkgaXMgaW1wb3J0YW50IGhlcmUsIHRoaXMgZW5zdXJlcyB3ZSBkb24ndCBoYXZlIGFydGlmYWN0cyxcbiAgLy8gc28gd2UgY2FuIGNoZWNrIGlmIHdlIGhhdmUgb25seSBvbmUgZWxlbWVudCBpbnNpZGUgdGhlIHBhcmVudFxuICBlbC5pbm5lckhUTUwgPSAnPCcgKyBwYXJlbnQgKyB0bXBsLnRyaW0oKSArICc8LycgKyBwYXJlbnQ7XG4gIHBhcmVudCA9IGVsLmZpcnN0Q2hpbGQ7XG5cbiAgLy8gcmV0dXJucyB0aGUgaW1tZWRpYXRlIHBhcmVudCBpZiB0ci90aC90ZC9jb2wgaXMgdGhlIG9ubHkgZWxlbWVudCwgaWYgbm90XG4gIC8vIHJldHVybnMgdGhlIHdob2xlIHRyZWUsIGFzIHRoaXMgY2FuIGluY2x1ZGUgYWRkaXRpb25hbCBlbGVtZW50c1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoc2VsZWN0KSB7XG4gICAgcGFyZW50LnNlbGVjdGVkSW5kZXggPSAtMTsgIC8vIGZvciBJRTksIGNvbXBhdGlibGUgdy9jdXJyZW50IHJpb3QgYmVoYXZpb3JcbiAgfSBlbHNlIHtcbiAgICAvLyBhdm9pZHMgaW5zZXJ0aW9uIG9mIGNvaW50YWluZXIgaW5zaWRlIGNvbnRhaW5lciAoZXg6IHRib2R5IGluc2lkZSB0Ym9keSlcbiAgICB2YXIgdG5hbWUgPSByb290RWxzW3RhZ05hbWVdO1xuICAgIGlmICh0bmFtZSAmJiBwYXJlbnQuY2hpbGRFbGVtZW50Q291bnQgPT09IDEpIHsgcGFyZW50ID0gJCh0bmFtZSwgcGFyZW50KTsgfVxuICB9XG4gIHJldHVybiBwYXJlbnRcbn1cblxuLypcbiAgUmVwbGFjZSB0aGUgeWllbGQgdGFnIGZyb20gYW55IHRhZyB0ZW1wbGF0ZSB3aXRoIHRoZSBpbm5lckhUTUwgb2YgdGhlXG4gIG9yaWdpbmFsIHRhZyBpbiB0aGUgcGFnZVxuKi9cbmZ1bmN0aW9uIHJlcGxhY2VZaWVsZCh0bXBsLCBodG1sKSB7XG4gIC8vIGRvIG5vdGhpbmcgaWYgbm8geWllbGRcbiAgaWYgKCFyZUhhc1lpZWxkLnRlc3QodG1wbCkpIHsgcmV0dXJuIHRtcGwgfVxuXG4gIC8vIGJlIGNhcmVmdWwgd2l0aCAjMTM0MyAtIHN0cmluZyBvbiB0aGUgc291cmNlIGhhdmluZyBgJDFgXG4gIHZhciBzcmMgPSB7fTtcblxuICBodG1sID0gaHRtbCAmJiBodG1sLnJlcGxhY2UocmVZaWVsZFNyYywgZnVuY3Rpb24gKF8sIHJlZiwgdGV4dCkge1xuICAgIHNyY1tyZWZdID0gc3JjW3JlZl0gfHwgdGV4dDsgICAvLyBwcmVzZXJ2ZSBmaXJzdCBkZWZpbml0aW9uXG4gICAgcmV0dXJuICcnXG4gIH0pLnRyaW0oKTtcblxuICByZXR1cm4gdG1wbFxuICAgIC5yZXBsYWNlKHJlWWllbGREZXN0LCBmdW5jdGlvbiAoXywgcmVmLCBkZWYpIHsgIC8vIHlpZWxkIHdpdGggZnJvbSAtIHRvIGF0dHJzXG4gICAgICByZXR1cm4gc3JjW3JlZl0gfHwgZGVmIHx8ICcnXG4gICAgfSlcbiAgICAucmVwbGFjZShyZVlpZWxkQWxsLCBmdW5jdGlvbiAoXywgZGVmKSB7ICAgICAgICAvLyB5aWVsZCB3aXRob3V0IGFueSBcImZyb21cIlxuICAgICAgcmV0dXJuIGh0bWwgfHwgZGVmIHx8ICcnXG4gICAgfSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgdG8gd3JhcCB0aGUgZ2l2ZW4gY29udGVudC4gTm9ybWFsbHkgYW4gYERJVmAsIGJ1dCBjYW4gYmVcbiAqIGFsc28gYSBgVEFCTEVgLCBgU0VMRUNUYCwgYFRCT0RZYCwgYFRSYCwgb3IgYENPTEdST1VQYCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdG1wbCAgLSBUaGUgdGVtcGxhdGUgY29taW5nIGZyb20gdGhlIGN1c3RvbSB0YWcgZGVmaW5pdGlvblxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBodG1sIC0gSFRNTCBjb250ZW50IHRoYXQgY29tZXMgZnJvbSB0aGUgRE9NIGVsZW1lbnQgd2hlcmUgeW91XG4gKiAgICAgICAgICAgd2lsbCBtb3VudCB0aGUgdGFnLCBtb3N0bHkgdGhlIG9yaWdpbmFsIHRhZyBpbiB0aGUgcGFnZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNTdmcgLSB0cnVlIGlmIHRoZSByb290IG5vZGUgaXMgYW4gc3ZnXG4gKiBAcmV0dXJucyB7IEhUTUxFbGVtZW50IH0gRE9NIGVsZW1lbnQgd2l0aCBfdG1wbF8gbWVyZ2VkIHRocm91Z2ggYFlJRUxEYCB3aXRoIHRoZSBfaHRtbF8uXG4gKi9cbmZ1bmN0aW9uIG1rZG9tKHRtcGwsIGh0bWwsIGlzU3ZnJCQxKSB7XG4gIHZhciBtYXRjaCAgID0gdG1wbCAmJiB0bXBsLm1hdGNoKC9eXFxzKjwoWy1cXHddKykvKSxcbiAgICB0YWdOYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSxcbiAgICBlbCA9IG1rRWwoaXNTdmckJDEgPyBTVkcgOiBHRU5FUklDKTtcblxuICAvLyByZXBsYWNlIGFsbCB0aGUgeWllbGQgdGFncyB3aXRoIHRoZSB0YWcgaW5uZXIgaHRtbFxuICB0bXBsID0gcmVwbGFjZVlpZWxkKHRtcGwsIGh0bWwpO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0YmxUYWdzLnRlc3QodGFnTmFtZSkpXG4gICAgeyBlbCA9IHNwZWNpYWxUYWdzKGVsLCB0bXBsLCB0YWdOYW1lKTsgfVxuICBlbHNlXG4gICAgeyBzZXRJbm5lckhUTUwoZWwsIHRtcGwpOyB9XG5cbiAgcmV0dXJuIGVsXG59XG5cbi8qKlxuICogQW5vdGhlciB3YXkgdG8gY3JlYXRlIGEgcmlvdCB0YWcgYSBiaXQgbW9yZSBlczYgZnJpZW5kbHlcbiAqIEBwYXJhbSB7IEhUTUxFbGVtZW50IH0gZWwgLSB0YWcgRE9NIHNlbGVjdG9yIG9yIERPTSBub2RlL3NcbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9wdHMgLSB0YWcgbG9naWNcbiAqIEByZXR1cm5zIHsgVGFnIH0gbmV3IHJpb3QgdGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIFRhZyQyKGVsLCBvcHRzKSB7XG4gIC8vIGdldCB0aGUgdGFnIHByb3BlcnRpZXMgZnJvbSB0aGUgY2xhc3MgY29uc3RydWN0b3JcbiAgdmFyIHJlZiA9IHRoaXM7XG4gIHZhciBuYW1lID0gcmVmLm5hbWU7XG4gIHZhciB0bXBsID0gcmVmLnRtcGw7XG4gIHZhciBjc3MgPSByZWYuY3NzO1xuICB2YXIgYXR0cnMgPSByZWYuYXR0cnM7XG4gIHZhciBvbkNyZWF0ZSA9IHJlZi5vbkNyZWF0ZTtcbiAgLy8gcmVnaXN0ZXIgYSBuZXcgdGFnIGFuZCBjYWNoZSB0aGUgY2xhc3MgcHJvdG90eXBlXG4gIGlmICghX19UQUdfSU1QTFtuYW1lXSkge1xuICAgIHRhZyQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIG9uQ3JlYXRlKTtcbiAgICAvLyBjYWNoZSB0aGUgY2xhc3MgY29uc3RydWN0b3JcbiAgICBfX1RBR19JTVBMW25hbWVdLmNsYXNzID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIC8vIG1vdW50IHRoZSB0YWcgdXNpbmcgdGhlIGNsYXNzIGluc3RhbmNlXG4gIG1vdW50VG8oZWwsIG5hbWUsIG9wdHMsIHRoaXMpO1xuICAvLyBpbmplY3QgdGhlIGNvbXBvbmVudCBjc3NcbiAgaWYgKGNzcykgeyBzdHlsZU1hbmFnZXIuaW5qZWN0KCk7IH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyByaW90IHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIG5hbWUgLSBuYW1lL2lkIG9mIHRoZSBuZXcgcmlvdCB0YWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICB0bXBsIC0gdGFnIHRlbXBsYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgY3NzIC0gY3VzdG9tIHRhZyBjc3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBhdHRycyAtIHJvb3QgdGFnIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIHVzZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbmFtZS9pZCBvZiB0aGUgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiB0YWckMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBmbikge1xuICBpZiAoaXNGdW5jdGlvbihhdHRycykpIHtcbiAgICBmbiA9IGF0dHJzO1xuXG4gICAgaWYgKC9eW1xcd1xcLV0rXFxzPz0vLnRlc3QoY3NzKSkge1xuICAgICAgYXR0cnMgPSBjc3M7XG4gICAgICBjc3MgPSAnJztcbiAgICB9IGVsc2VcbiAgICAgIHsgYXR0cnMgPSAnJzsgfVxuICB9XG5cbiAgaWYgKGNzcykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNzcykpXG4gICAgICB7IGZuID0gY3NzOyB9XG4gICAgZWxzZVxuICAgICAgeyBzdHlsZU1hbmFnZXIuYWRkKGNzcyk7IH1cbiAgfVxuXG4gIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIF9fVEFHX0lNUExbbmFtZV0gPSB7IG5hbWU6IG5hbWUsIHRtcGw6IHRtcGwsIGF0dHJzOiBhdHRycywgZm46IGZuIH07XG5cbiAgcmV0dXJuIG5hbWVcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmlvdCB0YWcgaW1wbGVtZW50YXRpb24gKGZvciB1c2UgYnkgdGhlIGNvbXBpbGVyKVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIG5hbWUgLSBuYW1lL2lkIG9mIHRoZSBuZXcgcmlvdCB0YWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICB0bXBsIC0gdGFnIHRlbXBsYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgY3NzIC0gY3VzdG9tIHRhZyBjc3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBhdHRycyAtIHJvb3QgdGFnIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIHVzZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbmFtZS9pZCBvZiB0aGUgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiB0YWcyJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgZm4pIHtcbiAgaWYgKGNzcykgeyBzdHlsZU1hbmFnZXIuYWRkKGNzcywgbmFtZSk7IH1cblxuICBfX1RBR19JTVBMW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiB0bXBsLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9O1xuXG4gIHJldHVybiBuYW1lXG59XG5cbi8qKlxuICogTW91bnQgYSB0YWcgdXNpbmcgYSBzcGVjaWZpYyB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgKiB9IHNlbGVjdG9yIC0gdGFnIERPTSBzZWxlY3RvciBvciBET00gbm9kZS9zXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSB0YWcgaW1wbGVtZW50YXRpb24gbmFtZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gdGFnIGxvZ2ljXG4gKiBAcmV0dXJucyB7IEFycmF5IH0gbmV3IHRhZ3MgaW5zdGFuY2VzXG4gKi9cbmZ1bmN0aW9uIG1vdW50JDEoc2VsZWN0b3IsIHRhZ05hbWUsIG9wdHMpIHtcbiAgdmFyIHRhZ3MgPSBbXTtcbiAgdmFyIGVsZW0sIGFsbFRhZ3M7XG5cbiAgZnVuY3Rpb24gcHVzaFRhZ3NUbyhyb290KSB7XG4gICAgaWYgKHJvb3QudGFnTmFtZSkge1xuICAgICAgdmFyIHJpb3RUYWcgPSBnZXRBdHRyKHJvb3QsIElTX0RJUkVDVElWRSksIHRhZztcblxuICAgICAgLy8gaGF2ZSB0YWdOYW1lPyBmb3JjZSByaW90LXRhZyB0byBiZSB0aGUgc2FtZVxuICAgICAgaWYgKHRhZ05hbWUgJiYgcmlvdFRhZyAhPT0gdGFnTmFtZSkge1xuICAgICAgICByaW90VGFnID0gdGFnTmFtZTtcbiAgICAgICAgc2V0QXR0cihyb290LCBJU19ESVJFQ1RJVkUsIHRhZ05hbWUpO1xuICAgICAgfVxuXG4gICAgICB0YWcgPSBtb3VudFRvKHJvb3QsIHJpb3RUYWcgfHwgcm9vdC50YWdOYW1lLnRvTG93ZXJDYXNlKCksIG9wdHMpO1xuXG4gICAgICBpZiAodGFnKVxuICAgICAgICB7IHRhZ3MucHVzaCh0YWcpOyB9XG4gICAgfSBlbHNlIGlmIChyb290Lmxlbmd0aClcbiAgICAgIHsgZWFjaChyb290LCBwdXNoVGFnc1RvKTsgfSAvLyBhc3N1bWUgbm9kZUxpc3RcbiAgfVxuXG4gIC8vIGluamVjdCBzdHlsZXMgaW50byBET01cbiAgc3R5bGVNYW5hZ2VyLmluamVjdCgpO1xuXG4gIGlmIChpc09iamVjdCh0YWdOYW1lKSkge1xuICAgIG9wdHMgPSB0YWdOYW1lO1xuICAgIHRhZ05hbWUgPSAwO1xuICB9XG5cbiAgLy8gY3Jhd2wgdGhlIERPTSB0byBmaW5kIHRoZSB0YWdcbiAgaWYgKGlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgPT09ICcqJyA/XG4gICAgICAvLyBzZWxlY3QgYWxsIHJlZ2lzdGVyZWQgdGFnc1xuICAgICAgLy8gJiB0YWdzIGZvdW5kIHdpdGggdGhlIHJpb3QtdGFnIGF0dHJpYnV0ZSBzZXRcbiAgICAgIGFsbFRhZ3MgPSBzZWxlY3RUYWdzKCkgOlxuICAgICAgLy8gb3IganVzdCB0aGUgb25lcyBuYW1lZCBsaWtlIHRoZSBzZWxlY3RvclxuICAgICAgc2VsZWN0b3IgKyBzZWxlY3RUYWdzKHNlbGVjdG9yLnNwbGl0KC8sICovKSk7XG5cbiAgICAvLyBtYWtlIHN1cmUgdG8gcGFzcyBhbHdheXMgYSBzZWxlY3RvclxuICAgIC8vIHRvIHRoZSBxdWVyeVNlbGVjdG9yQWxsIGZ1bmN0aW9uXG4gICAgZWxlbSA9IHNlbGVjdG9yID8gJCQoc2VsZWN0b3IpIDogW107XG4gIH1cbiAgZWxzZVxuICAgIC8vIHByb2JhYmx5IHlvdSBoYXZlIHBhc3NlZCBhbHJlYWR5IGEgdGFnIG9yIGEgTm9kZUxpc3RcbiAgICB7IGVsZW0gPSBzZWxlY3RvcjsgfVxuXG4gIC8vIHNlbGVjdCBhbGwgdGhlIHJlZ2lzdGVyZWQgYW5kIG1vdW50IHRoZW0gaW5zaWRlIHRoZWlyIHJvb3QgZWxlbWVudHNcbiAgaWYgKHRhZ05hbWUgPT09ICcqJykge1xuICAgIC8vIGdldCBhbGwgY3VzdG9tIHRhZ3NcbiAgICB0YWdOYW1lID0gYWxsVGFncyB8fCBzZWxlY3RUYWdzKCk7XG4gICAgLy8gaWYgdGhlIHJvb3QgZWxzIGl0J3MganVzdCBhIHNpbmdsZSB0YWdcbiAgICBpZiAoZWxlbS50YWdOYW1lKVxuICAgICAgeyBlbGVtID0gJCQodGFnTmFtZSwgZWxlbSk7IH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIHNlbGVjdCBhbGwgdGhlIGNoaWxkcmVuIGZvciBhbGwgdGhlIGRpZmZlcmVudCByb290IGVsZW1lbnRzXG4gICAgICB2YXIgbm9kZUxpc3QgPSBbXTtcblxuICAgICAgZWFjaChlbGVtLCBmdW5jdGlvbiAoX2VsKSB7IHJldHVybiBub2RlTGlzdC5wdXNoKCQkKHRhZ05hbWUsIF9lbCkpOyB9KTtcblxuICAgICAgZWxlbSA9IG5vZGVMaXN0O1xuICAgIH1cbiAgICAvLyBnZXQgcmlkIG9mIHRoZSB0YWdOYW1lXG4gICAgdGFnTmFtZSA9IDA7XG4gIH1cblxuICBwdXNoVGFnc1RvKGVsZW0pO1xuXG4gIHJldHVybiB0YWdzXG59XG5cbi8vIENyZWF0ZSBhIG1peGluIHRoYXQgY291bGQgYmUgZ2xvYmFsbHkgc2hhcmVkIGFjcm9zcyBhbGwgdGhlIHRhZ3NcbnZhciBtaXhpbnMgPSB7fTtcbnZhciBnbG9iYWxzID0gbWl4aW5zW0dMT0JBTF9NSVhJTl0gPSB7fTtcbnZhciBtaXhpbnNfaWQgPSAwO1xuXG4vKipcbiAqIENyZWF0ZS9SZXR1cm4gYSBtaXhpbiBieSBpdHMgbmFtZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgbmFtZSAtIG1peGluIG5hbWUgKGdsb2JhbCBtaXhpbiBpZiBvYmplY3QpXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBtaXggLSBtaXhpbiBsb2dpY1xuICogQHBhcmFtICAgeyBCb29sZWFuIH0gZyAtIGlzIGdsb2JhbD9cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gIHRoZSBtaXhpbiBsb2dpY1xuICovXG5mdW5jdGlvbiBtaXhpbiQxKG5hbWUsIG1peCwgZykge1xuICAvLyBVbm5hbWVkIGdsb2JhbFxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBtaXhpbiQxKChcIl9fXCIgKyAobWl4aW5zX2lkKyspICsgXCJfX1wiKSwgbmFtZSwgdHJ1ZSk7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3RvcmUgPSBnID8gZ2xvYmFscyA6IG1peGlucztcblxuICAvLyBHZXR0ZXJcbiAgaWYgKCFtaXgpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoc3RvcmVbbmFtZV0pKVxuICAgICAgeyB0aHJvdyBuZXcgRXJyb3IoKFwiVW5yZWdpc3RlcmVkIG1peGluOiBcIiArIG5hbWUpKSB9XG5cbiAgICByZXR1cm4gc3RvcmVbbmFtZV1cbiAgfVxuXG4gIC8vIFNldHRlclxuICBzdG9yZVtuYW1lXSA9IGlzRnVuY3Rpb24obWl4KSA/XG4gICAgZXh0ZW5kKG1peC5wcm90b3R5cGUsIHN0b3JlW25hbWVdIHx8IHt9KSAmJiBtaXggOlxuICAgIGV4dGVuZChzdG9yZVtuYW1lXSB8fCB7fSwgbWl4KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYWxsIHRoZSB0YWdzIGluc3RhbmNlcyBjcmVhdGVkXG4gKiBAcmV0dXJucyB7IEFycmF5IH0gYWxsIHRoZSB0YWdzIGluc3RhbmNlc1xuICovXG5mdW5jdGlvbiB1cGRhdGUkMSgpIHtcbiAgcmV0dXJuIGVhY2goX19UQUdTX0NBQ0hFLCBmdW5jdGlvbiAodGFnKSB7IHJldHVybiB0YWcudXBkYXRlKCk7IH0pXG59XG5cbmZ1bmN0aW9uIHVucmVnaXN0ZXIkMShuYW1lKSB7XG4gIF9fVEFHX0lNUExbbmFtZV0gPSBudWxsO1xufVxuXG52YXIgdmVyc2lvbiQxID0gJ3YzLjYuMCc7XG5cblxudmFyIGNvcmUgPSBPYmplY3QuZnJlZXplKHtcblx0VGFnOiBUYWckMixcblx0dGFnOiB0YWckMSxcblx0dGFnMjogdGFnMiQxLFxuXHRtb3VudDogbW91bnQkMSxcblx0bWl4aW46IG1peGluJDEsXG5cdHVwZGF0ZTogdXBkYXRlJDEsXG5cdHVucmVnaXN0ZXI6IHVucmVnaXN0ZXIkMSxcblx0dmVyc2lvbjogdmVyc2lvbiQxXG59KTtcblxuLy8gY291bnRlciB0byBnaXZlIGEgdW5pcXVlIGlkIHRvIGFsbCB0aGUgVGFnIGluc3RhbmNlc1xudmFyIF9fdWlkID0gMDtcblxuLyoqXG4gKiBXZSBuZWVkIHRvIHVwZGF0ZSBvcHRzIGZvciB0aGlzIHRhZy4gVGhhdCByZXF1aXJlcyB1cGRhdGluZyB0aGUgZXhwcmVzc2lvbnNcbiAqIGluIGFueSBhdHRyaWJ1dGVzIG9uIHRoZSB0YWcsIGFuZCB0aGVuIGNvcHlpbmcgdGhlIHJlc3VsdCBvbnRvIG9wdHMuXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHtCb29sZWFufSBpc0xvb3AgLSBpcyBpdCBhIGxvb3AgdGFnP1xuICogQHBhcmFtICAgeyBUYWcgfSAgcGFyZW50IC0gcGFyZW50IHRhZyBub2RlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSAgaXNBbm9ueW1vdXMgLSBpcyBpdCBhIHRhZyB3aXRob3V0IGFueSBpbXBsPyAoYSB0YWcgbm90IHJlZ2lzdGVyZWQpXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBvcHRzIC0gdGFnIG9wdGlvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSAgaW5zdEF0dHJzIC0gdGFnIGF0dHJpYnV0ZXMgYXJyYXlcbiAqL1xuZnVuY3Rpb24gdXBkYXRlT3B0cyhpc0xvb3AsIHBhcmVudCwgaXNBbm9ueW1vdXMsIG9wdHMsIGluc3RBdHRycykge1xuICAvLyBpc0Fub255bW91cyBgZWFjaGAgdGFncyB0cmVhdCBgZG9tYCBhbmQgYHJvb3RgIGRpZmZlcmVudGx5LiBJbiB0aGlzIGNhc2VcbiAgLy8gKGFuZCBvbmx5IHRoaXMgY2FzZSkgd2UgZG9uJ3QgbmVlZCB0byBkbyB1cGRhdGVPcHRzLCBiZWNhdXNlIHRoZSByZWd1bGFyIHBhcnNlXG4gIC8vIHdpbGwgdXBkYXRlIHRob3NlIGF0dHJzLiBQbHVzLCBpc0Fub255bW91cyB0YWdzIGRvbid0IG5lZWQgb3B0cyBhbnl3YXlcbiAgaWYgKGlzTG9vcCAmJiBpc0Fub255bW91cykgeyByZXR1cm4gfVxuXG4gIHZhciBjdHggPSAhaXNBbm9ueW1vdXMgJiYgaXNMb29wID8gdGhpcyA6IHBhcmVudCB8fCB0aGlzO1xuICBlYWNoKGluc3RBdHRycywgZnVuY3Rpb24gKGF0dHIpIHtcbiAgICBpZiAoYXR0ci5leHByKSB7IHVwZGF0ZUFsbEV4cHJlc3Npb25zLmNhbGwoY3R4LCBbYXR0ci5leHByXSk7IH1cbiAgICAvLyBub3JtYWxpemUgdGhlIGF0dHJpYnV0ZSBuYW1lc1xuICAgIG9wdHNbdG9DYW1lbChhdHRyLm5hbWUpLnJlcGxhY2UoQVRUUlNfUFJFRklYLCAnJyldID0gYXR0ci5leHByID8gYXR0ci5leHByLnZhbHVlIDogYXR0ci52YWx1ZTtcbiAgfSk7XG59XG5cblxuLyoqXG4gKiBUYWcgY2xhc3NcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHsgT2JqZWN0IH0gaW1wbCAtIGl0IGNvbnRhaW5zIHRoZSB0YWcgdGVtcGxhdGUsIGFuZCBsb2dpY1xuICogQHBhcmFtIHsgT2JqZWN0IH0gY29uZiAtIHRhZyBvcHRpb25zXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBpbm5lckhUTUwgLSBodG1sIHRoYXQgZXZlbnR1YWxseSB3ZSBuZWVkIHRvIGluamVjdCBpbiB0aGUgdGFnXG4gKi9cbmZ1bmN0aW9uIFRhZyQxKGltcGwsIGNvbmYsIGlubmVySFRNTCkge1xuICBpZiAoIGltcGwgPT09IHZvaWQgMCApIGltcGwgPSB7fTtcbiAgaWYgKCBjb25mID09PSB2b2lkIDAgKSBjb25mID0ge307XG5cbiAgdmFyIG9wdHMgPSBleHRlbmQoe30sIGNvbmYub3B0cyksXG4gICAgcGFyZW50ID0gY29uZi5wYXJlbnQsXG4gICAgaXNMb29wID0gY29uZi5pc0xvb3AsXG4gICAgaXNBbm9ueW1vdXMgPSAhIWNvbmYuaXNBbm9ueW1vdXMsXG4gICAgc2tpcEFub255bW91cyA9IHNldHRpbmdzJDEuc2tpcEFub255bW91c1RhZ3MgJiYgaXNBbm9ueW1vdXMsXG4gICAgaXRlbSA9IGNsZWFuVXBEYXRhKGNvbmYuaXRlbSksXG4gICAgaW5kZXggPSBjb25mLmluZGV4LCAvLyBhdmFpbGFibGUgb25seSBmb3IgdGhlIGxvb3BlZCBub2Rlc1xuICAgIGluc3RBdHRycyA9IFtdLCAvLyBBbGwgYXR0cmlidXRlcyBvbiB0aGUgVGFnIHdoZW4gaXQncyBmaXJzdCBwYXJzZWRcbiAgICBpbXBsQXR0cnMgPSBbXSwgLy8gZXhwcmVzc2lvbnMgb24gdGhpcyB0eXBlIG9mIFRhZ1xuICAgIGV4cHJlc3Npb25zID0gW10sXG4gICAgcm9vdCA9IGNvbmYucm9vdCxcbiAgICB0YWdOYW1lID0gY29uZi50YWdOYW1lIHx8IGdldFRhZ05hbWUocm9vdCksXG4gICAgaXNWaXJ0dWFsID0gdGFnTmFtZSA9PT0gJ3ZpcnR1YWwnLFxuICAgIGlzSW5saW5lID0gIWlzVmlydHVhbCAmJiAhaW1wbC50bXBsLFxuICAgIHByb3BzSW5TeW5jV2l0aFBhcmVudCA9IFtdLFxuICAgIGRvbTtcblxuICAvLyBtYWtlIHRoaXMgdGFnIG9ic2VydmFibGVcbiAgaWYgKCFza2lwQW5vbnltb3VzKSB7IG9ic2VydmFibGUkMSh0aGlzKTsgfVxuICAvLyBvbmx5IGNhbGwgdW5tb3VudCBpZiB3ZSBoYXZlIGEgdmFsaWQgX19UQUdfSU1QTCAoaGFzIG5hbWUgcHJvcGVydHkpXG4gIGlmIChpbXBsLm5hbWUgJiYgcm9vdC5fdGFnKSB7IHJvb3QuX3RhZy51bm1vdW50KHRydWUpOyB9XG5cbiAgLy8gbm90IHlldCBtb3VudGVkXG4gIHRoaXMuaXNNb3VudGVkID0gZmFsc2U7XG5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ19fJywge1xuICAgIGlzQW5vbnltb3VzOiBpc0Fub255bW91cyxcbiAgICBpbnN0QXR0cnM6IGluc3RBdHRycyxcbiAgICBpbm5lckhUTUw6IGlubmVySFRNTCxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIGluZGV4OiBpbmRleCxcbiAgICBpc0xvb3A6IGlzTG9vcCxcbiAgICBpc0lubGluZTogaXNJbmxpbmUsXG4gICAgLy8gdGFncyBoYXZpbmcgZXZlbnQgbGlzdGVuZXJzXG4gICAgLy8gaXQgd291bGQgYmUgYmV0dGVyIHRvIHVzZSB3ZWFrIG1hcHMgaGVyZSBidXQgd2UgY2FuIG5vdCBpbnRyb2R1Y2UgYnJlYWtpbmcgY2hhbmdlcyBub3dcbiAgICBsaXN0ZW5lcnM6IFtdLFxuICAgIC8vIHRoZXNlIHZhcnMgd2lsbCBiZSBuZWVkZWQgb25seSBmb3IgdGhlIHZpcnR1YWwgdGFnc1xuICAgIHZpcnRzOiBbXSxcbiAgICB0YWlsOiBudWxsLFxuICAgIGhlYWQ6IG51bGwsXG4gICAgcGFyZW50OiBudWxsLFxuICAgIGl0ZW06IG51bGxcbiAgfSk7XG5cbiAgLy8gY3JlYXRlIGEgdW5pcXVlIGlkIHRvIHRoaXMgdGFnXG4gIC8vIGl0IGNvdWxkIGJlIGhhbmR5IHRvIHVzZSBpdCBhbHNvIHRvIGltcHJvdmUgdGhlIHZpcnR1YWwgZG9tIHJlbmRlcmluZyBzcGVlZFxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3Jpb3RfaWQnLCArK19fdWlkKTsgLy8gYmFzZSAxIGFsbG93cyB0ZXN0ICF0Ll9yaW90X2lkXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdyb290Jywgcm9vdCk7XG4gIGV4dGVuZCh0aGlzLCB7IG9wdHM6IG9wdHMgfSwgaXRlbSk7XG4gIC8vIHByb3RlY3QgdGhlIFwidGFnc1wiIGFuZCBcInJlZnNcIiBwcm9wZXJ0eSBmcm9tIGJlaW5nIG92ZXJyaWRkZW5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3BhcmVudCcsIHBhcmVudCB8fCBudWxsKTtcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3RhZ3MnLCB7fSk7XG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdyZWZzJywge30pO1xuXG4gIGlmIChpc0lubGluZSB8fCBpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHtcbiAgICBkb20gPSByb290O1xuICB9IGVsc2Uge1xuICAgIGlmICghaXNWaXJ0dWFsKSB7IHJvb3QuaW5uZXJIVE1MID0gJyc7IH1cbiAgICBkb20gPSBta2RvbShpbXBsLnRtcGwsIGlubmVySFRNTCwgaXNTdmcocm9vdCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgdGFnIGV4cHJlc3Npb25zIGFuZCBvcHRpb25zXG4gICAqIEBwYXJhbSAgIHsgKiB9ICBkYXRhIC0gZGF0YSB3ZSB3YW50IHRvIHVzZSB0byBleHRlbmQgdGhlIHRhZyBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAndXBkYXRlJywgZnVuY3Rpb24gdGFnVXBkYXRlKGRhdGEpIHtcbiAgICB2YXIgbmV4dE9wdHMgPSB7fSxcbiAgICAgIGNhblRyaWdnZXIgPSB0aGlzLmlzTW91bnRlZCAmJiAhc2tpcEFub255bW91cztcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgZGF0YSBwYXNzZWQgd2lsbCBub3Qgb3ZlcnJpZGVcbiAgICAvLyB0aGUgY29tcG9uZW50IGNvcmUgbWV0aG9kc1xuICAgIGRhdGEgPSBjbGVhblVwRGF0YShkYXRhKTtcbiAgICBleHRlbmQodGhpcywgZGF0YSk7XG4gICAgdXBkYXRlT3B0cy5hcHBseSh0aGlzLCBbaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBuZXh0T3B0cywgaW5zdEF0dHJzXSk7XG5cbiAgICBpZiAoY2FuVHJpZ2dlciAmJiB0aGlzLmlzTW91bnRlZCAmJiBpc0Z1bmN0aW9uKHRoaXMuc2hvdWxkVXBkYXRlKSAmJiAhdGhpcy5zaG91bGRVcGRhdGUoZGF0YSwgbmV4dE9wdHMpKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8vIGluaGVyaXQgcHJvcGVydGllcyBmcm9tIHRoZSBwYXJlbnQsIGJ1dCBvbmx5IGZvciBpc0Fub255bW91cyB0YWdzXG4gICAgaWYgKGlzTG9vcCAmJiBpc0Fub255bW91cykgeyBpbmhlcml0RnJvbS5hcHBseSh0aGlzLCBbdGhpcy5wYXJlbnQsIHByb3BzSW5TeW5jV2l0aFBhcmVudF0pOyB9XG4gICAgZXh0ZW5kKG9wdHMsIG5leHRPcHRzKTtcbiAgICBpZiAoY2FuVHJpZ2dlcikgeyB0aGlzLnRyaWdnZXIoJ3VwZGF0ZScsIGRhdGEpOyB9XG4gICAgdXBkYXRlQWxsRXhwcmVzc2lvbnMuY2FsbCh0aGlzLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKGNhblRyaWdnZXIpIHsgdGhpcy50cmlnZ2VyKCd1cGRhdGVkJyk7IH1cblxuICAgIHJldHVybiB0aGlzXG5cbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogQWRkIGEgbWl4aW4gdG8gdGhpcyB0YWdcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdtaXhpbicsIGZ1bmN0aW9uIHRhZ01peGluKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgZWFjaChhcmd1bWVudHMsIGZ1bmN0aW9uIChtaXgpIHtcbiAgICAgIHZhciBpbnN0YW5jZSwgb2JqO1xuICAgICAgdmFyIHByb3BzID0gW107XG5cbiAgICAgIC8vIHByb3BlcnRpZXMgYmxhY2tsaXN0ZWQgYW5kIHdpbGwgbm90IGJlIGJvdW5kIHRvIHRoZSB0YWcgaW5zdGFuY2VcbiAgICAgIHZhciBwcm9wc0JsYWNrbGlzdCA9IFsnaW5pdCcsICdfX3Byb3RvX18nXTtcblxuICAgICAgbWl4ID0gaXNTdHJpbmcobWl4KSA/IG1peGluJDEobWl4KSA6IG1peDtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhlIG1peGluIGlzIGEgZnVuY3Rpb25cbiAgICAgIGlmIChpc0Z1bmN0aW9uKG1peCkpIHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBuZXcgbWl4aW4gaW5zdGFuY2VcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgbWl4KCk7XG4gICAgICB9IGVsc2UgeyBpbnN0YW5jZSA9IG1peDsgfVxuXG4gICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5zdGFuY2UpO1xuXG4gICAgICAvLyBidWlsZCBtdWx0aWxldmVsIHByb3RvdHlwZSBpbmhlcml0YW5jZSBjaGFpbiBwcm9wZXJ0eSBsaXN0XG4gICAgICBkbyB7IHByb3BzID0gcHJvcHMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaiB8fCBpbnN0YW5jZSkpOyB9XG4gICAgICB3aGlsZSAob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaiB8fCBpbnN0YW5jZSkpXG5cbiAgICAgIC8vIGxvb3AgdGhlIGtleXMgaW4gdGhlIGZ1bmN0aW9uIHByb3RvdHlwZSBvciB0aGUgYWxsIG9iamVjdCBrZXlzXG4gICAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIC8vIGJpbmQgbWV0aG9kcyB0byB0aGlzXG4gICAgICAgIC8vIGFsbG93IG1peGlucyB0byBvdmVycmlkZSBvdGhlciBwcm9wZXJ0aWVzL3BhcmVudCBtaXhpbnNcbiAgICAgICAgaWYgKCFjb250YWlucyhwcm9wc0JsYWNrbGlzdCwga2V5KSkge1xuICAgICAgICAgIC8vIGNoZWNrIGZvciBnZXR0ZXJzL3NldHRlcnNcbiAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaW5zdGFuY2UsIGtleSkgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcbiAgICAgICAgICB2YXIgaGFzR2V0dGVyU2V0dGVyID0gZGVzY3JpcHRvciAmJiAoZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpO1xuXG4gICAgICAgICAgLy8gYXBwbHkgbWV0aG9kIG9ubHkgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBvbiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICBpZiAoIXRoaXMkMS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGhhc0dldHRlclNldHRlcikge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMkMSwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcyQxW2tleV0gPSBpc0Z1bmN0aW9uKGluc3RhbmNlW2tleV0pID9cbiAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5XS5iaW5kKHRoaXMkMSkgOlxuICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGluaXQgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGF1dG9tYXRpY2FsbHlcbiAgICAgIGlmIChpbnN0YW5jZS5pbml0KVxuICAgICAgICB7IGluc3RhbmNlLmluaXQuYmluZCh0aGlzJDEpKCk7IH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpc1xuICB9LmJpbmQodGhpcykpO1xuXG4gIC8qKlxuICAgKiBNb3VudCB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdtb3VudCcsIGZ1bmN0aW9uIHRhZ01vdW50KCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcm9vdC5fdGFnID0gdGhpczsgLy8ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgdGFnIGp1c3QgY3JlYXRlZFxuXG4gICAgLy8gUmVhZCBhbGwgdGhlIGF0dHJzIG9uIHRoaXMgaW5zdGFuY2UuIFRoaXMgZ2l2ZSB1cyB0aGUgaW5mbyB3ZSBuZWVkIGZvciB1cGRhdGVPcHRzXG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHBhcmVudCwgW3Jvb3QsIHJvb3QuYXR0cmlidXRlcywgZnVuY3Rpb24gKGF0dHIsIGV4cHIpIHtcbiAgICAgIGlmICghaXNBbm9ueW1vdXMgJiYgUmVmRXhwci5pc1Byb3RvdHlwZU9mKGV4cHIpKSB7IGV4cHIudGFnID0gdGhpcyQxOyB9XG4gICAgICBhdHRyLmV4cHIgPSBleHByO1xuICAgICAgaW5zdEF0dHJzLnB1c2goYXR0cik7XG4gICAgfV0pO1xuXG4gICAgLy8gdXBkYXRlIHRoZSByb290IGFkZGluZyBjdXN0b20gYXR0cmlidXRlcyBjb21pbmcgZnJvbSB0aGUgY29tcGlsZXJcbiAgICBpbXBsQXR0cnMgPSBbXTtcbiAgICB3YWxrQXR0cnMoaW1wbC5hdHRycywgZnVuY3Rpb24gKGssIHYpIHsgaW1wbEF0dHJzLnB1c2goe25hbWU6IGssIHZhbHVlOiB2fSk7IH0pO1xuICAgIHBhcnNlQXR0cmlidXRlcy5hcHBseSh0aGlzLCBbcm9vdCwgaW1wbEF0dHJzLCBmdW5jdGlvbiAoYXR0ciwgZXhwcikge1xuICAgICAgaWYgKGV4cHIpIHsgZXhwcmVzc2lvbnMucHVzaChleHByKTsgfVxuICAgICAgZWxzZSB7IHNldEF0dHIocm9vdCwgYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTsgfVxuICAgIH1dKTtcblxuICAgIC8vIGluaXRpYWxpYXRpb25cbiAgICB1cGRhdGVPcHRzLmFwcGx5KHRoaXMsIFtpc0xvb3AsIHBhcmVudCwgaXNBbm9ueW1vdXMsIG9wdHMsIGluc3RBdHRyc10pO1xuXG4gICAgLy8gYWRkIGdsb2JhbCBtaXhpbnNcbiAgICB2YXIgZ2xvYmFsTWl4aW4gPSBtaXhpbiQxKEdMT0JBTF9NSVhJTik7XG5cbiAgICBpZiAoZ2xvYmFsTWl4aW4gJiYgIXNraXBBbm9ueW1vdXMpIHtcbiAgICAgIGZvciAodmFyIGkgaW4gZ2xvYmFsTWl4aW4pIHtcbiAgICAgICAgaWYgKGdsb2JhbE1peGluLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgdGhpcyQxLm1peGluKGdsb2JhbE1peGluW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbXBsLmZuKSB7IGltcGwuZm4uY2FsbCh0aGlzLCBvcHRzKTsgfVxuXG4gICAgaWYgKCFza2lwQW5vbnltb3VzKSB7IHRoaXMudHJpZ2dlcignYmVmb3JlLW1vdW50Jyk7IH1cblxuICAgIC8vIHBhcnNlIGxheW91dCBhZnRlciBpbml0LiBmbiBtYXkgY2FsY3VsYXRlIGFyZ3MgZm9yIG5lc3RlZCBjdXN0b20gdGFnc1xuICAgIHBhcnNlRXhwcmVzc2lvbnMuYXBwbHkodGhpcywgW2RvbSwgZXhwcmVzc2lvbnMsIGlzQW5vbnltb3VzXSk7XG5cbiAgICB0aGlzLnVwZGF0ZShpdGVtKTtcblxuICAgIGlmICghaXNBbm9ueW1vdXMgJiYgIWlzSW5saW5lKSB7XG4gICAgICB3aGlsZSAoZG9tLmZpcnN0Q2hpbGQpIHsgcm9vdC5hcHBlbmRDaGlsZChkb20uZmlyc3RDaGlsZCk7IH1cbiAgICB9XG5cbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncm9vdCcsIHJvb3QpO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdpc01vdW50ZWQnLCB0cnVlKTtcblxuICAgIGlmIChza2lwQW5vbnltb3VzKSB7IHJldHVybiB9XG5cbiAgICAvLyBpZiBpdCdzIG5vdCBhIGNoaWxkIHRhZyB3ZSBjYW4gdHJpZ2dlciBpdHMgbW91bnQgZXZlbnRcbiAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ21vdW50Jyk7XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSB3ZSBuZWVkIHRvIHdhaXQgdGhhdCB0aGUgcGFyZW50IFwibW91bnRcIiBvciBcInVwZGF0ZWRcIiBldmVudCBnZXRzIHRyaWdnZXJlZFxuICAgIGVsc2Uge1xuICAgICAgdmFyIHAgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcy5wYXJlbnQpO1xuICAgICAgcC5vbmUoIXAuaXNNb3VudGVkID8gJ21vdW50JyA6ICd1cGRhdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzJDEudHJpZ2dlcignbW91bnQnKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG5cbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogVW5tb3VudCB0aGUgdGFnIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7IEJvb2xlYW4gfSBtdXN0S2VlcFJvb3QgLSBpZiBpdCdzIHRydWUgdGhlIHJvb3Qgbm9kZSB3aWxsIG5vdCBiZSByZW1vdmVkXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAndW5tb3VudCcsIGZ1bmN0aW9uIHRhZ1VubW91bnQobXVzdEtlZXBSb290KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgZWwgPSB0aGlzLnJvb3QsXG4gICAgICBwID0gZWwucGFyZW50Tm9kZSxcbiAgICAgIHB0YWcsXG4gICAgICB0YWdJbmRleCA9IF9fVEFHU19DQUNIRS5pbmRleE9mKHRoaXMpO1xuXG4gICAgaWYgKCFza2lwQW5vbnltb3VzKSB7IHRoaXMudHJpZ2dlcignYmVmb3JlLXVubW91bnQnKTsgfVxuXG4gICAgLy8gY2xlYXIgYWxsIGF0dHJpYnV0ZXMgY29taW5nIGZyb20gdGhlIG1vdW50ZWQgdGFnXG4gICAgd2Fsa0F0dHJzKGltcGwuYXR0cnMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBpZiAoc3RhcnRzV2l0aChuYW1lLCBBVFRSU19QUkVGSVgpKVxuICAgICAgICB7IG5hbWUgPSBuYW1lLnNsaWNlKEFUVFJTX1BSRUZJWC5sZW5ndGgpOyB9XG5cbiAgICAgIHJlbUF0dHIocm9vdCwgbmFtZSk7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLl9fLmxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChkb20pIHtcbiAgICAgIE9iamVjdC5rZXlzKGRvbVtSSU9UX0VWRU5UU19LRVldKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBkb21bUklPVF9FVkVOVFNfS0VZXVtldmVudE5hbWVdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIHRoaXMgdGFnIGluc3RhbmNlIGZyb20gdGhlIGdsb2JhbCB2aXJ0dWFsRG9tIHZhcmlhYmxlXG4gICAgaWYgKHRhZ0luZGV4ICE9PSAtMSlcbiAgICAgIHsgX19UQUdTX0NBQ0hFLnNwbGljZSh0YWdJbmRleCwgMSk7IH1cblxuICAgIGlmIChwIHx8IGlzVmlydHVhbCkge1xuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBwdGFnID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHBhcmVudCk7XG5cbiAgICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGFncykuZm9yRWFjaChmdW5jdGlvbiAodGFnTmFtZSkge1xuICAgICAgICAgICAgYXJyYXlpc2hSZW1vdmUocHRhZy50YWdzLCB0YWdOYW1lLCB0aGlzJDEudGFnc1t0YWdOYW1lXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXlpc2hSZW1vdmUocHRhZy50YWdzLCB0YWdOYW1lLCB0aGlzKTtcbiAgICAgICAgICAvLyByZW1vdmUgZnJvbSBfcGFyZW50IHRvb1xuICAgICAgICAgIGlmKHBhcmVudCAhPT0gcHRhZykge1xuICAgICAgICAgICAgYXJyYXlpc2hSZW1vdmUocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSB0YWcgY29udGVudHNcbiAgICAgICAgc2V0SW5uZXJIVE1MKGVsLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwICYmICFtdXN0S2VlcFJvb3QpIHsgcC5yZW1vdmVDaGlsZChlbCk7IH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fXy52aXJ0cykge1xuICAgICAgZWFjaCh0aGlzLl9fLnZpcnRzLCBmdW5jdGlvbiAodikge1xuICAgICAgICBpZiAodi5wYXJlbnROb2RlKSB7IHYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2KTsgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWxsb3cgZXhwcmVzc2lvbnMgdG8gdW5tb3VudCB0aGVtc2VsdmVzXG4gICAgdW5tb3VudEFsbChleHByZXNzaW9ucyk7XG4gICAgZWFjaChpbnN0QXR0cnMsIGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLmV4cHIgJiYgYS5leHByLnVubW91bnQgJiYgYS5leHByLnVubW91bnQoKTsgfSk7XG5cbiAgICAvLyBjdXN0b20gaW50ZXJuYWwgdW5tb3VudCBmdW5jdGlvbiB0byBhdm9pZCByZWx5aW5nIG9uIHRoZSBvYnNlcnZhYmxlXG4gICAgaWYgKHRoaXMuX18ub25Vbm1vdW50KSB7IHRoaXMuX18ub25Vbm1vdW50KCk7IH1cblxuICAgIGlmICghc2tpcEFub255bW91cykge1xuICAgICAgdGhpcy50cmlnZ2VyKCd1bm1vdW50Jyk7XG4gICAgICB0aGlzLm9mZignKicpO1xuICAgIH1cblxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdpc01vdW50ZWQnLCBmYWxzZSk7XG5cbiAgICBkZWxldGUgdGhpcy5yb290Ll90YWc7XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbi8qKlxuICogRGV0ZWN0IHRoZSB0YWcgaW1wbGVtZW50YXRpb24gYnkgYSBET00gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIHBhcnNlIHRvIGdldCBpdHMgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGl0IHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGltcGxlbWVudGF0aW9uIG9mIGEgY3VzdG9tIHRhZyAodGVtcGxhdGUgYW5kIGJvb3QgZnVuY3Rpb24pXG4gKi9cbmZ1bmN0aW9uIGdldFRhZyhkb20pIHtcbiAgcmV0dXJuIGRvbS50YWdOYW1lICYmIF9fVEFHX0lNUExbZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkgfHxcbiAgICBnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKSB8fCBkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpXVxufVxuXG4vKipcbiAqIEluaGVyaXQgcHJvcGVydGllcyBmcm9tIGEgdGFyZ2V0IHRhZyBpbnN0YW5jZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IFRhZyB9IHRhcmdldCAtIHRhZyB3aGVyZSB3ZSB3aWxsIGluaGVyaXQgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBBcnJheSB9IHByb3BzSW5TeW5jV2l0aFBhcmVudCAtIGFycmF5IG9mIHByb3BlcnRpZXMgdG8gc3luYyB3aXRoIHRoZSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gaW5oZXJpdEZyb20odGFyZ2V0LCBwcm9wc0luU3luY1dpdGhQYXJlbnQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChPYmplY3Qua2V5cyh0YXJnZXQpLCBmdW5jdGlvbiAoaykge1xuICAgIC8vIHNvbWUgcHJvcGVydGllcyBtdXN0IGJlIGFsd2F5cyBpbiBzeW5jIHdpdGggdGhlIHBhcmVudCB0YWdcbiAgICB2YXIgbXVzdFN5bmMgPSAhaXNSZXNlcnZlZE5hbWUoaykgJiYgY29udGFpbnMocHJvcHNJblN5bmNXaXRoUGFyZW50LCBrKTtcblxuICAgIGlmIChpc1VuZGVmaW5lZCh0aGlzJDFba10pIHx8IG11c3RTeW5jKSB7XG4gICAgICAvLyB0cmFjayB0aGUgcHJvcGVydHkgdG8ga2VlcCBpbiBzeW5jXG4gICAgICAvLyBzbyB3ZSBjYW4ga2VlcCBpdCB1cGRhdGVkXG4gICAgICBpZiAoIW11c3RTeW5jKSB7IHByb3BzSW5TeW5jV2l0aFBhcmVudC5wdXNoKGspOyB9XG4gICAgICB0aGlzJDFba10gPSB0YXJnZXRba107XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBNb3ZlIHRoZSBwb3NpdGlvbiBvZiBhIGN1c3RvbSB0YWcgaW4gaXRzIHBhcmVudCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0ga2V5IHdoZXJlIHRoZSB0YWcgd2FzIHN0b3JlZFxuICogQHBhcmFtICAgeyBOdW1iZXIgfSBuZXdQb3MgLSBpbmRleCB3aGVyZSB0aGUgbmV3IHRhZyB3aWxsIGJlIHN0b3JlZFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRUYWcodGFnTmFtZSwgbmV3UG9zKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudCxcbiAgICB0YWdzO1xuICAvLyBubyBwYXJlbnQgbm8gbW92ZVxuICBpZiAoIXBhcmVudCkgeyByZXR1cm4gfVxuXG4gIHRhZ3MgPSBwYXJlbnQudGFnc1t0YWdOYW1lXTtcblxuICBpZiAoaXNBcnJheSh0YWdzKSlcbiAgICB7IHRhZ3Muc3BsaWNlKG5ld1BvcywgMCwgdGFncy5zcGxpY2UodGFncy5pbmRleE9mKHRoaXMpLCAxKVswXSk7IH1cbiAgZWxzZSB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0aGlzKTsgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBjaGlsZCB0YWcgaW5jbHVkaW5nIGl0IGNvcnJlY3RseSBpbnRvIGl0cyBwYXJlbnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY2hpbGQgLSBjaGlsZCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBvcHRpb25zIGNvbnRhaW5pbmcgdGhlIERPTSBub2RlIHdoZXJlIHRoZSB0YWcgd2lsbCBiZSBtb3VudGVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGlubmVySFRNTCAtIGlubmVyIGh0bWwgb2YgdGhlIGNoaWxkIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcGFyZW50IC0gaW5zdGFuY2Ugb2YgdGhlIHBhcmVudCB0YWcgaW5jbHVkaW5nIHRoZSBjaGlsZCBjdXN0b20gdGFnXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGluc3RhbmNlIG9mIHRoZSBuZXcgY2hpbGQgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiBpbml0Q2hpbGRUYWcoY2hpbGQsIG9wdHMsIGlubmVySFRNTCwgcGFyZW50KSB7XG4gIHZhciB0YWcgPSBuZXcgVGFnJDEoY2hpbGQsIG9wdHMsIGlubmVySFRNTCksXG4gICAgdGFnTmFtZSA9IG9wdHMudGFnTmFtZSB8fCBnZXRUYWdOYW1lKG9wdHMucm9vdCwgdHJ1ZSksXG4gICAgcHRhZyA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyhwYXJlbnQpO1xuICAvLyBmaXggZm9yIHRoZSBwYXJlbnQgYXR0cmlidXRlIGluIHRoZSBsb29wZWQgZWxlbWVudHNcbiAgZGVmaW5lUHJvcGVydHkodGFnLCAncGFyZW50JywgcHRhZyk7XG4gIC8vIHN0b3JlIHRoZSByZWFsIHBhcmVudCB0YWdcbiAgLy8gaW4gc29tZSBjYXNlcyB0aGlzIGNvdWxkIGJlIGRpZmZlcmVudCBmcm9tIHRoZSBjdXN0b20gcGFyZW50IHRhZ1xuICAvLyBmb3IgZXhhbXBsZSBpbiBuZXN0ZWQgbG9vcHNcbiAgdGFnLl9fLnBhcmVudCA9IHBhcmVudDtcblxuICAvLyBhZGQgdGhpcyB0YWcgdG8gdGhlIGN1c3RvbSBwYXJlbnQgdGFnXG4gIGFycmF5aXNoQWRkKHB0YWcudGFncywgdGFnTmFtZSwgdGFnKTtcblxuICAvLyBhbmQgYWxzbyB0byB0aGUgcmVhbCBwYXJlbnQgdGFnXG4gIGlmIChwdGFnICE9PSBwYXJlbnQpXG4gICAgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGFnKTsgfVxuXG4gIHJldHVybiB0YWdcbn1cblxuLyoqXG4gKiBMb29wIGJhY2t3YXJkIGFsbCB0aGUgcGFyZW50cyB0cmVlIHRvIGRldGVjdCB0aGUgZmlyc3QgY3VzdG9tIHBhcmVudCB0YWdcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gdGFnIC0gYSBUYWcgaW5zdGFuY2VcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gdGhlIGluc3RhbmNlIG9mIHRoZSBmaXJzdCBjdXN0b20gcGFyZW50IHRhZyBmb3VuZFxuICovXG5mdW5jdGlvbiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGFnKSB7XG4gIHZhciBwdGFnID0gdGFnO1xuICB3aGlsZSAocHRhZy5fXy5pc0Fub255bW91cykge1xuICAgIGlmICghcHRhZy5wYXJlbnQpIHsgYnJlYWsgfVxuICAgIHB0YWcgPSBwdGFnLnBhcmVudDtcbiAgfVxuICByZXR1cm4gcHRhZ1xufVxuXG4vKipcbiAqIFRyaWdnZXIgdGhlIHVubW91bnQgbWV0aG9kIG9uIGFsbCB0aGUgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIERPTSBleHByZXNzaW9uc1xuICovXG5mdW5jdGlvbiB1bm1vdW50QWxsKGV4cHJlc3Npb25zKSB7XG4gIGVhY2goZXhwcmVzc2lvbnMsIGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIFRhZyQxKSB7IGV4cHIudW5tb3VudCh0cnVlKTsgfVxuICAgIGVsc2UgaWYgKGV4cHIudGFnTmFtZSkgeyBleHByLnRhZy51bm1vdW50KHRydWUpOyB9XG4gICAgZWxzZSBpZiAoZXhwci51bm1vdW50KSB7IGV4cHIudW5tb3VudCgpOyB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdGFnIG5hbWUgb2YgYW55IERPTSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IHNraXBEYXRhSXMgLSBoYWNrIHRvIGlnbm9yZSB0aGUgZGF0YS1pcyBhdHRyaWJ1dGUgd2hlbiBhdHRhY2hpbmcgdG8gcGFyZW50XG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUgdG8gaWRlbnRpZnkgdGhpcyBkb20gbm9kZSBpbiByaW90XG4gKi9cbmZ1bmN0aW9uIGdldFRhZ05hbWUoZG9tLCBza2lwRGF0YUlzKSB7XG4gIHZhciBjaGlsZCA9IGdldFRhZyhkb20pLFxuICAgIG5hbWVkVGFnID0gIXNraXBEYXRhSXMgJiYgZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSk7XG4gIHJldHVybiBuYW1lZFRhZyAmJiAhdG1wbC5oYXNFeHByKG5hbWVkVGFnKSA/XG4gICAgICAgICAgICAgICAgbmFtZWRUYWcgOlxuICAgICAgICAgICAgICBjaGlsZCA/IGNoaWxkLm5hbWUgOiBkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpXG59XG5cbi8qKlxuICogV2l0aCB0aGlzIGZ1bmN0aW9uIHdlIGF2b2lkIHRoYXQgdGhlIGludGVybmFsIFRhZyBtZXRob2RzIGdldCBvdmVycmlkZGVuXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRhdGEgLSBvcHRpb25zIHdlIHdhbnQgdG8gdXNlIHRvIGV4dGVuZCB0aGUgdGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGNsZWFuIG9iamVjdCB3aXRob3V0IGNvbnRhaW5pbmcgdGhlIHJpb3QgaW50ZXJuYWwgcmVzZXJ2ZWQgd29yZHNcbiAqL1xuZnVuY3Rpb24gY2xlYW5VcERhdGEoZGF0YSkge1xuICBpZiAoIShkYXRhIGluc3RhbmNlb2YgVGFnJDEpICYmICEoZGF0YSAmJiBpc0Z1bmN0aW9uKGRhdGEudHJpZ2dlcikpKVxuICAgIHsgcmV0dXJuIGRhdGEgfVxuXG4gIHZhciBvID0ge307XG4gIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgaWYgKCFSRV9SRVNFUlZFRF9OQU1FUy50ZXN0KGtleSkpIHsgb1trZXldID0gZGF0YVtrZXldOyB9XG4gIH1cbiAgcmV0dXJuIG9cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHByb3BlcnR5IG9mIGFuIG9iamVjdCBmb3IgYSBnaXZlbiBrZXkuIElmIHNvbWV0aGluZyBhbHJlYWR5XG4gKiBleGlzdHMgdGhlcmUsIHRoZW4gaXQgYmVjb21lcyBhbiBhcnJheSBjb250YWluaW5nIGJvdGggdGhlIG9sZCBhbmQgbmV3IHZhbHVlLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gb2JqIC0gb2JqZWN0IG9uIHdoaWNoIHRvIHNldCB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGtleSAtIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHZhbHVlIC0gdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBzZXRcbiAqIEBwYXJhbSB7IEJvb2xlYW4gfSBlbnN1cmVBcnJheSAtIGVuc3VyZSB0aGF0IHRoZSBwcm9wZXJ0eSByZW1haW5zIGFuIGFycmF5XG4gKiBAcGFyYW0geyBOdW1iZXIgfSBpbmRleCAtIGFkZCB0aGUgbmV3IGl0ZW0gaW4gYSBjZXJ0YWluIGFycmF5IHBvc2l0aW9uXG4gKi9cbmZ1bmN0aW9uIGFycmF5aXNoQWRkKG9iaiwga2V5LCB2YWx1ZSwgZW5zdXJlQXJyYXksIGluZGV4KSB7XG4gIHZhciBkZXN0ID0gb2JqW2tleV07XG4gIHZhciBpc0FyciA9IGlzQXJyYXkoZGVzdCk7XG4gIHZhciBoYXNJbmRleCA9ICFpc1VuZGVmaW5lZChpbmRleCk7XG5cbiAgaWYgKGRlc3QgJiYgZGVzdCA9PT0gdmFsdWUpIHsgcmV0dXJuIH1cblxuICAvLyBpZiB0aGUga2V5IHdhcyBuZXZlciBzZXQsIHNldCBpdCBvbmNlXG4gIGlmICghZGVzdCAmJiBlbnN1cmVBcnJheSkgeyBvYmpba2V5XSA9IFt2YWx1ZV07IH1cbiAgZWxzZSBpZiAoIWRlc3QpIHsgb2JqW2tleV0gPSB2YWx1ZTsgfVxuICAvLyBpZiBpdCB3YXMgYW4gYXJyYXkgYW5kIG5vdCB5ZXQgc2V0XG4gIGVsc2Uge1xuICAgIGlmIChpc0Fycikge1xuICAgICAgdmFyIG9sZEluZGV4ID0gZGVzdC5pbmRleE9mKHZhbHVlKTtcbiAgICAgIC8vIHRoaXMgaXRlbSBuZXZlciBjaGFuZ2VkIGl0cyBwb3NpdGlvblxuICAgICAgaWYgKG9sZEluZGV4ID09PSBpbmRleCkgeyByZXR1cm4gfVxuICAgICAgLy8gcmVtb3ZlIHRoZSBpdGVtIGZyb20gaXRzIG9sZCBwb3NpdGlvblxuICAgICAgaWYgKG9sZEluZGV4ICE9PSAtMSkgeyBkZXN0LnNwbGljZShvbGRJbmRleCwgMSk7IH1cbiAgICAgIC8vIG1vdmUgb3IgYWRkIHRoZSBpdGVtXG4gICAgICBpZiAoaGFzSW5kZXgpIHtcbiAgICAgICAgZGVzdC5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc3QucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHsgb2JqW2tleV0gPSBbZGVzdCwgdmFsdWVdOyB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSBhbiBvYmplY3QgYXQgYSBnaXZlbiBrZXkuIElmIHRoZSBrZXkgcG9pbnRzIHRvIGFuIGFycmF5LFxuICogdGhlbiB0aGUgaXRlbSBpcyBqdXN0IHJlbW92ZWQgZnJvbSB0aGUgYXJyYXkuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvYmogLSBvYmplY3Qgb24gd2hpY2ggdG8gcmVtb3ZlIHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIHsgU3RyaW5nIH0ga2V5IC0gcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHsgT2JqZWN0IH0gdmFsdWUgLSB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7IEJvb2xlYW4gfSBlbnN1cmVBcnJheSAtIGVuc3VyZSB0aGF0IHRoZSBwcm9wZXJ0eSByZW1haW5zIGFuIGFycmF5XG4qL1xuZnVuY3Rpb24gYXJyYXlpc2hSZW1vdmUob2JqLCBrZXksIHZhbHVlLCBlbnN1cmVBcnJheSkge1xuICBpZiAoaXNBcnJheShvYmpba2V5XSkpIHtcbiAgICB2YXIgaW5kZXggPSBvYmpba2V5XS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7IG9ialtrZXldLnNwbGljZShpbmRleCwgMSk7IH1cbiAgICBpZiAoIW9ialtrZXldLmxlbmd0aCkgeyBkZWxldGUgb2JqW2tleV07IH1cbiAgICBlbHNlIGlmIChvYmpba2V5XS5sZW5ndGggPT09IDEgJiYgIWVuc3VyZUFycmF5KSB7IG9ialtrZXldID0gb2JqW2tleV1bMF07IH1cbiAgfSBlbHNlXG4gICAgeyBkZWxldGUgb2JqW2tleV07IH0gLy8gb3RoZXJ3aXNlIGp1c3QgZGVsZXRlIHRoZSBrZXlcbn1cblxuLyoqXG4gKiBNb3VudCBhIHRhZyBjcmVhdGluZyBuZXcgVGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHJvb3QgLSBkb20gbm9kZSB3aGVyZSB0aGUgdGFnIHdpbGwgYmUgbW91bnRlZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gbmFtZSBvZiB0aGUgcmlvdCB0YWcgd2Ugd2FudCB0byBtb3VudFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gb3B0aW9ucyB0byBwYXNzIHRvIHRoZSBUYWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gb3B0aW9uYWwgY29udGV4dCB0aGF0IHdpbGwgYmUgdXNlZCB0byBleHRlbmQgYW4gZXhpc3RpbmcgY2xhc3MgKCB1c2VkIGluIHJpb3QuVGFnIClcbiAqIEByZXR1cm5zIHsgVGFnIH0gYSBuZXcgVGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIG1vdW50VG8ocm9vdCwgdGFnTmFtZSwgb3B0cywgY3R4KSB7XG4gIHZhciBpbXBsID0gX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBpbXBsQ2xhc3MgPSBfX1RBR19JTVBMW3RhZ05hbWVdLmNsYXNzLFxuICAgIHRhZyA9IGN0eCB8fCAoaW1wbENsYXNzID8gT2JqZWN0LmNyZWF0ZShpbXBsQ2xhc3MucHJvdG90eXBlKSA6IHt9KSxcbiAgICAvLyBjYWNoZSB0aGUgaW5uZXIgSFRNTCB0byBmaXggIzg1NVxuICAgIGlubmVySFRNTCA9IHJvb3QuX2lubmVySFRNTCA9IHJvb3QuX2lubmVySFRNTCB8fCByb290LmlubmVySFRNTDtcblxuICB2YXIgY29uZiA9IGV4dGVuZCh7IHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMgfSwgeyBwYXJlbnQ6IG9wdHMgPyBvcHRzLnBhcmVudCA6IG51bGwgfSk7XG5cbiAgaWYgKGltcGwgJiYgcm9vdCkgeyBUYWckMS5hcHBseSh0YWcsIFtpbXBsLCBjb25mLCBpbm5lckhUTUxdKTsgfVxuXG4gIGlmICh0YWcgJiYgdGFnLm1vdW50KSB7XG4gICAgdGFnLm1vdW50KHRydWUpO1xuICAgIC8vIGFkZCB0aGlzIHRhZyB0byB0aGUgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICghY29udGFpbnMoX19UQUdTX0NBQ0hFLCB0YWcpKSB7IF9fVEFHU19DQUNIRS5wdXNoKHRhZyk7IH1cbiAgfVxuXG4gIHJldHVybiB0YWdcbn1cblxuLyoqXG4gKiBtYWtlcyBhIHRhZyB2aXJ0dWFsIGFuZCByZXBsYWNlcyBhIHJlZmVyZW5jZSBpbiB0aGUgZG9tXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IHRhZyB9IHRoZSB0YWcgdG8gbWFrZSB2aXJ0dWFsXG4gKiBAcGFyYW0geyByZWYgfSB0aGUgZG9tIHJlZmVyZW5jZSBsb2NhdGlvblxuICovXG5mdW5jdGlvbiBtYWtlUmVwbGFjZVZpcnR1YWwodGFnLCByZWYpIHtcbiAgdmFyIGZyYWcgPSBjcmVhdGVGcmFnKCk7XG4gIG1ha2VWaXJ0dWFsLmNhbGwodGFnLCBmcmFnKTtcbiAgcmVmLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGZyYWcsIHJlZik7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgZWxlbWVudHMgZm9yIGEgdmlydHVhbCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgTm9kZSB9IHNyYyAtIHRoZSBub2RlIHRoYXQgd2lsbCBkbyB0aGUgaW5zZXJ0aW5nIG9yIGFwcGVuZGluZ1xuICogQHBhcmFtIHsgVGFnIH0gdGFyZ2V0IC0gb25seSBpZiBpbnNlcnRpbmcsIGluc2VydCBiZWZvcmUgdGhpcyB0YWcncyBmaXJzdCBjaGlsZFxuICovXG5mdW5jdGlvbiBtYWtlVmlydHVhbChzcmMsIHRhcmdldCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgaGVhZCA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgdGFpbCA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgZnJhZyA9IGNyZWF0ZUZyYWcoKSxcbiAgICBzaWIsIGVsO1xuXG4gIHRoaXMucm9vdC5pbnNlcnRCZWZvcmUoaGVhZCwgdGhpcy5yb290LmZpcnN0Q2hpbGQpO1xuICB0aGlzLnJvb3QuYXBwZW5kQ2hpbGQodGFpbCk7XG5cbiAgdGhpcy5fXy5oZWFkID0gZWwgPSBoZWFkO1xuICB0aGlzLl9fLnRhaWwgPSB0YWlsO1xuXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nO1xuICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIHRoaXMkMS5fXy52aXJ0cy5wdXNoKGVsKTsgLy8gaG9sZCBmb3IgdW5tb3VudGluZ1xuICAgIGVsID0gc2liO1xuICB9XG5cbiAgaWYgKHRhcmdldClcbiAgICB7IHNyYy5pbnNlcnRCZWZvcmUoZnJhZywgdGFyZ2V0Ll9fLmhlYWQpOyB9XG4gIGVsc2VcbiAgICB7IHNyYy5hcHBlbmRDaGlsZChmcmFnKTsgfVxufVxuXG4vKipcbiAqIE1vdmUgdmlydHVhbCB0YWcgYW5kIGFsbCBjaGlsZCBub2Rlc1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBOb2RlIH0gc3JjICAtIHRoZSBub2RlIHRoYXQgd2lsbCBkbyB0aGUgaW5zZXJ0aW5nXG4gKiBAcGFyYW0geyBUYWcgfSB0YXJnZXQgLSBpbnNlcnQgYmVmb3JlIHRoaXMgdGFnJ3MgZmlyc3QgY2hpbGRcbiAqL1xuZnVuY3Rpb24gbW92ZVZpcnR1YWwoc3JjLCB0YXJnZXQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGVsID0gdGhpcy5fXy5oZWFkLFxuICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgc2liO1xuXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nO1xuICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIGVsID0gc2liO1xuICAgIGlmIChlbCA9PT0gdGhpcyQxLl9fLnRhaWwpIHtcbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgc3JjLmluc2VydEJlZm9yZShmcmFnLCB0YXJnZXQuX18uaGVhZCk7XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdldCBzZWxlY3RvcnMgZm9yIHRhZ3NcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gdGFnIG5hbWVzIHRvIHNlbGVjdFxuICogQHJldHVybnMgeyBTdHJpbmcgfSBzZWxlY3RvclxuICovXG5mdW5jdGlvbiBzZWxlY3RUYWdzKHRhZ3MpIHtcbiAgLy8gc2VsZWN0IGFsbCB0YWdzXG4gIGlmICghdGFncykge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoX19UQUdfSU1QTCk7XG4gICAgcmV0dXJuIGtleXMgKyBzZWxlY3RUYWdzKGtleXMpXG4gIH1cblxuICByZXR1cm4gdGFnc1xuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHQpIHsgcmV0dXJuICEvW14tXFx3XS8udGVzdCh0KTsgfSlcbiAgICAucmVkdWNlKGZ1bmN0aW9uIChsaXN0LCB0KSB7XG4gICAgICB2YXIgbmFtZSA9IHQudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gbGlzdCArIFwiLFtcIiArIElTX0RJUkVDVElWRSArIFwiPVxcXCJcIiArIG5hbWUgKyBcIlxcXCJdXCJcbiAgICB9LCAnJylcbn1cblxuXG52YXIgdGFncyA9IE9iamVjdC5mcmVlemUoe1xuXHRnZXRUYWc6IGdldFRhZyxcblx0aW5oZXJpdEZyb206IGluaGVyaXRGcm9tLFxuXHRtb3ZlQ2hpbGRUYWc6IG1vdmVDaGlsZFRhZyxcblx0aW5pdENoaWxkVGFnOiBpbml0Q2hpbGRUYWcsXG5cdGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZzogZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnLFxuXHR1bm1vdW50QWxsOiB1bm1vdW50QWxsLFxuXHRnZXRUYWdOYW1lOiBnZXRUYWdOYW1lLFxuXHRjbGVhblVwRGF0YTogY2xlYW5VcERhdGEsXG5cdGFycmF5aXNoQWRkOiBhcnJheWlzaEFkZCxcblx0YXJyYXlpc2hSZW1vdmU6IGFycmF5aXNoUmVtb3ZlLFxuXHRtb3VudFRvOiBtb3VudFRvLFxuXHRtYWtlUmVwbGFjZVZpcnR1YWw6IG1ha2VSZXBsYWNlVmlydHVhbCxcblx0bWFrZVZpcnR1YWw6IG1ha2VWaXJ0dWFsLFxuXHRtb3ZlVmlydHVhbDogbW92ZVZpcnR1YWwsXG5cdHNlbGVjdFRhZ3M6IHNlbGVjdFRhZ3Ncbn0pO1xuXG4vKipcbiAqIFJpb3QgcHVibGljIGFwaVxuICovXG52YXIgc2V0dGluZ3MgPSBzZXR0aW5ncyQxO1xudmFyIHV0aWwgPSB7XG4gIHRtcGw6IHRtcGwsXG4gIGJyYWNrZXRzOiBicmFja2V0cyxcbiAgc3R5bGVNYW5hZ2VyOiBzdHlsZU1hbmFnZXIsXG4gIHZkb206IF9fVEFHU19DQUNIRSxcbiAgc3R5bGVOb2RlOiBzdHlsZU1hbmFnZXIuc3R5bGVOb2RlLFxuICAvLyBleHBvcnQgdGhlIHJpb3QgaW50ZXJuYWwgdXRpbHMgYXMgd2VsbFxuICBkb206IGRvbSxcbiAgY2hlY2s6IGNoZWNrLFxuICBtaXNjOiBtaXNjLFxuICB0YWdzOiB0YWdzXG59O1xuXG4vLyBleHBvcnQgdGhlIGNvcmUgcHJvcHMvbWV0aG9kc1xudmFyIFRhZyQkMSA9IFRhZyQyO1xudmFyIHRhZyQkMSA9IHRhZyQxO1xudmFyIHRhZzIkJDEgPSB0YWcyJDE7XG52YXIgbW91bnQkJDEgPSBtb3VudCQxO1xudmFyIG1peGluJCQxID0gbWl4aW4kMTtcbnZhciB1cGRhdGUkJDEgPSB1cGRhdGUkMTtcbnZhciB1bnJlZ2lzdGVyJCQxID0gdW5yZWdpc3RlciQxO1xudmFyIHZlcnNpb24kJDEgPSB2ZXJzaW9uJDE7XG52YXIgb2JzZXJ2YWJsZSA9IG9ic2VydmFibGUkMTtcblxudmFyIHJpb3QkMSA9IGV4dGVuZCh7fSwgY29yZSwge1xuICBvYnNlcnZhYmxlOiBvYnNlcnZhYmxlJDEsXG4gIHNldHRpbmdzOiBzZXR0aW5ncyxcbiAgdXRpbDogdXRpbCxcbn0pO1xuXG5leHBvcnRzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5leHBvcnRzLnV0aWwgPSB1dGlsO1xuZXhwb3J0cy5UYWcgPSBUYWckJDE7XG5leHBvcnRzLnRhZyA9IHRhZyQkMTtcbmV4cG9ydHMudGFnMiA9IHRhZzIkJDE7XG5leHBvcnRzLm1vdW50ID0gbW91bnQkJDE7XG5leHBvcnRzLm1peGluID0gbWl4aW4kJDE7XG5leHBvcnRzLnVwZGF0ZSA9IHVwZGF0ZSQkMTtcbmV4cG9ydHMudW5yZWdpc3RlciA9IHVucmVnaXN0ZXIkJDE7XG5leHBvcnRzLnZlcnNpb24gPSB2ZXJzaW9uJCQxO1xuZXhwb3J0cy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJpb3QkMTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yaW90L3Jpb3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCdyaW90JykpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cycsICdyaW90J10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5yaW90SG90UmVsb2FkID0gZ2xvYmFsLnJpb3RIb3RSZWxvYWQgfHwge30pLGdsb2JhbC5yaW90KSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cyxyaW90KSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIG5vblN0YXRlID0gJ2lzTW91bnRlZCBvcHRzJy5zcGxpdCgnICcpO1xuXG5mdW5jdGlvbiByZWxvYWQobmFtZSkge1xuICByaW90LnV0aWwuc3R5bGVNYW5hZ2VyLmluamVjdCgpO1xuXG4gIHZhciBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoKG5hbWUgKyBcIiwgW2RhdGEtaXM9XCIgKyBuYW1lICsgXCJdXCIpKTtcbiAgdmFyIHRhZ3MgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVsID0gZWxlbXNbaV0sIG9sZFRhZyA9IGVsLl90YWcsIHY7XG4gICAgcmVsb2FkLnRyaWdnZXIoJ2JlZm9yZS11bm1vdW50Jywgb2xkVGFnKTtcbiAgICBvbGRUYWcudW5tb3VudCh0cnVlKTsgLy8gZGV0YWNoIHRoZSBvbGQgdGFnXG5cbiAgICAvLyByZXNldCB0aGUgaW5uZXJIVE1MIGFuZCBhdHRyaWJ1dGVzIHRvIGhvdyB0aGV5IHdlcmUgYmVmb3JlIG1vdW50XG4gICAgZWwuaW5uZXJIVE1MID0gb2xkVGFnLl9fLmlubmVySFRNTDtcbiAgICAob2xkVGFnLl9fLmluc3RBdHRycyB8fCBbXSkubWFwKGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgLy8gY29weSBvcHRpb25zIGZvciBjcmVhdGluZyB0aGUgbmV3IHRhZ1xuICAgIHZhciBuZXdPcHRzID0ge307XG4gICAgZm9yKGtleSBpbiBvbGRUYWcub3B0cykge1xuICAgICAgbmV3T3B0c1trZXldID0gb2xkVGFnLm9wdHNba2V5XTtcbiAgICB9XG4gICAgbmV3T3B0cy5wYXJlbnQgPSBvbGRUYWcucGFyZW50O1xuXG4gICAgLy8gY3JlYXRlIHRoZSBuZXcgdGFnXG4gICAgcmVsb2FkLnRyaWdnZXIoJ2JlZm9yZS1tb3VudCcsIG5ld09wdHMsIG9sZFRhZyk7XG4gICAgdmFyIG5ld1RhZyA9IHJpb3QubW91bnQoZWwsIG5ld09wdHMpWzBdO1xuXG4gICAgLy8gY29weSBzdGF0ZSBmcm9tIHRoZSBvbGQgdG8gbmV3IHRhZ1xuICAgIGZvcih2YXIga2V5IGluIG9sZFRhZykge1xuICAgICAgdiA9IG9sZFRhZ1trZXldO1xuICAgICAgaWYgKH5ub25TdGF0ZS5pbmRleE9mKGtleSkpIHsgY29udGludWUgfVxuICAgICAgbmV3VGFnW2tleV0gPSB2O1xuICAgIH1cbiAgICBuZXdUYWcudXBkYXRlKCk7XG4gICAgdGFncy5wdXNoKG5ld1RhZyk7XG4gICAgcmVsb2FkLnRyaWdnZXIoJ2FmdGVyLW1vdW50JywgbmV3VGFnLCBvbGRUYWcpO1xuICB9XG5cbiAgcmV0dXJuIHRhZ3Ncbn1cblxucmlvdC5vYnNlcnZhYmxlKHJlbG9hZCk7XG5yaW90LnJlbG9hZCA9IHJlbG9hZDtcbmlmIChyaW90LmRlZmF1bHQpIHsgcmlvdC5kZWZhdWx0LnJlbG9hZCA9IHJlbG9hZDsgfVxuXG5leHBvcnRzLnJlbG9hZCA9IHJlbG9hZDtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJlbG9hZDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yaW90LWhvdC1yZWxvYWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4gICAgdmFyIHJpb3QgPSByZXF1aXJlKCdyaW90JylcbiAgICAvL3NyYzogc3JjL2xvZ2dlci9hcHAudGFnLmh0bWxcbmltcG9ydCAnLi9sb2dzLnRhZy5odG1sJ1xucmlvdC50YWcyKCdhcHAnLFxuICAnPGgxPkxvZ2dlcjwvaDE+IDxidXR0b24gb25jbGljaz1cIntnZW5lcmF0ZX1cIj5BZGQ8L2J1dHRvbj4gPGJ1dHRvbiBvbmNsaWNrPVwie2NsZWFyTG9nc31cIj5DbGVhcjwvYnV0dG9uPiA8bG9ncyBsb2dzPVwie2xvZ3N9XCI+PC9sb2dzPicsXG4gICcnLFxuICAnJywgZnVuY3Rpb24ob3B0cykge1xuXG4gICAgdGhpcy5sb2dzID0gW11cblxuICAgIHRoaXMuZ2VuZXJhdGUgPSAoZSkgPT4ge1xuICAgICAgdGhpcy5sb2dzLnB1c2goeyB0aXRsZTogJ2hlbGxvJywgYm9keTogJ3NvbWUgcGFuZWwgYm9keSB0ZXh0JyB9KVxuICAgIH1cblxuICAgIHRoaXMuY2xlYXJMb2dzID0gKGUpID0+IHtcbiAgICAgIHRoaXMubG9ncyA9IFtdXG4gICAgfVxufSk7XG5cbiAgICBcbiAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgcmlvdC5yZWxvYWQoJ2FwcCcpXG4gICAgfVxuICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xvZ2dlci9hcHAudGFnLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHJpb3QgZnJvbSAncmlvdCdcbmltcG9ydCAncmlvdC1ob3QtcmVsb2FkJ1xuaW1wb3J0ICcuL2FwcC50YWcuaHRtbCdcblxucmlvdC5tb3VudCgnYXBwJylcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2dnZXIvYXBwLmpzIiwiXG4gICAgdmFyIHJpb3QgPSByZXF1aXJlKCdyaW90JylcbiAgICAvL3NyYzogc3JjL2xvZ2dlci9sb2dzLnRhZy5odG1sXG5yaW90LnRhZzIoJ2xvZ3MnLFxuICAnPGRpdiBlYWNoPVwie29wdHMubG9nc31cIiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj4gPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj4gPGgzIGNsYXNzPVwicGFuZWwtdGl0bGVcIj4ge3RpdGxlfSA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9XCJ0ZXh0LXNoYWRvdzogbm9uZTtcIj4mdGltZXM7PC9idXR0b24+IDwvaDM+IDwvZGl2PiA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPiB7Ym9keX0gPC9kaXY+IDwvZGl2PicsXG4gICcnLFxuICAnJywgZnVuY3Rpb24ob3B0cykge1xufSk7XG5cbiAgICBcbiAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgcmlvdC5yZWxvYWQoJ2xvZ3MnKVxuICAgIH1cbiAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9sb2dnZXIvbG9ncy50YWcuaHRtbFxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9