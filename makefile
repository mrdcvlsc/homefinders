SRC_JSX := $(wildcard frontend/src/*.jsx)
ROUTES_JSX := $(wildcard frontend/src/routes/*.jsx)
CSS := $(wildcard frontend/styles/*.css)
ASSETS := $(wildcard frontend/src/*.jsx)

GO_SRC := $(wildcard backend/*/*.go)

backend: frontend backend/server/main.go
	$(MAKE) isolated_backend_build
	cd backend/server && ./app

frontend: $(SRC_JSX) $(ROUTES_JSX) $(CSS) $(ASSETS) $(GO_SRC)
	$(MAKE) isolated_frontend_build

run:
	cd backend/server && ./app

isolated_backend_build:
	go -C backend/server build -tags netgo -ldflags '-s -w' -o app

isolated_frontend_build:
	npm install --prefix frontend
	npm run build --prefix frontend
