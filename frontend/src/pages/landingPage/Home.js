import Content from "components/content";
import HowItWorks from "components/HowItWorks";
import Trusted from "components/Trusted";
import JobBoard from "components/tesetjob/JobBoard";
import { userType } from "libs/isAuth";
import { CompanyBanner } from "components/CompanyBanner";

function Home() {
  return (
    <div>
      <Content />
      <Trusted />
      <HowItWorks />
      <JobBoard title={false} />
      <CompanyBanner type={userType} />
    </div>
  );
}

export default Home;
