import { useEffect, useState } from "react";

export default function ChatBubble({
  type,
  text,
  index,
}: {
  type: "user" | "bot";
  text: string;
  index: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return (
    <div
      className={`${
        type === "user"
          ? "ml-auto border border-white bg-black"
          : (index % 3 === 0
              ? "bg-pio-red/70"
              : index % 3 === 1
              ? "bg-pio-green/70"
              : "bg-pio-blue/70") + " mr-auto"
      } ${
        isLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"
      } min-w-sm h-auto w-auto max-w-md overflow-x-clip rounded-md p-3 font-medium  transition-all duration-300`}
    >
      {typeof text === "string" ? (
        <p className="text-MD">{text}</p>
      ) : (
        <>
          <p className="text-md">{text[0]}</p>
          <p className="text-xs text-gray-400">
            {typeof text[1] === "string" && text[1] !== "" ? (
              <span className="mr-2">{text[1]}</span>
            ) : null}
            {typeof text[2] === "string" && text[2] !== "" ? (
              <span className="mr-2">{text[2]}</span>
            ) : null}
          </p>
        </>
      )}
    </div>
  );
}
