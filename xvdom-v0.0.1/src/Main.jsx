'use strict';

import xvdom from 'xvdom';
import Store from './Store.js';

let startTime;
let lastMeasure;
function startMeasure(name) {
  startTime = performance.now();
  lastMeasure = name;
}
function stopMeasure() {
  if (!lastMeasure) return;

  const last = lastMeasure;
  window.setTimeout(() => {
    const duration = performance.now() - startTime;
    lastMeasure = null;
    console.log(`${last} took ${duration}`);
  }, 0);
}

function renderRows({ data, selected }) {
  var d, id, rows = [];
  for (var i = 0; i < data.length; i++) {
    d = data[i];
    id = d.id;
    rows.push(
      <tr className={id === selected ? 'danger':''}>
        <td className="col-md-1" innerText={id} />
        <td className="col-md-4">
          <a className="lbl" innerText={d.label} />
        </td>
        <td className="col-md-1">
          <a className="remove">
            <span className="glyphicon glyphicon-remove" />
          </a>
        </td>
        <td className="col-md-6"></td>
      </tr>
    );
  }
  return rows;
}

const Main = ({ state, bindSend }) => (
  <div className="container" onclick={bindSend('onClick')}>
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-6">
          <h1>xvdom</h1>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="run"
              >
                Create 1,000 rows
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="runlots"
              >
                Create 10,000 rows
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="add"
              >
                Append 1,000 rows
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="update"
              >
                Update every 10th row
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="clear"
              >
                Clear
              </button>
            </div>
            <div className="col-sm-6 smallpad">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="swaprows"
              >
                Swap Rows
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table className="table table-hover table-striped test-data">
      <tbody>
        {renderRows(state.store)}
      </tbody>
    </table>
    <span className="preloadicon glyphicon glyphicon-remove"></span>
  </div>
);


function getParentId(elem) {
  while (elem.tagName !== 'TR') elem = elem.parentNode;
  return elem && +elem.firstChild.innerText;
}

Main.state = {
  onInit: () => ({ store: new Store() }),
  onClick({ state, state: { store } }, e) {
    const { target, target: { id } } = e;

    if (target.matches('.remove, .remove *')) {
      e.preventDefault();
      startMeasure("delete");
      store.delete(getParentId(target));
      return { store };
    }
    else if (target.matches('.lbl')) {
      e.preventDefault();
      startMeasure("select");
      store.select(getParentId(target));
      return { store };
    }
    else if (id && store[id]) {
      e.preventDefault();
      startMeasure(id);
      store[id]();
      return { store };
    }

    return state;
  }
};

main.appendChild(
  xvdom.render(<Main/>)
);
