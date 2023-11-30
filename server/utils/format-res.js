require('../common/types');

/**
 * Format resource for server response
 * @param {Document} doc Resource document
 * @param {string[]} props Properties to return
 * @returns {object} Formatted document
 */
function formatRes(doc, props) {
  let res = {};
  props.forEach((prop) => (res[prop] = doc[prop]));
  return res;
}

module.exports = formatRes;
