"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-text-muted/50 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";

const labelClass = "mb-2 block text-sm font-medium text-text";

const requiredMark = <span className="text-primary">*</span>;

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
      <div className="w-full self-start rounded-2xl border border-border bg-surface p-6 shadow-(--shadow-surface) sm:p-9">
        <div className="flex flex-col items-center gap-3 py-10 text-center animate-fade-in-up">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
            <FiCheck className="h-7 w-7 text-secondary" />
          </div>
          <p className="text-lg font-semibold">{t("form_success")}</p>
          <button
            onClick={() => setStatus("idle")}
            className="no-scale-hover mt-2 text-sm text-primary hover:underline"
          >
            {t("form_send_another")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full self-start rounded-2xl border border-border bg-surface p-6 shadow-(--shadow-surface) sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t("form_name")} {requiredMark}
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder={t("form_name_placeholder")}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t("form_email")} {requiredMark}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder={t("form_email_placeholder")}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={labelClass}>
          {t("form_subject")} {requiredMark}
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClass}
          placeholder={t("form_subject_placeholder")}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          {t("form_message")} {requiredMark}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-y`}
          placeholder={t("form_message_placeholder")}
        />
      </div>

      {status === "error" && (
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          <FiAlertCircle className="h-4 w-4 shrink-0" />
          {t("form_error")}
        </div>
      )}

      <div className="mt-7">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-hover hover:shadow-(--shadow-primary) disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t("form_sending") : t("form_send")}
          <FiSend className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
