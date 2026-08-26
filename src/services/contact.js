import { personalInfo } from "@/data/personal.js";
import { getPublicEmail } from "@/utils/content.js";
import { buildMailto, isValidEmail } from "@/utils/helpers.js";

export async function submitContact(payload) {
  if (payload.website) {
    return { method: "honeypot" };
  }

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (endpoint && !endpoint.includes("[")) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        company: payload.company,
        projectType: payload.projectType,
        budget: payload.budget,
        timeline: payload.timeline,
        message: payload.message,
        source: `${personalInfo.name} portfolio`,
      }),
    });

    if (!response.ok) {
      throw new Error("The message could not be sent. Please try again or use email.");
    }

    return { method: "endpoint" };
  }

  const email = getPublicEmail();
  if (isValidEmail(email)) {
    window.location.href = buildMailto({
      email,
      ...payload,
    });
    return { method: "mailto" };
  }

  throw new Error(
    "The message could not be delivered automatically. Email saeedbarcha77@gmail.com or use WhatsApp, Upwork, or Fiverr.",
  );
}
