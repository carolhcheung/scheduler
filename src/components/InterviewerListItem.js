import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const { name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames('interviewers__item', {
    "interviewers__item--selected": props.selected
  })

  const renderName = (name, selected) => {
    if (selected) {
      return `${name}`;
    }
  };

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {renderName(name, selected)}
    </li>
  );
}

// below is ternary method instead
// const {id, name, avatar, selected, setInterviewer} = props;

// return (
//   <li className={`interviewers__item ${selected ? 'interviewers__item--selected' : ''}`}
//     onClick={() => setInterviewer(id)}>
//     <img
//       className="interviewers__item-image"
//       src={avatar}
//       alt={name}
//     />
//     {name}
//   </li>
// );


  // return <li className={`interviewers__item ${selected ? 'interviewers__item--selected' : ''}`} onClick={() => setInterviewer(id)}>


//this works too if we don't want to destructure  
// return (
//   <li className={interviewerClass} onClick={props.setInterviewer}>
//     <img
//       className="interviewers__item-image"
//       src={props.avatar}
//       alt={props.name}
//     />
//     {props.selected && props.name}
//   </li>
// );
