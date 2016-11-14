"use strict";

let fs = require('fs');
let yaml = require('js-yaml');
let crhjson = JSON.parse(fs.readFileSync('crhallberg.json'));
let dumpsets = [];
for (let i = 0; i < crhjson.order.length; i++) {
  let crhset = crhjson[crhjson.order[i]];
  let dumpcards = {};
  if (crhset.white.length > 0) {
    dumpcards.white = crhset.white.map(function(cardIndex) {
      return {
        text: crhjson.whiteCards[cardIndex]
      };
    });
  }
  if (crhset.black.length > 0) {
    dumpcards.black = crhset.black.map(function(cardIndex) {
      let blackCard = crhjson.blackCards[cardIndex];
      return {
        text: blackCard.text.replace(/_/g,'_____'),
        pick: blackCard.pick
      };
    });
  }
  dumpsets[i] = {
    name: crhset.name,
    brand: 'Cards Against Humanity',
    logo: 'cahlogo.svg',
    cards: dumpcards
  }
}
fs.writeFileSync('official.yaml', yaml.dump({
  sets: dumpsets
}, {
  noRefs: true,
  lineWidth: Infinity
}), 'utf8');
