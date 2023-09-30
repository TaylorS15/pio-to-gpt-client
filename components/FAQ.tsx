import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function FAQ() {
  return (
    <div className="mx-auto w-10/12 max-w-7xl md:w-full">
      <h2 className="text-left text-3xl font-medium">
        <span className="text-pio-red">F</span>
        <span className="text-pio-green">A</span>
        <span className="text-pio-blue">Q</span>
      </h2>

      <Accordion type="multiple" className="w-full text-left text-xl">
        <AccordionItem value="one">
          <AccordionTrigger className="text-left">
            What is GTOtoGPT?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            GTOtoGPT is meant to be used in conjunction with a solver, hand
            histories, or a database to help you reason out why a certain play
            is good or bad.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger className="text-left">
            How does GTOtoGPT work?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            GTOtoGPT expands OpenAI's very popular GPT models with a massive
            dataset of solver data to generate responses to user questions by
            picking relevant solver data and general poker knowledge to generate
            accurate responses.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="three">
          <AccordionTrigger className="text-left">
            Is there a limit to the amount of questions you can ask?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            Even OpenAI's own GPT-4 has a limit to the amount of questions you
            can ask within a certain time period, and so do we. API use can
            become quite expensive with the amount of data we are using to fine
            tune our own models and combining with user questions to give you
            accurate responses.
            <br></br>
            <br></br>
            Currently, there is a limit of{" "}
            <span className="italic">25 questions per 6 hours</span> to prevent
            abuse and we are looking to expand this over time.
            <br></br>
            <br></br>
            There is also a conversation limit of{" "}
            <span className="italic">5 questions and 5 responses per</span> to
            prevent abuse and we are looking to expand this over time.
            <br></br>
            <br></br>
            This should be plenty for normal use and questions that come back as
            not related to poker, or if our servers are unresponsive, will not
            be counted towards your limit!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="four">
          <AccordionTrigger className="text-left">
            What data is collected?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            Both user questions and GTOtoGPT responses are collected anonymously
            to further fine-tune our model and improve the quality of GTOtoGPT.
            No user data is ever sold to or shared with third parties.
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="five">
          <AccordionTrigger className="text-left">
            Should I give feedback to responses?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            Yes! Giving positive or negative feedback to responses will
            significantly improve the quality of GTOtoGPT responses over time.
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem value="six">
          <AccordionTrigger className="text-left">
            How do I ask a good question?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            You should give as much relevant, and concise, information about the
            question or hand as possible. Instead of copying the full hand
            history from a database, which usually includes tons of extra
            information like unnecessary labels and player information, write
            out a simplified version with only the relevant players and actions.
            You can ask about general poker theory as well! It is preferable to
            use the Dynamic and Formation selection boxes below the chat box to
            give more information regarding your question.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="seven">
          <AccordionTrigger className="text-left">
            Why can questions take a long time to answer?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            This depends on both OpenAI's current GPT speeds, which can
            fluctuate based on demand, and the amount of data being requested to
            answer your question. Some questions will take longer to ask than
            others based on the required data needed to give an accurate
            response. We are always working on improving both the speed and
            accuracy of responses.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="eight">
          <AccordionTrigger className="text-left">
            Where can I receive support or give feedback?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            You are free to join our{" "}
            <Link
              href="https://discord.gg/ZunqSuUJdH"
              rel="noopener noreferrer"
              className="w-min transition hover:scale-110 hover:underline"
            >
              <span className="cursor-pointer text-pio-blue hover:underline">
                discord server
              </span>
            </Link>{" "}
            and chat with us or other users about GTOtoGPT or to get help!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="nine">
          <AccordionTrigger className="text-left">
            What is GTOtoGPT specialized for?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            GTOtoGPT is currently specialized for 100bb 6-max No Limit Hold'em
            cash. Other games and formats are planned for the future.
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="ten">
          <AccordionTrigger className="text-left">
            What spots are supported?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            There is currently heavy support for:
            <ul className="">
              <li>- SRP IP PFR and Blind vs Blind</li>
              <li>- 3BP IP PFR</li>
              <li>- 3BP OOP PFR</li>
            </ul>
            Moderate support for:
            <ul className="">
              <li>- Preflop</li>
              <li>- Cold call pots</li>
              <li>- Multiway pots</li>
              <li>- 5BP pots</li>
              <li>- 4BP pots</li>
            </ul>
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem value="eleven">
          <AccordionTrigger className="text-left">
            Can I cancel my subscription?
          </AccordionTrigger>
          <AccordionContent className="text-lg text-white/80">
            You can cancel your subscription at any time and you will still be
            able to use the service until the end of your current billing
            period. The link is in the footer of our site.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
