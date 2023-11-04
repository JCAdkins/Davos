import { SwitchTransition, CSSTransition } from "react-transition-group";
import React, { useState, useRef } from "react";
import "./PaginatedTransitions.css";

const PaginatedTransitions = ({ children }) => {
  const [child1, child2, child3] = children;
  const [state, setState] = useState(false);
  const entRef = useRef(null);
  const exiRef = useRef(null);
  const nRef = state ? exiRef : entRef;

  return (
    <SwitchTransition mode={"out-in"}>
      <CSSTransition
        key={state ? "Exiting" : "Entering"}
        nodeRef={nRef}
        timeout={200}
        addEndListener={(done) => {
          nRef.current.addEventListener("transitionend", done, false);
        }}
        classNames="paginate-fade"
      >
        <>
          <child1.type
            {...child1.props}
            onClick={() => {
              setState((state) => !state);
              child2.props.onClick;
            }}
          />
          <child2.type {...child2.props} ref={nRef} />
          <div className="flex w-full justify-center">
            <child3.type
              {...child3.props}
              onClick={() => {
                setState((state) => !state);
                child2.props.onClick;
              }}
            />
          </div>
        </>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default PaginatedTransitions;
