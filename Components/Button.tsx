import { MouseEventHandler, useState } from "react";

interface ButtonProp {
  text: string;
  onClickEvent?: MouseEventHandler;
  sendCounterResponse: (msg: number) => void; // callback function type
}

const Button = (props: ButtonProp) => {
  const [timesClicked, setTimesClicked] = useState(0);
  const onClickEvent = () => {
    setTimesClicked(timesClicked + 1);
    let updatedValue = timesClicked + 1;
    props.sendCounterResponse(updatedValue);
  };

  return (
    <button onClick={onClickEvent}>
      {props.text} {timesClicked}
    </button>
  );
};

export default Button;
