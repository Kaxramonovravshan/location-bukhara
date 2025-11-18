import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

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

  // EmailJS configuration is read from Vite env variables
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
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 mb-4">
          {t.contact.title}
        </h1>

        {/* Section Heading */}
        <h2 className="text-xl md:text-2xl font-normal text-gray-700 mb-8">
          {t.contact.sectionHeading}
        </h2>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-normal text-gray-600 mb-2"
            >
              {t.contact.fullName}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-normal text-gray-600 mb-2"
            >
              {t.contact.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-normal text-gray-600 mb-2"
            >
              {t.contact.phone}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-normal text-gray-600 mb-2"
            >
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-900 font-normal transition-colors ${
                isSubmitting
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              {isSubmitting ? t.contact.sending : t.contact.submitButton}
            </button>
            {status.message && (
              <p
                className={`text-sm ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
