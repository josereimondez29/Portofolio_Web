import os
import requests
from typing import List, Dict

def get_pinned_repos(username: str) -> List[Dict]:
    query = """
    {
      user(login: "%s") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              openGraphImageUrl
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    }
    """ % username

    headers = {
        "Authorization": f"Bearer {os.getenv('GITHUB_TOKEN')}",
        "Content-Type": "application/json",
    }

    response = requests.post(
        'https://api.github.com/graphql',
        json={'query': query},
        headers=headers
    )

    if response.status_code == 200:
        result = response.json()
        if result.get('data') and result['data'].get('user'):
            return result['data']['user']['pinnedItems']['nodes']
    return []
