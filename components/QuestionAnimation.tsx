"use client";

import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export default function QuestionAnimation() {
  const [firstQuestion, setFirstQuestion] = useState(false);
  const [secondQuestion, setSecondQuestion] = useState(false);
  const [firstResponse, setFirstResponse] = useState(false);
  const [secondResponse, setSecondResponse] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFirstQuestion(true);
    }, 100);
  }, []);

  return (
    <div
      className={`${
        firstQuestion ? "scale-100 opacity-100" : "scale-50 opacity-0"
      } ml-auto w-72 rounded-md border border-white p-2 text-left text-white transition`}
    >
      <Typewriter
        options={{
          strings: ["What is the best way to play this hand?"],
          autoStart: true,
          delay: 50,
          loop: true,
          deleteSpeed: 99999999,
          cursor: "",
        }}
      />
    </div>
  );
}
