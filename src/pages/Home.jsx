import HomeHero from "../components/home/HomeHero";
import ProjectCarusel from "../components/ProjectCarusel";
import WhyFilmSection from "../components/home/WhyFilmSection";
import ProducerSection from "../components/home/ProducerSection";
import HistorySection from "../components/home/HistorySection";

const Home = () => {
  return (
    <div className="bg-site">
      <HomeHero />
      <ProjectCarusel variant="home" />
      <WhyFilmSection />
      <ProducerSection />
      <HistorySection />
    </div>
  );
};

export default Home;
