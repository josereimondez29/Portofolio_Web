
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from dotenv import load_dotenv
from github_projects import get_pinned_repos

load_dotenv()  # Cargar variables de entorno desde .env

app = FastAPI()

# Configurar CORS para permitir solicitudes desde el frontend de React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, deberías restringir esto a tu dominio de frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

@app.get("/api/es")
def get_cv_es():
    with open('cv_es.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.get("/api/en")
def get_cv_en():
    with open('cv_en.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.post("/api/contact")
def contact(request: ContactRequest):
    print(f"Nuevo mensaje de: {request.name} <{request.email}>\n{request.message}")
    return {"message": "¡Mensaje recibido! Gracias por contactarme."}

@app.get("/api/github/pinned-projects")
def get_pinned_projects():
    projects = get_pinned_repos("josereimondez29")
    return projects
