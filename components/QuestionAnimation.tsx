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
          } mb-4 ml-auto w-full max-w-sm rounded-md border border-white p-3 text-left text-lg  transition`}
        >
          <Typewriter
            options={{
              strings: [
                "Should I bet or check more often exploitatively vs a weak tight player on 422r? SRP BU vs BB",
              ],
              autoStart: true,
              delay: 10,
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
          } mb-4 mr-auto w-full max-w-sm rounded-md bg-pio-red/70 p-3 text-left text-lg  transition`}
        >
          <Typewriter
            options={{
              strings: [
                "Weak-tight players tend to over-fold, especially when they're out of position. This behavior allows you to exploit them by betting aggressively and frequently with a wider range. This strategy will secure more pots for you uncontested and increase your overall winnings from the button versus big blind scenarios. Be aware though, this strategy could require adjustments if the weak-tight player changes their playing style.",
              ],
              autoStart: true,
              delay: 25,
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
