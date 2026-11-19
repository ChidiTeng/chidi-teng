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
    label: "years shipping production React",
    source: "CV and LinkedIn work history",
    verified: true,
  },
  {
    value: 12,
    label: "services, from audits to full builds",
    source: "src/content/services.ts",
    verified: true,
  },
  {
    value: 100,
    label: "mobile Lighthouse performance on this site",
    source: "Run Lighthouse on the live URL, then set verified to true",
    verified: false,
  },
  {
    value: 0,
    label: "projects delivered (fill in from your records)",
    source: "Your invoices or client list",
    verified: false,
  },
];

export const verifiedProof = proof.filter((p) => p.verified);
