import type { Metadata } from "next";
import { Box, Flex, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
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
          gap={{ base: "10", lg: "12" }}
          alignItems="start"
        >
          <GlassCard glow="violet">
            <Flex align="center" justify="space-between" gap="3" mb="6">
              <HStack gap="3">
                <span
                  className="icon-squircle icon-squircle--violet"
                  aria-hidden="true"
                >
                  ✉
                </span>
                <Box>
                  <Heading as="h2" textStyle="h3">
                    Project brief
                  </Heading>
                  <Text fontSize="xs" color="fg.muted">
                    Replies within 2 working days
                  </Text>
                </Box>
              </HStack>
              <span className="glow-pill">• Direct</span>
            </Flex>
            <ContactForm services={services.map((s) => s.name)} />
          </GlassCard>

          <Stack gap="6">
            {publicEnv.calUrl && (
              <SpotlightCard featured>
                <Flex align="center" justify="space-between" gap="3" mb="4">
                  <span className="glow-pill glow-pill--dark">
                    20-min call
                  </span>
                  <span className="corner-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Flex>
                <Heading as="h2" textStyle="h3" color="#07070D">
                  Prefer to talk?
                </Heading>
                <Text mt="2" color="#1E293B" fontWeight="500">
                  Pick a time for a free 20-minute scoping call.
                </Text>
                <ButtonLink
                  href={publicEnv.calUrl}
                  className="btn--dark"
                  style={{ marginTop: 20 }}
                >
                  {site.primaryCta.label}
                </ButtonLink>
              </SpotlightCard>
            )}
            {publicEnv.contactEmail && (
              <GlassCard glow="cyan">
                <Flex align="center" justify="space-between" gap="3" mb="3">
                  <Heading as="h2" textStyle="h3">
                    Email
                  </Heading>
                  <span className="glow-pill glow-pill--cyan">Inbox</span>
                </Flex>
                <Text mt="1" color="fg.muted" mb="3">
                  Write to me directly:
                </Text>
                <a
                  href={`mailto:${publicEnv.contactEmail}`}
                  className="link-underline"
                  style={{ color: "var(--c-cyan)", fontWeight: 500 }}
                >
                  {publicEnv.contactEmail}
                </a>
              </GlassCard>
            )}
            <GlassCard glow="lime">
              <Flex align="center" justify="space-between" gap="3" mb="4">
                <Heading as="h2" textStyle="h3">
                  What happens next
                </Heading>
                <span className="glow-pill">3 steps</span>
              </Flex>
              <Stack as="ol" gap="3" color="fg.muted">
                {[
                  "I read your message and reply within two working days.",
                  "We have a short call to agree scope.",
                  "You get a written proposal with a fixed price.",
                ].map((step, i) => (
                  <Flex
                    as="li"
                    key={step}
                    className="subcard"
                    px="3.5"
                    py="3"
                    align="center"
                    gap="3"
                  >
                    <Text
                      as="span"
                      fontFamily="mono"
                      fontSize="xs"
                      fontWeight="700"
                      color="accent.lime"
                    >
                      0{i + 1}
                    </Text>
                    <Text as="span" fontSize="sm" color="fg">
                      {step}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </GlassCard>
          </Stack>
        </Grid>
      </Section>
    </>
  );
}
