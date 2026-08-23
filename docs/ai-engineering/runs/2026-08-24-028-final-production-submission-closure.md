---
run_id: RUN-2026-08-24-028
date: 2026-08-24
tool: codex
role: release-owner
task: final-production-submission-closure
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0007
  - ADR-0008
commit: d60208fad58b64c51031020a48e0b7f042571e3e
---

# Final production submission closure

## Release lineage

Final product commit `d60208fad58b64c51031020a48e0b7f042571e3e` was pushed normally to `main` from clean local tree `3fff836491c782c9fff2ee07970d99e8d1e7b2ea`. It contains the causal comparison redesign, product-specific visual grammar, curated README, updated product screenshot, focused regressions, and RUN-027. No domain file, dependency, CI configuration, security header, privacy boundary, or Cloudflare configuration changed.

## Remote checks and artifact identity

- GitHub Quality check: completed successfully ([run 32672062009](https://github.com/federico-orsi-dev/netto/actions/runs/32672062009)).
- Cloudflare Pages check: completed successfully for the same code-bearing commit.
- Production [netto-c2o.pages.dev](https://netto-c2o.pages.dev/) returned HTTPS 200.
- CSP, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin` were present.
- Production JavaScript SHA-256 `B634533B7C4B4EA2BADDDEA6C97D1C0467EEDB1C93113FC655CAB72C5DD35C51` matched local `dist`.
- Production CSS SHA-256 `3DFBE6A46CE42D2E6CC965FB33872102F655956CBCA24A5EA6D5640415CBB537` matched local `dist`.

## Public acceptance

The production browser reproduced the authored landing, EUR 35,000 single translation, and EUR 35,000 → 40,000 comparison. The live comparison showed `+EUR 5,000.00` gross, `+EUR 1,934.66` annual net, `+EUR 161.23` average monthly net, and the reconciled component sequence. IRPEF visibly changed from EUR 4,998.45 to EUR 7,475.25, was identified as EUR 2,476.80 less in net, and retained its verified driver plus optional rule/source evidence.

The deployed bytes are identical to the local artifact whose Playwright journey observes no external salary request. The application remains static, client-only, without analytics, persistence, third-party runtime scripts, or salary transmission.

## Stopping decision

No material correctness, comprehension, accessibility, release, or hiring-first-impression issue remains. Additional fiscal profiles, employer cost, analytics, custom infrastructure, charts, AI features, or further visual iteration have lower expected hiring value than submission. The project is closed for Jet HR submission.
