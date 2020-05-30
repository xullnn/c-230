let h2s = document.querySelectorAll('h2');
Array.from(h2s).map(h2 => h2.textContent.split(' ').length);
//
let a1 = document.querySelector('#toc');
let a2 = document.querySelector('#mf-section-0 div.toc');
let a3 = document.querySelector('#mf-section-0').lastElementChild;
//

let links = document.querySelectorAll('#toc a');
for(let i = 0; i < links.length; i += 1) {
  links[i].style.color = 'green';
}

//

let thumbcaptions = document.querySelectorAll('.thumbcaption');
Array.from(thumbcaptions).map(t => t.textContent.trim());

//

let ranks = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];

let object = {};
let currentRankTd, siblingTd;
let tds = Array.from(document.querySelectorAll('.infobox td'));
ranks.forEach(rank => {
  currentRankTd = tds.find(td => td.textContent.match(new RegExp(rank)));
  object[rank] = currentRankTd.nextElementSibling.textContent.trim();
})
