import Link from "next/link";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Lead } from "@/components/ui/Typography";

type Crumb = { name: string; path: string };

/** Inner-page header: visible breadcrumbs, the page's single H1 and a lead. */
export function PageHeader({
  title,
  lead,
  eyebrow,
  crumbs,
  children,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <Box
      as="section"
      aria-labelledby="page-title"
      pt={{ base: "16", md: "24" }}
      pb={{ base: "10", md: "14" }}
    >
      <Container>
        {crumbs && crumbs.length > 0 && (
          <Box as="nav" aria-label="Breadcrumb" mb="8">
            <HStack as="ol" gap="2" fontSize="sm" color="fg.muted" wrap="wrap">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <HStack as="li" key={c.path} gap="2">
                    {last ? (
                      <Text as="span" aria-current="page" color="fg">
                        {c.name}
                      </Text>
                    ) : (
                      <>
                        <Link className="link-underline" href={c.path}>
                          {c.name}
                        </Link>
                        <span aria-hidden="true">/</span>
                      </>
                    )}
                  </HStack>
                );
              })}
            </HStack>
          </Box>
        )}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading
          as="h1"
          id="page-title"
          textStyle="h2"
          fontSize="clamp(2.2rem, 5vw, 4rem)"
          maxW="20ch"
          textWrap="balance"
        >
          {title}
        </Heading>
        {lead && <Lead mt="6">{lead}</Lead>}
        {children}
      </Container>
    </Box>
  );
}
