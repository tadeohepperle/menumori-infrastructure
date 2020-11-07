import HeadingBig from "../small/HeadingBig";

const { StandardSVG, SVGElements } = require("../small/SVG");

const LandingpageAdvantages = () => {
  return (
    <section className="section-emphasis" id="features">
      <div className="container py-24 mx-auto">
        <HeadingBig
          title="Vorteile und Chancen für Ihr Geschäft:"
          subtitle="Menumori macht's möglich"
        ></HeadingBig>
        <div className="flex flex-wrap -m-4">
          <AdvantagesCard
            title="Persönlicher Kontakt"
            description="Lernen Sie ihre Zielgruppe persönlich kennen. Sie haben so eine Möglichkeit Feedback zu erhalten und Kunden für Nachfragen zu kontaktieren."
            symbol="PERSON"
          ></AdvantagesCard>
          <AdvantagesCard
            title="Soziale Reichweite"
            description="Eine Instagram Story wird durchschnittlich von mehreren Hundert Nutzern gesehen. Diese Reichweite können Sie aktiv nutzen um ihr Geschäft bekannter zu machen."
            symbol="FLARE"
            fill="currentColor"
            stroke="none"
          ></AdvantagesCard>
          <AdvantagesCard
            title="Umfangreiche Statistiken"
            description="In unserem Dashboard können Sie jederzeit sehen, wie oft Sie in Instagram-Stories Ihrer Kunden erwähnt wurden und mit welchen Bildern und Texten."
            symbol="WAVE"
          ></AdvantagesCard>
          <AdvantagesCard
            title="Leistungsbezogene Bezahlung"
            description="Sie zahlen nur für das, was Sie erhalten: Bei uns zahlen Sie keinen monatlichen Pauschalbetrag, sondern abhängig von der Aktivitätsfreudigkeit Ihrer Kunden."
            symbol="EURO"
            fill="currentColor"
            stroke="none"
          ></AdvantagesCard>
          <AdvantagesCard
            title="Nachhaltiges Wachstum"
            description="Likes und Follower zu kaufen bringt auf lange Sicht nichts. Unser Service ist darauf ausgelegt langfristig möglichsts viele echte Personen für Ihr Unternehmen zu begeistern."
            symbol="ECO"
            fill="currentColor"
            stroke="none"
          ></AdvantagesCard>
          <AdvantagesCard
            title="Vollautomatischer Service"
            description="Nachdem wir den Menumori-Service zusammen mit Ihnen eingerichtet haben, geschieht das Verarbeiten von instagram Stories ihrer Kunden völlig automatisiert."
            symbol="SHIELD"
          ></AdvantagesCard>
        </div>
      </div>
    </section>
  );
};

function AdvantagesCard({ title, description, symbol, fill, stroke }) {
  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
      <div className="border-2 shadow border-gray-300 p-6 rounded-lg bg-white">
        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-500 mb-4">
          <StandardSVG
            fill={fill}
            stroke={stroke}
            symbol={symbol}
          ></StandardSVG>
        </div>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
          {title}
        </h2>
        <p className="leading-relaxed text-base">{description}</p>
      </div>
    </div>
  );
}

export default LandingpageAdvantages;
