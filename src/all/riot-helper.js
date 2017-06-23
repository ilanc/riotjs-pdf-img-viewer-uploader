// https://github.com/riot/riot/issues/934
//import $ from 'jquery'

export function domToTag(el) {
  return el._tag;
}

export function jqueryToTag(selector, startNode) {
  //var el = $(selector, startNode); // jquery doesn't work when called from 'mount' but does from console whilst single stepping?
  if (!startNode.root)
    return undefined;
  var el = startNode.root.querySelectorAll(selector);
  if (!el || !el.length)
    return undefined;
  return el[0]._tag;
}

export function tagToJquery(tag) {

}
