import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  //destructure props
  const { days, value, onChange } = props;

  //x different keys in the props obj
  return (
    <ul>{days.map(x => (
      <DayListItem
        key={x.id}
        name={x.name}
        spots={x.spots}
        selected={x.name === value}
        setDay={onChange}
      />
    ))}
    </ul>
  );
};

//originally like this on ln8
// return (
//   <ul>{days.map(day => (
//     <DayListItem
//     name={day.name}
//     spots={day.spots}
//     selected={day.name === props.day}
//     setDay={props.setDay}
//     />
//   ))}
//   </ul>
