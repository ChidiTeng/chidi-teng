import { Box, Grid, Stack, Text } from "@chakra-ui/react";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { verifiedProof } from "@/content/proof";
import { site } from "@/content/site";
import { Counter } from "./Counter";

export function ProofStrip() {
  return (
    <Box
      as="section"
      aria-label="At a glance"
      borderYWidth="1px"
      borderColor="border.subtle"
      bg="bg.surface/60"
    >
      <Container py={{ base: "10", md: "12" }}>
        {verifiedProof.length > 0 && (
          <Grid
            as="dl"
            templateColumns={{
              base: "1fr",
              sm: `repeat(${Math.min(verifiedProof.length, 4)}, 1fr)`,
            }}
            gap="8"
            mb="10"
          >
            {verifiedProof.map((p) => (
              <Stack key={p.label} gap="1">
                <Text as="dt" order={2} color="fg.muted">
                  {p.label}
                </Text>
                <Text
                  as="dd"
                  order={1}
                  textStyle="h2"
                  fontVariantNumeric="tabular-nums"
                >
                  {/* Screen readers get the final value; the animated digits are hidden. */}
                  <span className="sr-only">
                    {p.value}
                    {p.suffix}
                  </span>
                  <Counter value={p.value} suffix={p.suffix} />
                </Text>
              </Stack>
            ))}
          </Grid>
        )}
        <Marquee
          items={site.stack}
          label="Tools and technologies I work with"
        />
      </Container>
    </Box>
  );
}
