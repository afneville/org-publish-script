# Org Publish Configuration

I have used *org-mode* for managing my plaintext documents in the past,
but I have since migrated to markdown. Emacs org-mode has its own export
and publishing system which is highly configurable. Though I no longer
use this script, I am keeping it for my own reference should I ever want
to replicate the same system in the future. The relevant sections of the
Org Manual:

- [Exporting](https://orgmode.org/manual/Exporting.html)
- [Publishing](https://orgmode.org/manual/Publishing.html)

## Build

Recent versions of _GNU Emacs_ and _org mode_ are required:

```text
emacs >= 28.1
org   >=  9.0
```

Update the submodule from which the content is sourced. This will
populate the contents of the `src/blog/` subdirectory with some old org
documents from another repository.

``` sh
git submodule update --init
```

The export script will build the site under `out/html/`.

``` sh
./export.sh
```

Optionally test the generated site locally with docker installed. View
the site at `http://localhost:8080`.

``` sh
./test.sh
```

Stop and remove the test server container if it is no longer required.

``` sh
docker stop dev-server
docker rm dev-server
```

## Export Configuration

Rather than requiring an existing emacs environment, the export script
will start emacs with a clean configuration and then load the contents
of the source blocks in this file.

### Common Setup

Require the exporters.

``` elisp
(require 'ox-html)
(require 'ox-latex)
(require 'ox-publish)
```

Set some default variables (affecting both exporters)

``` elisp
(setq
 user-full-name "Alexander Neville"
 org-export-headline-levels 3
 org-export-with-archived-trees nil
 org-export-exclude-tags nil
 org-export-default-language nil
 org-export-preserve-breaks nil
 org-export-with-section-numbers nil
 org-export-select-tags nil
 org-export-with-author nil
 org-export-with-broken-links t
 org-export-with-clocks nil
 org-export-with-creator nil
 org-export-with-date nil
 org-export-with-drawers nil
 org-export-with-email nil
 org-export-with-emphasize t
 org-export-with-fixed-width nil
 org-export-with-footnotes nil
 org-export-with-latex t
 org-export-with-planning nil
 org-export-with-priority nil
 org-export-with-properties nil
 org-export-with-special-strings nil
 org-export-with-sub-superscripts '{}
 org-export-with-tables t
 org-export-with-tags nil
 org-export-with-tasks nil
 org-export-with-timestamps nil
 org-export-with-title nil
 org-export-with-toc nil
 org-export-with-todo-keywords nil
 )
```

### Latex Settings

Configuration for the Latex back-end. First, set the value of some
variables.

``` elisp
(setq org-latex-listings 'minted
  org-export-in-background t
  org-latex-compiler "pdflatex"
  org-latex-pdf-process '("latexmk -f -pdf -%latex -shell-escape -interaction=nonstopmode -output-directory=%o %f"))

(setq
 chapter-redef
 "\\patchcmd{\\chapter}{\\thispagestyle{plain}}{\\thispagestyle{fancy}}{}{}
\\makeatletter
\\def\\@makechapterhead#1{
  \\vspace*{50\\p@}
  {\\parindent \\z@ \\raggedright \\normalfont
    \\ifnum \\c@secnumdepth >\\m@ne
    \\huge\\bfseries \\@chapapp\\space \\thechapter
    \\Huge\\bfseries \\thechapter.\\space%
    \\par\\nobreak
    \\vskip 20\\p@
    \\fi
    \\interlinepenalty\\@M
    \\Huge \\bfseries #1\\par\\nobreak
    \\vskip 40\\p@
  }}
\\makeatother\n"
 report-fancyheader-def
 "\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\renewcommand{\\sectionmark}[1]{\\markright{\\thesection~- ~#1}}
\\renewcommand{\\chaptermark}[1]{\\markboth{\\chaptername~\\thechapter. \\textit{#1}}{}}
\\fancyhf{}
\\rfoot{page \\textbf{\\thepage}}
\\lfoot{\\nouppercase{\\leftmark}}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0.4pt}\n"
 article-fancyheader-def
 "\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\rfoot{page \\textbf{\\thepage}}
\\lfoot{\\nouppercase{\\leftmark}}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0.4pt}\n"
 common-head
 "\\usepackage{svg}
\\svgsetup{inkscapelatex=false}
\\usepackage{blindtext}
\\usepackage{tcolorbox}
\\usepackage{etoolbox}
\\hypersetup{hidelinks}
\\usemintedstyle{bw}
\\setminted{autogobble=true, breaklines=true, breakbytokenanywhere=true, fontsize=\\small, xleftmargin=1cm, xrightmargin=1cm}
\\usepackage[indent=0.5cm]{parskip}
\\usepackage[a4paper, includefoot, margin=2.54cm]{geometry}\n"
 default-head-setup
 "\\usepackage[utf8]{inputenc}
\\usepackage{libertine}
\\usepackage{libertinust1math}
\\usepackage[T1]{fontenc}
\\usepackage{graphicx}
\\usepackage{longtable}
\\usepackage{wrapfig}
\\usepackage{rotating}
\\usepackage[normalem]{ulem}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{capt-of}
\\usepackage{hyperref}
\\usepackage{minted}\n"
 )
```

Create some latex classes, add them to the list of supported classes and
set the default class to one which was just created.

``` elisp
(setq
 custom-article '(("\\section{%s}" . "\\section*{%s}")
          ("\\subsection{%s}" . "\\subsection*{%s}")
          ("\\subsubsection{%s}" . "\\subsubsection*{%s}"))
 short-report    (append '(("\\chapter{%s}" . "\\chapter*{%s}")) custom-article)
 long-report     (append '(("\\part{%s}" . "\\part*{%s}")) short-report)
 )

(setq report-common-header-string (concat "\\documentclass{report}\n[NO-DEFAULT-PACKAGES]\n[NO-PACKAGES]\n" default-head-setup chapter-redef common-head report-fancyheader-def "[EXTRA]"))
(add-to-list 'short-report report-common-header-string)
(add-to-list 'long-report report-common-header-string)
(add-to-list 'custom-article (concat "\\documentclass{article}\n[NO-DEFAULT-PACKAGES]\n[NO-PACKAGES]\n" default-head-setup common-head article-fancyheader-def "[EXTRA]"))
(add-to-list 'short-report "short-report")
(add-to-list 'long-report "long-report")
(add-to-list 'custom-article "custom-article")

(with-eval-after-load 'ox-latex
  (add-to-list 'org-latex-classes long-report)
  (add-to-list 'org-latex-classes short-report)
  (add-to-list 'org-latex-classes custom-article))

(setq org-latex-default-class "custom-article")
```

### HTML Settings

Set the value of some variables.

``` elisp
(setq org-html-doctype "html5"
  org-html-self-link-headlines t
  org-html-metadata-timestamp-format "%H:%M:%S %d/%m/%Y"
  org-html-creator-string "<a href=\"https://www.gnu.org/software/emacs/\">Emacs</a> 28.2 + <a href=\"https://orgmode.org\">Org mode</a> 9.5.5"
  org-html-head-include-default-style nil
  org-html-head-include-scripts nil
  ;; org-html-prefer-user-labels t
  )
```

Very basic MathJax 2 configuration. This is not used as I overwrite the
mathjax template in the block below.

``` elisp
(setq org-html-mathjax-options
  '((path "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML")
    (scale "100")
    (align "center")
    (font "STIX-Web")
    (linebreaks "false")
    (autonumber "AMS")
    (indent "0em")
    (multlinewidth "85%")
    (tagindent ".8em")
    (tagside "right")))
```

Overwrite the template for inserting mathjax configuration. Use my own
copy of the scripts.

``` elisp
(setq org-html-mathjax-template "<script>
MathJax = {
  // tex: {
    // inlineMath: [['$', '$'], ['\\(', '\\)']]
  // },
  svg: {
    fontCache: 'global'
  }
};
</script>
<script type=\"text/javascript\" id=\"MathJax-script\" async
  src=\"https://cdn.alexneville.co.uk/mathjax/tex-svg.js\">
</script>")
```

Additional lines for the head of each exported document.

``` elisp
(setq org-html-head-extra
  "
<link rel=\"stylesheet\" href=\"https://cdn.alexneville.co.uk/fontawesome/css/all.min.css\" />

  <link href=\"/res/light.css\" rel=\"stylesheet\" id=\"light-stylesheet\" />
  <link
    href=\"/res/dark.css\"
    rel=\"stylesheet alternate\"
    id=\"dark-stylesheet\"
  />
  <link href=\"/res/style.css\" rel=\"stylesheet\" />
  <link rel=\"icon\" href=\"/res/site_logo.svg\" />
  <script src=\"/res/script.js\" defer></script>")
```

#### Preamble

The preamble is the HTML inserted at the beginning of each HTML
document. This includes the site header.

``` elisp
(setq org-html-preamble
  "<div id=\"header\">
    <div id=\"main-header-line\">
  <div class=\"justify-items content-width\">
    <div id=\"site-banner\" class=\"justify-items\">
      <div id=\"site-banner-icon-container\">
      <object
      id=\"site_icon\"
      data=\"/res/site_logo.svg\"
      type=\"image/svg+xml\"
      ></object>
      </div>
      <a id=\"site-banner-link\" href=\"/\">alexneville.co.uk</a>
    </div>
    <div id=\"page-controls\">
      <button id=\"page-start-button\" type=\"button\">
      <i class=\"fa-solid fa-angles-up\"></i>
      </button>
      <button id=\"theme-switch-button\" type=\"button\">
      <i class=\"fa-solid fa-moon\"></i>
      </button>
      <button id=\"menu-button\" type=\"button\">
      <i class=\"fa-solid fa-bars\"></i>
      </button>
    </div>
  </div>
    </div>
    <div id=\"dropdown-line\">
  <div id=\"dropdown-menu-container\" class=\"content-width\">
    <ul class=\"icon-link-list\">
      <li><a href=\"/index.html\"><i class=\"fa-regular fa-user\"></i><p>Home</p></a></li>
      <li><a href=\"/license.html\"><i class=\"fa-regular fa-file-lines\"></i><p>License</p></a></li>
      <li><a href=\"/blog/\"><i class=\"fa-regular fa-comment\"></i><p>Blog</p></a></li>
    </ul>
  </div>
    </div>
    <div id=\"breadcrumb-line\">
  <div id=\"breadcrumb-parts\" class=\"content-width\">
    <a href=\"/index.html\">Home</a>
  </div>
    </div>
  </div>")
```

#### Postamble

``` elisp
(setq org-html-postamble
  "<p id=\"author-name\">%a</p>
<p id=\"article-date\">%d</p>
<div class=\"footer\">
  <div class=\"content-width\">
    <p>Copyright &copy 2023 Alexander Neville, <a href=\"/license.html\">(CC BY-SA / GNU GPL)</a>.</p>
<p>Made with %c @ (%T), <a href=\"https://github.com/alexanderneville/website\">view source</a>.</p>
  </div>
</div>")
```

### Publishing

Create the list of exporters and populate the contents of the output
directory.

#### HTML

The static index pages located at `/`{.verbatim} do not require titles
or **TOCs**.

``` elisp
(setq main_html
  '("main_html"
    :recursive nil
    :base-directory "./src"
    :publishing-directory "./out/html"
    :base-extension "org"
    :publishing-function org-html-publish-to-html
    :with-title nil
    :with-toc nil
    :headline-levels 5
    )
  )
```

Recursively export the contents of the blog directory.

``` elisp
(setq blog_html
  '("blog_html"
    :recursive t
    :base-directory "./src/blog"
    :publishing-directory "./out/html/blog"
    :base-extension "org"
    :publishing-function org-html-publish-to-html
    :with-title t
    :with-toc 1
    :headline-levels 5
    :exclude "tables/"
    ))

```

Finally, export the site resources. This step is just copying the files
into the output directory.

``` elisp
(setq main_res
  '("main_html_resources"
    :recursive t
    :base-directory "./src/res"
    :publishing-directory "./out/html/res"
    :base-extension "pdf\\|jpg\\|gif\\|png\\|svg\\|css\\|js"
    :publishing-function org-publish-attachment)

  blog_res
  '("blog_html_resources"
    :recursive t
    :base-directory "./src/blog/res"
    :publishing-directory "./out/html/blog/res"
    :base-extension "pdf\\|jpg\\|gif\\|png\\|svg\\|css\\|js"
    :publishing-function org-publish-attachment))
```

#### Export

``` elisp
(setq org-publish-project-alist (append (list main_html) (list blog_html)  (list main_res) (list blog_res)))
```

With initialisation complete, execute all the publishing functions.

``` elisp
(org-publish-all t)
```
