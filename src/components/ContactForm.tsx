"use client";

import { FormEvent, useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Let’s talk about your property workflows
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm"
      >
        <input name="name" placeholder="Name" required className="input" />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="input"
        />
        <input name="company" placeholder="Company" className="input" />
        <textarea
          name="message"
          rows={4}
          placeholder="What would you like to automate?"
          required
          className="input"
        />

        <button className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-emerald-400 text-xs mt-1">
            Message sent. We’ll get back to you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-xs mt-1">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactForm;
