# toGather

A people-first compatibility prototype for small gatherings in Delhi-NCR.

## Run

Open `index.html` in a browser with all five source files together, or serve the folder with any static HTTP server. No install, build step, API key or login is needed. Event photos and the Manrope web font need internet access; system fonts and solid image backgrounds are available as fallbacks.

## Implemented

- 24 fictional gatherings across six Delhi-NCR areas.
- 96 fictional attendee profiles with interests, values, energy, conversation and structure preferences.
- Seven-question onboarding with saved answers, back navigation and profile editing.
- People-aware event recommendations with per-attendee scores, score breakdowns and grounded explanations.
- Hard boundaries for free plans, alcohol-free gatherings and gentle volume.
- Search, neighbourhood and category filters, and price sorting.
- RSVP and cancellation with device-local persistence.
- Local host listing creation with honest no-attendee fallback scoring.
- Match lab with eight sample profiles and downloadable recommendations for all 10,368 answer combinations.
- Delete local demo data from Profile.

## Files

`index.html` is the entry point. `styles.css` contains responsive styles. `data.js` contains the catalogue and synthetic people. `matching.js` is the independently testable scoring engine. `app.js` handles the interface and local storage.

## Recommendation model

Eligibility respects the user's explicit boundary before ranking. Pairwise people fit uses shared values (35%), social energy (20%), conversation style (20%), structure (15%), and interests (10%). Ordered-answer similarity is `1 - abs(a-b)/2`.

Crowd fit is 70% of the mean across the full group plus 30% of the mean of the closest three attendees. Overall fit is 60% people, 25% activity interest, 10% event format, and 5% neighbourhood. Unknown crowds get no people score; remaining weights are normalised. Explicit category, area and text filters narrow results without relaxing boundaries.

These are transparent prototype rules for an AI + psychometric product concept. This build does not invoke a trained AI model. The questionnaire is not a validated psychological instrument, and scores are similarity points, not friendship probabilities. Profiles do not infer sensitive beliefs or medical traits. All events, hosts, prices and attendees are fictional examples. No real booking or publication occurs.

## Verify and export

Use Node's built-in runner: `node --test tests/matching.test.cjs`.

Export the exhaustive list and eight worked examples: `node scripts/export-combinations.cjs <output-folder>`.

Demo: create a profile, explore a top match, inspect people fit, RSVP, open My plans, reload, cancel, then switch profiles in Match lab. Create a host demo event to see the explicit no-attendee fallback.

## Production next step

Real accounts, consented attendance data, event verification, payments, moderation and a validated learned ranking model require backend services. Do not put real attendee data or API keys in these public static files.
