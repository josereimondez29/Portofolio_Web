
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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
