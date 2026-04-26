# CLAUDE.md - Floorscape Studio

This is the Sanity Studio for Floorscape. It pairs with the marketing site at `Floorscape/FloorscapeWebsite`.

## What this is

Project ID: `ntumieak`. Dataset: `production`. Title: "Floorscape".

Studio runs at `studio.floorscape.com.au` once deployed. Editors are Dave, Bill, Cy, Charlene.

## Schemas (Wave 1 will fill these in)

Schema types live in `schemaTypes/`. Wave 1 subagent B will populate eleven collections per `Floorscape_WORK_ORDER.md` and `/website-scope/outputs/integration.md`:

1. `siteSettings` (singleton)
2. `suburb` (Doncaster, Balwyn, Kew East, Clyde, Officer, Pakenham, expandable)
3. `problem` (DIY peeling, moisture, cracks, general failures)
4. `icpLanding` (9 ICP variants)
5. `campaign` (named paid campaigns)
6. `caseStudy` (auto-populated from ServiceM8 nightly)
7. `gallery` (curated finishes by type)
8. `testimonial`
9. `teamMember` (Bill, crew)
10. `serviceArea` (postcode rings, geo)
11. `fussTaxPage` (singleton, per `Floorscape_Fuss_Tax_UX.md`)

## Brand rules

- **No em-dashes anywhere.** Use hyphens, commas, or rewrite. CI fails on any U+2014.
- Voice anchor: "Attenborough on a job site." Calm, observant, plain English, short declarative.
- Reference docs in the parent project folder:
  - `/Users/daveyeates/Documents/Claude/Projects/Floorscape/Floorscape_Brand_Guide.md`
  - `/Users/daveyeates/Documents/Claude/Projects/Floorscape/Floorscape_M2M_Output_Pack.md`
  - `/Users/daveyeates/Documents/Claude/Projects/Floorscape/Floorscape_HubSpot_Setup.md`

## Deploy plan

- GitHub: `Floorscape/Studio` (this repo)
- Hosting: Vercel project pointing at `main`, custom domain `studio.floorscape.com.au`
- Build: `npm run build` produces `dist/` (Sanity static build), Vercel serves it
