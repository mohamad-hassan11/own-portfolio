# PAD portfolio import

## Scope and decisions

- Source: `/home/null/projects/PAD-Project`, read-only.
- Destination: this portfolio's existing `content/projects/pad.mdx` and `/projects/pad` route.
- Retained the existing registry entry, project order, and non-featured status. No duplicate project, new dependency, or shared-component change was needed.
- No commits, pushes, or deployments were performed by this import.

## Verified project findings

PAD is a 2021 HvA university team project for OBA library study-place reservations and activity discovery. The original portfolio establishes the second-semester HBO-ICT context; source history dates the activity work to spring 2021.

| Area                  | Evidence                                                                           | Findings                                                                                                                                                                                                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Interface             | `src/index.html`, `src/views/`, frontend controllers                               | Real browser UI with welcome, branch/study-place selection, booking confirmation, activities, and contact registration. `dashboard.html` is a placeholder, not an implemented dashboard.                                                                                             |
| Personal contribution | `src/assets/js/controllers/activityController.js`                                  | Author attribution to Mohamad Hassan; activity card generation, pagination, location/date/subject filters, and registration navigation. Other workflows are presented as team functionality.                                                                                         |
| Frontend architecture | `src/assets/js/app.js`, `controllers/`, `repositories/`, `utils/networkManager.js` | Hash navigation, HTML views loaded through jQuery, ES6 controllers/repositories, promises around AJAX. Study-place lists also use direct AJAX from the controller.                                                                                                                   |
| Styling               | `src/assets/vendors/bootstrap/bootstrap.min.css`, custom CSS                       | Bundled Bootstrap 4.3.1 is the actual frontend stylesheet. Package metadata also lists a Bootstrap 5 beta, so the case study describes the bundled UI version rather than inferring it from dependencies.                                                                            |
| Backend               | `server/app.js`, `server/utils/databaseHelper.js`                                  | Express 4, JSON parsing, MySQL pool, query placeholders, booking validation, registration inserts, and HTTPS proxy to the OBA activity search API.                                                                                                                                   |
| QR confirmation       | Location controller, QR route, `src/assets/js/qrcode.min.js`                       | Uses the booking insert ID to retrieve joined reservation/study-place data and encode JSON into a browser-generated QR code. No QR scanner or check-in workflow.                                                                                                                     |
| Tests                 | `server/cypress/integration/pad/`, `server/package.json`                           | Cypress 7 scenarios for UI structure, activity navigation/filters, branch search, booking, activity registration, and QR data. Some API calls are stubbed. Legacy login/booking routes and selectors have drifted from the current implementation.                                   |
| Runtime and hosting   | `readme.md`, `server/server.js`                                                    | Original instructions target Node 14.15.5, MySQL, and separately served HTML. Server defaults to port 3000 and chooses LOCAL/DEV/LIVE configuration; frontend Cypress scenarios assume port 8080. PAD Cloud deployment instructions exist, but an actual deployment is not verified. |

## Boundaries that affect the presentation

- Filters operate on the currently loaded activity page, not the entire external catalogue.
- Activity registration stores contact details without a selected activity ID; it is not event-specific ticketing.
- Study-place availability is displayed, but conflicting bookings are not checked by the insertion handler.
- The bundled `testdata.sql` creates only framework example tables (`user` and `room_example`). It does not supply the branch, study-place, reservation, or activity-registration schema needed for a full local backend run.
- Backend startup logs database configuration. It was not started, and configuration values or API credentials were not copied into portfolio files. No external database or authenticated activity-service requests were made during frontend capture.
- Source tests were inspected, not executed; no passing source test suite, successful database booking, production outcome, or live deployment is claimed.
- Source/live links remain unset because no public destination was verified.

## Authentic media and provenance

| Portfolio asset                        | Origin                                                                                                                         | Processing and scope                                                                                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/projects/pad/welcome.webp`     | Fresh Chromium screenshot of the unchanged source `src/index.html#welcome`, served from a read-only local Python static server | 1600 × 900, WebP quality 85, 31,466 bytes. Original HTML, bundled Bootstrap, CSS, scripts, and images; no UI mock, synthetic data, or injected DOM. Used as the card/case-study cover. |
| `public/projects/pad/reservation.webp` | Existing portfolio asset `public/projects/project_agile_development/project_agile_development.png`                             | 990 × 747, WebP quality 85, 17,360 bytes. No cropping or interface changes. Caption explicitly identifies the first-step capture and absent branch results.                            |
| `public/projects/pad/architecture.svg` | New diagram reconstructed from inspected source                                                                                | 1600 × 900. Labels distinguish browser modules, direct AJAX reads, Express, MySQL, and the external OBA search API. This is an architecture diagram, not an application screenshot.    |

Capture allowed only the local static origin and the application's original Font Awesome asset path. All configured API and other external requests were blocked. The welcome image loaded, the bundled Bootstrap stylesheet was confirmed, and clicking the original study-place navigation rendered the reservation fieldset. No form was submitted. The complete activity list could not be captured without its backend and external data; no list was fabricated. A recording would not demonstrate a verified complete workflow, so none was added.

The source's existing Cypress failure screenshots were inspected and omitted: they show an older framework UI and incomplete/failed booking tests, rather than the current activity implementation.

## Portfolio changes

- Updated PAD metadata with a descriptive title, summary, HvA affiliation, 2021 year, screenshot cover, jQuery, and QRCode.js.
- Replaced the brief generic text with a case study covering purpose, role, reservation and activity workflows, architecture, technical decisions, testing limitations, result, and lessons.
- Reused `ProjectImage` and `ArchitectureDiagram`, including accurate dimensions, captions, alt text, and existing zoom/theme behavior.
- Added only the three assets above and this investigation record. Existing project registration and shared presentation components remain in place.

## Validation

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm exec --yes --package=node@24.21.0 -- npm run build -- --webpack`: passed; all 15 static pages generated, including `/projects/pad` in the prerender manifest. The default Turbopack build was attempted on Node 26 and cached Node 24, including escalated runs, but the environment denied its worker-port binding. No bundler or package configuration was changed.
- Targeted Prettier check for the MDX and this record: passed. SVG was validated by rendering it with Sharp and visually inspecting the result.
- Asset paths, dimensions, the existing single PAD registry entry, and `git diff --check`: passed.
- Playwright smoke checks against the local production build: passed. Verified the unique PAD project card, navigation to `/projects/pad`, title and description metadata, two case-study figures, loaded images, both image zoom dialogs and Escape dismissal, dark/light theme switching, all three asset responses, sitemap inclusion, an unknown project returning 404, and the All projects back link.
- Browser checks recorded no page errors or HTTP responses at or above 400. At a 390 × 844 mobile viewport, document width did not exceed viewport width. Full-page desktop dark/light and mobile captures were visually reviewed; QA images and the temporary script live only in ignored `.next/pad-import/`.
- The portfolio has no existing test suite or test script. The targeted browser smoke checks provide behavior validation for this content/media change; no dependencies were installed.
- A SHA-256 snapshot over 136 source files, excluding `.git` and `node_modules`, matched before and after integration and capture. Source files were not modified.

Remaining limitations are confined to source execution: database persistence, live OBA results, and the legacy Cypress suite were not validated. No complete booking demonstration or activity-list screenshot was manufactured.
