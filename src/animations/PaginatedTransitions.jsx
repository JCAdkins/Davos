import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import "./PaginatedTransitions.css";

const PaginatedTransitions = () => {
  const [state, setState] = useState(false);
  const helloRef = useRef(null);
  const goodbyeRef = useRef(null);
  const nodeRef = state ? goodbyeRef : helloRef;
  return (
    <SwitchTransition>
      <CSSTransition
        key={state ? "Goodbye, world!" : "Hello, world!"}
        nodeRef={nodeRef}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames="fade"
      >
        <button ref={nodeRef} onClick={() => setState((state) => !state)}>
          {state ? "Goodbye, world!" : "Hello, world!"}
        </button>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default PaginatedTransitions;
