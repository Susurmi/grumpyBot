const deUmlaut = (word) => {
    word = word.replace(/ä/g, 'ae');
    word = word.replace(/ö/g, 'oe');
    word = word.replace(/ü/g, 'ue');
    word = word.replace(/ß/g, 'ss');
    return word;
  };

module.exports = { deUmlaut };