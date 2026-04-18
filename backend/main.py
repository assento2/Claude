from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
import uuid
from datetime import datetime
from dotenv import load_dotenv
from models.project import Project, ProjectCreate, Task, ProjectStage
from services.llm_factory import ProjectService

load_dotenv()

app = FastAPI(title="Claude Unlimited Project Manager")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

projects_db: Dict[str, Project] = {}

class ChatRequest(BaseModel):
    message: str
    config: Optional[dict] = None

@app.get("/health")
async def health():
    return {"status": "healthy"}

# API Routes
@app.post("/api/projects", response_model=Project)
async def create_project(project_in: ProjectCreate):
    project_id = str(uuid.uuid4())
    project = Project(
        id=project_id,
        name=project_in.name,
        description=project_in.description,
        status="planning",
        stages=[
            ProjectStage(
                id=str(uuid.uuid4()),
                name="Initialization",
                description="Setting up the project structure",
                status="in_progress",
                tasks=[
                    Task(id=str(uuid.uuid4()), title="Define Requirements", description="Detailed project requirements", status="pending")
                ]
            )
        ]
    )
    projects_db[project_id] = project
    return project

@app.get("/api/projects", response_model=List[Project])
async def list_projects():
    return list(projects_db.values())

@app.post("/api/projects/{project_id}/chat")
async def chat_with_claude(project_id: str, chat_req: ChatRequest):
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_db[project_id]

    provider = chat_req.config.get("provider", "anthropic") if chat_req.config else os.getenv("LLM_PROVIDER", "anthropic")
    api_key = chat_req.config.get("apiKey") if chat_req.config else None
    model_name = chat_req.config.get("model") if chat_req.config else None

    service = ProjectService(provider=provider, api_key=api_key, model_name=model_name)

    try:
        response = await service.chat_with_project(project, chat_req.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Static Files (Production)
if os.path.exists("static"):
    app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404)
        return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    # Use PORT env var for Render/Heroku
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
