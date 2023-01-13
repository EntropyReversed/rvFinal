import gsap from 'gsap';
import Manager from '../Manager';

export default class Text {
  constructor() {
    this.manager = new Manager();
    this.timeline = gsap.timeline();
    this.splitText('.firstTitle');
    // this.splitHTML2(document.querySelector('.firstTitle'))
  }

  getTimeline() {
    return this.timeline
      .fromTo(
        '.firstTitle .letter',
        { opacity: 0 },
        {
          duration: 0.1,
          opacity: 1,
          stagger: 0.012,
        }
      )
      .to({}, { duration: 0.3 })
      .to(
        '.firstTitle',
        {
          opacity: 0,
          duration: 0.2,
        },
        '+=0.2'
      );
  }

  splitHTML(element) {
    var html = element.innerHTML;
    var result = [];
    var currentWord = '';
    var currentTag = '';
    var inTag = false;
    for (var i = 0; i < html.length; i++) {
      var char = html[i];
      if (char === '<') {
        if (currentWord) {
          result.push(`<span class="word">${currentWord}</span>`);
          currentWord = '';
        }
        inTag = true;
        currentTag = '';
      } else if (char === '>') {
        inTag = false;
        result.push(currentTag);
      } else if (inTag) {
        currentTag += char;
      } else {
        if (char === ' ') {
          if (currentWord) {
            result.push(`<span class="word">${currentWord}</span>`);
            currentWord = '';
          }
        } else {
          currentWord += `<span class="letter">${char}</span>`;
        }
      }
    }
    if (currentWord) {
      result.push(`<span class="word">${currentWord}</span>`);
    }

    element.innerHTML = result;
  }

  splitHTML2(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let words = node.nodeValue.split(/\b/);
      let parent = node.parentNode;
      parent.removeChild(node);
      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.length === 0) continue;
        let wordNode = document.createElement('span');
        wordNode.classList.add('word');
        parent.appendChild(wordNode);
        for (let j = 0; j < word.length; j++) {
          let letter = word[j];
          let letterNode = document.createElement('span');
          letterNode.classList.add('letter');
          letterNode.textContent = letter;
          wordNode.appendChild(letterNode);
        }
      }
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        splitHTML(node.childNodes[i]);
      }
    }
    return node;
  }
  splitText(selector) {
    const node = this.manager.parent.querySelector(selector);
    node.innerHTML = node.innerText
      .split(/\s/)
      .map((word) => {
        return `<span class="word">${word}</span>`;
      })
      .join('\xa0');

    node.querySelectorAll('.word').forEach((word) => {
      word.innerHTML = word.innerText
        .split('')
        .map((letter) => {
          return `<span class="letter">${letter}</span>`;
        })
        .join(' ');
    });
  }
}
