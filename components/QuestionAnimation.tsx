"use client";

import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export default function QuestionAnimation() {
  const [question, setQuestion] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setQuestion(true);
    }, 100);
    setTimeout(() => {
      setResponse(true);
    }, 1500);
  }, []);

  return (
    <>
      <div
        className={`${
          question ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } mb-4 ml-auto w-full max-w-sm rounded-md border border-white p-3 text-left text-lg  transition`}
      >
        <p>
          Should I bet or check more often exploitatively vs a weak tight player
          on 422r? SRP BU vs BB
        </p>
      </div>
      {response && (
        <div
          className={`${
            question ? "scale-100 opacity-100" : "scale-50 opacity-0"
          } mb-4 mr-auto w-full max-w-sm rounded-md bg-pio-red/70 p-3 text-left text-lg  transition`}
        >
          <Typewriter
            options={{
              strings: [
                "Weak-tight players tend to over-fold, especially when they're out of position. This behavior allows you to exploit them by betting aggressively and frequently with a wider range. This strategy will secure more pots for you uncontested and increase your overall winnings from the button versus big blind scenarios. Be aware though, this strategy could require adjustments if the weak-tight player changes their playing style.",
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
    </>
  );
}
