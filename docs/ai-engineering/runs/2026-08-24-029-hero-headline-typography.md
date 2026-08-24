---
run_id: RUN-2026-08-24-029
date: 2026-08-24
tool: codex
role: release-owner
task: hero-headline-typography-correction
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs: []
commit: 53df1de25bbf43905186ada48a1dced95ef0531c
---

# Hero headline typography correction

## Objective and scope

Correct the visible collision between the descending `p` in the first headline line and the dot of the `i` in `stipendio`, while preserving the released hero's wording, scale, wrapping, hierarchy, and composition. No fiscal, product-scope, dependency, privacy, security, or deployment-architecture change was authorized or made.

## Implementation

- Increased desktop headline line-height from `0.88` to `0.98` and relaxed tracking from `-0.075em` to `-0.045em`.
- Increased narrow-layout line-height from `0.94` to `1` and set tracking to `-0.04em`.
- Added a focused Playwright regression that enforces a line-height/font-size ratio of at least `0.97` and a letter-spacing/font-size ratio no tighter than `-0.05` in both configured browser projects.

The heading remains the same four-line lockup at 1280 and 320 CSS pixels. The correction changes typography only; no section layout or content was redesigned.

## Visual acceptance

- Desktop (1280 × 900): computed font size `79.36px`, line-height `77.7728px`, and letter-spacing `-3.5712px`; the `i` dot remains visibly distinct from the preceding line.
- Mobile (320 × 780): computed font size and line-height `42.4px`, letter-spacing `-1.696px`, and no horizontal document overflow.
- Production was inspected through the in-app browser after deployment at both responsive states.

## Validation

- `npm ci`: passed; 244 packages audited, zero vulnerabilities.
- `npm run typecheck`: passed.
- `npm run lint`: passed with zero warnings.
- `npm run format:check`: passed.
- `npm test`: 125/125 passed.
- `npm run test:exhaustive`: passed across all 110,001 supported whole-euro RAL values.
- `npm run test:e2e`: 16/16 passed across Chromium desktop and WebKit mobile, including covered axe checks and the new typography regression.
- `npm run build`: passed.
- `npm run release:check`: passed; six static files, zero source maps, Functions, or redirects.
- `npm audit --omit=dev`: zero vulnerabilities.
- `git diff --check`: passed.

## Release verification

- Code-bearing commit: `53df1de25bbf43905186ada48a1dced95ef0531c`.
- GitHub Quality: passed ([run 32683234121](https://github.com/federico-orsi-dev/netto/actions/runs/32683234121)).
- Cloudflare Pages: passed for the same commit.
- Production returned HTTPS 200 and retained the repository CSP, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- Production CSS SHA-256 `502C3D2154A7F82108CF37EF08860BE1A72775ED91273FC3297A4579679934E4` matched local `dist`.
- Production JavaScript SHA-256 `B2AB08A2B87881A46695ACF72337C2227CC6F058347A70A662E5B589E7C72100` matched local `dist`.
- JavaScript and dependencies are unchanged. CSS increased by 20 raw bytes and remained 5,656 bytes gzip.

## Capabilities and side effects

The in-app browser was used for desktop/mobile visual acceptance. GitHub's public checks API and the existing Git-integrated Cloudflare Pages pipeline were used to verify the authorized push and deployment. No new MCP server, runtime service, dependency, credential, or production configuration was introduced.
