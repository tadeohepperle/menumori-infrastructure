import Router from "next/router";
import Layout from "../../src/components/Layout";
import { getPublicBusinessData } from "../../src/services/DataService";

const Page = ({ business }) => {
  let {
    title,
    street_name,
    zip_code,
    city,
    house_number,
    slugname,
    username,
  } = business;
  console.log(business);
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="flex flex-col text-center w-full mb-8">
            <h2 className="text-xs text-teal-500 tracking-widest font-medium title-font mb-1 uppercase">
              {title}
            </h2>
            <h1>
              Allgemeine Gechäfts&shy;beding&shy;ungen zur Nutzung unserer
              Services
            </h1>
            <p className="mt-2 lg:w-2/3 mx-auto leading-relaxed text-base">
              {title} nutzt <a href="/">MENUMORI</a>, einen IT-Service der
              Prangerle Solutions e.K. <br></br>Der Service soll Menschen
              motivieren zum Zwecke der Promotion Bilder der entsprechenden
              Einrichtung zu teilen und diese auf Instagram zu verlinken. Dies
              dient dem Erzeugen von Aufmerksamkeit und einer Steigerung der
              Bekanntheit der Einrichtung.
            </p>
          </div>
          <button className="btn btn-lg flex mx-auto mb-16">
            mehr erfahren
          </button>
          <h2 className="mt-8">1. Rechte und Pflichten des Unternehmens</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
            porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
            ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
            nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
            Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
            nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
            condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem
            neque sed ipsum. Nam quam nunc, blandit vel.
          </p>
          <h2 className="mt-8">2. Daten und Sicherheit</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis partuget condimentum rhoncus, sem quam
            semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam
            nunc, blandit vel.
          </p>
          <h2 className="mt-8">3. Rechte des Verbrauchers</h2>
          <p>
            a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
            rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
            ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
            tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel,
            luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
            tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
            Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
            Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis
            magna. Sed consequat, leo eget bibendum sodales, augue velit cursus
            nunc.
          </p>
          <h2 className="mt-8">4. Streitschlichtung</h2>
          <p>
            Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
            libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci
            eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit
            amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget
            bibendum sodales, augue velit.
          </p>
        </div>
      </section>
    </Layout>
  );
};

Page.getInitialProps = async function (context) {
  let { slugname } = context.query;
  let business = await getPublicBusinessData(slugname);
  console.log(business);
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
