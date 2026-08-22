# Release Checklist

Release is human-authorized and occurs only after the milestone gates recorded in `PROJECT_STATE.md` are complete.

- Product scope and approved architecture remain satisfied.
- All material production fiscal rules are verified for the selected year; no required candidate or blocked rules remain.
- Independent fiscal and engineering reviews are durably recorded; material findings are resolved.
- Formatting, lint, strict types, automated tests, and production build pass.
- Representative calculations reconcile with their trace and approved fixtures.
- Keyboard, screen-reader semantics, contrast, responsive layout, and non-color fallback are inspected.
- Production bundle and dependency costs are inspected; no unnecessary runtime network requests or material layout instability exist; interaction latency is imperceptible. Lighthouse/Web Vitals are diagnostic.
- No salary persistence/transmission, telemetry, secrets, credentials, or personal paths are introduced.
- Cloudflare Pages build/output settings, preview behavior, repository-owned static security headers, and production-branch policy are inspected.
- README, methodology, assumptions, sources, limitations, screenshots, and live-demo link are current.
- The release commit is identified; remote push, merge, tag, deployment, and GitHub Release remain explicit human actions unless separately authorized.
