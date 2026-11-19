"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Field,
  Grid,
  Input,
  NativeSelect,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  contactLimits,
  type ContactField,
  type ContactResponse,
} from "@/lib/contact-shared";

type Status = "idle" | "submitting" | "success" | "error";

const loadSuccessPanel = () => import("./SuccessPanel");
const SuccessPanel = dynamic(loadSuccessPanel, { ssr: false });

const fieldStyle = { bg: "bg.raised", borderColor: "border.subtle" } as const;

/**
 * Progressive form: native constraint validation for instant feedback, the
 * server schema as the source of truth, and errors announced via aria-live.
 * Prefills the service from ?service= after mount, so the page stays static.
 */
export function ContactForm({ services }: { services: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<ContactField, string>>
  >({});
  const [service, setService] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    const fromQuery = new URLSearchParams(window.location.search).get(
      "service",
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    if (fromQuery) setService(fromQuery.slice(0, contactLimits.service.max));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    setStatus("submitting");
    setError("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      const body = (await res
        .json()
        .catch(() => null)) as ContactResponse | null;
      if (res.ok && body?.ok) {
        form.reset();
        setService("");
        setStatus("success");
        return;
      }
      setStatus("error");
      setError(
        body && !body.ok
          ? body.error
          : "Something went wrong. Please try again.",
      );
      if (body && !body.ok && body.fieldErrors) {
        setFieldErrors(body.fieldErrors);
        const first = Object.keys(body.fieldErrors)[0];
        if (first)
          (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      }
    } catch {
      setStatus("error");
      setError("Network error. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return <SuccessPanel onReset={() => setStatus("idle")} />;
  }

  return (
    // Preload the success panel (and Motion) once the visitor engages with the form.
    <form
      onSubmit={onSubmit}
      onFocusCapture={() => void loadSuccessPanel()}
      aria-describedby="form-status"
    >
      <Stack gap="5">
        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="5">
          <Field.Root required invalid={Boolean(fieldErrors.name)}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="name"
              autoComplete="name"
              minLength={contactLimits.name.min}
              maxLength={contactLimits.name.max}
              size="lg"
              {...fieldStyle}
            />
            <Field.ErrorText>{fieldErrors.name}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={Boolean(fieldErrors.email)}>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={contactLimits.email.max}
              size="lg"
              {...fieldStyle}
            />
            <Field.ErrorText>{fieldErrors.email}</Field.ErrorText>
          </Field.Root>
        </Grid>

        <Field.Root invalid={Boolean(fieldErrors.service)}>
          <Field.Label>What do you need help with?</Field.Label>
          <NativeSelect.Root size="lg">
            <NativeSelect.Field
              name="service"
              value={service}
              onChange={(e) => setService(e.currentTarget.value)}
              {...fieldStyle}
            >
              <option value="">Not sure yet</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
              {service && !services.includes(service) && (
                <option value={service}>{service}</option>
              )}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{fieldErrors.service}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={Boolean(fieldErrors.message)}>
          <Field.Label>
            Project details <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            name="message"
            rows={6}
            minLength={contactLimits.message.min}
            maxLength={contactLimits.message.max}
            size="lg"
            autoresize={false}
            {...fieldStyle}
          />
          <Field.HelperText color="fg.muted">
            What you want to build or fix, rough timeline, and any links.
          </Field.HelperText>
          <Field.ErrorText>{fieldErrors.message}</Field.ErrorText>
        </Field.Root>

        {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
        <Box
          aria-hidden="true"
          position="absolute"
          left="-10000px"
          w="1px"
          h="1px"
          overflow="hidden"
        >
          <label>
            Website
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </label>
        </Box>

        <Box>
          <button
            type="submit"
            className="btn btn--primary"
            aria-disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
        </Box>

        <Text
          id="form-status"
          role="alert"
          aria-live="assertive"
          color="danger"
          minH="6"
        >
          {status === "error" ? error : ""}
        </Text>
      </Stack>
    </form>
  );
}
