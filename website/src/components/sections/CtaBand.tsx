import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import { Section } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText, Lead } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";

export function CtaBand({
  title = "Have a project in mind?",
  body = "Tell me what you are trying to fix or build. You will get a straight answer on whether I can help, and a fixed quote if I can.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section aria-labelledby="cta-title">
      <GlassCard
        glow="cyan"
        position="relative"
        overflow="hidden"
        p={{ base: "8", md: "14" }}
        textAlign={{ md: "center" }}
      >
        <Box
          aria-hidden="true"
          position="absolute"
          top="-35%"
          left="-10%"
          w="360px"
          h="360px"
          rounded="full"
          pointerEvents="none"
          css={{
            background:
              "radial-gradient(closest-side, rgb(167 139 250 / 0.22), transparent)",
          }}
        />
        <Box
          aria-hidden="true"
          position="absolute"
          bottom="-35%"
          right="-10%"
          w="360px"
          h="360px"
          rounded="full"
          pointerEvents="none"
          css={{
            background:
              "radial-gradient(closest-side, rgb(190 242 100 / 0.16), transparent)",
          }}
        />

        <HStack
          justify={{ base: "flex-start", md: "center" }}
          mb="5"
        >
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
            Fixed-price scoping · Fast turnaround
          </span>
        </HStack>

        <Heading
          as="h2"
          id="cta-title"
          textStyle="h2"
          mx={{ md: "auto" }}
          maxW="22ch"
          textWrap="balance"
        >
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          <GradientText>{title.split(" ").slice(-1)}</GradientText>
        </Heading>
        <Lead mt="4" mx={{ md: "auto" }}>
          {body}
        </Lead>
        <Flex mt="8" gap="3" wrap="wrap" justify={{ md: "center" }}>
          <ButtonLink href={site.bookingHref}>
            {site.primaryCta.label}
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Send a message
          </ButtonLink>
        </Flex>
      </GlassCard>
    </Section>
  );
}
