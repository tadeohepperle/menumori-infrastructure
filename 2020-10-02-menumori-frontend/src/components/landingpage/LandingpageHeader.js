import ArrowButton from "../small/ArrowButton";

const LandingpageHeader = () => {
  return (
    <section class="text-gray-700 body-font bg-orange-100 border-4 shadow-lg">
      <div class="container mx-auto flex py-24 md:flex-row flex-col">
        <div class=" lg:flex-grow md:w-1/2 lg:pr-12 md:pr-12 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h2 class=" uppercase text-bold text-teal-500">
            Menumori Instagram Marketing
          </h2>
          <h1 class="title-font sm:text-4xl text-4xl mb-4 font-medium text-gray-900 ">
            Automatische Kooperationen mit Mikro-Influencern
            <br class="hidden lg:inline-block" />
          </h1>

          <p class="mb-8 leading-relaxed ">
            Nutzen Sie die Reichweite ihrer zufriedensten Kunden - Unsere
            Services sorgen dafür, dass Nutzer Sie in ihrer Story verlinken.
            Persönliche Empfehlungen für ihr Geschäft werden so ganz automatisch
            generiert und erreichen Tausende Menschen.
          </p>
          <div class="flex justify-center">
            <ArrowButton noMargin> Kostenlose Beratung</ArrowButton>
          </div>
        </div>
        <div class="lg:max-w-lg lg:w-full w-full md:w-1/2 mt-2 px-8">
          <img
            class="object-cover object-center rounded"
            alt="hero"
            src="./static/images/landingpagesmartphone2.png"
            style={{ height: "" }}
          ></img>
        </div>
      </div>
    </section>
  );
};

export default LandingpageHeader;
