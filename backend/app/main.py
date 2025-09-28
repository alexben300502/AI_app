from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS: autorise le front (Vercel) à appeler l'API
origins = ["http://localhost:3000",
           "https://ai-app-42ac.vercel.app"]  # tu ajouteras l'URL Vercel après déploiement
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend API is running 🚀"}


@app.get("/health")
def health():
    return {"status": "ok", "service": "backend", "version": "0.1.0"}
