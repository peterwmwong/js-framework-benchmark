'use strict';

function random(list){
  return list[((Math.random() * 1000) | 0) % list.length];
}

const ADJECTIVES = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
const COLOURS = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
const NOUNS = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

export default class {
  constructor() {
    this.id = 1;
    this.clear();
  }
  addData(count) {
    for (var i = 0; i < count; i++) {
      this.data.push({
        id: this.id++,
        label: `${random(ADJECTIVES)} ${random(COLOURS)} ${random(NOUNS)}`
      });
    }
  }
  updateData() {
    var d, data = this.data;
    for (var i = 0; i < data.length; i += 10) {
      d = data[i];
      data[i] = { id: d.id, label: `${d.label} !!!` };
    }
  }
  delete(id) {
    var idx = this.data.findIndex(d => d.id === id);
    this.data.splice(idx, 1);
  }
  run() {
    this.clear();
    this.addData(1000);
  }
  add() {
    this.addData(1000);
    this.selected = 0;
  }
  update() {
    this.updateData();
    this.selected = 0;
  }
  select(id) {
    this.selected = id;
  }
  runlots() {
    this.clear();
    this.addData(10000);
  }
  clear() {
    this.data = [];
    this.selected = 0;
  }
  swaprows() {
    if(this.data.length > 10) {
      var a = this.data[4];
      this.data[4] = this.data[9];
      this.data[9] = a;
    }
  }
}
