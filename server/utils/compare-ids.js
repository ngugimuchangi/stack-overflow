/**
 * This function compares two mongo or mongoose ids are equal or not.
 * @param {String} idA - id of the first document
 * @param {String} idB - id of the second document
 * @returns {Boolean} - true if equal, false otherwise
 */
function isSameId(idA, idB) {
  return idA.toString() === idB.toString();
}

module.exports = isSameId;
