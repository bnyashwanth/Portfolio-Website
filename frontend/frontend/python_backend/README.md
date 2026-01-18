# Python AI Backend

This is the backend service for the Portfolio AI Assistant, powered by Google Gemini.

## Prerequisites
- Python 3.8+
- Google Gemini API Key

## Setup

1. **Navigate to the directory:**
   ```bash
   cd python_backend
   ```

2. **Activate the Virtual Environment:**
   Assuming the `venv` is in the project root (`../venv`):
   ```powershell
   # Windows (PowerShell)
   ..\venv\Scripts\Activate.ps1
   
   # Windows (Command Prompt)
   ..\venv\Scripts\activate.bat
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configuration:**
   Ensure you have a `.env` file in this directory or the project root with:
   ```env
   GOOGLE_API_KEY=your_api_key_here
   ```

## Running the Server

Run the application using Python:
```bash
python app.py
```

The server will start on `http://0.0.0.0:7860`.

## API Endpoints

- `GET /`: Health check.
- `POST /chat`: Chat endpoint.
  - Body: `{"message": "Hello", "history": []}`
