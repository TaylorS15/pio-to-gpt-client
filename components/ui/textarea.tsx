import * as React from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/app/store";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { setTextareaHeight } = useStore();

    return (
      <textarea
        ref={ref}
        rows={1}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "3rem";
          target.style.height = `${Math.min(target.scrollHeight, 160)}px`;
          setTextareaHeight(target.scrollHeight);
        }}
        className={cn(
          `w-full resize-none rounded-md border border-white p-4 ${className}`,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
