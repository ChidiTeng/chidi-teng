import Link from "next/link";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/Container";
import { Eyebrow, Lead, SectionHeading } from "@/components/ui/Typography";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
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
        gridAutoRows={{ md: "minmax(220px, auto)" }}
      >
        {leadServices.map((s, i) => (
          <Box as="li" key={s.slug} display="grid" {...span[s.tile ?? "2x1"]}>
            <Reveal delay={i * 0.05}>
              <ServiceTile service={s} large={s.tile === "2x2"} />
            </Reveal>
          </Box>
        ))}
      </Grid>

      <Box mt="12">
        <Heading as="h3" textStyle="h3" mb="4">
          Also available
        </Heading>
        <Flex as="ul" wrap="wrap" gap="2">
          {otherServices.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/contact?service=${encodeURIComponent(s.name)}`}
                title={s.summary}
                className="btn btn--ghost btn--sm"
                style={{ border: "1px solid var(--c-border)" }}
              >
                {s.name}
              </Link>
            </li>
          ))}
        </Flex>
      </Box>
    </Section>
  );
}

function ServiceTile({
  service: s,
  large,
}: {
  service: LeadService;
  large: boolean;
}) {
  return (
    <SpotlightCard
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap="6"
    >
      <Box>
        <Heading
          as="h3"
          textStyle={large ? "h2" : "h3"}
          fontSize={large ? { md: "2.25rem" } : undefined}
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
        <Text mt="3" color="fg.muted" maxW="40ch">
          {s.summary}
        </Text>
      </Box>
      {large && (
        <Box as="ul" display="flex" flexWrap="wrap" gap="2">
          {s.page.deliverables.slice(0, 3).map((d) => (
            <Text
              as="li"
              key={d}
              fontFamily="mono"
              fontSize="xs"
              px="2.5"
              py="1"
              rounded="md"
              bg="bg.raised"
              color="fg.muted"
            >
              {d}
            </Text>
          ))}
        </Box>
      )}
      <Text
        aria-hidden="true"
        fontSize="sm"
        color="accent.cyan"
        fontWeight="500"
      >
        Learn more →
      </Text>
    </SpotlightCard>
  );
}
