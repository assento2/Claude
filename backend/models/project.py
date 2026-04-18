from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class Task(BaseModel):
    id: str
    title: str
    description: str
    status: str  # pending, in_progress, completed
    code_changes: Optional[str] = None

class ProjectStage(BaseModel):
    id: str
    name: str
    description: str
    status: str  # pending, in_progress, completed
    tasks: List[Task] = []

class Project(BaseModel):
    id: str
    name: str
    description: str
    status: str  # planning, developing, testing, completed
    stages: List[ProjectStage] = []
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

class ProjectCreate(BaseModel):
    name: str
    description: str
