import Link from "next/link";
import ArrowButton from "../small/ArrowButton";

const LandingpageHeader = () => {
  return (
    <section className="section-emphasis">
      <div className="container mx-auto flex py-24 md:flex-row flex-col">
        <div className=" lg:flex-grow md:w-1/2 lg:pr-12 md:pr-12 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h2 className=" uppercase text-bold text-teal-500">
            Menumori Instagram Services
          </h2>
          <h1 className="title-font sm:text-4xl text-4xl mb-4 font-medium text-gray-900 ">
            Automatisiertes Mund-zu-Mund Marketing auf Instagram
            <br className="hidden lg:inline-block" />
          </h1>

          <p className="mb-8 leading-relaxed ">
            Nutzen Sie die Reichweite ihrer zufriedensten Kunden - Unsere
            Services sorgen dafür, dass Nutzer Sie in ihrer Story verlinken.
            Persönliche Empfehlungen für ihr Geschäft werden so ganz automatisch
            generiert und erreichen Tausende Menschen.
          </p>
          <div className="flex justify-center">
            <Link href="/#contact">
              <a>
                <ArrowButton noMargin> Kostenlose Beratung</ArrowButton>
              </a>
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full w-full md:w-1/2 mt-2 px-8">
          <img // className="object-cover object-center rounded"
            alt="hero"
            src="./static/images/landingpagesmartphone3-slight.png"
            style={{ height: "" }}
          ></img>
        </div>
      </div>
    </section>
  );
};

export default LandingpageHeader;
