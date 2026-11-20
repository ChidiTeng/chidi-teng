import Link from "next/link";
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Section } from "@/components/ui/Container";
import { Eyebrow, Lead, SectionHeading } from "@/components/ui/Typography";
import { SpotlightCard, type GlowTone } from "@/components/ui/SpotlightCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  leadServices,
  otherServices,
  type LeadService,
} from "@/content/services";

const span = {
  "2x2": { gridColumn: { md: "span 2" }, gridRow: { md: "span 2" } },
  "2x1": { gridColumn: { md: "span 2" }, gridRow: { md: "span 1" } },
} as const;

const tileConfig: {
  tone: GlowTone;
  squircleClass: string;
  pillClass: string;
  tag: string;
  icon: string;
  barGradient: string;
  barWidth: string;
}[] = [
  {
    tone: "lime",
    squircleClass: "icon-squircle icon-squircle--lime",
    pillClass: "glow-pill glow-pill--dark",
    tag: "↑ Core Service · SaaS & B2B",
    icon: "NX",
    barGradient: "linear-gradient(90deg, #07070d, #1e293b)",
    barWidth: "96%",
  },
  {
    tone: "violet",
    squircleClass: "icon-squircle icon-squircle--violet",
    pillClass: "glow-pill glow-pill--violet",
    tag: "SEO-Safe · Debt Paydown",
    icon: "RD",
    barGradient: "linear-gradient(90deg, #A78BFA, #7C3AED)",
    barWidth: "90%",
  },
  {
    tone: "cyan",
    squircleClass: "icon-squircle icon-squircle--cyan",
    pillClass: "glow-pill glow-pill--cyan",
    tag: "LCP · INP · CLS · OWASP",
    icon: "CW",
    barGradient: "linear-gradient(90deg, #2DD4BF, #6EE7B7)",
    barWidth: "96%",
  },
  {
    tone: "amber",
    squircleClass: "icon-squircle icon-squircle--amber",
    pillClass: "glow-pill glow-pill--amber",
    tag: "RBAC · High-Trust UI",
    icon: "DB",
    barGradient: "linear-gradient(90deg, #FBBF24, #F59E0B)",
    barWidth: "92%",
  },
  {
    tone: "lime",
    squircleClass: "icon-squircle icon-squircle--lime",
    pillClass: "glow-pill",
    tag: "SRE · Retries · Multi-LLM",
    icon: "AP",
    barGradient: "linear-gradient(90deg, #BEF264, #2DD4BF)",
    barWidth: "94%",
  },
];

export function ServicesBento() {
  return (
    <Section id="services" aria-labelledby="services-title">
      <Eyebrow>Services</Eyebrow>
      <SectionHeading id="services-title">
        What I can build for you
      </SectionHeading>
      <Lead mt="4">
        The {leadServices.length} things I do most, each with its own page, plus{" "}
        {otherServices.length} more on request.
      </Lead>

      <Grid
        as="ul"
        mt="12"
        gap="4"
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gridAutoRows={{ md: "minmax(230px, auto)" }}
      >
        {leadServices.map((s, i) => (
          <Box as="li" key={s.slug} display="grid" {...span[s.tile ?? "2x1"]}>
            <Reveal delay={i * 0.05}>
              <ServiceTile service={s} large={s.tile === "2x2"} index={i} />
            </Reveal>
          </Box>
        ))}
      </Grid>

      <GlassCard mt="10" glow="violet" p={{ base: "6", md: "8" }}>
        <Flex
          align={{ base: "flex-start", sm: "center" }}
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
          gap="3"
          mb="5"
        >
          <HStack gap="3">
            <Heading as="h3" textStyle="h3">
              Also available
            </Heading>
            <span className="glow-pill glow-pill--violet">
              +{otherServices.length} specialist modules
            </span>
          </HStack>
          <Text fontSize="sm" color="fg.muted">
            Select a module to prefill a scoping enquiry →
          </Text>
        </Flex>
        <Grid
          as="ul"
          gap="3"
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {otherServices.map((s, idx) => (
            <li key={s.slug}>
              <Link
                href={`/contact?service=${encodeURIComponent(s.name)}`}
                title={s.summary}
                className="subcard"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  height: "100%",
                }}
              >
                <HStack gap="3" minW="0">
                  <Box
                    as="span"
                    aria-hidden="true"
                    boxSize="2"
                    rounded="full"
                    flexShrink={0}
                    bg={
                      idx % 3 === 0
                        ? "accent.cyan"
                        : idx % 3 === 1
                          ? "accent.violet"
                          : "accent.lime"
                    }
                    css={{
                      boxShadow: "0 0 8px currentColor",
                    }}
                  />
                  <Text as="span" fontSize="sm" fontWeight="500" lineClamp={1}>
                    {s.name}
                  </Text>
                </HStack>
                <Text
                  as="span"
                  aria-hidden="true"
                  fontFamily="mono"
                  fontSize="xs"
                  color="fg.muted"
                >
                  ↗
                </Text>
              </Link>
            </li>
          ))}
        </Grid>
      </GlassCard>
    </Section>
  );
}

function ServiceTile({
  service: s,
  large,
  index,
}: {
  service: LeadService;
  large: boolean;
  index: number;
}) {
  const cfg = tileConfig[index % tileConfig.length]!;

  if (large) {
    return (
      <SpotlightCard
        featured
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap="6"
      >
        <Box>
          <Flex align="center" justify="space-between" gap="3" mb="6">
            <span className={cfg.pillClass}>{cfg.tag}</span>
            <span className="corner-arrow" aria-hidden="true">
              ↗
            </span>
          </Flex>

          <Heading
            as="h3"
            textStyle="h2"
            fontSize={{ base: "1.85rem", md: "2.35rem" }}
            color="#07070D"
          >
            {/* Whole card is clickable via the stretched link; one link per card for screen readers. */}
            <Link
              href={`/services/${s.slug}`}
              style={{ position: "static" }}
              className="stretched-link"
            >
              {s.name}
            </Link>
          </Heading>
          <Text mt="3" color="#1E293B" fontWeight="500" maxW="42ch">
            {s.summary}
          </Text>
        </Box>

        <Stack gap="4">
          <Box as="ul" display="flex" flexDirection="column" gap="2">
            {s.page.deliverables.slice(0, 3).map((d, idx) => (
              <Flex
                as="li"
                key={d}
                align="center"
                justify="space-between"
                px="3.5"
                py="2.5"
                rounded="xl"
                style={{
                  background: "rgb(7 7 13 / 0.08)",
                  border: "1px solid rgb(7 7 13 / 0.12)",
                }}
              >
                <HStack gap="2.5">
                  <Box
                    as="span"
                    aria-hidden="true"
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="700"
                    color="#07070D"
                  >
                    0{idx + 1}
                  </Box>
                  <Text
                    as="span"
                    fontSize="sm"
                    fontWeight="600"
                    color="#07070D"
                  >
                    {d}
                  </Text>
                </HStack>
                <Box
                  as="span"
                  aria-hidden="true"
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="700"
                  color="#07070D"
                >
                  ✓
                </Box>
              </Flex>
            ))}
          </Box>

          <Flex align="center" justify="space-between" pt="1">
            <span
              className="btn btn--dark btn--sm"
              aria-hidden="true"
              style={{ pointerEvents: "none" }}
            >
              Explore service →
            </span>
            <Text
              aria-hidden="true"
              fontFamily="mono"
              fontSize="xs"
              fontWeight="700"
              color="#07070D"
            >
              App Router · CWV
            </Text>
          </Flex>
        </Stack>
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard
      glow={cfg.tone}
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap="5"
    >
      <Box>
        <Flex align="center" justify="space-between" gap="3" mb="5">
          <HStack gap="3">
            <span className={cfg.squircleClass} aria-hidden="true">
              {cfg.icon}
            </span>
            <span className={cfg.pillClass}>{cfg.tag}</span>
          </HStack>
          <span className="corner-arrow" aria-hidden="true">
            ↗
          </span>
        </Flex>

        <Heading as="h3" textStyle="h3" fontSize="1.35rem">
          <Link
            href={`/services/${s.slug}`}
            style={{ position: "static" }}
            className="stretched-link"
          >
            {s.name}
          </Link>
        </Heading>
        <Text mt="2.5" color="fg.muted" maxW="42ch">
          {s.summary}
        </Text>
      </Box>

      <Stack gap="3">
        <div className="glow-bar" aria-hidden="true">
          <div
            className="glow-bar__fill"
            style={{
              width: cfg.barWidth,
              background: cfg.barGradient,
            }}
          />
        </div>
        <Flex align="center" justify="space-between">
          <Text
            aria-hidden="true"
            fontSize="sm"
            color="accent.cyan"
            fontWeight="500"
          >
            View breakdown →
          </Text>
          <Text
            aria-hidden="true"
            fontFamily="mono"
            fontSize="xs"
            color="fg.muted"
          >
            {s.page.deliverables.length} deliverables
          </Text>
        </Flex>
      </Stack>
    </SpotlightCard>
  );
}
