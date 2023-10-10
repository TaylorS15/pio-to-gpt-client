import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="relative flex min-h-screen flex-col gap-8 bg-black px-6 pt-24 text-white md:px-0">
      <Navigation />

      <Header />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <Link
          href="/"
          className="mb-8 flex h-8 w-24 gap-4 hover:border-b-2 hover:border-white"
        >
          <CornerUpLeft size={20} className="mt-2" />
          <h1 className="text-2xl">Back</h1>
        </Link>

        <h1 className="text-2xl">Privacy Policy for GTOtoGPT</h1>

        <p>
          At GTOtoGPT, accessible from https://gtotogpt.com, one of our main
          priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by GTOtoGPT and how we use it.
        </p>

        <p>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>

        <h2 className="font-bold">Log Files</h2>

        <p>
          GTOtoGPT follows a standard procedure of using log files. These files
          log visitors when they visit websites. All hosting companies do this
          and a part of hosting services' analytics. The information collected
          by log files include internet protocol (IP) addresses, browser type,
          Internet Service Provider (ISP), date and time stamp, referring/exit
          pages, and possibly the number of clicks. These are not linked to any
          information that is personally identifiable. The purpose of the
          information is for analyzing trends, administering the site, tracking
          users' movement on the website, and gathering demographic information.
        </p>

        <h2 className="font-bold">Cookies and Web Beacons</h2>

        <p>
          Like any other website, GTOtoGPT uses "cookies". These cookies are
          used to store information including visitors' preferences, and the
          pages on the website that the visitor accessed or visited. The
          information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other
          information.
        </p>

        <p>
          For more general information on cookies, please read{" "}
          <Link href="https://www.privacypolicyonline.com/what-are-cookies/">
            the "Cookies" article from the Privacy Policy Generator
          </Link>
          .
        </p>

        <h2 className="font-bold">Privacy Policies</h2>

        <p>
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of GTOtoGPT.
        </p>

        <p>
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on GTOtoGPT, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </p>

        <p>
          Note that GTOtoGPT has no access to or control over these cookies that
          are used by third-party advertisers.
        </p>

        <h2 className="font-bold">Third Party Privacy Policies</h2>

        <p>
          GTOtoGPT's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.{" "}
        </p>

        <p>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites. What Are Cookies?
        </p>

        <h2 className="font-bold">Children's Information</h2>

        <p>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>

        <p>
          GTOtoGPT does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>

        <h2 className="font-bold">Online Privacy Policy Only</h2>

        <p>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in GTOtoGPT. This policy is not applicable to
          any information collected offline or via channels other than this
          website.
        </p>

        <h2 className="font-bold">Consent</h2>

        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its Terms and Conditions.
        </p>
      </div>

      <Footer />
    </main>
  );
}
