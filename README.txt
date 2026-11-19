BEAUTY IS KEY SALON — DEPLOYABLE SITE
=====================================
Plain static site. No build step. Upload the CONTENTS of this folder
(index.html, 404.html, robots.txt, photos/) to the web root.

QUICKEST OPTIONS
- Netlify Drop: go to app.netlify.com/drop and drag this folder in.
- GitHub Pages: push these files to a repo, then Settings > Pages >
  Deploy from branch (main, / root).
- Regular web hosting (cPanel etc.): upload to public_html/.

BEFORE GOING LIVE (edit index.html)
1. Online booking: search for  var BOOKING_URL=""  and paste the salon's
   Booksy / StyleSeat / Square / Vagaro link. Leave it empty to keep the
   request form (which copies a text message for the client to send).
2. Gallery photos: put images in photos/ and fill in the "src" (and
   optional Instagram "href") lines under  var gallery=[ ... ].
3. Prices: the service menu (var menu = { ... }) is placeholder pricing.
4. Placeholder text to replace or remove: the "Placeholder list" note in
   Services, the gallery note, the owner bio note, the reviews box, and
   the FAQ note.
5. Social preview image (optional): once you have a domain, add
   <meta property="og:image" content="https://YOURDOMAIN/photos/hero-salon-chair.jpg">
   in the <head>.

Keep the Unsplash photo credit in the footer while using the stock hero photo.
