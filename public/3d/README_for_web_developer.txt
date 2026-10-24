HANDASIYAN 3D PROJECTS  |  instructions for the web developer
================================================================

WHAT THIS IS
A small, self-contained section for handasiyan.com: one gallery page and four
interactive 3D model pages. Plain HTML, no database, no plugins, no build step.
Each 3D page has its own 3D engine and model inside it (1.2 to 3 MB each).

FILES (keep the names and the folder layout exactly as they are)
  3d/index.html            gallery page with the 4 projects
  3d/palm-court.html       3D model
  3d/kente-lanterns.html   3D model
  3d/floating-box.html     3D model
  3d/townhouses.html       3D model
  3d/img/                  card images, hero image, logo

STEP 1  Upload
  Upload the whole "3d" folder to the website root (usually public_html/),
  using cPanel File Manager, FTP/SFTP, or your Git deploy.
  Result:  https://handasiyan.com/3d/
  WordPress: upload by FTP or File Manager into public_html/3d/, NOT through
  the Media Library (it rejects .html). WordPress will serve the real folder.

STEP 2  Add it to the menu
  Add a menu item "3D Projects" (or "Our Designs in 3D") linking to /3d/

STEP 3 (optional)  Show a model inside an existing page
  Paste this where you want it (WordPress: a "Custom HTML" block):

  <div style="position:relative;width:100%;aspect-ratio:16/10;min-height:520px">
    <iframe src="/3d/palm-court.html" title="Palm Court villas, 3D model"
      style="position:absolute;inset:0;width:100%;height:100%;border:0"
      loading="lazy" allow="fullscreen"></iframe>
  </div>

  Swap palm-court.html for kente-lanterns.html, floating-box.html or townhouses.html.
  On phones the page stacks the model above its info panel, so give the iframe
  more height on mobile (about 900px) or simply link to the page instead.

CHECKS
  - Open https://handasiyan.com/3d/ on a phone and a laptop; click each model.
  - Turn on gzip/brotli for .html if it is not already on (the files compress
    to about a third of their size).
  - Links on WhatsApp/Facebook show a preview from img/hero.jpg and the card
    images (og:image tags already point to https://handasiyan.com/3d/img/...).
    If you put the folder somewhere other than /3d/, update those og:image URLs.
  - Fonts come from Google Fonts. Nothing else loads from outside.

CONTACT DETAILS USED ON THE PAGES
  WhatsApp / phone: +233 59 639 9006
  If this changes, search and replace "233596399006" and "+233 59 639 9006"
  in all five .html files.
