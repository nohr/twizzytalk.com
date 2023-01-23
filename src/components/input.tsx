import React, { useRef, useState } from "react";
import Convert from "./convert";

export const x = window.matchMedia("(max-width: 786px)");

function Input() {
  const [value, setValue] = useState("");
  const [converted, setConverted] = useState("");
  const input =
    useRef<HTMLTextAreaElement>() as React.RefObject<HTMLTextAreaElement>;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
  }
  return (
    <div className="w-full flex flex-col flex-nowrap items-center">
      <p className=" w-fit h-min p-5">Type, then krank it</p>
      <div className="flex flex-col m-0 w-full items-center md:flex-row md:gap-x-[5%] gap-y-5 md:flex-wrap justify-center md:my-5">
        <textarea
          className="input"
          placeholder={x.matches ? "Type here..." : "Type here first..."}
          onChange={(e) => handleChange(e)}
          value={value}
          ref={input}
        ></textarea>
        <textarea
          className="input hidden md:block"
          placeholder={"Select to copy..."}
          onSelect={() => {
            navigator.clipboard.writeText(converted || "Type something first!");
          }}
          value={converted}
          readOnly
        ></textarea>
      </div>
      <Convert
        setConverted={setConverted}
        converted={converted}
        setValue={setValue}
        value={value}
        input={input}
      />
    </div>
  );
}

export default Input;
