from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os

class BlogPost(BaseModel):
    id: str
    title: str
    content: str
    summary: str
    date: str
    image: Optional[str] = None
    tags: List[str]
    readTime: int

def load_blog_posts(lang: str) -> List[BlogPost]:
    """
    Carga los posts del blog desde el archivo JSON correspondiente al idioma.
    Si el archivo no existe, lo crea con una lista vacía.
    """
    filename = f'blog_posts_{lang}.json'
    if not os.path.exists(filename):
        # Crear archivo con datos de ejemplo
        sample_posts = [
            {
                "id": "1",
                "title": "Bienvenidos a mi Blog" if lang == "es" else "Welcome to my Blog",
                "content": "Este es mi primer post..." if lang == "es" else "This is my first post...",
                "summary": "Una breve introducción..." if lang == "es" else "A brief introduction...",
                "date": datetime.now().strftime("%Y-%m-%d"),
                "tags": ["Welcome", "First Post"],
                "readTime": 2
            }
        ]
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(sample_posts, f, ensure_ascii=False, indent=2)
        return [BlogPost(**post) for post in sample_posts]
    
    with open(filename, 'r', encoding='utf-8') as f:
        posts = json.load(f)
        return [BlogPost(**post) for post in posts]

def save_blog_post(post: BlogPost, lang: str) -> None:
    """
    Guarda un nuevo post en el archivo JSON correspondiente.
    """
    filename = f'blog_posts_{lang}.json'
    posts = []
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            posts = json.load(f)
    
    posts.append(post.dict())
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
