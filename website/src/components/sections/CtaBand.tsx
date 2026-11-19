import { Flex, Heading } from "@chakra-ui/react";
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
        position="relative"
        overflow="hidden"
        p={{ base: "8", md: "14" }}
        textAlign={{ md: "center" }}
      >
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
