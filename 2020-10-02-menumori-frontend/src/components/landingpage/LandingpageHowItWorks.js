import HeadingBig from "../small/HeadingBig";

const paragraphClasses =
  "mb-8 leading-relaxed md:text-2xl text-xl md:ml-16 md:mt-0 mt-8 text-center md:text-left";

const LandingpageHowItWorks = () => {
  return (
    <section className="text-gray-700 body-font relative" id="howitworks">
      <div className="container px-5 py-24 mx-auto">
        <HeadingBig
          title="So funktioniert Menumori:"
          subtitle="Angenehm für Geschäft und Kunden"
        ></HeadingBig>
        <div className="md:flex mb-6">
          <div className="md:w-1/3 md:mt-16">
            <img src="./static/images/phone3.png" className="w-full "></img>
          </div>
          <div className="md:w-2/3">
            <p className={paragraphClasses}>
              Alles beginnt mit einem Aufsteller, der für Ihre Kunden gut
              sichtbar platziert ist. Der Aufsteller enthält einen QR-Code, der
              zum Instagram Account ihres Geschäfts führt. Kunden wird auf dem
              Aufsteller erklärt, dass Sie ein kleines Geschenk erhalten, wenn
              sie Ihr Geschäft in ihrer Instagram Story verlinken.
            </p>
            <hr className="my-4 mx-12"></hr>
            <p className={paragraphClasses}>
              Durch den QR-Code können interessierte Kunden so direkt zu
              Instagram gelangen und ihren Service mit ihren Followern teilen.
              Sie erhalten dadurch eine große Reichweite und da die Viewer der
              Story meist Freunde und Verwandte ihres Kunden sind, vertrauen
              diese schnell auf die Qualität Ihres Geschäfts und werden so mit
              erhöhter Wahrscheinlichkeit ebenfalls zu Kunden.
            </p>
            <hr className="my-4 mx-12"></hr>
            <p className={paragraphClasses}>
              Hat der Nutzer die Instagram Story gepostet und Ihr Geschäft darin
              verlinkt, antwortet ihm unser Service im Namen Ihres
              Instagram-Accounts automatisch und übermittelt dem Kunden einen
              Geschenkcode. Diesen graphischen Code, kann der Kunde dann ganz
              einfach bei Ihrem Personal vorzeigen und sein Geschenk erhalten.
            </p>
            <hr className="my-4 mx-12"></hr>
            <p className={paragraphClasses}>
              Für Sie als Geschäftsinhaber bedeutet dies einen sehr kleinen
              finanziellen Aufwand für eine große, automatisiert generierte und
              vor allem persönliche Reichweite. Zufriedene Kunden verbreiten
              ihre positive Meinung über Ihr Geschäft und sorgen so für weitere
              Kunden direkt aus dem persönlichen Umfeld.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingpageHowItWorks;
