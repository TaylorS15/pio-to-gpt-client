"use client";

import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export default function QuestionAnimation() {
  const [questionRendered, setQuestionRendered] = useState(false);
  const [responseRendered, setResponseRendered] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const backgroundColor = () => {
    const colors = [
      "rgba(199, 109, 89, .7)",
      "rgba(143, 188, 139, .7)",
      "rgba(109, 162, 192, .7)",
    ];
    const randomIndex = Math.floor(Math.random() * 3);
    return colors[randomIndex];
  };

  useEffect(() => {
    const conversations: [string, string][] = [
      [
        "Should I bet or check more often, exploitatively, vs a weak tight player on 422r?",
        "Weak-tight players tend to over-fold, especially when they're out of position. This behavior allows you to exploit them by betting aggressively and frequently with a wider range. This strategy will secure more pots for you uncontested and increase your overall winnings from the button versus big blind scenarios. Be aware though, this strategy could require adjustments if the weak-tight player changes their playing style.",
      ],
      [
        "Should I bet a larger or smaller size multiway with AJs as the CO vs a BU cold call and BB call on J75 flushdraw?",
        "In a multiway pot, with AJs on a J75 board with a flush draw, you should generally bet smaller. This is due to the fact that multiway pots typically require stronger hands to continue against any given bet size. Betting smaller allows you to continue with a wider range of hands.<br><br>Furthermore, as the preflop raiser, you have a range advantage but not necessarily a nut advantage on this particular board. The board is relatively dry apart from the flush draw, and with top pair decent kicker, your hand is strong but not invincible. A smaller bet size will allow you to extract value from worse hands and not inflate the pot unnecessarily against two opponents who may potentially have you beat.",
      ],
      [
        "How should I change my play in a home game where the rake is much higher?",
        "In a home game with a higher rake, you should generally adjust your strategy to play tighter. This is because higher rakes diminish the value of marginal hands, making it less profitable to play a wide range of hands. You should be more selective with your starting hands, preferring stronger hands that can more reliably win pots outright and avoid paying excessive rakes.",
      ],
      [
        "Should I call or fold a hand like KJo as the Button vs BBs checkraise on 886r? The solver mixes but Im not sure what I should do vs a fish",
        "Against a fishy player who is likely to play too many hands preflop and too passively postflop, it might be a good idea to call with KJo in this scenario. Fishy players tend to have wider ranges, and KJo may still be ahead of a significant portion of their range, especially on a paired, relatively low board like 886r.<br><br>However, you also need to consider future streets. Remember, fishy players tend to play passively, so a check-raise could indicate a strong hand. If you believe they are capable of bluffing or overvaluing weaker hands here, you can make the call. But if they continue to show aggression on the turn and river, you should be willing to reconsider your stance. Therefore, the decision to call or fold will depend on your reads of this particular players tendencies and your comfort navigating later streets.",
      ],
    ];
    const randomIndex = Math.floor(Math.random() * conversations.length);
    const [question, response] = conversations[randomIndex];

    setTimeout(() => {
      setQuestion(question);
      setQuestionRendered(true);
    }, 100);
    setTimeout(() => {
      setResponse(response);
      setResponseRendered(true);
    }, 1000);
  }, []);

  return (
    <>
      <div
        className={`${
          questionRendered ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } mb-4 ml-auto w-full max-w-sm rounded-md border border-white p-3 text-left text-lg transition`}
      >
        <p>{question}</p>
      </div>
      <div
        style={{ backgroundColor: backgroundColor() }}
        className={`${
          responseRendered ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } mb-4 mr-auto w-full max-w-sm rounded-md p-3 text-left text-lg  transition`}
      >
        <Typewriter
          options={{
            strings: response,
            autoStart: true,
            delay: 4,
            deleteSpeed: 99999999,
            loop: false,
            cursor: "",
          }}
        />
      </div>
    </>
  );
}
