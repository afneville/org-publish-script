# Commands
MKDIR    := mkdir -p
RMDIR    := rm -rf
TEXCC    := latexmk -pdf -shell-escape -cd --output-format=pdf
ORGCC    := emacs -q --script

# Directories
SRC_DIR           := ./src
SRC_ORG_DIR       := ./src/org
SRC_RES_DIR	      := ./src/org/res
OUT_DIR           := ./out
OUT_TEX_DIR       := ./out/tex
OUT_HTML_DIR      := ./out/html
OUT_TEX_RES_DIR   := ./out/tex/res
OUT_HTML_RES_DIR  := ./out/html/res
TMP_PDF_DIR   	  := ./out/tex
OUT_PDF_DIR       := ./out/pdf

# Files
PUB_FILE          := ./publish.el
ORG_FILES         := $(wildcard $(SRC_ORG_DIR)/*.org)
TEX_FILES         := $(patsubst $(SRC_ORG_DIR)/%.org,$(OUT_TEX_DIR)/%.tex,$(ORG_FILES))
HTML_FILES        := $(patsubst $(SRC_ORG_DIR)/%.org,$(OUT_HTML_DIR)/%.html,$(ORG_FILES))
TMP_PDF_FILES     := $(patsubst $(SRC_ORG_DIR)/%.org,$(TMP_PDF_DIR)/%.pdf,$(ORG_FILES))
OUT_PDF_FILES     := $(patsubst $(SRC_ORG_DIR)/%.org,$(OUT_PDF_DIR)/%.pdf,$(ORG_FILES))

# A makefile is composed of "rules".
# Rules are of the form:
#
#     target: prerequisites
#         command
#         command
#
# By default the first rule is run if make is invoked without arguments.
# Rules can be run explicitly as in "make clean".
#
# Targets represent files to be built (usually).
# If the target "file" does not exist, or any of the prerequisites are newer than the 
# target, the commands are run. The commands usually build the target "file".
#
# The pipe symbol denotes "order-only-prequisites". This means that the prequisite is
# built before the target, but the target does not need to be updated each time the
# prerequisite is changed. eg. creating a directory.
# 
# $@ = the file name given by the target of the rule
# $^ all the prerequisites
# $? new prerequisites
# $< the first prerequisite
#
# .PHONY means that specified targets can be run if a file with that name exists

.PHONY: clean publish build init

build: $(OUT_PDF_FILES)

init: $(OUT_DIR) $(OUT_TEX_DIR) $(OUT_HTML_DIR) $(OUT_TEX_RES_DIR) $(OUT_HMTL_RES_DIR) $(OUT_PDF_DIR)

clean:
	$(RMDIR) $(OUT_DIR)

publish: $(TEX_FILES)

$(TEX_FILES): $(ORG_FILES) $(SRC_RES_DIR) | init
	$(ORGCC) $(PUB_FILE)

$(OUT_PDF_FILES): $(TMP_PDF_FILES)
	cp $(TMP_PDF_DIR)/*.pdf $(OUT_PDF_DIR)

$(TMP_PDF_FILES): $(TEX_FILES)
	$(TEXCC) $^

$(OUT_DIR) $(OUT_TEX_DIR) $(OUT_HTML_DIR) $(OUT_HTML_RES_DIR) $(OUT_TEX_RES_DIR) $(OUT_PDF_DIR):
	$(MKDIR) $@
