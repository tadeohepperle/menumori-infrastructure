import Layout from "../src/components/Layout";
import Link from "next/link";

const h2className = "font-medium title-font text-gray-900 mb-1 text-xl mt-8";

export default function Home() {
  return (
    <Layout>
      <section className="section-emphasis">
        <div className="container mx-auto flex py-24 md:flex-row flex-col">
          <div className=" lg:flex-grow lg:pr-12 md:pr-12 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h2 className=" uppercase text-bold text-teal-500">
              Menumori Instagram Services
            </h2>
            <h1 className="title-font sm:text-4xl text-4xl mb-4 font-medium text-gray-900 ">
              Impressum und Rechtliche Informationen
              <br className="hidden lg:inline-block" />
            </h1>
          </div>
        </div>
      </section>
      <section>
        <div className="container py-12">
          <h2 className={h2className}>Angaben gemäß § 5 TMG:</h2>
          <p className="leading-relaxed">
            Prangerle Solutions e.K.
            <br />
            Inhaber Tobias Prangel <br />
            Teutendorfer Weg 6 <br />
            23570 Lübeck <br />
            Deutschland
          </p>
          <h2 className={h2className}>Sitz:</h2>
          <p className="leading-relaxed">
            Lübeck
            <br />
          </p>

          <h2 className={h2className}>Handelsregister:</h2>
          <p className="leading-relaxed">
            HRA 9722 HL
            <br />
          </p>

          <h2 className={h2className}>Registergericht:</h2>
          <p className="leading-relaxed">
            Amtsgericht Lübeck
            <br />
          </p>

          <h2 className={h2className}>Kontakt:</h2>
          <p className="leading-relaxed">
            E-Mail: info(at)prangerle-solutions.de
            <br />
            Telefon: +49 176 7195 6556
            <br />
            Sprechzeiten: 10:00 – 17:00
            <br />
          </p>

          <h2 className={h2className}>
            Verantwortlich für den Inhalt nach §55 Abs. 2 RStV:
          </h2>
          <p className="leading-relaxed">
            Tadeo Hepperle
            <br />
            Kurfürstenstraße 115
            <br />
            10787 Berlin
            <br />
          </p>

          <h2 className={h2className}>Datenschutzerklärung:</h2>
          <Link href="/datenschutz">
            <a>
              <button className="btn">Link zur Datenschutzerklärung</button>
            </a>
          </Link>

          <h2 className={h2className}>Rechtliche Hinweise:</h2>
          <p className="leading-relaxed">
            Die Inhalte auf unseren Webseiten wurden mit größter Sorgfalt
            erarbeitet. Trotzdem ist es nicht möglich, Fehler vollständig
            auszuschließen. Wir übernehmen keine Garantie für Richtigkeit,
            Aktualität und Vollständigkeit der bereitgestellten Inhalte.
            Gleiches gilt für die Auswahl der Webseiten, auf die mittels Links
            verwiesen wird.
          </p>
          <p className="leading-relaxed">
            Für die Inhalte von Seiten Dritter, die mit einer solchen Verbindung
            erreicht werden, übernehmen wir keine Verantwortung. In keinem Fall
            haften wir für Schäden, die sich aus der Nutzung unserer oder der
            damit verlinkten Webseiten ergeben, es sei denn, es liegt Vorsatz
            oder grobe Fahrlässigkeit unsererseits vor. Ausgeschlossen ist
            insoweit auch jegliche Haftung für entgangenen Gewinn.
          </p>

          <h2 className={h2className}>Urheberrecht:</h2>
          <p className="leading-relaxed">
            Die Inhalte dieser Website sind urheberrechtlich geschützt. Das
            Herunterladen von Bildern, Grafiken und Texten im Ganzen oder in
            Teilen ist untersagt. Ebenfalls dürfen die Bilder, Grafiken oder
            Texte nicht weiterveröffentlicht, an Dritte weitergegeben,
            reproduziert, verändert oder sonst anderweitig verwendet werden,
            sofern nicht vorher eine ausdrückliche Zustimmung der Prangerle
            Solutions Prangel GbR oder einer ihr zugehörigen Konzerngesellschaft
            erteilt wurde.
          </p>
          <p className="leading-relaxed">
            Diese Website enthält auch Inhalte, die dem Urheberrecht und
            sonstigen Schutzrechte derjenigen unterliegen, die diese zur
            Verfügung gestellt haben.{" "}
          </p>
        </div>
      </section>
    </Layout>
  );
}
