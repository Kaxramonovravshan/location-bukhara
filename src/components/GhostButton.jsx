import { Link } from "react-router-dom";

const GhostButton = ({
  to,
  href,
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false
}) => {
  const classes = `btn-premium ${className}`.trim();

  const inner = <span className="btn-premium__inner">{children}</span>;

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled || undefined}
      >
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={href.startsWith("#") ? undefined : "_blank"}
        rel={href.startsWith("#") ? undefined : "noopener noreferrer"}
        aria-disabled={disabled || undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
};

export default GhostButton;
