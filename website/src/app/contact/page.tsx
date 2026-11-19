import type { Metadata } from "next";
import { Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact Emmanuel | Hire a Next.js Developer",
  description:
    "Tell me about your website, dashboard or performance problem. Book a 20-minute scoping call or send a message and get a fixed-price quote.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell me what you are building"
        lead="Send a few lines about the project, or book a call directly. Every enquiry gets a reply."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <Section pt="0" aria-label="Contact options">
        <Grid
          templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
          gap={{ base: "10", lg: "16" }}
          alignItems="start"
        >
          <GlassCard>
            <ContactForm services={services.map((s) => s.name)} />
          </GlassCard>

          <Stack gap="6">
            {publicEnv.calUrl && (
              <GlassCard>
                <Heading as="h2" textStyle="h3">
                  Prefer to talk?
                </Heading>
                <Text mt="2" color="fg.muted">
                  Pick a time for a free 20-minute scoping call.
                </Text>
                <ButtonLink href={publicEnv.calUrl} style={{ marginTop: 20 }}>
                  {site.primaryCta.label}
                </ButtonLink>
              </GlassCard>
            )}
            {publicEnv.contactEmail && (
              <GlassCard>
                <Heading as="h2" textStyle="h3">
                  Email
                </Heading>
                <Text mt="2" color="fg.muted">
                  Write to me directly:
                </Text>
                <a
                  href={`mailto:${publicEnv.contactEmail}`}
                  className="link-underline"
                  style={{ color: "var(--c-cyan)" }}
                >
                  {publicEnv.contactEmail}
                </a>
              </GlassCard>
            )}
            <GlassCard>
              <Heading as="h2" textStyle="h3">
                What happens next
              </Heading>
              <Stack
                as="ol"
                mt="3"
                gap="2"
                color="fg.muted"
                css={{ listStyle: "decimal", paddingLeft: "1.2em" }}
              >
                <li>I read your message and reply within two working days.</li>
                <li>We have a short call to agree scope.</li>
                <li>You get a written proposal with a fixed price.</li>
              </Stack>
            </GlassCard>
          </Stack>
        </Grid>
      </Section>
    </>
  );
}
