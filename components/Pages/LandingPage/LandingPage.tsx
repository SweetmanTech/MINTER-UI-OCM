import Layout from "../../Layout"
import SeoHead from "../../SeoHead"
import CountDownTimer from "./CountDownTimer"

const LandingPage = () => (
  <Layout type="base">
    <SeoHead />
    <div
      className="xl:w-[1440px] lg:w-[1280px] md:w-[1024px] h-screen
              flex items-center justify-around"
    >
      <CountDownTimer />
    </div>
  </Layout>
)

export default LandingPage
