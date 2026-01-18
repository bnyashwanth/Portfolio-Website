"""
Quick test script for the AI Assistant API
Run this to verify your backend is working correctly.
"""

import requests
import json

BASE_URL = "http://localhost:7860"

def test_health():
    """Test if the server is running"""
    print("🏥 Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"✅ Status: {response.status_code}")
        print(f"✅ Response: {json.dumps(response.json(), indent=2)}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Make sure the backend is running: python app.py")
        return False

def test_chat(message="Hello, introduce yourself"):
    """Test the chat endpoint"""
    print(f"\n💬 Testing chat endpoint with: '{message}'...")
    try:
        response = requests.post(
            f"{BASE_URL}/chat",
            json={"message": message},
            headers={"Content-Type": "application/json"}
        )
        print(f"✅ Status: {response.status_code}")
        data = response.json()
        print(f"✅ Response: {json.dumps(data, indent=2)}")
        
        if "response" in data:
            print(f"\n📝 AI Reply: {data['response'][:200]}...")
            return True
        else:
            print("❌ Unexpected response format")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_with_history():
    """Test chat with conversation history"""
    print(f"\n📚 Testing with conversation history...")
    try:
        # First message
        response1 = requests.post(
            f"{BASE_URL}/chat",
            json={"message": "What is your name?"},
            headers={"Content-Type": "application/json"}
        )
        data1 = response1.json()
        first_reply = data1.get("response", "")
        
        # Second message with history
        response2 = requests.post(
            f"{BASE_URL}/chat",
            json={
                "message": "Tell me more about that",
                "history": [["What is your name?", first_reply]]
            },
            headers={"Content-Type": "application/json"}
        )
        data2 = response2.json()
        print(f"✅ First reply: {first_reply[:100]}...")
        print(f"✅ Second reply: {data2.get('response', '')[:100]}...")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("🤖 AI Assistant Testing Script")
    print("=" * 50)
    
    # Test health
    if not test_health():
        exit(1)
    
    # Test simple chat
    test_chat("Hello, introduce yourself")
    
    # Test with a question
    test_chat("What are your core skills?")
    
    # Test with history
    test_with_history()
    
    print("\n" + "=" * 50)
    print("✅ All tests completed!")
    print("=" * 50)

