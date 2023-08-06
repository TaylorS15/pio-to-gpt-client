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

    setTimeout(() => {
      setFirstResponse(true);
    }, 3100);

    setTimeout(() => {
      setSecondQuestion(true);
    }, 6100);

    setTimeout(() => {
      setSecondResponse(true);
    }, 9100);
  }, []);

  return (
    <>
      {firstQuestion && (
        <div
          className={`${
            firstQuestion ? "scale-100 opacity-100" : "scale-50 opacity-0"
          } mb-4 ml-auto w-full max-w-sm rounded-md border border-white p-2 text-left  transition`}
        >
          <Typewriter
            options={{
              strings: ["What is the best way to play this hand?"],
              autoStart: true,
              delay: 50,
              deleteSpeed: 99999999,
              loop: false,
              cursor: "",
            }}
          />
        </div>
      )}
      {firstResponse && (
        <div
          className={`${
            firstQuestion ? "scale-100 opacity-100" : "scale-50 opacity-0"
          } mb-4 mr-auto w-full max-w-sm rounded-md bg-pio-red/70 p-2 text-left  transition`}
        >
          <Typewriter
            options={{
              strings: ["What is the best way to play this hand?"],
              autoStart: true,
              delay: 50,
              deleteSpeed: 99999999,
              loop: false,
              cursor: "",
            }}
          />
        </div>
      )}
      {secondQuestion && (
        <div
          className={`${
            secondQuestion ? "scale-100 opacity-100" : "scale-50 opacity-0"
          } mb-4 ml-auto w-full max-w-sm rounded-md border border-white p-2 text-left  transition`}
        >
          <Typewriter
            options={{
              strings: ["What is the best way to play this hand?"],
              autoStart: true,
              delay: 50,
              deleteSpeed: 99999999,
              loop: false,
              cursor: "",
            }}
          />
        </div>
      )}
      {secondResponse && (
        <div
          className={`${
            secondResponse ? "scale-100 opacity-100" : "scale-50 opacity-0"
          } mb-4 mr-auto w-full max-w-sm rounded-md bg-pio-green/70 p-2 text-left  transition`}
        >
          <Typewriter
            options={{
              strings: ["What is the best way to play this hand?"],
              autoStart: true,
              delay: 50,
              deleteSpeed: 99999999,
              loop: false,
              cursor: "",
            }}
          />
        </div>
      )}
    </>
  );
}
