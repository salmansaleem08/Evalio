# Evalio API

Python 3.11+ with a virtual environment (required).

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Load environment from the repo root `.env` file.
