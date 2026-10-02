.PHONY: test build api web lint

test:
	PYTHONPATH=. pytest tests/unit -v

api:
	cd apps/api && uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

web:
	cd apps/web && npm run dev

build:
	cd apps/web && npm run build
