
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Configurar CORS para permitir solicitudes desde el frontend de React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, deberías restringir esto a tu dominio de frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/es")
def get_cv_es():
    with open('/Users/josereimondez/Documents/New Portofolio/Portofolio web final/backend/cv_es.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.get("/api/en")
def get_cv_en():
    with open('/Users/josereimondez/Documents/New Portofolio/Portofolio web final/backend/cv_en.json', 'r', encoding='utf-8') as f:
        return json.load(f)
