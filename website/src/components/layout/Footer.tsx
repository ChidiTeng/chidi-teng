import Link from "next/link";
import { cacheLife } from "next/cache";
import { Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { leadServices } from "@/content/services";
import { publicEnv } from "@/lib/env";

async function getYear() {
  "use cache";
  cacheLife("max"); // refreshed by each deploy; no background regeneration needed
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getYear();
  return (
    <Box
      as="footer"
      borderTopWidth="1px"
      borderColor="border.subtle"
      mt="16"
      py={{ base: "12", md: "16" }}
    >
      <Container>
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }} gap="10">
          <Stack gap="3" maxW="sm">
            <Text fontWeight="600" fontSize="lg">
              {site.name}
            </Text>
            <Text color="fg.muted">
              {site.role} in {site.location.city}. React, Next.js and TypeScript
              for teams in Nigeria and worldwide.
            </Text>
          </Stack>

          <Box as="nav" aria-labelledby="footer-services">
            <Heading
              as="h2"
              id="footer-services"
              textStyle="eyebrow"
              color="fg.muted"
              mb="4"
            >
              Services
            </Heading>
            <Stack as="ul" gap="2">
              {leadServices.map((s) => (
                <li key={s.slug}>
                  <Link className="link-underline" href={`/services/${s.slug}`}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </Stack>
          </Box>

          <Box as="nav" aria-labelledby="footer-elsewhere">
            <Heading
              as="h2"
              id="footer-elsewhere"
              textStyle="eyebrow"
              color="fg.muted"
              mb="4"
            >
              Elsewhere
            </Heading>
            <Stack as="ul" gap="2">
              <li>
                <a
                  className="link-underline"
                  href={site.socials.github}
                  rel="me noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="link-underline"
                  href={site.socials.linkedin}
                  rel="me noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              {publicEnv.contactEmail && (
                <li>
                  <a
                    className="link-underline"
                    href={`mailto:${publicEnv.contactEmail}`}
                  >
                    Email
                  </a>
                </li>
              )}
              <li>
                <Link className="link-underline" href="/blog">
                  Blog
                </Link>
              </li>
            </Stack>
          </Box>
        </Grid>

        <Flex
          mt="12"
          pt="6"
          borderTopWidth="1px"
          borderColor="border.subtle"
          justify="space-between"
          wrap="wrap"
          gap="4"
        >
          <Text fontSize="sm" color="fg.muted">
            © {year} {site.name}
          </Text>
          <Text fontSize="sm" color="fg.muted">
            {site.location.city}, {site.location.country} · WAT (UTC+1)
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
