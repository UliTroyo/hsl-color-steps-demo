'use strict';

const ColorGraph = function(domNode) {
  this.domNode = domNode;
  this.hueSlider = document.querySelector('input[name=hue]');
  this.satSlider = document.querySelector('input[name=saturation]');
  this.lightSlider = document.querySelector('input[name=lightness]');

  this.hue = this.hueSlider.value || 200;
  this.rows = this.satSlider.value || 15;
  this.columns = this.satSlider.value || 10;

  this.hueOutput = document.querySelector('[for=hue] > span');
  this.satOutput = document.querySelector('[for=saturation] > span');
  this.lightOutput = document.querySelector('[for=lightness] > span');
};

ColorGraph.prototype.init = function() {
  this.populateTable();

  this.hueSlider.addEventListener('change', this.changeHue.bind(this));
  this.satSlider.addEventListener('change', this.changeSat.bind(this));
  this.lightSlider.addEventListener('change', this.changeLight.bind(this));

  this.hueSlider.oninput = () => {
    this.hueOutput.style.backgroundColor = `hsl(${
      this.hueSlider.value
    }, 100%, 50%)`;
  };
  this.satSlider.oninput = () => {
    this.satOutput.textContent = this.satSlider.value;
  };
  this.lightSlider.oninput = () => {
    this.lightOutput.textContent = this.lightSlider.value;
  };
};

ColorGraph.prototype.populateTable = function() {
  const hue = this.hue;
  const rows = this.rows;
  const cols = this.columns;
  const lightStops = rows - 1;
  const satStops = cols - 1;
  const table = document.createElement('table');
  const oldTable = document.querySelector('.color-graph>table');

  table.style.setProperty('--columns', `calc(100% / ${cols})`);
  for (let i = 0; i < rows; i++) {
    const light = ((100.0 / lightStops) * (rows - i - 1)).toFixed(0);
    let row = table.insertRow(-1);
    for (let j = 0; j < cols; j++) {
      const sat = ((100.0 / satStops) * j).toFixed(0);
      const text = `hsl(${hue}, ${sat}%, ${light}%)`;
      const cell = row.insertCell(j);
      const span = document.createElement('span');
      cell.style.backgroundColor = text;
      span.classList.add('cell-text');
      span.textContent = text;
      cell.appendChild(span);
    }
  }
  this.domNode.replaceChild(table, oldTable);
};

ColorGraph.prototype.changeHue = function(e) {
  const hue = 1 * e.target.value; // multiplying by 1 casts value to int
  this.hue = hue;
  document.querySelector('body').style.background = `hsl(${hue}, 80%, 40%)`;
  this.populateTable();
};

ColorGraph.prototype.changeSat = function(e) {
  this.columns = 1 * e.target.value;
  this.populateTable();
};

ColorGraph.prototype.changeLight = function(e) {
  this.rows = 1 * e.target.value;
  this.populateTable();
};

const colorGraph = new ColorGraph(document.querySelector('.color-graph'));
colorGraph.init();
