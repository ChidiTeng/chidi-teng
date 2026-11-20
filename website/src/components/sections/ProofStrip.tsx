import { Box, Flex, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { SpotlightCard, type GlowTone } from "@/components/ui/SpotlightCard";
import { verifiedProof } from "@/content/proof";
import { site } from "@/content/site";
import { Counter } from "./Counter";

const cardMeta: {
  tone: GlowTone;
  badge: string;
  pillClass: string;
  stroke: string;
  fillId: string;
  path: string;
}[] = [
  {
    tone: "violet",
    badge: "Verified",
    pillClass: "glow-pill glow-pill--violet",
    stroke: "#A78BFA",
    fillId: "spark-violet",
    path: "M2 26 C 24 24, 38 18, 58 20 C 78 22, 94 12, 118 14 C 138 16, 156 6, 178 4",
  },
  {
    tone: "cyan",
    badge: "Full-stack",
    pillClass: "glow-pill glow-pill--cyan",
    stroke: "#2DD4BF",
    fillId: "spark-cyan",
    path: "M2 24 C 28 22, 44 25, 66 16 C 88 8, 112 15, 136 9 C 154 5, 166 7, 178 3",
  },
  {
    tone: "amber",
    badge: "Web Vitals",
    pillClass: "glow-pill glow-pill--amber",
    stroke: "#FBBF24",
    fillId: "spark-amber",
    path: "M2 25 C 26 20, 48 24, 72 17 C 96 10, 118 18, 142 10 C 158 5, 168 6, 178 4",
  },
  {
    tone: "lime",
    badge: "Production",
    pillClass: "glow-pill",
    stroke: "#BEF264",
    fillId: "spark-lime",
    path: "M2 26 C 30 22, 54 19, 78 15 C 102 11, 126 13, 150 7 C 164 4, 172 4, 178 2",
  },
];

export function ProofStrip() {
  return (
    <Box as="section" aria-label="At a glance" py={{ base: "6", md: "10" }}>
      <Container>
        {verifiedProof.length > 0 && (
          <Grid
            as="dl"
            templateColumns={{
              base: "1fr",
              sm: `repeat(${Math.min(verifiedProof.length, 4)}, 1fr)`,
            }}
            gap="4"
            mb="6"
          >
            {verifiedProof.map((p, idx) => {
              const meta = cardMeta[idx % cardMeta.length]!;
              return (
                <SpotlightCard
                  key={p.label}
                  glow={meta.tone}
                  p={{ base: "5", md: "6" }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  gap="4"
                >
                  <Flex align="center" justify="space-between" gap="2">
                    <HStack gap="2">
                      <Box
                        as="span"
                        aria-hidden="true"
                        boxSize="2"
                        rounded="full"
                        style={{
                          background: meta.stroke,
                          boxShadow: `0 0 10px ${meta.stroke}`,
                        }}
                      />
                      <Text
                        fontFamily="mono"
                        fontSize="xs"
                        color="fg.muted"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                      >
                        Metric 0{idx + 1}
                      </Text>
                    </HStack>
                    <span className={meta.pillClass}>↑ {meta.badge}</span>
                  </Flex>

                  <Stack gap="1">
                    <Text as="dt" order={2} color="fg.muted" fontSize="sm">
                      {p.label}
                    </Text>
                    <Text
                      as="dd"
                      order={1}
                      textStyle="h2"
                      fontSize={{ base: "2.25rem", md: "2.75rem" }}
                      fontVariantNumeric="tabular-nums"
                      letterSpacing="-0.03em"
                    >
                      {/* Screen readers get the final value; the animated digits are hidden. */}
                      <span className="sr-only">
                        {p.value}
                        {p.suffix}
                      </span>
                      <Counter value={p.value} suffix={p.suffix} />
                    </Text>
                  </Stack>

                  <Box aria-hidden="true" pt="1">
                    <svg
                      viewBox="0 0 180 30"
                      width="100%"
                      height="30"
                      fill="none"
                      preserveAspectRatio="none"
                      style={{ overflow: "visible" }}
                    >
                      <defs>
                        <linearGradient
                          id={meta.fillId}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={meta.stroke}
                            stopOpacity="0.32"
                          />
                          <stop
                            offset="100%"
                            stopColor={meta.stroke}
                            stopOpacity="0.0"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d={`${meta.path} L 178 30 L 2 30 Z`}
                        fill={`url(#${meta.fillId})`}
                      />
                      <path
                        d={meta.path}
                        stroke={meta.stroke}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        style={{
                          filter: `drop-shadow(0 0 6px ${meta.stroke})`,
                        }}
                      />
                    </svg>
                  </Box>
                </SpotlightCard>
              );
            })}
          </Grid>
        )}

        <Box className="subcard" px={{ base: "4", md: "6" }} py="3.5">
          <Flex
            align="center"
            gap="4"
            direction={{ base: "column", sm: "row" }}
          >
            <span
              className="glow-pill glow-pill--cyan"
              style={{ flexShrink: 0 }}
            >
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
              Core Stack
            </span>
            <Box flex="1" minW="0" w="full">
              <Marquee
                items={site.stack}
                label="Tools and technologies I work with"
              />
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
