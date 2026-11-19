import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Container } from "@/components/ui/Container";
import { GradientText, Lead } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/content/site";
import { HeroMotion } from "./HeroMotion";

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
          top="-20%"
          left="50%"
          w="min(900px, 140vw)"
          h="min(900px, 140vw)"
          ml="calc(min(900px, 140vw) / -2)"
          rounded="full"
          pointerEvents="none"
          css={{
            background:
              "radial-gradient(closest-side, rgb(34 211 238 / 0.16), rgb(167 139 250 / 0.10) 55%, transparent)",
          }}
        />
        <Container
          position="relative"
          pt={{ base: "20", md: "32" }}
          pb={{ base: "16", md: "24" }}
        >
          {site.available && (
            <HStack
              data-hero="fade"
              display="inline-flex"
              gap="2"
              px="3"
              py="1.5"
              mb="8"
              rounded="full"
              borderWidth="1px"
              borderColor="border.subtle"
              bg="bg.surface"
              fontSize="sm"
              color="fg.muted"
            >
              <Box
                as="span"
                boxSize="2"
                rounded="full"
                bg="success"
                aria-hidden="true"
              />
              Taking on new projects
            </HStack>
          )}

          <Heading
            as="h1"
            id="hero-title"
            textStyle="hero"
            maxW="16ch"
            textWrap="balance"
          >
            Next.js sites and dashboards that load{" "}
            <GradientText>fast</GradientText> and convert.
          </Heading>

          <Lead data-hero="fade" mt="6">
            I&apos;m Emmanuel, a senior frontend engineer in Lagos with 5+ years
            shipping production React and TypeScript. I build, redesign and
            audit websites for teams in Nigeria and abroad.
          </Lead>

          <Flex data-hero="fade" mt="10" gap="3" wrap="wrap" align="center">
            <MagneticButton>
              <ButtonLink href={site.bookingHref}>
                {site.primaryCta.label}
              </ButtonLink>
            </MagneticButton>
            <ButtonLink href="/#services" variant="outline">
              See services
            </ButtonLink>
          </Flex>

          <Text
            data-hero="fade"
            mt="8"
            fontFamily="mono"
            fontSize="sm"
            color="fg.muted"
          >
            {site.location.city}, WAT (UTC+1) · Remote-friendly · Fixed-price
            quotes
          </Text>
        </Container>
      </HeroMotion>
    </Box>
  );
}
