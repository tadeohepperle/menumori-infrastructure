const { StandardSVG, SVGElements } = require("../small/SVG");

const LandingpageSteps = () => {
  return (
    <section class="">
      <div class="container py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h2 class=" uppercase text-bold text-teal-500">
            Einfach und automatisiert
          </h2>
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            So funktioniert unser Instagram-Service für Lokale Unternehmen:
          </h1>
        </div>

        <div class="md:flex w-full ">
          <div class="w-full md:w-2/3 md:flex flex-wrap md:pr-8">
            <VerticalStep
              index="1"
              title="1. Kunde postet Instagram Story"
              description="Sobald ein Nutzer eine Instagram Story postet, in der der Instagram Account ihres Unternehmens verlinkt wird, schaltet sich unser Service ein."
            >
              <StandardSVG
                symbol="INSTAGRAM"
                viewBox="-20 0 300 256"
                fill="currentColor"
              ></StandardSVG>
            </VerticalStep>
            <VerticalStep
              index="2"
              title="2. Kunde erhält Nachricht"
              description="Der Kunde erhält völlig automatisiert eine Nachricht über Instagram und muss vor dem fortfahren die AGB bestätigen. Wir bleiben bei Datenschutzfragen stets auf der sicheren Seite."
            >
              <StandardSVG symbol="MESSAGE"></StandardSVG>
            </VerticalStep>
            <VerticalStep
              index="1"
              title="3. Kunde wird dazu ermutigt, Ihr Geschäft online zu bewerten"
              description="Wurden die ABGs seitens des Kunden gestätigt, wird er dazu ermutigt Ihr Geschäft auf Google oder Tripadvisor zu bewerten."
            >
              <StandardSVG symbol="STAR"></StandardSVG>
            </VerticalStep>
            <VerticalStep
              index="1"
              title="4. Geschenk-Code erhalten"
              description="Anschließend erhält der Kunde für seine Treue und Reichweite ein kleines Geschenk in Form eines Rabatts, eines kostenlosen Getränks oder einer sonstigen kleinen Aufmerksamkeit. Dazu erhält Ihr Kunde einen individuellen Code, den er bei Ihrem Personal einlösen kann."
            >
              <StandardSVG symbol="BARCODE"></StandardSVG>
            </VerticalStep>
          </div>
          <div class="w-full md:w-1/3 md:flex flex-wrap relative md:pl-8">
            <InstagramGifOnSide></InstagramGifOnSide>
          </div>
        </div>
      </div>
    </section>
  );
};

function InstagramGifOnSide() {
  return (
    <div
      className=" "
      // sticky inset-0 top-20 pl-8 h-64
    >
      <img
        src="./static/images/phonemockupsmallers.png"
        className="w-full"
      ></img>
    </div>
  );
}

function VerticalStep({ children, title, description, index }) {
  return (
    <div class="flex relative py-10 sm:items-center md:w-full mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-teal-500 text-white relative z-10 title-font font-medium text-sm">
        {index}
      </div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div class="flex-shrink-0 w-24 h-24 bg-teal-100 text-teal-500 rounded-full inline-flex items-center justify-center">
          {children}
        </div>
        <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">
            {title}
          </h2>
          <p class="leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default LandingpageSteps;
