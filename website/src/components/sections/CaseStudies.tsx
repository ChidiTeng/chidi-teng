import Link from "next/link";
import { Badge, Grid, Heading, HStack, Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/Container";
import { Eyebrow, Lead, SectionHeading } from "@/components/ui/Typography";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { caseStudies, type CaseStudy } from "@/content/work";
import { site } from "@/content/site";

export function CaseStudies({
  items = caseStudies.slice(0, 2),
}: {
  items?: CaseStudy[];
}) {
  return (
    <Section id="work" aria-labelledby="work-title" deferRender>
      <Eyebrow>Selected work</Eyebrow>
      <SectionHeading id="work-title">
        Problems solved, with the numbers to show for it
      </SectionHeading>

      {items.length > 0 ? (
        <Grid
          as="ul"
          mt="12"
          gap="4"
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        >
          {items.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.06}>
                <CaseStudyCard study={c} />
              </Reveal>
            </li>
          ))}
        </Grid>
      ) : (
        <GlassCard mt="12" maxW="3xl">
          <Lead>
            Detailed case studies are being written up with client permission.
            In the meantime, my public code is on GitHub and I am happy to walk
            through past projects on a call.
          </Lead>
          <HStack mt="6" gap="3" wrap="wrap">
            <ButtonLink href={site.socials.github} variant="outline">
              View GitHub
            </ButtonLink>
            <ButtonLink href={site.bookingHref} variant="ghost">
              {site.primaryCta.short} →
            </ButtonLink>
          </HStack>
        </GlassCard>
      )}
    </Section>
  );
}

function CaseStudyCard({ study: c }: { study: CaseStudy }) {
  return (
    <SpotlightCard h="full">
      <HStack gap="2" mb="4" wrap="wrap">
        <Text fontFamily="mono" fontSize="sm" color="fg.muted">
          {c.client} · {c.year}
        </Text>
        {c.status === "draft" && (
          <Badge colorPalette="yellow" variant="subtle">
            Draft (dev only)
          </Badge>
        )}
      </HStack>
      <Heading as="h3" textStyle="h3" fontSize="1.5rem">
        <Link href={`/work/${c.slug}`} className="stretched-link">
          {c.title}
        </Link>
      </Heading>
      <Text mt="3" color="fg.muted">
        {c.summary}
      </Text>
      <Text mt="6" fontFamily="mono" fontSize="xs" color="fg.muted">
        {c.stack.join(" · ")}
      </Text>
    </SpotlightCard>
  );
}
