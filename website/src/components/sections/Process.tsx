import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/Container";
import { Eyebrow, Lead, SectionHeading } from "@/components/ui/Typography";
import { SpotlightCard, type GlowTone } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";
import { ProcessLine } from "./ProcessLine";

const stepTones: {
  tone: GlowTone;
  squircle: string;
  pill: string;
  bar: string;
  pct: string;
}[] = [
  {
    tone: "violet",
    squircle: "icon-squircle icon-squircle--violet",
    pill: "glow-pill glow-pill--violet",
    bar: "linear-gradient(90deg, #A78BFA, #7C3AED)",
    pct: "25%",
  },
  {
    tone: "cyan",
    squircle: "icon-squircle icon-squircle--cyan",
    pill: "glow-pill glow-pill--cyan",
    bar: "linear-gradient(90deg, #2DD4BF, #0D9488)",
    pct: "50%",
  },
  {
    tone: "amber",
    squircle: "icon-squircle icon-squircle--amber",
    pill: "glow-pill glow-pill--amber",
    bar: "linear-gradient(90deg, #FBBF24, #D97706)",
    pct: "75%",
  },
  {
    tone: "lime",
    squircle: "icon-squircle icon-squircle--lime",
    pill: "glow-pill",
    bar: "linear-gradient(90deg, #BEF264, #2DD4BF)",
    pct: "100%",
  },
];

export function Process({
  headingLevel = "h2",
}: {
  headingLevel?: "h2" | "h3";
}) {
  const stepHeading = headingLevel === "h2" ? "h3" : "h4";
  return (
    <Section id="process" aria-labelledby="process-title">
      {/* No content-visibility here: ScrollTrigger needs real layout to measure. */}
      <Eyebrow>Process</Eyebrow>
      <SectionHeading as={headingLevel} id="process-title">
        How a project runs
      </SectionHeading>
      <Lead mt="4">
        Clear scope, a fixed price and something you can click every week.
      </Lead>

      <Box position="relative" mt="12" pl={{ base: "8", md: "12" }} maxW="3xl">
        <ProcessLine />
        <Stack as="ol" gap="5">
          {processSteps.map((step, i) => {
            const cfg = stepTones[i % stepTones.length]!;
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal as="li" key={step.title}>
                <Box position="relative">
                  <Box
                    aria-hidden="true"
                    position="absolute"
                    left={{ base: "-8", md: "-12" }}
                    top="7"
                    ml="-5px"
                    boxSize="3"
                    rounded="full"
                    bg="bg.canvas"
                    borderWidth="2px"
                    borderColor="accent.cyan"
                    css={{
                      boxShadow: "0 0 12px var(--c-cyan)",
                    }}
                  />
                  <SpotlightCard glow={cfg.tone} p={{ base: "5", md: "6" }}>
                    <Flex
                      align={{ base: "flex-start", sm: "center" }}
                      justify="space-between"
                      direction={{ base: "column", sm: "row" }}
                      gap="3"
                      mb="3"
                    >
                      <HStack gap="3.5">
                        <span className={cfg.squircle} aria-hidden="true">
                          {num}
                        </span>
                        <Heading as={stepHeading} textStyle="h3">
                          {step.title}
                        </Heading>
                      </HStack>
                      <span className={cfg.pill}>{step.duration}</span>
                    </Flex>
                    <Text color="fg.muted" maxW="58ch" mb="4">
                      {step.body}
                    </Text>
                    <div className="glow-bar" aria-hidden="true">
                      <div
                        className="glow-bar__fill"
                        style={{
                          width: cfg.pct,
                          background: cfg.bar,
                        }}
                      />
                    </div>
                  </SpotlightCard>
                </Box>
              </Reveal>
            );
          })}
        </Stack>
      </Box>
    </Section>
  );
}
