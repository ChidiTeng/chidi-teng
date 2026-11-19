import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, posts } from "@/content/posts";
import { getLeadService } from "@/content/services";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { extractToc } from "@/lib/toc";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const meta = pageMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: p.published,
      modifiedTime: p.updated ?? p.published,
    },
  };
}

async function getToc(slug: string) {
  "use cache";
  cacheLife("max");
  const source = await readFile(
    path.join(process.cwd(), "src/content/posts", `${slug}.mdx`),
    "utf8",
  );
  return extractToc(source);
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const [{ default: Body }, toc] = await Promise.all([
    import(`@/content/posts/${slug}.mdx`),
    getToc(slug),
  ]);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: p.title, path: `/blog/${p.slug}` },
  ];
  const services = p.relatedServices
    .map(getLeadService)
    .filter((s) => s !== undefined);

  return (
    <article>
      <PageHeader title={p.title} lead={p.description} crumbs={crumbs}>
        <Text mt="6" fontFamily="mono" fontSize="sm" color="fg.muted">
          <time dateTime={p.published}>{formatDate(p.published)}</time>
          {p.updated && (
            <>
              {" · Updated "}
              <time dateTime={p.updated}>{formatDate(p.updated)}</time>
            </>
          )}
        </Text>
      </PageHeader>

      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 240px" }}
          gap="16"
          alignItems="start"
        >
          <Box className="prose" fontSize="1.0625rem">
            <Body />
          </Box>

          <Stack
            as="aside"
            gap="10"
            position={{ lg: "sticky" }}
            top="calc(var(--header-h) + 32px)"
            order={{ base: -1, lg: 0 }}
          >
            {toc.length > 0 && (
              <Box as="nav" aria-labelledby="toc-title">
                <Heading
                  as="h2"
                  id="toc-title"
                  textStyle="eyebrow"
                  color="fg.muted"
                  mb="4"
                >
                  On this page
                </Heading>
                <Stack as="ol" gap="2" fontSize="sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        className="link-underline"
                        href={`#${t.id}`}
                        style={{ color: "var(--c-muted)" }}
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
                </Stack>
              </Box>
            )}
            {services.length > 0 && (
              <Box as="nav" aria-labelledby="related-services-title">
                <Heading
                  as="h2"
                  id="related-services-title"
                  textStyle="eyebrow"
                  color="fg.muted"
                  mb="4"
                >
                  Related services
                </Heading>
                <Stack as="ul" gap="2" fontSize="sm">
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
      </Container>

      <CtaBand />
      <JsonLd data={[articleSchema(p), breadcrumbSchema(crumbs)]} />
    </article>
  );
}
