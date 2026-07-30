"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xpqvnvvk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center animate-fade-in-up">
        <FiCheck className="h-12 w-12 text-secondary" />
        <p className="text-lg font-semibold">{t("form_success")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-primary hover:underline"
        >
          {t("form_send_another")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted"
          >
            {t("form_name")}
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted"
          >
            {t("form_email")}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted"
        >
          {t("form_subject")}
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={t("form_subject_placeholder")}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted"
        >
          {t("form_message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          placeholder={t("form_message_placeholder")}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          <FiAlertCircle className="h-4 w-4 shrink-0" />
          {t("form_error")}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-fill inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-(--shadow-primary) disabled:opacity-60"
      >
        {status === "sending" ? t("form_sending") : t("form_send")}
        <FiSend className="h-4 w-4" />
      </button>
    </form>
  );
}
