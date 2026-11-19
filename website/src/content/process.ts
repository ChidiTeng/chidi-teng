export type ProcessStep = { title: string; body: string; duration: string };

export const processSteps: ProcessStep[] = [
  {
    title: "Scoping call",
    body: "Twenty minutes to understand the goal, the users and the constraints. No preparation needed.",
    duration: "Day 1",
  },
  {
    title: "Fixed proposal",
    body: "A written scope, timeline and fixed price, with the performance and accessibility targets we will hold the work to.",
    duration: "Within 2 days",
  },
  {
    title: "Build in the open",
    body: "Weekly preview links you can click through, with short written updates instead of long meetings.",
    duration: "Weekly",
  },
  {
    title: "Launch and handover",
    body: "Deployment, a real-device performance check, handover notes and two weeks of included fixes.",
    duration: "Launch week",
  },
];
