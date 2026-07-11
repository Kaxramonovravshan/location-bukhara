import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronRight } from "lucide-react";
import {
  portfolioProjects,
  featuredProjects,
  portfolioResponsive
} from "../utils/portfolio.js";
import ProjectCard from "./ProjectCart.jsx";
import PortfolioDetailModal from "./PortfolioDetailModal.jsx";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const ProjectCarusel = ({ variant = "default" }) => {
  const { language } = useLanguage();
  const t = translations[language].home;
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const isHome = variant === "home";
  const projects = isHome ? featuredProjects : portfolioProjects;

  const selectedProject = portfolioProjects.find(
    (item) => item.id === selectedProjectId
  );

  const cards = projects.map((item) => (
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
  ));

  return (
    <>
      <section
        id="portfolio"
        className={`w-full border-t border-site-border overflow-x-hidden ${
          isHome ? "section-padding" : "py-16"
        }`}
      >
        <div className="site-container">
          {isHome ? (
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
              <div className="space-y-3 sm:space-y-4">
                <p className="section-label">{t.featuredLabel}</p>
                <h2 className="section-heading">{t.featuredTitle}</h2>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-1 text-accent font-semibold uppercase tracking-wider text-sm transition-colors duration-300 hover:text-accent-hover shrink-0 min-h-[44px]"
              >
                {t.viewAllProjects}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <h2 className="section-heading mb-8">{t.featuredTitle}</h2>
          )}

          <div className="overflow-hidden">
            <Carousel
              autoPlay={isHome}
              autoPlaySpeed={5000}
              responsive={portfolioResponsive}
              showDots={isHome}
              renderDotsOutside={isHome}
              infinite={isHome}
              arrows={!isHome}
              draggable
              swipeable
              keyBoardControl
              containerClass="portfolio-carousel"
              itemClass="portfolio-carousel__item"
              dotListClass="portfolio-carousel-dots"
            >
              {cards}
            </Carousel>
          </div>
        </div>
      </section>

      {selectedProject && (
        <PortfolioDetailModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </>
  );
};

export default ProjectCarusel;
