import { forwardRef, useImperativeHandle, useRef } from "react";

import { createPortal } from "react-dom";
//if we wrap our whole component with forwardRef then this component will accept to arguments as below
// 1) the destructring props
// 2) the ref hook as down below
const ResultModel = forwardRef(function ResultModel(
  { remainingTime, targetTime, onReset }, // destructring props
  ref //this is other argument ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  //useImperativeHandle hook takes 2 arguments first must be the 'ref' that we use as props and the second will be the function that returns an object that groups all the properties and methods that ref prop has
  //useImperativeHandle is also only work with the forwardRef
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  //NOTE create portal takes 2 arguments first the code like i have a dialog tag here and the second argument will be the id element of a tag where we want to dislay it in our debugger.

  //its code will be stay here but when we debug the code in console this dialog tag will be shown in modal div which is in the index.html file thats why we use createPortal function here to show it seperate in a div instead of nested components.
  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You Lost!</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the time with
        <strong> {formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,

    document.getElementById("modal")
  );
});
export default ResultModel;
