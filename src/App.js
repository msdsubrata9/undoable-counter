import { useState } from "react";

function App() {
  const negativeCountersList = ["-100", "-10", "-1"];
  const positiveCountersList = ["+1", "+10", "+100"];

  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [undoCount, setUndoCount] = useState(0);

  function maintainHistory(state, prev, curr) {
    const obj = {
      state,
      prev,
      curr,
    };
    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  }

  function handleClick(btnValue) {
    const parsedValue = parseInt(btnValue);
    maintainHistory(btnValue, count, count + parsedValue);
    setCount(count + parsedValue);
  }

  function handleUndo() {
    if (undoCount === 50) {
      alert("you can not undo beyond 5 time");
      return;
    }
    if (history.length === 0) {
      alert("undo not possible");
      return;
    }
    // increment the undocount
    setUndoCount(undoCount + 1);
    // removed the first item
    const copyHistory = [...history];
    const firstItem = copyHistory.shift();
    setHistory(copyHistory);
    // set the value of counter with the remove value previous value
    setCount(firstItem.prev);
    // push the removed value in the redoList
    const copyRedoList = [...redoList];
    copyRedoList.push(firstItem);
    setRedoList(copyRedoList);
  }

  function handleRedo() {
    if (redoList.length === 0) {
      alert("redo not possible");
      return;
    }
    // remove from redo list
    const copyRedoList = [...redoList];
    const firstItem = copyRedoList.pop();
    setRedoList(copyRedoList);
    // set the value of counter with the remove value current value
    setCount(firstItem.curr);
    // add it in the first position of history array
    const copyHistory = [...history];
    copyHistory.unshift(firstItem);
    setHistory(copyHistory);
  }

  return (
    <div className="bg-gray-300 min-h-screen h-full">
      <h1 className="font-bold text-center text-4xl p-8">Undoable Counter</h1>
      <div>
        <div className="text-center">
          <button
            className="mx-10 p-6 bg-purple-500 font-bold text-2xl rounded-lg"
            onClick={handleUndo}
          >
            Undo
          </button>
          <button
            className="p-6 bg-purple-500 font-bold text-2xl rounded-lg"
            onClick={handleRedo}
          >
            Redo
          </button>
        </div>

        <div className="flex justify-center m-10">
          <div>
            {negativeCountersList.map((btn, index) => (
              <button
                className="mx-10 p-4 px-8 bg-purple-500"
                key={index}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="text-4xl font-bold">{count}</div>
          <div>
            {positiveCountersList.map((btn, index) => (
              <button
                className="mx-10 p-4 px-8 bg-purple-500"
                key={index}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="border h-96 w-1/3 border-black mx-auto my-10 overflow-y-auto">
            <div className="text-2xl text-center">History</div>
            <div className="text-center">
              {history.map((h, index) => (
                <div key={index} className="flex justify-evenly text-xl">
                  <div>{h.state}</div>
                  <div>
                    ({h.prev}▶️{h.curr})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
