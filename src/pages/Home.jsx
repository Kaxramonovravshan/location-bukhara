import HomeHero from "../components/home/HomeHero";
import ProjectCarusel from "../components/ProjectCarusel";
import ProducerSection from "../components/home/ProducerSection";
import HistorySection from "../components/home/HistorySection";
import Seo from "../components/Seo";
import { getPageSeo } from "../seo/pageSeo";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { language } = useLanguage();
  const seo = getPageSeo("/", language);

  return (
    <>
      <Seo {...seo} language={language} />

      <div className="bg-site">
        <HomeHero />
        <ProjectCarusel variant="home" />
        <ProducerSection />
        <HistorySection />
      </div>
    </>
  );
};

export default Home;
