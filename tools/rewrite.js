"use strict";

let fs = require('fs');
let yaml = require('js-yaml');

let doc = yaml.load(fs.readFileSync('../cah-yaml/official.yaml'));

console.log(`brand:
  name: Cards Against Humanity
sets:`);

for(let cardSet of doc.sets) {
  console.log(`- name: ${cardSet.name}
  cards:`);
  for (let type of ['white','black']) if (cardSet.cards[type]) {
    console.log(`    ${type}:`);
    for(let card of cardSet.cards[type]) {
      console.log(
`    - text: |-
        ${card.text}`);
      if (card.pick && card.pick != 1)
        console.log(`      pick: ${card.pick}`);
      if (card.credit)
        console.log(`      credit: ${card.credit}`);
    }
    console.log('');
  }
}