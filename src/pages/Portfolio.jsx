import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { portfolioProjects } from "../utils/portfolio";
import ProjectCard from "../components/ProjectCart";
import PortfolioDetailModal from "../components/PortfolioDetailModal";

const Portfolio = () => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;
  const homeT = translations[language].home;
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedProject = portfolioProjects.find(
    (item) => item.id === selectedProjectId
  );

  return (
    <div className="bg-site">
      <section className="border-b border-site-border section-padding pb-12">
        <div className="site-container space-y-4">
          <p className="section-label">{homeT.featuredLabel}</p>
          <h1 className="section-heading">{t.pageTitle}</h1>
          <p className="body-text max-w-2xl">{t.pageSubtitle}</p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {portfolioProjects.map((item) => (
              <ProjectCard
                key={item.id}
                name={item.title[language] || item.title.en}
                category={item.category[language] || item.category.en}
                url={item.cover}
                director={item.director}
                countries={item.countries[language] || item.countries.en}
                year={item.year}
                onClick={() => setSelectedProjectId(item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <PortfolioDetailModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;
