### Context
- **Target URL**: https://handasiyan.com/
- **Market/Geography**: Ghana / Global
- **Core Goals**: Brand visibility, lead generation for architecture/interior design.

### 1. Audit Findings (Checklist)
- [ ] **SEO-FIND-1.1 Outdated Index (Snippet & Logo)**:
  - **Location**: Google Search Results
  - **Description**: Google is displaying a cached version of the site from a previous hosting state (VPS Hosting placeholder). The logo (favicon) is also outdated.
  - **Impact**: Critical (Misleading branding and reduced CTR)
  - **Recommendation**: Update the site's meta tags and favicon locally, then use Google Search Console to request a priority recrawl.

- [ ] **SEO-FIND-1.2 Broken Favicon Link**:
  - **Location**: `index.html` line 5
  - **Description**: The site points to `/vite.svg` which does not exist in the `public` directory.
  - **Impact**: Medium
  - **Recommendation**: Replace with a valid favicon path (e.g., `/favicon.png` or `/logo.png`).

- [ ] **SEO-FIND-1.3 Missing Site Name Structured Data**:
  - **Location**: `index.html`
  - **Description**: Google uses its own heuristics to determine the "Site Name" in search results. Explicit structured data (JSON-LD) ensures the correct name is displayed.
  - **Impact**: Medium
  - **Recommendation**: Add WebSite schema with the `name` property.

### 2. Remediation Roadmap (Checklist)
- [ ] **SEO-REC-1.1 Update Metadata & Assets**:
  - **Priority**: Critical
  - **Effort**: Low
  - **Outcome**: Google will have the correct information to display once it recrawls.
  - **Validation**: Inspect the `<head>` of the live site.

- [ ] **SEO-REC-1.2 Request Indexing in GSC**:
  - **Priority**: High
  - **Effort**: Low
  - **Outcome**: Faster update of Google Search results.
  - **Validation**: Check Google Search result snippet after 24-48 hours.

### 3. Proposed Code Changes
#### [MODIFY] [index.html](file:///c:/Users/Ali/Desktop/Handasiyan/Handasiyan-Design/index.html)
- Update favicon link.
- Add Site Name structured data.
