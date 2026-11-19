BEAUTY IS KEY SALON — DEPLOYABLE SITE
=====================================
Plain static site. No build step.

FILE LAYOUT (keep these folders exactly as they are)
  index.html
  404.html
  robots.txt
  css/styles.css              <- all site styling
  photos/hero-salon-chair.jpg <- hero image

UPDATING THE GITHUB PAGES SITE (github.com/hwplummer-creator/beauty-is-key)
1. In the repo, delete the old hero-salon-chair.jpg at the top level
   (and the old index.html will be replaced in step 2).
2. Click Add file > Upload files, then DRAG the css and photos FOLDERS
   plus index.html, 404.html and robots.txt from your computer into the
   page. Dragging keeps the folders; "choose your files" flattens them,
   which is what made the hero photo disappear.
3. Commit. Check the file list shows css/ and photos/ as folders.
   The site updates in a minute or two.

OTHER HOSTS
- Netlify Drop: drag this whole folder onto app.netlify.com/drop.
- cPanel-style hosting: upload the contents into public_html/.

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
