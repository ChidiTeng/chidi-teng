import Link from "next/link";
import type { Metadata } from "next";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Container";
import { SpotlightCard, type GlowTone } from "@/components/ui/SpotlightCard";
import { posts } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

const tones: GlowTone[] = ["violet", "cyan", "lime", "amber"];

export const metadata: Metadata = pageMetadata({
  title: "Blog: React, Next.js and Web Performance Notes",
  description:
    "Practical notes on React, Next.js, Core Web Vitals and frontend engineering for founders and teams, from a Lagos-based senior frontend engineer.",
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes on building fast websites"
        lead="Practical write-ups on React, Next.js and web performance."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <Section pt="0" aria-label="Articles">
        <Stack as="ul" gap="4" maxW="3xl">
          {posts.map((p, idx) => (
            <li key={p.slug}>
              <SpotlightCard glow={tones[idx % tones.length]!}>
                <Flex align="center" justify="space-between" gap="3" mb="4">
                  <span className="glow-pill glow-pill--violet">
                    <time dateTime={p.published}>
                      {formatDate(p.published)}
                    </time>
                  </span>
                  <span className="corner-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Flex>
                <Heading as="h2" textStyle="h3" fontSize="1.5rem">
                  <Link href={`/blog/${p.slug}`} className="stretched-link">
                    {p.title}
                  </Link>
                </Heading>
                <Text mt="3" color="fg.muted">
                  {p.description}
                </Text>
              </SpotlightCard>
            </li>
          ))}
        </Stack>
      </Section>
    </>
  );
}
