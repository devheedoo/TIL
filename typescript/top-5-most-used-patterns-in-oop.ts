// Top 5 Most Used Patterns in OOP with TypeScript
// https://www.netguru.com/codestories/top-5-most-used-patterns-in-oop-with-typescript

/* Singleton: restricted number of instances */
class Singleton {
  private static instance: Singleton | null;
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

/*
console.log(Singleton.getInstance() === Singleton.getInstance());
// true
*/

/* Fluent Interface: be more readable, easier to compose */
class FluentBook {
  private title: string | undefined;
  private author: string | undefined;
  private rating: number | undefined;

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setAuthor(author: string) {
    this.author = author;
    return this;
  }

  setRating(rating: number) {
    this.rating = rating;
    return this;
  }

  getInfo() {
    const {title, author, rating} = this;
    return `"${title}" is written by ${author} with ${rating} out of 5 stars`;
  }
}

/*
console.log(
  new FluentBook()
    .setTitle('Quick Start TypeScript')
    .setAuthor('Jinwook Jeong')
    .setRating(4)
    .getInfo()
)
*/

/* Observer: handy to tie objects with abstraction and freedom of implementation */
const sleep = async function(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface Observer {
  update: Function;
}

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

class Observable {
  constructor(protected observers: Observer[] = []) {}
  /* above code is same as below
  protected observers: Observer[] = [];
  constructor(theObservers: Observer[]) {
    this.observers = theObservers;
  }
  */

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);
  }

  notify(object: {}) {
    this.observers.forEach(observer => {
      observer.update(object);
    })
  }
}

class GPSDevice extends Observable {
  constructor(private coordinate: Coordinate = {x: 0, y: 0, z: 0}) {
    super();
  }

  process() {
    this.coordinate.x = Math.random() * 100;
    this.coordinate.y = Math.random() * 100;
    this.coordinate.z = Math.random() * 100;

    this.notify(this.coordinate);
  }
}

class Logger implements Observer {
  update(coord: Coordinate) {
    const {x, y, z} = coord;
    console.log(`Got the next data ${x} ${y} ${z}`);
  }
}

class TwoDimensionalLogger implements Observer {
  update(coord: Coordinate) {
    const {x, y} = coord;
    console.log(`Got the next 2D data ${x} ${y}`);
  }
}

const gps = new GPSDevice();
const logger = new Logger();
const twoDLogger = new TwoDimensionalLogger();

gps.attach(logger);
gps.attach(twoDLogger);

/*
(async () => {
  for (let tick = 0; tick < 10; tick++) {
    await (async () => {
      await sleep(1000);
      if (tick === 3) gps.detach(logger);
      gps.process();
    })();
  }
})();
*/

/* Composite: easy to run, test, and understand on tree structure */
interface Component {
  operation: Function;
}

abstract class Leaf implements Component {
  operation() {}
}

abstract class Composite implements Component {
  protected children: Component[] = [];
  operation() {
    this.children.forEach(child => {
      child.operation();
    });
  }

  add(component: Component) {
    this.children.push(component);
  }

  remove(component: Component) {
    this.children.splice(this.children.indexOf(component), 1);
  }

  getChildren() {
    return this.children;
  }
}

class Duck extends Composite {
  constructor(children: Component[]) {
    super();
    this.children = children;
  }
}

class DuckVoice extends Leaf {
  operation() {
    console.log('Quack.');
  }
}

class DuckFly extends Composite {
  operation() {
    console.log('It flies.');
    super.operation();
  }

  add(component: Component) {
    super.add(component);
    return this;
  }
}

class Wing extends Leaf {
  operation() {
    console.log('Flap-flap-flap');
  }
}

/*
const wings = [new Wing(), new Wing()];
const flyAbility = new DuckFly().add(wings[0]).add(wings[1]);
const voiceAbility = new DuckVoice();

const duck = new Duck([flyAbility, voiceAbility]);
duck.operation();
*/

/* Abstract Factory: implement what you want and expose the interface */
interface SoundFactory {
  create: Function;
}

interface Sound {
  enable: Function;
}

class FerrariSound implements Sound {
  enable() {
    console.log('Wroom-wroom-wroom!');
  }
}

class BirdSound implements Sound {
  enable() {
    console.log('Flap-flap-flap.');
  }
}

class FerrariSoundFactory implements SoundFactory {
  create() {
    return new FerrariSound();
  }
}

class BirdSoundFactory implements SoundFactory {
  create() {
    return new BirdSound();
  }
}

/*
(() => {
  let factory: SoundFactory | null = null;
  const type = Math.random() > 0.5 ? 'ferrari' : 'bird';

  switch (type) {
    case 'ferrari':
      factory = new FerrariSoundFactory();
      break;
    case 'bird':
      factory = new BirdSoundFactory();
      break;
  }

  if (factory) {
    const soundMaker = factory.create();
    soundMaker.enable();
  }
})();
*/