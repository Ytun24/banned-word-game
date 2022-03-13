const RandomWord = (words) => {
  console.log(words.length);
  var word = words[Math.floor(Math.random() * words.length)];
  return word;
};

export default RandomWord;
