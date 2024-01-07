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
        <div className="absolute custom-gradient left-0 -top-10 -z-10 w-full h-[80vh] skew-y-3" />
        <Header showBackground={false} />
        <div className="flex flex-row w-full max-w-[1000px] h-[70vh] justify-around">
          <div className="flex flex-col justify-center">
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
      <div className="flex flex-row justify-center w-full h-max bg-white">
        <div className="flex flex-col max-w-[1000px] text-center">
          <h1 className="text-teal-300">Land your dream job</h1>
          <h3 className="text-[#8698b1]">
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
      <div className="flex flex-col items-center py-5 bg-[#2e343b] w-full">
        <Image
          src="/images/logo.png"
          alt="Algoquiz Logo"
          width="48"
          height="48"
        />
        <h3>Ace your Interviews.</h3>
      </div>
    </main>
  );
}
