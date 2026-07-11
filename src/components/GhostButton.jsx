import { Link } from "react-router-dom";

const GhostButton = ({ to, href, children, className = "", onClick, type = "button" }) => {
  const classes = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-accent text-accent font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-accent hover:text-site ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default GhostButton;
