import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  portfolioProjects,
  portfolioResponsive
} from "../utils/portfolio.js";
import ProjectCard from "./ProjectCart.jsx";
import PortfolioDetailModal from "./PortfolioDetailModal.jsx";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const CarouselArrow = ({ direction, onClick, ariaLabel, disabled }) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
    disabled={disabled}
    className={`portfolio-carousel__arrow portfolio-carousel__arrow--${direction}`}
  >
    {direction === "left" ? (
      <ChevronLeft className="w-5 h-5" />
    ) : (
      <ChevronRight className="w-5 h-5" />
    )}
  </button>
);

const ProjectCarusel = ({ variant = "default" }) => {
  const { language } = useLanguage();
  const t = translations[language].home;
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const isHome = variant === "home";
  const projects = portfolioProjects;

  const selectedProject = portfolioProjects.find(
    (item) => item.id === selectedProjectId
  );

  const cards = projects.map((item) => (
    <ProjectCard
      key={item.id}
      name={item.title[language] || item.title.en}
      category={item.category[language] || item.category.en}
      poster={item.poster}
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
          <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16">
            <p className="section-label">{t.featuredLabel}</p>
            <h2 className="section-heading">{t.featuredTitle}</h2>
          </div>

          <div className="portfolio-carousel-wrap">
            <Carousel
              autoPlay={false}
              responsive={portfolioResponsive}
              showDots
              renderDotsOutside
              infinite={false}
              arrows
              customLeftArrow={
                <CarouselArrow direction="left" ariaLabel="Previous project" />
              }
              customRightArrow={
                <CarouselArrow direction="right" ariaLabel="Next project" />
              }
              draggable
              swipeable
              keyBoardControl
              partialVisible={false}
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
