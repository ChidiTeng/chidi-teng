import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SpotlightCard, type GlowTone } from "@/components/ui/SpotlightCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { DetailDrapes } from "@/components/ui/DetailDrapes";
import { Reveal } from "@/components/ui/Reveal";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getLeadService,
  leadServices,
  type ProofLevel,
} from "@/content/services";
import { caseStudies } from "@/content/work";
import { posts } from "@/content/posts";
import { site } from "@/content/site";
import { breadcrumbSchema, pageMetadata, serviceOfferSchema } from "@/lib/seo";

const benefitTones: {
  tone: GlowTone;
  squircle: string;
  pill: string;
}[] = [
  {
    tone: "violet",
    squircle: "icon-squircle icon-squircle--violet",
    pill: "glow-pill glow-pill--violet",
  },
  {
    tone: "cyan",
    squircle: "icon-squircle icon-squircle--cyan",
    pill: "glow-pill glow-pill--cyan",
  },
  {
    tone: "lime",
    squircle: "icon-squircle icon-squircle--lime",
    pill: "glow-pill",
  },
];

export function generateStaticParams() {
  return leadServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getLeadService(slug);
  if (!s) return {};
  return pageMetadata({
    title: s.page.title,
    description: s.page.description,
    path: `/services/${s.slug}`,
  });
}

const proofCopy: Record<ProofLevel, string> = {
  strong: "Core service with a track record.",
  partial: "Regular part of my client work.",
  building: "Newer offering, priced accordingly.",
};

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getLeadService(slug);
  if (!s) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: s.name, path: `/services/${s.slug}` },
  ];
  const related = caseStudies.filter((c) => c.services.includes(s.slug));
  const relatedPosts = posts.filter((p) => p.relatedServices.includes(s.slug));
  const others = leadServices.filter((x) => x.slug !== s.slug);

  return (
    <>
      <DetailDrapes variant="service" />
      <PageHeader
        eyebrow={s.name}
        title={s.page.h1}
        lead={s.page.sub}
        crumbs={crumbs}
      >
        <Flex mt="10" gap="3" wrap="wrap">
          <ButtonLink href={site.bookingHref}>
            {site.primaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={`/contact?service=${encodeURIComponent(s.name)}`}
            variant="outline"
          >
            Ask a question
          </ButtonLink>
        </Flex>
      </PageHeader>

      <Section aria-labelledby="benefits-title" pt={{ base: "4", md: "8" }}>
        <SectionHeading id="benefits-title" className="sr-only">
          What you get
        </SectionHeading>
        <Grid
          as="ul"
          gap="4"
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        >
          {s.page.benefits.map((b, i) => {
            const cfg = benefitTones[i % benefitTones.length]!;
            return (
              <li key={b.title}>
                <Reveal delay={i * 0.06}>
                  <SpotlightCard glow={cfg.tone} h="full">
                    <Flex
                      align="center"
                      justify="space-between"
                      gap="3"
                      mb="5"
                    >
                      <span className={cfg.squircle} aria-hidden="true">
                        0{i + 1}
                      </span>
                      <span className={cfg.pill}>Outcome 0{i + 1}</span>
                    </Flex>
                    <Heading as="h3" textStyle="h3">
                      {b.title}
                    </Heading>
                    <Text mt="3" color="fg.muted">
                      {b.body}
                    </Text>
                  </SpotlightCard>
                </Reveal>
              </li>
            );
          })}
        </Grid>
      </Section>

      <Section aria-labelledby="deliverables-title">
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap="10"
          alignItems="start"
        >
          <Box>
            <Eyebrow>Deliverables</Eyebrow>
            <SectionHeading id="deliverables-title">
              What you receive
            </SectionHeading>
          </Box>
          <GlassCard glow="cyan">
            <List.Root as="ul" gap="3" variant="plain">
              {s.page.deliverables.map((d) => (
                <List.Item
                  key={d}
                  className="subcard"
                  px="4"
                  py="3"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="3"
                >
                  <HStack gap="3">
                    <Box
                      as="span"
                      color="accent.lime"
                      fontFamily="mono"
                      fontWeight="700"
                      aria-hidden="true"
                    >
                      ✓
                    </Box>
                    <Text as="span" fontWeight="500">
                      {d}
                    </Text>
                  </HStack>
                  <span className="glow-pill glow-pill--cyan">Included</span>
                </List.Item>
              ))}
            </List.Root>
            <Flex mt="6" gap="3" align="center" wrap="wrap">
              <span
                className={
                  s.page.proof === "strong"
                    ? "glow-pill"
                    : "glow-pill glow-pill--violet"
                }
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "currentColor",
                    boxShadow: "0 0 8px currentColor",
                  }}
                />
                {s.page.proof === "strong"
                  ? "Core service"
                  : s.page.proof === "partial"
                    ? "Established"
                    : "New"}
              </span>
              <Text fontSize="sm" color="fg.muted">
                {proofCopy[s.page.proof]}
              </Text>
            </Flex>
          </GlassCard>
        </Grid>
      </Section>

      <Process />

      {(related.length > 0 || relatedPosts.length > 0) && (
        <Section aria-labelledby="related-title" deferRender>
          <SectionHeading id="related-title">Related reading</SectionHeading>
          <Stack as="ul" mt="8" gap="3">
            {related.map((c) => (
              <li key={c.slug}>
                <Link className="link-underline" href={`/work/${c.slug}`}>
                  Case study: {c.title}
                </Link>
              </li>
            ))}
            {relatedPosts.map((p) => (
              <li key={p.slug}>
                <Link className="link-underline" href={`/blog/${p.slug}`}>
                  Article: {p.title}
                </Link>
              </li>
            ))}
          </Stack>
        </Section>
      )}

      <Faq items={s.page.faq} title={`${s.name}: common questions`} />

      <Section aria-labelledby="other-services-title" deferRender>
        <Heading as="h2" id="other-services-title" textStyle="h3" mb="4">
          Other services
        </Heading>
        <Flex as="ul" wrap="wrap" gap="2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/services/${o.slug}`}
                className="btn btn--ghost btn--sm"
                style={{ border: "1px solid var(--c-border)" }}
              >
                {o.name}
              </Link>
            </li>
          ))}
        </Flex>
      </Section>

      <CtaBand title="Ready to get started?" />

      <JsonLd
        data={[
          serviceOfferSchema(s),
          breadcrumbSchema(crumbs.filter((c) => !c.path.includes("#"))),
        ]}
      />
    </>
  );
}
