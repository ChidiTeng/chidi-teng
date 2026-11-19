import {
  Heading,
  Text,
  type HeadingProps,
  type TextProps,
} from "@chakra-ui/react";

export function Eyebrow(props: TextProps) {
  return <Text textStyle="eyebrow" color="accent.cyan" mb="4" {...props} />;
}

/** Section heading. Defaults to H2 so pages keep a single H1. */
export function SectionHeading({ as = "h2", ...props }: HeadingProps) {
  return (
    <Heading as={as} textStyle="h2" maxW="20ch" textWrap="balance" {...props} />
  );
}

export function Lead(props: TextProps) {
  return (
    <Text
      fontSize={{ base: "lg", md: "xl" }}
      color="fg.muted"
      maxW="prose"
      textWrap="pretty"
      {...props}
    />
  );
}

/** Signature gradient on a word or two; solid cyan fallback lives in globals.css. */
export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="gradient-text">{children}</span>;
}
