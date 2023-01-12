import { useState } from "react";

export default function useVisualMode(initial) {
  //I used let instead of const
  let [mode, setMode] = useState(initial);
  let [history, setHistory] = useState([initial]);
  // console.log('before transition', history)
  //transition function
  function transition(nextMode, replace = false) {
    //if replace is true then FIRST, (SECOND sliced), THIRD
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), nextMode]);
    } else {
      setHistory(prev => [...prev, nextMode]);
    }
    setMode(nextMode);
  }
  // console.log('after transition', history)
  //back function
  function back() {
    // console.log('starting back', history)
    if (history.length > 1) {
      // console.log('if length is greater than 1', history)
      setHistory(prev => {
        //back function (FIRST, THIRD) go back to FIRST, so remove last value(THIRD)
        const previousHistory = prev.slice(0, -1);
        const historyLen = previousHistory.length;
        // console.log('X', x);
        // console.log('History', history);
        setMode(previousHistory[historyLen - 1]);
        return [...previousHistory]
      })
      // console.log('after set history', history)
    }
  }
  // console.log('after back', history)
  return { mode, transition, back };

}


// import { useState } from "react";

// export default function useVisualMode(initial) {
//   //I used let instead of const
//   let [mode, setMode] = useState(initial);
//   let [history, setHistory] = useState([initial]);
//   console.log('before transition', history)
//   //transition function
//   function transition(nextMode, replace = false) {
//     if (replace) {
//       setHistory(prev => [...prev.slice(0, -1), nextMode]);
//     } else {
//       setHistory(prev => [...prev, nextMode]);
//     }
//     setMode(nextMode);
//   }
//   console.log('after transition', history)
//   //back function
//   function back() {
//     console.log('starting back', history)
//     if (history.length > 1) {
//       console.log('if length is greater than 1', history)
//       setHistory(prev => {

//         const x = prev.slice(0, -1)
//         setMode(x[x.length - 1]);
//         return [...x]
//       })
//       console.log('after set history', history)
//     }
//   }
//   console.log('after back', history)
//   return { mode, transition, back };
// }