"use client";

import { useState } from "react";

export default function LineChoiceClient(props: {
  lineChoiceServer: Function;
  lineChoices: string[];
  lineChoice: string;
}) {
  const [lineChoice, setLineChoice] = useState(props.lineChoice);

  return (
    <form
      className="mx-auto w-fit mt-[5dvh]"
      onSubmit={async () => {
        await props.lineChoiceServer();
      }}
    >
      <select
        value={lineChoice}
        onChange={(event) => {
          setLineChoice((prev) => (prev = event.target.value));
          event.target.form?.submit();
        }}
        name="lineChoice"
        className="text-sm lg:text-base bg-slate-200 rounded-md px-[15px] py-[5px] outline-none"
      >
        <option>Alle</option>
        {props.lineChoices.map((lineChoice) => (
          <option key={lineChoice}>{lineChoice}</option>
        ))}
      </select>
    </form>
  );
}
