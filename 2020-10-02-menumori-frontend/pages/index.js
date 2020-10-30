import LandingpageAdvantages from "../src/components/landingpage/LandingpageAdvantages";
import LandingpageContactForm from "../src/components/landingpage/LandingpageContactForm";
import LandingpageHeader from "../src/components/landingpage/LandingpageHeader";
import LandingpageSteps from "../src/components/landingpage/LandingpageSteps";
import LandingpageHowItWorks from "../src/components/landingpage/LandingpageHowItWorks";
import Layout from "../src/components/Layout";

export default function Home() {
  return (
    <Layout>
      <LandingpageHeader></LandingpageHeader>
      <LandingpageSteps></LandingpageSteps>
      <LandingpageAdvantages></LandingpageAdvantages>
      <LandingpageHowItWorks></LandingpageHowItWorks>
      <LandingpageContactForm></LandingpageContactForm>
    </Layout>
  );
}
