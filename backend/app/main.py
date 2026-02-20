from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import router

app = FastAPI(
    title="Usage & Billing System",
    description="A system for managing resource usage and billing",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(router)   # 👈 MUST BE ACTIVE


@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}