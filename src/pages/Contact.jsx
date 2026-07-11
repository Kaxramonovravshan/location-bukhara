import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const inputClasses =
  "w-full px-4 py-3.5 min-h-[48px] bg-site border border-site-border rounded-xl text-content-primary placeholder:text-content-secondary/60 focus:outline-none focus:border-accent transition-colors text-base";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS configuration.");
      setStatus({ type: "error", message: t.contact.errorMessage });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        },
        publicKey
      );
      setStatus({ type: "success", message: t.contact.successMessage });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({ type: "error", message: t.contact.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-site min-h-screen">
      <section className="site-container section-padding">
        <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10">
          <div className="space-y-3">
            <p className="section-label">{t.navbar.contactUs}</p>
            <h1 className="section-heading">{t.contact.title}</h1>
            <p className="body-text">{t.contact.sectionHeading}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm text-content-secondary mb-2">
                {t.contact.fullName}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClasses}
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-content-secondary mb-2">
                {t.contact.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                autoComplete="email"
                inputMode="email"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-content-secondary mb-2">
                {t.contact.phone}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-content-secondary mb-2">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`${inputClasses} resize-none min-h-[140px]`}
                required
              />
            </div>

            <div className="space-y-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl border border-accent text-accent font-semibold uppercase tracking-wider text-sm transition-all duration-300 ${
                  isSubmitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-accent hover:text-site"
                }`}
              >
                {isSubmitting ? t.contact.sending : t.contact.submitButton}
              </button>
              {status.message && (
                <p
                  className={`text-sm ${
                    status.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                  aria-live="polite"
                >
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
