# Handasiyan Design SEO Audit & Roadmap

This document tracks technical SEO findings and remediation steps. All tasks are categorized by impact and priority.

## Context
- **Target URL**: https://handasiyan-design.vercel.app/
- **Market/Geography**: Global / Interior Design & Architecture
- **Core Goals**: Brand Visibility, Portfolio Showcase, Lead Generation

---

## 1. Audit Findings (Checklist)

### Crawlability & Indexing (SEO-CRAWL)
- [ ] **SEO-FIND-1.1 [Missing robots.txt]**:
  - **Location**: `/public/robots.txt`
  - **Description**: Search bots have no instructions for crawling the site.
  - **Impact**: Critical
  - **Recommendation**: Create a `robots.txt` file in the public folder.
- [ ] **SEO-FIND-1.2 [Missing sitemap.xml]**:
  - **Location**: `/public/sitemap.xml`
  - **Description**: Search engines cannot efficiently discover all pages.
  - **Impact**: High
  - **Recommendation**: Generate a sitemap including all main routes.

### On-Page SEO (SEO-CONTENT)
- [ ] **SEO-FIND-2.1 [Missing H1 Tag]**:
  - **Location**: `Homepage.jsx`
  - **Description**: No <h1> tag found on the homepage.
  - **Impact**: Critical
  - **Recommendation**: Wrap the primary value proposition in an <h1>.
- [ ] **SEO-FIND-2.2 [Merged Words in Headings]**:
  - **Location**: `Homepage.jsx` (About, Contact, CTA sections)
  - **Description**: Headings like "thatreflect", "visionto", and "yourdream" are merged due to missing spaces in the React code.
  - **Impact**: High (UX & SEO)
  - **Recommendation**: Add spaces before shimmer spans.
- [ ] **SEO-FIND-2.3 [Missing Meta Description]**:
  - **Location**: `index.html`
  - **Description**: No snippet is provided for search results.
  - **Impact**: High
  - **Recommendation**: Add a descriptive <meta name="description">.
- [ ] **SEO-FIND-2.4 [Missing Alt Text]**:
  - **Location**: Various components
  - **Description**: Images lack descriptive alt attributes.
  - **Impact**: High (Accessibility & Image SEO)
  - **Recommendation**: Audit and update all <img> tags.

---

## 2. Remediation Roadmap (Checklist)

### Phase 1: Critical Fixes
- [ ] **SEO-REC-1.1 [Setup Base SEO Package]**:
  - **Priority**: Critical
  - **Effort**: Low
  - **Outcome**: Indexing instructions and meta tags.
  - **Validation**: Check live `/robots.txt` and view page source.
- [ ] **SEO-REC-1.2 [Fix Heading Typos]**:
  - **Priority**: Critical
  - **Effort**: Low
  - **Outcome**: Improved readability and keyword clarity.
  - **Validation**: Visual check on live site.

### Phase 2: Content & Structure
- [ ] **SEO-REC-2.1 [Implement H1 & Content Depth]**:
  - **Priority**: High
  - **Effort**: Medium
  - **Outcome**: Established primary keyword foundation.
  - **Validation**: Inspect DOM for <h1>.
- [ ] **SEO-REC-2.2 [Image Alt Overhaul]**:
  - **Priority**: High
  - **Effort**: Medium
  - **Outcome**: Accessibility compliance and Image search visibility.

---

## 3. Implementation Commands
- `npm run dev` to verify local changes.
- `lighthouse https://handasiyan-design.vercel.app/` for final validation.
