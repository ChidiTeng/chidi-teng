import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Container } from "@/components/ui/Container";
import { GradientText, Lead } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/content/site";
import { HeroMotion } from "./HeroMotion";
import { HeroTelemetryPod } from "./HeroTelemetryPod";

/** Server-rendered hero. HeroMotion only adds the entrance on top. */
export function Hero() {
  return (
    <Box
      as="section"
      aria-labelledby="hero-title"
      position="relative"
      overflow="hidden"
    >
      <HeroMotion>
        <Box
          data-hero="glow"
          aria-hidden="true"
          position="absolute"
          top="-25%"
          left="50%"
          w="min(980px, 145vw)"
          h="min(980px, 145vw)"
          ml="calc(min(980px, 145vw) / -2)"
          rounded="full"
          pointerEvents="none"
          css={{
            background:
              "radial-gradient(closest-side, rgb(139 92 246 / 0.22), rgb(45 212 191 / 0.12) 48%, rgb(190 242 100 / 0.05) 70%, transparent)",
          }}
        />
        <Container
          position="relative"
          pt={{ base: "20", md: "32" }}
          pb={{ base: "16", md: "24" }}
        >
          {site.available && <HeroTelemetryPod />}

          <Heading
            as="h1"
            id="hero-title"
            textStyle="hero"
            maxW="17ch"
            textWrap="balance"
          >
            B2B systems built{" "}
            <GradientText>fast, secure</GradientText> and resilient.
          </Heading>

          <Lead data-hero="fade" mt="6">
            I&apos;m Emmanuel (G.) Nwachukwu, a Software Engineer in Lagos with
            5+ years building production SaaS and B2B platforms across frontend
            architecture, APIs, Site Reliability Engineering, and Application
            Security for high-trust teams.
          </Lead>

          <Flex data-hero="fade" mt="10" gap="3" wrap="wrap" align="center">
            <MagneticButton>
              <ButtonLink href={site.bookingHref}>
                {site.primaryCta.label}
              </ButtonLink>
            </MagneticButton>
            <ButtonLink href="/#work" variant="outline">
              See problems solved
            </ButtonLink>
            <ButtonLink href="/#about" variant="ghost">
              Engineering philosophy →
            </ButtonLink>
          </Flex>

          <Text
            data-hero="fade"
            mt="8"
            fontFamily="mono"
            fontSize="sm"
            color="fg.muted"
          >
            {site.location.city}, WAT (UTC+1) · Frontend & APIs · AppSec (OWASP)
            & SRE · FinTech & High-Trust SaaS
          </Text>
        </Container>
      </HeroMotion>
    </Box>
  );
}
