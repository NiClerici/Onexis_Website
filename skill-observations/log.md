# Skill Observation Log

Observations captured during task-oriented work. Each entry identifies a
potential skill improvement or new skill opportunity.

**Status key:** OPEN = not yet actioned | ACTIONED = skill updated/created | DECLINED = user decided not to pursue

---

### Observation 1: Headless Chrome --window-size clamps to a ~500px minimum, faking horizontal overflow

**Date:** 2026-06-24
**Session context:** /impeccable adapt on the ONEXIS landing page — validating mobile responsiveness via `chrome --headless=new --screenshot`.
**Skill:** impeccable
**Type:** open-source
**Phase/Area:** Verification / battle-testing (the "every component is battle tested using browser screenshotting" guidance in SKILL.md and the adapt flow's "Testing" step).

**Issue:** Screenshots taken with `--headless=new --window-size=390,H` rendered the page at an actual innerWidth of 500px (Chrome clamps the window to a ~500px minimum) but wrote the PNG at 390px wide — cropping the right 110px. This looked exactly like page-level horizontal overflow (nav hamburger, hero subtitle, and CTA buttons all "clipped" at the same right edge), and led to a false diagnosis + an unnecessary chase for an overflow source. A temporary in-page probe (`innerWidth` vs `documentElement.scrollWidth`) revealed `inner=500 scrollW=500` — no overflow at all. `--force-device-scale-factor=2` did NOT shrink the layout viewport (it only changed DPR), so it's not a workaround for sub-500 widths either.

**Suggested improvement:** In the audit/adapt verification guidance, add a note: when battle-testing responsive layouts via headless Chrome CLI `--screenshot`, the layout viewport has a ~500px floor and the PNG can be cropped narrower than the render, which mimics horizontal overflow. To test true phone widths (≤430px) or to confirm overflow, drive Chrome via the DevTools Protocol / Playwright / Puppeteer with `Emulation.setDeviceMetricsOverride` (or `page.setViewport`), and confirm overflow by comparing `scrollWidth` to `innerWidth` rather than trusting a cropped screenshot.

**Principle:** A screenshot is evidence of what the tool rendered, not proof of what the layout is. When a visual check disagrees with the code, verify the measurement apparatus (viewport width, crop, DPR) before trusting the pixels — measure the DOM (`scrollWidth`/`innerWidth`) to separate a real layout bug from a capture artifact.
