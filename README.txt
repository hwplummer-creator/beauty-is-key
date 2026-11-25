BEAUTY IS KEY SALON — WEBSITE
==============================
Plain static site. No build step.

FOLDER LAYOUT (keep these folders exactly as they are)
  index.html                 <- the page
  404.html                   <- "page not found" page
  robots.txt
  README.txt                 <- this file
  css/
    styles.css               <- all site styling
  js/
    main.js                  <- menu, prices, style finder, gallery, booking
  images/
    hero/
      hero-salon-chair.jpg   <- top-of-page photo
    gallery/
      work-*.jpg             <- salon photos shown in "Recent work"

UPDATING THE GITHUB PAGES SITE (github.com/hwplummer-creator/beauty-is-key)
1. In the repo, delete the old top-level files that moved into folders:
   styles.css, hero-salon-chair.jpg, and any work-*.jpg or images/ files
   uploaded earlier.
2. Click Add file > Upload files, then DRAG the css, js and images
   FOLDERS plus index.html, 404.html, robots.txt and README.txt from your
   computer onto the page. Dragging the folders keeps them; picking files
   with "choose your files" flattens everything to the top level.
3. Commit. The file list should show css/, js/ and images/ as folders.
   The site updates in a minute or two.

COMMON EDITS (all in js/main.js)
- Prices and services:  var menu = { ... }
- Gallery:  var looks = [ ... ]  Each line is one style with its photos.
  Put new photos in images/gallery/ and list them as
  "images/gallery/your-photo.jpg".
- Venmo deposit:  var VENMO="Badkey127",DEPOSIT=25;  Change the username
  (no @) or amount. Also update "$25" and "@Badkey127" in index.html
  (booking section and FAQ). Set VENMO="" to hide the Venmo button.
- Online booking:  var BOOKING_URL=""  Paste the salon's Booksy /
  StyleSeat / Square / Vagaro link. Leave it empty to keep the request
  form.

OTHER HOSTS
- Netlify Drop: drag this whole folder onto app.netlify.com/drop.
- cPanel-style hosting: upload the contents into public_html/.

Keep the Unsplash photo credit in the footer while using the stock hero photo.
