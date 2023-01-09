import React from "react";
import classNames from "classnames"
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  const formatSpots = (spots) => {
    if (spots > 1)
      return `${spots} spots remaining`;
    if (spots === 1)
      return `${spots} spot remaining`;
    if (spots < 1)
      return "no spots remaining";
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

// export default function DayListItem(props) {
//   const dayClass = classNames('day-list__item', {
//     "day-list__item--selected": props.selected,
//     "day-list__item--full": props.spots === 0
//   })

//   return (
//     <li className={dayClass} onClick={() => props.setDay(props.name)}>
//       <h2 className="text--regular">{props.name}</h2>
//       {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
//       {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
//       {props.spots < 1 && <h3 className="text--light">no spots remaining</h3>}
//     </li>
//   );
// }
