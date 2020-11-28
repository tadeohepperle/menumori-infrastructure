import Link from "next/link";
import Router from "next/router";
import Layout from "../../src/components/Layout";
import HeadingSectionSmaller from "../../src/components/small/HeadingSectionSmaller";
import { getPublicBusinessData } from "../../src/services/DataService";
import { getDateStringForStartOfMonth } from "../../src/services/utility";
import moment from "moment";
import { IAPIURL } from "../../config";

const Page = ({ business }) => {
  let {
    title,
    street_name,
    zip_code,
    city,
    house_number,
    slugname,
    username,
    cover_image,
  } = business;
  let imageUrl = `${IAPIURL}${cover_image}`;

  const dateStringToday = moment().format("DD.MM.YYYY");

  const Unternehmensname = title;
  const Unternehmensart = business?.business_category?.title;
  const InstagramAccountName = username;
  return (
    <Layout
      title={`Ein­ver­ständ­nis­erklärung für ${title}`}
      metaDescription="Um dein Geschenk zu erhalten, müssen wir dich aus rechtlichen Gründen darum beten diese Einverständniserklärung zu lesen und uns auf Instagram eine Nachricht zu schicken, mit der du zustimmst."
    >
      <HeadingSectionSmaller
        title={"Einverständnis­erklärung"}
        subtitle={`${title}`}
      ></HeadingSectionSmaller>
      <section>
        <div className="container my-12">
          <div className=" h-64 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src={imageUrl}
            ></img>
          </div>
          {false && (
            <p>
              {title} nutzt{" "}
              <Link href="/">
                <a>MENUMORI</a>
              </Link>
              , einen IT-Service der Prangerle Solutions e.K. <br></br>Der
              Service soll Menschen motivieren zum Zwecke der Promotion Bilder
              der entsprechenden Einrichtung zu teilen und diese auf Instagram
              zu verlinken. Dies dient dem Erzeugen von Aufmerksamkeit und einer
              Steigerung der Bekanntheit der Einrichtung.
            </p>
          )}
          <h2 className="mt-8">
            I. Infor&#173;mation über Unternehmen und Branche
          </h2>
          <p>
            Sie sind Kunde bei {Unternehmensname}, ein {Unternehmensart} in{" "}
            {city}. Wie wir sehen, haben Sie Waren bzw. Dienstleistungen von{" "}
            {Unternehmensname} in Anspruch genommen und dessen
            Unternehmensaccount{" "}
            <a
              href={`https://www.instagram.com/${InstagramAccountName}/`}
              target="_blank"
            >
              @{InstagramAccountName}
            </a>{" "}
            in einem Ihrer persönlichen Posts/Stories auf Instagram verlinkt.
            Wir, die Prangerle Solutions e.K., sind ein IT-Unternehmen, das{" "}
            {Unternehmensname} im Social Media Markting unterstützt. Zu Themen
            des Geschäftsbereichs von {Unternehmensname} wie beispielsweise
            Aktionen, Neuigkeiten oder Sonderangeboten würden wir Sie auch gerne
            in Zukunft informieren dürfen.
          </p>
          <p className="mt-4">
            Dafür benötigen wir Ihre Einwilligung, dass wir Ihre
            personenbezogenen Daten speichern und Sie zum Zwecke der Werbung
            oder des Feedback-Einholens gegebenenfalls erneut kontaktieren
            dürfen. Wenn Sie uns Ihr Einverständnis erteilen, speichern wir Ihre
            uns bereits vorliegenden oder von Ihnen mitgeteilten Daten zur
            dargestellten Datenverarbeitung. Zugriff auf diese Daten haben die
            Prangerle Solutions e.K., sowie die Inhaber von {Unternehmensname}.
            Soweit die Prangerle Solutions e.K. hierfür selbständige Vermittler
            einsetzt, können diese Angaben zum gleichen Zweck auch an die für
            Sie regional jeweils zuständigen Vermittler der Gesellschaft zur
            dortigen Datenverarbeitung übermittelt werden.
          </p>
          <h2 className="mt-8">II. Umfang der Datenverarbeitung</h2>
          <p className="mb-4">
            Mit Ihrer Zustimmung erhalten die Unternehmen Prangerle Solutions
            e.K. und {Unternehmensname} bzw. die selbständigen Vermittler – zur
            Verfolgung der unter Ziffer I genannten Zwecke Zugriff auf die
            nachfolgenden Daten, soweit diese vorhanden sind:
          </p>
          <p>- Personalien (insbesondere Name, Adresse, Geburtsdatum)</p>
          <p>
            - Kontaktdaten (insbesondere E-Mail-Adresse, Telefonnummer und
            sonstige mitgeteilte Kontaktdaten)
          </p>
          <p>
            - Antrags-/Vertragsdaten (insbesondere bevorzugte Vertragsschlüsse)
          </p>
          <p>
            - Inkassodaten (insbesondere Zahlungsweise, Kontoverbindung,
            Buchungen) Dieser Punkt bezieht sich nur auf Daten, die uns von
            Ihnen explizit mitgeteilt worden sind.
          </p>
          <p className="mt-4">
            Soweit erforderlich, entbinden Sie hiermit die Mitarbeiter der
            Prangerle Solutions e.K. und {Unternehmensname} bzw. die
            selbständigen Vermittler im Hinblick auf die Weitergabe gemäß § 203
            StGB geschützter Daten (wie z. B. die Tatsache, dass ein Vertrag mit
            Ihnen besteht) von ihrer Schweigepflicht gegenüber den Mitarbeitern
            der Prangerle Solutions e.K. und {Unternehmensname} bzw. den
            selbständigen Vermittlern.
          </p>
          <h2 className="mt-8">III. Kontaktaufnahme zu Werbezwecken</h2>
          <p>
            Mit Ihrer Zustimmung verwenden die Unternehmen Prangerle Solutions
            e.K. und {Unternehmensname} oder die regional für Sie jeweils
            zuständigen selbständigen Vermittler der Prangerle Solutions e.K.
            Ihre Kontaktdaten, um Sie über Neuigkeiten, Angebote und aufkommende
            Fragen per Telefon oder E-Mail, SMS, Messaging-Dienste (z.B.
            WhatsApp) oder Soziale Netzwerke (z.B. Facebook oder Instagram)
            informieren zu können.
          </p>
          <h2 className="mt-8">IV. Widerruf</h2>
          <p>
            Die jeweilige Einwilligungserklärung kann ich jederzeit widerrufen
            mit einer Mail an:
          </p>
          <p className="mt-4">Prangerle Solutions e.K. </p>
          <p className="mt-4">
            E-Mail:{" "}
            <a href="mailto:widerruf@prangerle-solutions.de">
              widerruf@prangerle-solutions.de
            </a>
          </p>
          <p className="mt-4">
            In dieser Mail nennen sie uns bitte den Nutzernamen des
            Instagramaccounts des Unternehmens, für den Sie den Widerruf gerne
            durchführen möchten. Sollten Sie alle Einverständniserklärungen
            widerrufen wollen, die sie für Unternehmen gegeben haben, die
            Instagram-Services der Prangerle Solutions e.K. nutzen, teilen Sie
            uns dies bitte in einer Mail an{" "}
            <a href="mailto:widerruf@prangerle-solutions.de">
              widerruf@prangerle-solutions.de
            </a>{" "}
            explizit mit.
          </p>
          <p className="mt-4">
            Ihr Widerruf hat keinen Einfluss auf bestehende Verträge. Er wirkt
            erst für die Zukunft. Verarbeitungen, die vor dem Widerruf erfolgt
            sind, sind davon nicht betroffen. Weitere Informationen zu dieser
            Einwilligungserklärung und zum Datenschutz der Prangerle Solutions
            e.K. finden Sie unter{" "}
            <a href="https://www.prangerle-solutions.de/datenschutz">
              www.prangerle-solutions.de/datenschutz
            </a>
            .
          </p>
          <h2 className="mt-8">IV. Widerruf</h2>
          <p>
            Der Datenverarbeitung gemäß Ziffer I, II, III und IV stimme ich zu.
            Ja, ich bin einverstanden, dass mich die Prangerle Solutions e.K.
            und {Unternehmensname} per Telefon, E-Mail, SMS, Messaging-Dienst
            oder Sozialem Netzwerk - so, wie in Ziffer III beschrieben,
            informiert.
          </p>
          <p className="mt-4">
            Die Zustimmung dieser Einverständniserklärung erfolgt über Ihr
            Senden der geforderten Einwilligungsantwort über die Instagram
            Direktnachrichten. Die Einwilligungsantwort ist einer Nachricht an
            Sie von{" "}
            <a
              href={`https://www.instagram.com/${InstagramAccountName}/`}
              target="_blank"
            >
              @{InstagramAccountName}
            </a>{" "}
            zu entnehmen, in der auch diese Einverständniserklärung verlinkt
            ist.
          </p>
          <p className="mt-4">{`${city}, den ${dateStringToday}`}</p>
        </div>
      </section>
    </Layout>
  );
};

Page.getInitialProps = async function (context) {
  let { slugname } = context.query;
  let business = await getPublicBusinessData(slugname);
  // if no business for slugname found: redirect to error page:

  if (!business) {
    let errorURL = "/error/lokal-nicht-gefunden";
    // if serverside:
    if (context.res) {
      context.res.writeHead(302, {
        Location: errorURL,
      });
      context.res.end();
    }
    // if clientside:
    else Router.push(errorURL);
  }

  return { business };
};

export default Page;
