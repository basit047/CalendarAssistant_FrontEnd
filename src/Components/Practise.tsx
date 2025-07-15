import { useState, useEffect, FormEventHandler } from "react";
import Button from "./Button";

interface FullName {
  firstName: string;
  lastName: string;
}

function Practise(props: FullName) {
  const [items, setItems] = useState(["Apple", "Banana", "Orange"]);
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState({ name: "Abdul", age: 29 });

  useEffect(() => {
    alert("Value Changed");
  }, [counter]);

  const handleChildData = (data: number) => {
    setCounter((prev) => prev + data);
  };

  const updateAge = () => {
    setUser((prevUser) => ({
      ...prevUser,
      age: 27,
    }));
  };

  const onClickEvent = () => {
    setCounter((prevValue) => prevValue + 1);
  };

  const onSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const count = (form.elements.namedItem("counter") as HTMLInputElement)
      .value;
    alert(count);
  };

  //Arrow functions syntax
  //const functionName = (parameters) => {};

  return (
    <div>
      <p>You Clicked {counter} times</p>
      <Button text="Click Me" sendCounterResponse={handleChildData} />

      <p>
        User Detail {user.name} - {user.age}
        <button onClick={onClickEvent}>Click Me!</button>
      </p>

      <ul>
        {items.map((fruit: string, index: number) => (
          <li key={index}>
            {fruit}-{index}
          </li>
        ))}
      </ul>
      <p>
        {props.firstName ?? "Abdul Basit"} {props.lastName ?? "Raja"}
      </p>
      <form onSubmit={onSubmitEvent}>
        <input type="text" value={counter} name="counter" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Practise;
