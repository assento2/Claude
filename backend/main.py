from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
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

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for demonstration
projects_db: Dict[str, Project] = {}

def get_project_service():
    provider = os.getenv("LLM_PROVIDER", "anthropic")
    return ProjectService(provider=provider)

@app.get("/")
async def root():
    return {"message": "Claude Unlimited Project Manager API"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/projects", response_model=Project)
async def create_project(project_in: ProjectCreate, service: ProjectService = Depends(get_project_service)):
    project_id = str(uuid.uuid4())

    # In a real app, we would use the service to generate stages
    # For now, let's create a basic project structure
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

@app.get("/projects", response_model=List[Project])
async def list_projects():
    return list(projects_db.values())

@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    return projects_db[project_id]

class ChatRequest(BaseModel):
    message: str

@app.post("/projects/{project_id}/chat")
async def chat_with_claude(project_id: str, chat_req: ChatRequest, service: ProjectService = Depends(get_project_service)):
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_db[project_id]

    # Call LLM service
    try:
        response = await service.chat_with_project(project, chat_req.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
