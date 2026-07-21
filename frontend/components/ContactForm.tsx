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
    <div className="relative w-full bg-gradient-to-b from-card/90 via-card/70 to-card/90 border border-primary/30 hover:border-primary/50 shadow-[0_0_50px_rgba(255,255,255,0.03)] rounded-3xl p-8 md:p-12 backdrop-blur-xl transition-all duration-300">
      {/* Subtle Glowing Top Border Accent */}
      <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Header & Pill Badge */}
      <div className="flex flex-col items-start mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] uppercase tracking-widest font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Direct Inquiry Form
        </div>
        <h3 className="font-syne text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground">
          Send Us a Message
        </h3>
        <p className="text-muted-foreground text-sm font-medium mt-2 leading-relaxed">
          Have a new project, RFP, or strategic partnership in mind? Fill in your details below.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-8 p-5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3.5 shadow-lg">
          <CheckCircle2 size={22} className="shrink-0 text-emerald-400" />
          <span className="font-medium">Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-8 p-5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-sm flex items-center gap-3.5 shadow-lg">
          <AlertCircle size={22} className="shrink-0 text-rose-400" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="name" className="text-xs uppercase tracking-widest text-foreground/90 font-bold">
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
              className="bg-background/90 border border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-foreground/90 font-bold">
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
              className="bg-background/90 border border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 shadow-inner"
            />
          </div>
        </div>

        {/* Subject Field */}
        <div className="flex flex-col gap-2.5">
          <label htmlFor="subject" className="text-xs uppercase tracking-widest text-foreground/90 font-bold">
            Subject / Inquiry Type
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Brand Design & WebGL Inquiry"
            className="bg-background/90 border border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 shadow-inner"
          />
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-2.5">
          <label htmlFor="message" className="text-xs uppercase tracking-widest text-foreground/90 font-bold">
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
            className="bg-background/90 border border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 resize-none shadow-inner"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <Magnetic>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-primary text-primary-foreground font-syne text-xs uppercase tracking-widest font-extrabold px-10 py-4.5 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </Magnetic>
        </div>
      </form>
    </div>
  );
}
