import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/Container";
import { Eyebrow, Lead, SectionHeading } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";
import { ProcessLine } from "./ProcessLine";

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
        <Box as="ol">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title}>
              <Box
                position="relative"
                pb={i === processSteps.length - 1 ? "0" : "12"}
              >
                <Box
                  aria-hidden="true"
                  position="absolute"
                  left={{ base: "-8", md: "-12" }}
                  top="1"
                  ml="-4.5px"
                  boxSize="2.5"
                  rounded="full"
                  bg="bg.canvas"
                  borderWidth="2px"
                  borderColor="accent.cyan"
                />
                <Stack gap="2">
                  <Text fontFamily="mono" fontSize="sm" color="accent.cyan">
                    {String(i + 1).padStart(2, "0")} · {step.duration}
                  </Text>
                  <Heading as={stepHeading} textStyle="h3">
                    {step.title}
                  </Heading>
                  <Text color="fg.muted" maxW="56ch">
                    {step.body}
                  </Text>
                </Stack>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
