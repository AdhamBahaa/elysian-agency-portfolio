"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Magnetic from "./Magnetic";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSuccess(false);

    try {
      const res = await fetch("http://localhost:1337/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || "Portfolio Contact Inquiry",
            message: formData.message,
          },
        }),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        const detailedMsg =
          errorJson?.error?.message ||
          (res.status === 404
            ? "Strapi API endpoint not found. Please restart the backend server."
            : res.status === 403
            ? "Permission denied by Strapi. Please restart the backend server."
            : `Server returned error (${res.status}). Please try again.`);
        throw new Error(detailedMsg);
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-card/40 border border-border/20 rounded-2xl p-6 md:p-10 backdrop-blur-md">
      <h3 className="font-syne text-2xl font-bold uppercase tracking-tight mb-2">
        Send Us a Message
      </h3>
      <p className="text-muted-foreground text-xs md:text-sm mb-8">
        Have a new project, query, or strategic partnership in mind? Drop us a line.
      </p>

      {isSuccess && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
          <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Your Name <span className="text-primary">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Elena Rostova"
              className="bg-background/60 border border-border/30 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-200"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Your Email <span className="text-primary">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="elena@studio.com"
              className="bg-background/60 border border-border/30 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-200"
            />
          </div>
        </div>

        {/* Subject Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Subject / Inquiry Type
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Brand Design & WebGL Inquiry"
            className="bg-background/60 border border-border/30 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-200"
          />
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project scope, timeline, and goals..."
            className="bg-background/60 border border-border/30 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="self-start mt-2">
          <Magnetic>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center gap-3 bg-primary text-primary-foreground font-syne text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </Magnetic>
        </div>
      </form>
    </div>
  );
}
