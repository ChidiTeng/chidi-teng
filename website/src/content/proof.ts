/**
 * Claims shown on the site. Only items with `verified: true` render.
 * A claim is verified when it is on the playbook's "Safe to say now" list
 * or has public proof you can link to (`source`). Flip the flag only then.
 */
export type ProofItem = {
  value: number;
  suffix?: string;
  label: string;
  source: string;
  verified: boolean;
};

export const proof: ProofItem[] = [
  {
    value: 5,
    suffix: "+",
    label: "years shipping React & Next.js (4 yrs leading 9 engineers)",
    source: "CV and LinkedIn work history",
    verified: true,
  },
  {
    value: 50,
    suffix: "K+",
    label: "daily attendance transactions synced across 100+ devices",
    source: "NotchHR BioTime background sync engine (CV)",
    verified: true,
  },
  {
    value: 73,
    suffix: "%",
    label: "reduction in quarterly post-release & QA defects",
    source: "Matador Trust frontend code review & PR gates (CV)",
    verified: true,
  },
  {
    value: 60,
    suffix: "+",
    label: "production storefront theme templates shipped",
    source: "Myxellia multi-tenant web-store builder (CV)",
    verified: true,
  },
];

export const verifiedProof = proof.filter((p) => p.verified);
