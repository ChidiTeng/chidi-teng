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
import { GlassCard } from "@/components/ui/GlassCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { aboutContent, type ArchitecturePillar } from "@/content/about";
import { site } from "@/content/site";

const pillarStyles: Record<
  ArchitecturePillar["tone"],
  { squircle: string; pill: string; bar: string }
> = {
  cyan: {
    squircle: "icon-squircle icon-squircle--cyan",
    pill: "glow-pill glow-pill--cyan",
    bar: "linear-gradient(90deg, #2DD4BF, #6EE7B7)",
  },
  violet: {
    squircle: "icon-squircle icon-squircle--violet",
    pill: "glow-pill glow-pill--violet",
    bar: "linear-gradient(90deg, #A78BFA, #7C3AED)",
  },
  lime: {
    squircle: "icon-squircle icon-squircle--lime",
    pill: "glow-pill",
    bar: "linear-gradient(90deg, #BEF264, #2DD4BF)",
  },
};

export function About() {
  return (
    <Section id="about" aria-labelledby="about-title" deferRender>
      <Eyebrow>{aboutContent.eyebrow}</Eyebrow>
      <SectionHeading id="about-title" maxW="24ch">
        {aboutContent.heading}
      </SectionHeading>
      <Lead mt="4">{aboutContent.lead}</Lead>

      <Grid
        mt="12"
        gap="6"
        templateColumns={{ base: "1fr", lg: "1.05fr 1.15fr" }}
        alignItems="stretch"
      >
        {/* Left column: Builder-Defender Narrative & Identity Card */}
        <Reveal>
          <GlassCard
            glow="violet"
            h="full"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap="6"
          >
            <Stack gap="5">
              <Flex
                align={{ base: "flex-start", sm: "center" }}
                justify="space-between"
                direction={{ base: "column", sm: "row" }}
                gap="3"
              >
                <HStack gap="3.5">
                  <Box
                    as="span"
                    aria-hidden="true"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    boxSize="12"
                    rounded="2xl"
                    fontFamily="mono"
                    fontSize="sm"
                    fontWeight="700"
                    color="white"
                    css={{
                      background:
                        "linear-gradient(135deg, #A78BFA 0%, #7C3AED 55%, #2DD4BF 100%)",
                      boxShadow:
                        "inset 0 1px 0 0 rgb(255 255 255 / 0.35), 0 10px 24px -4px rgb(139 92 246 / 0.5)",
                    }}
                  >
                    EN
                  </Box>
                  <Box>
                    <Heading as="h3" textStyle="h3" fontSize="1.25rem">
                      {aboutContent.profileMeta.fullName}
                    </Heading>
                    <Text fontFamily="mono" fontSize="xs" color="fg.muted">
                      {site.location.city}, {site.location.country} ·{" "}
                      {aboutContent.profileMeta.currentOrg}
                    </Text>
                  </Box>
                </HStack>
                <span className="glow-pill">
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "var(--c-lime)",
                      boxShadow: "0 0 8px var(--c-lime)",
                    }}
                  />
                  High-Trust Systems
                </span>
              </Flex>

              <Box className="subcard" px="4" py="3">
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  color="accent.cyan"
                  lineHeight="1.5"
                >
                  {aboutContent.headlineTag}
                </Text>
              </Box>

              <Stack gap="4" color="fg.muted" fontSize="0.98rem">
                {aboutContent.paragraphs.map((p) => (
                  <Text key={p}>{p}</Text>
                ))}
              </Stack>

              <Box
                className="subcard"
                px="4"
                py="3.5"
                style={{
                  borderColor: "rgb(190 242 100 / 0.22)",
                  background: "rgb(190 242 100 / 0.05)",
                }}
              >
                <Text fontSize="sm" fontWeight="500" color="fg">
                  {aboutContent.mission}
                </Text>
              </Box>
            </Stack>

            <Stack gap="4" pt="2">
              <Grid
                templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                gap="3"
              >
                <Box className="subcard" px="3.5" py="2.5">
                  <Text fontFamily="mono" fontSize="xs" color="fg.muted">
                    Leadership
                  </Text>
                  <Text fontSize="sm" fontWeight="600" mt="0.5">
                    {aboutContent.profileMeta.leadership}
                  </Text>
                </Box>
                <Box className="subcard" px="3.5" py="2.5">
                  <Text fontFamily="mono" fontSize="xs" color="fg.muted">
                    Engineering Network
                  </Text>
                  <Text fontSize="sm" fontWeight="600" mt="0.5">
                    {aboutContent.profileMeta.communityReach}
                  </Text>
                </Box>
              </Grid>

              <Flex gap="3" wrap="wrap" align="center">
                <ButtonLink href={site.socials.linkedin} variant="outline" size="sm">
                  LinkedIn Profile ↗
                </ButtonLink>
                <ButtonLink href={site.socials.github} variant="ghost" size="sm">
                  GitHub ↗
                </ButtonLink>
              </Flex>
            </Stack>
          </GlassCard>
        </Reveal>

        {/* Right column: 3 Glowing Engineering Pillars + Top Skills */}
        <Stack gap="4" justify="space-between">
          {aboutContent.pillars.map((pillar, idx) => {
            const st = pillarStyles[pillar.tone];
            return (
              <Reveal key={pillar.id} delay={idx * 0.06}>
                <SpotlightCard glow={pillar.tone} p={{ base: "5", md: "6" }}>
                  <Flex
                    align={{ base: "flex-start", sm: "center" }}
                    justify="space-between"
                    direction={{ base: "column", sm: "row" }}
                    gap="3"
                    mb="3"
                  >
                    <HStack gap="3">
                      <span className={st.squircle} aria-hidden="true">
                        {pillar.number}
                      </span>
                      <Heading as="h3" textStyle="h3" fontSize="1.2rem">
                        {pillar.title}
                      </Heading>
                    </HStack>
                    <span className={st.pill}>{pillar.badge}</span>
                  </Flex>

                  <Text color="fg.muted" fontSize="sm" mb="4">
                    {pillar.summary}
                  </Text>

                  <HStack gap="2" wrap="wrap" mb="3.5">
                    {pillar.focus.map((item) => (
                      <Text
                        key={item}
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
                        {item}
                      </Text>
                    ))}
                  </HStack>

                  <div className="glow-bar" aria-hidden="true">
                    <div
                      className="glow-bar__fill"
                      style={{
                        width: pillar.barWidth,
                        background: st.bar,
                      }}
                    />
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}

          <Reveal delay={0.18}>
            <Box className="subcard" p={{ base: "4", md: "5" }}>
              <Flex
                align="center"
                justify="space-between"
                gap="2"
                mb="3"
                wrap="wrap"
              >
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  color="accent.cyan"
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                >
                  Top Skills & Focus Areas
                </Text>
                <span className="glow-pill glow-pill--violet">
                  FinTech & High-Trust SaaS
                </span>
              </Flex>
              <Flex as="ul" wrap="wrap" gap="2">
                {aboutContent.topSkills.map((skill) => (
                  <Box
                    as="li"
                    key={skill}
                    fontFamily="mono"
                    fontSize="xs"
                    px="3"
                    py="1.5"
                    rounded="full"
                    color="fg"
                    style={{
                      background: "rgb(255 255 255 / 0.05)",
                      border: "1px solid rgb(255 255 255 / 0.1)",
                    }}
                  >
                    {skill}
                  </Box>
                ))}
              </Flex>
            </Box>
          </Reveal>
        </Stack>
      </Grid>
    </Section>
  );
}
