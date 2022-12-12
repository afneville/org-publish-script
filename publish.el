(require 'ox-latex)
(require 'ox-publish)
(setq org-latex-listings 'minted)
(add-to-list 'org-latex-packages-alist '("" "minted" t))
(with-eval-after-load 'ox-latex
   (add-to-list 'org-latex-classes
                '("report"
                  "\\documentclass{report}"
                  ("\\chapter{%s}" . "\\chapter*{%s}")
                  ("\\section{%s}" . "\\section*{%s}")
                  ("\\subsection{%s}" . "\\subsection*{%s}")
                  ("\\subsubsection{%s}" . "\\subsubsection*{%s}"))))
(setq org-publish-project-alist
    (list
        (list "tex"
            :recursive nil
            :base-directory "./src/org"
            :publishing-directory "./out/tex"
            :base-extension "org"
	        :exclude "index.org"
            :publishing-function 'org-latex-publish-to-latex)
        (list "resources"
	        :recursive nil
            :base-directory "./src/res"
            :publishing-directory "./out/res"
            :base-extension "pdf\\|jpg\\|gif\\|png\\|svg"
            :publishing-function 'org-publish-attachment)
        ))
(org-publish-all t)
