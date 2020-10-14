import Layout from "../src/components/Layout";
import LoginForm from "../src/components/LoginForm";

export default function Page() {
  return (
    <Layout>
      <div className="container flex items-center">
        <LoginForm></LoginForm>
      </div>
    </Layout>
  );
}
