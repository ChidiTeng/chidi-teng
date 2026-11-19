import { Box, Stack, Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import type { FaqItem } from "@/content/faq";

/**
 * Native <details> accordion: keyboard-operable and screen-reader friendly
 * out of the box, works without JavaScript, and keeps answers in the HTML
 * for search engines. The open animation is CSS transform/opacity only.
 */
export function Faq({
  items,
  title = "Questions clients ask",
  id = "faq",
  headingLevel = "h2",
}: {
  items: FaqItem[];
  title?: string;
  id?: string;
  headingLevel?: "h2" | "h3";
}) {
  const QuestionTag = headingLevel === "h2" ? "h3" : "h4";
  return (
    <Section id={id} aria-labelledby={`${id}-title`} deferRender>
      <Eyebrow>FAQ</Eyebrow>
      <SectionHeading as={headingLevel} id={`${id}-title`}>
        {title}
      </SectionHeading>
      <Stack
        mt="10"
        gap="0"
        maxW="3xl"
        borderTopWidth="1px"
        borderColor="border.subtle"
      >
        {items.map((item) => (
          <details key={item.q} className="accordion">
            <Box
              as="summary"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              py="5"
              borderBottomWidth="1px"
              borderColor="border.subtle"
              _hover={{ color: "accent.cyan" }}
              transition="color .2s"
            >
              <QuestionTag style={{ fontSize: "1.0625rem", fontWeight: 500 }}>
                {item.q}
              </QuestionTag>
              <Box
                as="span"
                className="accordion__icon"
                aria-hidden="true"
                fontSize="xl"
                color="accent.cyan"
                lineHeight="1"
              >
                +
              </Box>
            </Box>
            <Box
              className="accordion__body"
              py="5"
              borderBottomWidth="1px"
              borderColor="border.subtle"
            >
              <Text color="fg.muted" maxW="prose">
                {item.a}
              </Text>
            </Box>
          </details>
        ))}
      </Stack>
    </Section>
  );
}
