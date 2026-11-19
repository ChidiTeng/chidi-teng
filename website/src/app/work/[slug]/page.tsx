import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Box, Grid, Heading, List, Stack, Text } from "@chakra-ui/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { caseStudies, getCaseStudy } from "@/content/work";
import { getLeadService } from "@/content/services";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  // Next requires at least one param for a dynamic route under Cache Components;
  // when no case study is published yet, a placeholder slug 404s at request time.
  const params = caseStudies.map((c) => ({ slug: c.slug }));
  return params.length > 0 ? params : [{ slug: "__none__" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    ...pageMetadata({
      title: c.title.slice(0, 60),
      description: c.description,
      path: `/work/${c.slug}`,
      type: "article",
    }),
    ...(c.status === "draft" && { robots: { index: false, follow: false } }),
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/#work" },
    { name: c.title, path: `/work/${c.slug}` },
  ];
  const services = c.services
    .map(getLeadService)
    .filter((s) => s !== undefined);

  return (
    <article>
      <PageHeader
        eyebrow={`${c.client} · ${c.year}`}
        title={c.title}
        lead={c.summary}
        crumbs={crumbs}
      >
        {c.status === "draft" && (
          <Badge mt="6" colorPalette="yellow" variant="subtle">
            Draft, visible in development only
          </Badge>
        )}
      </PageHeader>

      {c.results.length > 0 && (
        <Section aria-labelledby="results-title" pt="0">
          <SectionHeading id="results-title" className="sr-only">
            Results
          </SectionHeading>
          <Grid
            as="dl"
            gap="4"
            templateColumns={{
              base: "1fr",
              md: `repeat(${Math.min(c.results.length, 3)}, 1fr)`,
            }}
          >
            {c.results.map((r) => (
              <GlassCard key={r.label} display="flex" flexDirection="column">
                <Text
                  as="dd"
                  order={1}
                  textStyle="h2"
                  className="gradient-text"
                >
                  {r.value}
                </Text>
                <Text as="dt" order={2} mt="2" color="fg.muted">
                  {r.label}
                </Text>
              </GlassCard>
            ))}
          </Grid>
        </Section>
      )}

      <Section aria-labelledby="problem-title">
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap="10">
          <Box>
            <Eyebrow>01</Eyebrow>
            <SectionHeading id="problem-title">The problem</SectionHeading>
          </Box>
          <Text fontSize="lg" color="fg.muted" maxW="prose">
            {c.problem}
          </Text>
        </Grid>
      </Section>

      <Section aria-labelledby="approach-title">
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap="10">
          <Box>
            <Eyebrow>02</Eyebrow>
            <SectionHeading id="approach-title">The approach</SectionHeading>
          </Box>
          <Stack as="ol" gap="6" maxW="prose">
            {c.approach.map((step, i) => (
              <Reveal as="li" key={step}>
                <Text fontSize="lg" color="fg.muted">
                  <Box as="span" fontFamily="mono" color="accent.cyan" mr="3">
                    {String(i + 1).padStart(2, "0")}
                  </Box>
                  {step}
                </Text>
              </Reveal>
            ))}
          </Stack>
        </Grid>
      </Section>

      <Section aria-labelledby="stack-title">
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap="10">
          <Box>
            <Eyebrow>03</Eyebrow>
            <SectionHeading id="stack-title">Stack and services</SectionHeading>
          </Box>
          <Stack gap="6">
            <List.Root
              variant="plain"
              flexDirection="row"
              flexWrap="wrap"
              gap="2"
            >
              {c.stack.map((t) => (
                <List.Item
                  key={t}
                  fontFamily="mono"
                  fontSize="sm"
                  px="3"
                  py="1"
                  rounded="md"
                  bg="bg.raised"
                >
                  {t}
                </List.Item>
              ))}
            </List.Root>
            {services.length > 0 && (
              <Box>
                <Heading as="h3" textStyle="h3" mb="3">
                  Services used
                </Heading>
                <Stack as="ul" gap="2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        className="link-underline"
                        href={`/services/${s.slug}`}
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid>
      </Section>

      <CtaBand title="Want results like these?" />
      <JsonLd
        data={breadcrumbSchema(crumbs.filter((x) => !x.path.includes("#")))}
      />
    </article>
  );
}
