(require 'ox-html)
(require 'ox-publish)

;; https://orgmode.org/manual/Publishing-options.html 

(setq user-full-name "Alexander Neville")

(setq org-html-preamble
"<div class=\"header\">
  <div class=\"main-header-line\">
    <div class=\"justify-items content-width\">
      <div class=\"justify-items site-banner\">
	<div id=\"site_icon_container\">
	    <object
	    id=\"site_icon\"
	    data=\"/res/site_logo.svg\"
	    type=\"image/svg+xml\"
	    height=\"30px\"
	    ></object>
	</div>
        <a href=\"/\">alexneville.co.uk</a>
      </div>
      <div class=\"page-controls\">
        <button id=\"theme_switch_button\" type=\"button\">
          <object
            id=\"theme_switch_icon\"
            data=\"/res/theme_switch_light.svg\"
            type=\"image/svg+xml\"
            height=\"100%%\"
          ></object>
        </button>
        <button id=\"page_start_button\" type=\"button\">
          <object
            id=\"page_start_icon\"
            data=\"/res/up_triangle_light.svg\"
            type=\"image/svg+xml\"
            height=\"100%%\"
          ></object>
        </button>
        <button id=\"menu_button\" type=\"button\">
          <object
            id=\"menu_icon\"
            data=\"/res/menu_icon_light.svg\"
            type=\"image/svg+xml\"
            height=\"100%%\"
          ></object>
        </button>
      </div>
    </div>
  </div>
  <div id=\"dropdown\">
    <div class=\"content-width\">
      <ul>
        <li><a href=\"/index.html\">Home</a></li>
        <li><a href=\"/license.html\">License</a></li>
        <li><a href=\"/blog/\">Blog</a></li>
      </ul>
    </div>
  </div>
  <div class=\"breadcrumb-line\">
    <div id=\"breadcrumbs\" class=\"content-width\">
      <a href=\"/index.html\">~/</a>
    </div>
  </div>
</div>
")

(setq org-html-creator-string "<a href=\"https://www.gnu.org/software/emacs/\">Emacs</a> 28.2 + <a href=\"https://orgmode.org\">Org mode</a> 9.5.5")

(setq org-html-postamble
"<div class=\"footer\">
  <div class=\"content-width\">
    <p>&copy 2023 Alexander Neville. Original content is distributed under copyleft license terms (CC BY-SA / GNU GPL), according to the <a href=\"/license.html\">content license</a>.</p>
    <p>Made with %c @ (%T), <a href=\"https://github.com/alexanderneville/website\">view source</a>.</p>
  </div>
</div>
"
)

(setq org-html-head-extra
"<link href=\"/res/light.css\" rel=\"stylesheet\" id=\"light-stylesheet\" />
<link
  href=\"/res/dark.css\"
  rel=\"stylesheet alternate\"
  id=\"dark-stylesheet\"
/>
<link href=\"/res/style.css\" rel=\"stylesheet\" />
<link rel=\"icon\" href=\"/res/site_logo.svg\" />
<script src=\"/res/script.js\" defer></script>
")

(setq org-publish-project-alist
      '(
	("main_html"
            :recursive nil
            :base-directory "./src"
            :publishing-directory "./out/html"
            :base-extension "org"
            :publishing-function org-html-publish-to-html
	    ;; options
            :headline-levels 5
            :section-numbers nil
            :with-author t
            :with-creator nil
            :with-date nil
            :with-timestamps nil
            :with-title nil
	    :with-author nil
	    :with-date nil
            :with-toc nil
            :with-todo-keywords nil
            :html-head-include-default-style nil
            :html-head-include-scripts nil
	    )

 	("blog_html"
             :recursive t
             :base-directory "./src/blog"
             :publishing-directory "./out/html/blog"
             :base-extension "org"
             :publishing-function org-html-publish-to-html
             :headline-levels 5
             :section-numbers t
             :with-author nil
             :with-creator nil
             :with-date nil
             :with-timestamps nil
             :with-title t
             :with-toc 5
             :with-todo-keywords nil
             :html-head-include-default-style nil
             :html-head-include-scripts nil
	     :auto-sitemap t
	     :sitemap-filename "sitemap.org"
	     :sitemap-title "sitemap"
 	     :exclude "tables/"
 	    )

        ("main_html_resources"
	    :recursive t
            :base-directory "./src/res"
            :publishing-directory "./out/html/res"
            :base-extension "pdf\\|jpg\\|gif\\|png\\|svg\\|css\\|js"
            :publishing-function org-publish-attachment)

        ("blog_html_resources"
 	    :recursive t
            :base-directory "./src/blog/res"
            :publishing-directory "./out/html/blog/res"
            :base-extension "pdf\\|jpg\\|gif\\|png\\|svg\\|css\\|js"
            :publishing-function org-publish-attachment)
 
         ))

(org-publish-all t)
