module.exports = function(string) {
  newArray = string.split(",").map(tech => tech.trim());
  return newArray;
};
