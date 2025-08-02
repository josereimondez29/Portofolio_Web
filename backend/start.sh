#!/usr/bin/env bash

# Iniciar Uvicorn con la aplicación FastAPI
uvicorn main:app --host 0.0.0.0 --port $PORT