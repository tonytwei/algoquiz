import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  const companies = [
    "airwallex",
    "amazon",
    "anz",
    "atlassian",
    "canva",
    "citadel",
    "commbank",
    "google",
    "imc",
    "janestreet",
    "meta",
    "optiver",
    "sig",
    "tiktok",
  ];

  return (
    <main className="flex flex-col items-center w-full h-screen">
      {/* section 1 */}
      <div className="flex flex-col items-center w-full h-max">
        <div className="absolute left-0 top-10 -z-20 w-full h-[80vh] bg-white" />
        <div className="absolute custom-gradient left-0 -top-10 -z-10 w-full h-[80vh] skew-y-2" />
        <Header showBackground={false} />
        <div className="flex flex-row w-full max-w-[1000px] h-[70vh] justify-around">
          <div className="flex flex-col max-w-[80vw] justify-center">
            <h3 className="text-teal-300 -my-2">Welcome to</h3>
            <h1 className="text-blue-200 text-7xl">AlgoQuiz</h1>
            <h2 className="text-[#9aaecb] text-3xl">
              Data Structures and Algorithms
            </h2>
            <h3 className="text-[#8698b1]">
              Get ready to ace your next technical interview.
            </h3>
            <h3 className="text-[#8698b1] -my-1">
              Learn key concepts and patterns in a fun and interactive way.
            </h3>
            <Link href="/account" className="py-5 w-max">
              <h1 className="text-teal-300 px-5 outline rounded-sm outline-offset-4 outline-2 outline-teal-300">
                Get Started!
              </h1>
            </Link>
          </div>
          <div className="hidden md:block w-1/4 h-full">
            <div className="relative w-full h-full">
              <Image
                src="/images/index/computer_graphic.png"
                alt="Computer Graphic"
                fill={true}
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full h-max pt-10 pb-16 bg-white">
        <div className="flex flex-col w-[90vw] max-w-[1000px] text-center">
          <h1 className="text-teal-300 text-3xl">Land your dream job</h1>
          <h3 className="text-[#404955]">
            Our goal is to prepare you for any technical interview question so
            you can succeed
          </h3>
          <div className="flex flex-row flex-wrap py-5 justify-center items-center gap-5">
            {companies.map((company) => (
              <Image
                key={company}
                src={`/images/index/companies/${company}.png`}
                alt={`${company} logo`}
                width="0"
                height="0"
                sizes="100vw"
                className="w-[100px] h-auto"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full h-max py-16 bg-[#2e343b]">
        <div className="flex flex-col gap-4 w-[90vw] max-w-[1000px] text-center">
          <div>
            <h1 className="text-teal-300 text-3xl">What we offer</h1>
            <h3 className="text-[#8698b1]">
              We have an extensive database of questions from top tech companies
              so you can be confident in your interview
            </h3>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center">
            <div className="flex flex-col sm:flex-row lg:flex-col lg:w-1/3 gap-6 justify-center">
              <div className="border-l-4 border-solid border-[#89ff8d] text-left pl-4 h-max">
                <h1 className="text-[#89ff8d] text-2xl">Customisable Filter</h1>
                <h3 className="text-[#8698b1]">
                  Customize your search with filters to focus on topics and
                  difficulties that suit your needs.
                </h3>
              </div>
              <div className="border-l-4 border-solid border-[#ffd23e] text-left pl-4 h-max">
                <h1 className="text-[#ffd23e] text-2xl">Browse Questions</h1>
                <h3 className="text-[#8698b1]">
                  Explore a wide range of questions to challenge your
                  understanding and improve your skills.
                </h3>
              </div>
              <div className="border-l-4 border-solid border-[#F44336] text-left pl-4 h-max">
                <h1 className="text-[#F44336] text-2xl">Save Questions</h1>
                <h3 className="text-[#8698b1]">
                  Keep track of interesting questions for future reference and
                  continuous learning.
                </h3>
              </div>
            </div>
            <div className="max-w-full lg:w-2/3">
              <Image
                src="/images/index/quiz_ui.png"
                alt="web ui quiz graphic"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full py-16 bg-white">
        <div className="flex flex-col sm:flex-row gap-4 w-[90vw] max-w-[1000px] h-max text-center items-center justify-center">
          <div className="text-[#404955] text-xl w-1/2 lg:w-1/3">
            <h1>
              We have all the resources that you would need to be prepared for
              any coding interview.
            </h1>
            <div className="block lg:hidden">
              <h1>All you have to do is learn the questions and answers.</h1>
              <a href="/quiz">
                <h1 className="text-teal-300">Get Started Now →</h1>
              </a>
            </div>
          </div>
          <div className="h-96">
            <Image
              src="/images/index/quiz_mobile.png"
              alt="mobile ui quiz graphic"
              width="0"
              height="0"
              sizes="100vh"
              className="w-auto h-full"
            />
          </div>
          <div className="hidden lg:block text-[#404955] text-xl w-1/3">
            <h1>All you have to do is learn the questions and answers.</h1>
            <a href="/quiz">
              <h1 className="text-teal-300">Get Started Now →</h1>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center py-8 bg-[#2e343b] w-full">
        <Image
          src="/images/logo.png"
          alt="Algoquiz Logo"
          width="48"
          height="48"
        />
        <div>
          <h3 className="text-blue-200">Ace your Interviews.</h3>
          <p className="text-blue-200/70">© 2024 AlgoQuiz</p>
        </div>
      </div>
    </main>
  );
}
