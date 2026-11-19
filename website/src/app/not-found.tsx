import type { Metadata } from "next";
import { Flex } from "@chakra-ui/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Emmanuel Nwachukwu" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="This page does not exist"
      lead="The link may be old, or the page may have moved."
    >
      <Flex mt="10" gap="3" wrap="wrap">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact me
        </ButtonLink>
      </Flex>
    </PageHeader>
  );
}
