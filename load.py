import requests
import json
from datetime import datetime, timedelta

ACCESS_TOKEN = "THQWJYdXFFYWZAGTU81cTNscXZAXN09vSWpzZA0xSNnoxUFFOTmRTTVZANdXVZAaE0xTmtkSE81amxpYjZAUOGtoaXdkNnV5M0xjNk43NU5uTlFUbW5qU1ZAaZA2ZADaGtvaHFnSERlcjhqb0o2NXpYQ3hGdFRCbnFqMTNCTVd1dUEZD"
BASE_URL = "https://graph.threads.net/v1.0"

def get_user_threads(user_id="me", limit=100):
    url = f"{BASE_URL}/{user_id}/threads"
    params = {
        "fields": "id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post",
        "limit": limit,
        "access_token": ACCESS_TOKEN
    }
    response = requests.get(url, params=params)
    return response.json()

def get_thread_insights(thread_id):
    url = f"{BASE_URL}/{thread_id}/insights"
    params = {
        "metric": "likes,replies,views",
        "access_token": ACCESS_TOKEN
    }
    response = requests.get(url, params=params)
    return response.json()

def main():
    # 사용자의 게시글 가져오기
    threads = get_user_threads()
    
    print("User Threads:")
    for thread in threads.get('data', []):
        print(f"ID: {thread['id']}")
        print(f"Text: {thread.get('text', 'No text')}")
        print(f"Timestamp: {thread['timestamp']}")
        print(f"Permalink: {thread.get('permalink', 'No permalink')}")
        
        # 각 게시글의 인사이트 가져오기
        insights = get_thread_insights(thread['id'])
        
        print("Insights:")
        for metric in insights.get('data', []):
            print(f"  {metric['name'].capitalize()}: {metric['values'][0]['value']}")
        
        print("\n" + "-"*50 + "\n")

if __name__ == "__main__":
    main()