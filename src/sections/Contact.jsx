import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { Input, Select, Textarea } from "@/components/common/Input.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { SocialLinks } from "@/components/common/SocialLinks.jsx";
import { contactContent } from "@/data/personal.js";
import { budgetOptions, projectTypes, timelineOptions } from "@/data/site.js";
import { submitContact } from "@/services/contact.js";
import { getActiveSocialLinks, getPublicEmail, isSectionEnabled } from "@/utils/content.js";
import { isValidEmail } from "@/utils/helpers.js";

const initial = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  website: "",
};

export function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitMethod, setSubmitMethod] = useState(null);
  const [serverError, setServerError] = useState("");
  const email = getPublicEmail();
  const social = getActiveSocialLinks("contact");

  const field = (key) => ({
    value: values[key],
    onChange: (event) => {
      setValues((current) => ({ ...current, [key]: event.target.value }));
      setErrors((current) => ({ ...current, [key]: undefined }));
    },
  });

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (!values.message.trim() || values.message.trim().length < 12) {
      next.message = "Please include a short description of the project.";
    }
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const result = await submitContact(values);
      setSubmitMethod(result?.method || "endpoint");
      setStatus("success");
      setValues(initial);
    } catch (error) {
      setStatus("error");
      setServerError(error.message || "Something went wrong. Please try again.");
    }
  };

  const successCopy = useMemo(() => {
    if (status !== "success") return null;
    const viaEndpoint = submitMethod === "endpoint";
    return {
      title: viaEndpoint ? contactContent.successEndpointTitle : contactContent.successMailtoTitle,
      body: viaEndpoint ? contactContent.successEndpointBody : contactContent.successMailtoBody,
    };
  }, [status, submitMethod]);

  if (!isSectionEnabled("contact")) return null;

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title={contactContent.heading}
              description={contactContent.body}
            />
            <div className="mt-8 space-y-4">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex min-h-12 items-center gap-3 text-text-secondary hover:text-accent"
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-border">
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  {email}
                </a>
              ) : (
                <p className="text-sm text-text-secondary">
                  Use the form to start a conversation. I typically reply with clarifying questions and a practical next step.
                </p>
              )}
              <SocialLinks links={social} variant="row" columns={1} className="mt-2" />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            {successCopy ? (
              <div className="surface-card p-8" role="status">
                <p className="font-display text-2xl font-semibold">{successCopy.title}</p>
                <p className="mt-3 text-text-secondary">{successCopy.body}</p>
                <Button className="mt-6" variant="secondary" onClick={() => setStatus("idle")}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="relative surface-card p-6 sm:p-8" onSubmit={onSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    id="name"
                    label="Name"
                    autoComplete="name"
                    required
                    error={errors.name}
                    {...field("name")}
                  />
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    required
                    error={errors.email}
                    {...field("email")}
                  />
                </div>
                <Input
                  id="company"
                  label="Company / Organization"
                  autoComplete="organization"
                  className="mt-5"
                  {...field("company")}
                />
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Select
                    id="projectType"
                    label="Project type"
                    options={projectTypes}
                    {...field("projectType")}
                  />
                  <Select
                    id="budget"
                    label="Estimated budget"
                    options={budgetOptions}
                    {...field("budget")}
                  />
                </div>
                <Select
                  id="timeline"
                  label="Project timeline"
                  className="mt-5"
                  options={timelineOptions}
                  {...field("timeline")}
                />
                <Textarea
                  id="message"
                  label="Message"
                  required
                  className="mt-5"
                  error={errors.message}
                  hint="A few sentences about the product, timeline, and what you need help with."
                  {...field("message")}
                />
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={field("website").onChange}
                  />
                </div>
                {status === "error" ? (
                  <p className="mt-4 text-sm text-error" role="alert">
                    {serverError}
                  </p>
                ) : null}
                <Button type="submit" className="mt-6 w-full sm:w-auto" loading={status === "loading"}>
                  Send message
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
