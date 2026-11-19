import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/Container";
import {
  Eyebrow,
  GradientText,
  Lead,
  SectionHeading,
} from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { palette } from "@/theme/tokens";

export const metadata: Metadata = {
  title: "UI kit",
  robots: { index: false, follow: false },
};

const swatches = [
  ...Object.entries(palette.ink).map(([k, v]) => [`ink.${k}`, v]),
  ...Object.entries(palette.fg).map(([k, v]) => [`fg.${k}`, v]),
  ...Object.entries(palette.accent).map(([k, v]) => [`accent.${k}`, v]),
  ...Object.entries(palette.status).map(([k, v]) => [k, v]),
] as const;

/** Development-only UI kit (implementation.md Phase 2). 404s in production. */
export default function KitPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Section>
        <Eyebrow>Dev only</Eyebrow>
        <Heading as="h1" textStyle="hero">
          UI <GradientText>kit</GradientText>
        </Heading>
        <Lead mt="6">
          Every primitive in one place. Not linked, not indexed, 404 in
          production.
        </Lead>
      </Section>

      <Section>
        <SectionHeading>Colour tokens</SectionHeading>
        <Grid
          mt="8"
          gap="3"
          templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        >
          {swatches.map(([name, hex]) => (
            <Box
              key={name}
              rounded="xl"
              borderWidth="1px"
              borderColor="border.subtle"
              overflow="hidden"
            >
              <Box h="16" bg={hex} />
              <Box p="3" fontFamily="mono" fontSize="xs">
                <Text>{name}</Text>
                <Text color="fg.muted">{hex}</Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionHeading>Type scale</SectionHeading>
        <Stack mt="8" gap="4">
          <Text textStyle="hero">Hero heading</Text>
          <Text textStyle="h2">Section heading</Text>
          <Text textStyle="h3">Card heading</Text>
          <Text textStyle="body">
            Body copy at 1.0625rem with a 1.6 line height, capped at 68
            characters.
          </Text>
          <Text textStyle="eyebrow" color="accent.cyan">
            Eyebrow label
          </Text>
        </Stack>
      </Section>

      <Section>
        <SectionHeading>Buttons</SectionHeading>
        <Flex mt="8" gap="3" wrap="wrap" align="center">
          <ButtonLink href="/kit">Primary</ButtonLink>
          <ButtonLink href="/kit" variant="outline">
            Outline
          </ButtonLink>
          <ButtonLink href="/kit" variant="ghost">
            Ghost
          </ButtonLink>
          <ButtonLink href="/kit" size="sm">
            Small
          </ButtonLink>
          <MagneticButton>
            <ButtonLink href="/kit">Magnetic</ButtonLink>
          </MagneticButton>
        </Flex>
      </Section>

      <Section>
        <SectionHeading>Cards</SectionHeading>
        <Grid mt="8" gap="4" templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
          <SpotlightCard>
            <Heading as="h3" textStyle="h3">
              Spotlight card
            </Heading>
            <Text mt="2" color="fg.muted">
              Move the mouse over me.
            </Text>
          </SpotlightCard>
          <GlassCard>
            <Heading as="h3" textStyle="h3">
              Glass card
            </Heading>
            <Text mt="2" color="fg.muted">
              Backdrop blur, solid on small screens.
            </Text>
          </GlassCard>
        </Grid>
      </Section>

      <Section>
        <SectionHeading>Marquee and reveal</SectionHeading>
        <Box mt="8">
          <Marquee
            items={["One", "Two", "Three", "Four", "Five", "Six"]}
            label="Demo marquee"
          />
        </Box>
        <Stack mt="8" gap="4">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlassCard>Reveal item {i + 1}</GlassCard>
            </Reveal>
          ))}
        </Stack>
      </Section>
    </>
  );
}
