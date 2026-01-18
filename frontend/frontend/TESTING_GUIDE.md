# Testing Your AI Assistant - Quick Guide

## 🚀 Quick Start Testing

### Option 1: Test Backend API Directly (Recommended First Step)

1. **Start the Backend:**
   ```bash
   cd python_backend
   python app.py
   ```
   
   You should see:
   ```
   ✅ Amber initialized with profile data (XXXX chars)
   INFO:     Uvicorn running on http://0.0.0.0:7860
   ```

2. **Test the API with curl (or Postman):**
   
   Open a new terminal and run:
   ```bash
   curl -X POST http://localhost:7860/chat \
     -H "Content-Type: application/json" \
     -d "{\"message\": \"Hello, introduce yourself\"}"
   ```
   
   Expected response:
   ```json
   {
     "response": "Hi! I'm Amber, Yashwanth's AI assistant..."
   }
   ```

3. **Check Health Endpoint:**
   ```bash
   curl http://localhost:7860/
   ```

### Option 2: Test with Frontend

1. **Update BASE_URL for local testing** (in `ChatWidget.jsx`):
   
   Change line 8 from:
   ```javascript
   const BASE_URL = "https://python-ai-service-for-portfolio.onrender.com";
   ```
   
   To:
   ```javascript
   const BASE_URL = process.env.NODE_ENV === 'development' 
     ? "http://localhost:7860" 
     : "https://python-ai-service-for-portfolio.onrender.com";
   ```

2. **Start Backend** (Terminal 1):
   ```bash
   cd python_backend
   python app.py
   ```

3. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open Browser:**
   - Go to `http://localhost:5173` (or the port Vite shows)
   - Look for the floating chat button (bottom right)
   - Click it and try sending a message

### Option 3: Test via Browser Console

1. Start both backend and frontend
2. Open browser DevTools (F12)
3. In Console tab, run:
   ```javascript
   fetch('http://localhost:7860/chat', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({message: "What are your skills?"})
   })
   .then(r => r.json())
   .then(console.log)
   ```

## ✅ Checklist

- [ ] Backend starts without errors
- [ ] `GOOGLE_API_KEY` is set in `.env` file
- [ ] `/chat` endpoint returns JSON response
- [ ] Frontend shows the floating chat button
- [ ] Clicking button opens chat widget
- [ ] Messages send successfully
- [ ] AI responds (not error messages)

## 🔍 Troubleshooting

### Backend Issues:

**Problem: "GOOGLE_API_KEY not found"**
- Solution: Create `python_backend/.env` file with:
  ```
  GOOGLE_API_KEY=your_actual_api_key_here
  ```

**Problem: "404 NOT_FOUND" model error**
- Solution: The code now tries multiple model names automatically. Check console logs to see which one works.

**Problem: Port 7860 already in use**
- Solution: Change port in `app.py` last line:
  ```python
   uvicorn.run(app, host="0.0.0.0", port=8000)  # Use port 8000 instead
  ```

### Frontend Issues:

**Problem: "Could not connect to AI"**
- Check if backend is running on correct port
- Check CORS settings in `app.py`
- Verify BASE_URL matches backend URL

**Problem: Chat widget doesn't appear**
- Check browser console for errors
- Verify `ChatWidget` is imported in `App.jsx`
- Check CSS file is imported correctly

### API Key Issues:

**Problem: No response or API errors**
- Verify your Google API Key is valid
- Check if you have billing enabled on Google Cloud
- Ensure Gemini API is enabled in Google Cloud Console

## 🧪 Test Questions to Try

1. "Introduce yourself"
2. "What are your skills?"
3. "Tell me about your projects"
4. "What is your education background?"

## 📊 Expected Behavior

- ✅ Assistant responds as "Yashwanth's AI Assistant"
- ✅ Answers are based on profile data from `summary.txt`
- ✅ Responses are concise and professional
- ✅ Widget has glassmorphism effect
- ✅ Messages appear with smooth animations

