################################################################################
# Dependencies
################################################################################

OS:=$(shell uname)

GO_SRC := $(wildcard backend/*/*.go)
GO_SRC_SUBDIR := $(wildcard backend/*/*/*.go)
REACT_SRC_FILES := $(wildcard frontend/src/*.*)
REACT_SRC_SUBDIR_FILES := $(wildcard frontend/src/*/*.*)

.PHONY: backend frontend run isolated_backend_build isolated_frontend_build

run: backend/app frontend/dist/index.html
	cd backend && ./app

################################################################################
# Development Targets
################################################################################

backend/app: backend/main.go $(GO_SRC) $(GO_SRC_SUBDIR)
	cd backend && go build -tags netgo -ldflags '-s -w' -o app

frontend/dist/index.html: $(REACT_SRC_FILES) $(REACT_SRC_SUBDIR_FILES)
	cd frontend && npm install && npm run build

################################################################################
# Canary Targets
################################################################################

isolated_backend_build: frontend backend/main.go $(GO_SRC) $(GO_SRC_SUBDIR)
	cd backend && go build -tags netgo -ldflags '-s -w' -o app

isolated_frontend_build: $(REACT_SRC_FILES) $(REACT_SRC_SUBDIR_FILES)
	cd frontend && npm install && npm run build
