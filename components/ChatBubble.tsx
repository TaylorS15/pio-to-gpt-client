import { useEffect, useState } from "react";

export default function ChatBubble({
  type,
  text,
  index,
  dynamic,
  formation,
}: {
  type: "user" | "bot";
  text: string;
  index: number;
  dynamic?: string;
  formation?: string;
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
        isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
      } min-w-sm h-auto w-auto max-w-md overflow-x-clip break-words rounded-sm p-3 font-medium transition-all duration-300`}
    >
      {text.split("\n").map((line, i) => (
        <p className="text-MD" key={i}>
          {line}
          {i !== text.split("\n").length - 1 && <br />}
        </p>
      ))}
      <div className="flex gap-2">
        {dynamic && <p className="text-sm text-gray-400">{dynamic}</p>}
        {formation && <p className="text-sm text-gray-400">{formation}</p>}
      </div>
    </div>
  );
}
