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
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { caseStudies, type CaseStudy } from "@/content/work";
import { site } from "@/content/site";

const cardConfigs: {
  tone: GlowTone;
  squircle: string;
  pill: string;
  bar: string;
}[] = [
  {
    tone: "cyan",
    squircle: "icon-squircle icon-squircle--cyan",
    pill: "glow-pill glow-pill--cyan",
    bar: "linear-gradient(90deg, #2DD4BF, #BEF264)",
  },
  {
    tone: "violet",
    squircle: "icon-squircle icon-squircle--violet",
    pill: "glow-pill glow-pill--violet",
    bar: "linear-gradient(90deg, #A78BFA, #2DD4BF)",
  },
  {
    tone: "lime",
    squircle: "icon-squircle icon-squircle--lime",
    pill: "glow-pill",
    bar: "linear-gradient(90deg, #BEF264, #2DD4BF)",
  },
  {
    tone: "amber",
    squircle: "icon-squircle icon-squircle--amber",
    pill: "glow-pill glow-pill--amber",
    bar: "linear-gradient(90deg, #FBBF24, #A78BFA)",
  },
  {
    tone: "cyan",
    squircle: "icon-squircle icon-squircle--cyan",
    pill: "glow-pill glow-pill--cyan",
    bar: "linear-gradient(90deg, #2DD4BF, #A78BFA)",
  },
];

function getInitials(client: string) {
  const parts = client.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/);
  if (parts[0]?.toUpperCase() === "P23") return "P23";
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function CaseStudies({
  items = caseStudies,
}: {
  items?: CaseStudy[];
}) {
  return (
    <Section id="work" aria-labelledby="work-title" deferRender>
      <Flex
        align={{ base: "flex-start", md: "flex-end" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap="4"
      >
        <Box>
          <Eyebrow>Selected work</Eyebrow>
          <SectionHeading id="work-title">
            Problems solved, Shipped to Production 🚀
          </SectionHeading>
          <Lead mt="4">
            Production systems, AI assistants, and frontend architectures
            shipped across FinTech, HRTech, PropTech, and multi-tenant SaaS.
          </Lead>
        </Box>
 
      </Flex>

      {items.length > 0 ? (
        <Grid
          as="ul"
          mt="12"
          gap="5"
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        >
          {items.map((c, i) => {
            const lead = i === 0;
            const cfg = cardConfigs[i % cardConfigs.length]!;
            return (
              <Box
                as="li"
                key={c.slug}
                display="grid"
                gridColumn={lead ? { md: "span 2" } : undefined}
              >
                <Reveal delay={i * 0.05}>
                  <CaseStudyCard study={c} cfg={cfg} lead={lead} />
                </Reveal>
              </Box>
            );
          })}
        </Grid>
      ) : (
        <GlassCard mt="12" maxW="3xl" glow="cyan">
          <HStack gap="2.5" mb="4">
            <span className="glow-pill glow-pill--cyan">
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--c-cyan)",
                  boxShadow: "0 0 8px var(--c-cyan)",
                }}
              />
              In progress
            </span>
          </HStack>
          <Lead>
            Detailed case studies are being written up with client permission.
            In the meantime, my public code is on GitHub and I am happy to walk
            through past projects on a call.
          </Lead>
          <HStack mt="6" gap="3" wrap="wrap">
            <ButtonLink href={site.socials.github} variant="outline">
              View GitHub
            </ButtonLink>
            <ButtonLink href={site.bookingHref} variant="ghost">
              {site.primaryCta.short} →
            </ButtonLink>
          </HStack>
        </GlassCard>
      )}
    </Section>
  );
}

function CaseStudyCard({
  study: c,
  cfg,
  lead,
}: {
  study: CaseStudy;
  cfg: (typeof cardConfigs)[number];
  lead: boolean;
}) {
  return (
    <SpotlightCard
      glow={cfg.tone}
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap="6"
    >
      <Box>
        <Flex
          align={{ base: "flex-start", sm: "center" }}
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
          gap="3"
          mb="5"
        >
          <HStack gap="3">
            <span className={cfg.squircle} aria-hidden="true">
              {getInitials(c.client)}
            </span>
            <Box>
              <HStack gap="2" wrap="wrap">
                <Text fontWeight="600" fontSize="sm" color="fg">
                  {c.client}
                </Text>
                <Text fontFamily="mono" fontSize="xs" color="fg.muted">
                  · {c.year}
                </Text>
              </HStack>
              <Text fontFamily="mono" fontSize="xs" color="fg.muted">
                {c.role ?? "Senior Frontend Engineer"}
                {c.domain ? ` · ${c.domain}` : ""}
              </Text>
            </Box>
          </HStack>

          <HStack gap="2" alignSelf={{ base: "flex-start", sm: "center" }}>
            {c.headlineBadge && (
              <span className={cfg.pill}>{c.headlineBadge}</span>
            )}
            {c.status === "draft" && (
              <span className="glow-pill glow-pill--amber">
                Draft (dev only)
              </span>
            )}
            <span className="corner-arrow" aria-hidden="true">
              ↗
            </span>
          </HStack>
        </Flex>

        <Heading
          as="h3"
          textStyle={lead ? "h2" : "h3"}
          fontSize={
            lead
              ? { base: "1.6rem", md: "2.1rem" }
              : { base: "1.35rem", md: "1.5rem" }
          }
        >
          <Link href={`/work/${c.slug}`} className="stretched-link">
            {c.title}
          </Link>
        </Heading>

        <Text mt="3" color="fg.muted" maxW={lead ? "72ch" : "60ch"}>
          {c.summary}
        </Text>
      </Box>

      <Stack gap="5">
        {c.results.length > 0 && (
          <Grid
            as="dl"
            gap="3"
            templateColumns={{
              base: "1fr",
              sm: `repeat(${Math.min(c.results.length, 3)}, 1fr)`,
            }}
          >
            {c.results.slice(0, 3).map((r) => (
              <Box
                key={r.label}
                className="subcard"
                px="3.5"
                py="3"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap="1.5"
              >
                <Text
                  as="dd"
                  fontFamily="mono"
                  fontSize={{ base: "1.15rem", md: lead ? "1.45rem" : "1.2rem" }}
                  fontWeight="700"
                  letterSpacing="-0.02em"
                  className="gradient-text"
                >
                  {r.value}
                </Text>
                <Text
                  as="dt"
                  fontSize="xs"
                  color="fg.muted"
                  lineHeight="1.35"
                >
                  {r.label}
                </Text>
              </Box>
            ))}
          </Grid>
        )}

        <div className="glow-bar" aria-hidden="true">
          <div
            className="glow-bar__fill"
            style={{
              width: lead ? "96%" : "88%",
              background: cfg.bar,
            }}
          />
        </div>

        <Flex
          align={{ base: "flex-start", sm: "center" }}
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
          gap="3"
        >
          <HStack gap="2" wrap="wrap">
            {c.stack.map((tech) => (
              <Text
                key={tech}
                as="span"
                fontFamily="mono"
                fontSize="xs"
                px="2.5"
                py="1"
                rounded="full"
                color="fg.muted"
                style={{
                  background: "rgb(255 255 255 / 0.04)",
                  border: "1px solid rgb(255 255 255 / 0.08)",
                }}
              >
                {tech}
              </Text>
            ))}
          </HStack>

          <Text
            aria-hidden="true"
            fontSize="sm"
            color="accent.cyan"
            fontWeight="500"
            whiteSpace="nowrap"
          >
            Read architecture →
          </Text>
        </Flex>
      </Stack>
    </SpotlightCard>
  );
}
