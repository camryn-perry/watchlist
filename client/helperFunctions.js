const urlFriendly = word => {
  return word
    .toLowerCase()
    .split(' ')
    .join('+');
};

module.exports = {
  urlFriendly
};
