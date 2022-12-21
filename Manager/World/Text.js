import gsap from 'gsap';
import Manager from '../Manager';

export default class Text {
  constructor() {
    this.manager = new Manager();
    this.timeline = gsap.timeline();
    this.splitText('.firstTitle .top');
    this.splitText('.firstTitle .btm');
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
      .to({}, {duration: 0.3})
      .to(
        '.firstTitle',
        {
          opacity: 0,
          duration: 0.2,
        },
        '+=0.2'
      );
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
