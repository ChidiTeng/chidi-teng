import { Box, type BoxProps } from "@chakra-ui/react";

/** 1200px max, 24px gutters on mobile, 32px on desktop. */
export function Container(props: BoxProps) {
  return (
    <Box
      w="full"
      maxW="container"
      mx="auto"
      px={{ base: "6", md: "8" }}
      {...props}
    />
  );
}

/** Section rhythm: 64px mobile, 96px desktop. */
export function Section({
  children,
  deferRender,
  ...props
}: BoxProps & { deferRender?: boolean }) {
  return (
    <Box
      as="section"
      py={{ base: "16", md: "24" }}
      className={deferRender ? "cv-auto" : undefined}
      {...props}
    >
      <Container>{children}</Container>
    </Box>
  );
}
