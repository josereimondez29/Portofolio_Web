
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import json
import os
from dotenv import load_dotenv
from github_projects import get_pinned_repos
from blog_handler import load_blog_posts, save_blog_post, BlogPost
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()  # Cargar variables de entorno desde .env

# Configuración de email
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', '587'))
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
EMAIL_TO = os.getenv('EMAIL_TO')

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
    email: EmailStr
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
async def contact(request: ContactRequest):
    print(f"Iniciando envío de email para {request.name}")
    print(f"Configuración actual:")
    print(f"EMAIL_HOST: {'Configurado' if EMAIL_HOST else 'No configurado'}")
    print(f"EMAIL_PORT: {'Configurado' if EMAIL_PORT else 'No configurado'}")
    print(f"EMAIL_USER: {'Configurado' if EMAIL_USER else 'No configurado'}")
    print(f"EMAIL_PASSWORD: {'Configurado (longitud: ' + str(len(EMAIL_PASSWORD)) + ')' if EMAIL_PASSWORD else 'No configurado'}")
    
    # Verificar configuración
    if not all([EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD]):
        print("Error: Configuración de email incompleta")
        missing_vars = [var for var, val in {
            'EMAIL_HOST': EMAIL_HOST,
            'EMAIL_PORT': EMAIL_PORT,
            'EMAIL_USER': EMAIL_USER,
            'EMAIL_PASSWORD': EMAIL_PASSWORD
        }.items() if not val]
        error_msg = f"La configuración del email está incompleta. Variables faltantes: {', '.join(missing_vars)}"
        print(error_msg)
        raise HTTPException(status_code=500, detail=error_msg)
    
    try:
        print("Creando mensaje de email...")
        # Crear el mensaje
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = "dev@josereimondez.com"
        msg['Subject'] = f"Nuevo mensaje de contacto de {request.name}"

        # Construir el cuerpo del mensaje
        body = f"""
        Has recibido un nuevo mensaje de contacto:
        
        Nombre: {request.name}
        Email: {request.email}
        
        Mensaje:
        {request.message}
        """
        
        msg.attach(MIMEText(body, 'plain'))

        print(f"Conectando al servidor SMTP {EMAIL_HOST}:{EMAIL_PORT}...")
        # Conectar al servidor SMTP y enviar el correo
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            print("Iniciando TLS...")
            server.starttls()
            print("Iniciando login...")
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            print("Enviando mensaje...")
            server.send_message(msg)
            print("Mensaje enviado exitosamente")

        return {"message": "¡Mensaje enviado correctamente! Gracias por contactar."}
    except smtplib.SMTPAuthenticationError as e:
        error_msg = f"Error de autenticación SMTP: {str(e)}"
        print(error_msg)
        print(f"Usuario utilizado: {EMAIL_USER}")
        raise HTTPException(
            status_code=500,
            detail=f"Error de autenticación al enviar el mensaje: {str(e)}"
        )
    except smtplib.SMTPException as e:
        error_msg = f"Error SMTP: {str(e)}"
        print(error_msg)
        raise HTTPException(
            status_code=500,
            detail=f"Error al conectar con el servidor de correo: {str(e)}"
        )
    except Exception as e:
        error_msg = f"Error inesperado al enviar el email: {str(e)}"
        print(error_msg)
        raise HTTPException(
            status_code=500,
            detail=f"Error inesperado al enviar el mensaje: {str(e)}"
        )

@app.get("/api/github/pinned-projects")
def get_pinned_projects():
    projects = get_pinned_repos("josereimondez29")
    return projects

@app.get("/api/blog/posts")
def get_blog_posts(lang: str = "es"):
    """
    Obtiene todos los posts del blog en el idioma especificado.
    """
    return load_blog_posts(lang)

@app.get("/api/blog/posts/{post_id}")
def get_blog_post(post_id: str, lang: str = "es"):
    """
    Obtiene un post específico por su ID.
    """
    posts = load_blog_posts(lang)
    for post in posts:
        if post.id == post_id:
            return post
    return {"error": "Post not found"}, 404
