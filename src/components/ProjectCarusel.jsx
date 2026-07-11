import { useRef, useState } from "react";
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

const CarouselArrow = ({ direction, onClick, ariaLabel }) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
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
  const carouselRef = useRef(null);

  const isHome = variant === "home";
  const projects = portfolioProjects;

  const selectedProject = portfolioProjects.find(
    (item) => item.id === selectedProjectId
  );

  const NextArrow = ({ onClick, disabled }) => (
    <CarouselArrow
      direction="right"
      ariaLabel="Next project"
      onClick={() => {
        if (disabled) {
          carouselRef.current?.goToSlide(0);
          return;
        }
        onClick?.();
      }}
    />
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
          <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16">
            <p className="section-label">{t.featuredLabel}</p>
            <h2 className="section-heading">{t.featuredTitle}</h2>
          </div>

          <div className="overflow-hidden">
            <Carousel
              ref={carouselRef}
              autoPlay={isHome}
              autoPlaySpeed={5000}
              responsive={portfolioResponsive}
              showDots={isHome}
              renderDotsOutside={isHome}
              infinite={false}
              rewind={isHome}
              rewindWithAnimation
              arrows
              customLeftArrow={
                <CarouselArrow direction="left" ariaLabel="Previous project" />
              }
              customRightArrow={<NextArrow />}
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
