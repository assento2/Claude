import os
from typing import Optional, List
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv
from models.project import Project

load_dotenv()

class LLMFactory:
    @staticmethod
    def get_llm(provider: str = "anthropic", model_name: Optional[str] = None):
        if provider == "anthropic":
            api_key = os.getenv("ANTHROPIC_API_KEY")
            if not api_key:
                # Fallback to a mock or raise error
                print("Warning: ANTHROPIC_API_KEY not found. Using mock mode.")
                return None
            return ChatAnthropic(
                model=model_name or "claude-3-5-sonnet-20240620",
                anthropic_api_key=api_key
            )
        elif provider == "openrouter":
            return ChatOpenAI(
                model=model_name or "anthropic/claude-3.5-sonnet",
                openai_api_key=os.getenv("OPENROUTER_API_KEY"),
                openai_api_base="https://openrouter.ai/api/v1"
            )
        elif provider == "ollama":
            return ChatOpenAI(
                model=model_name or "llama3",
                openai_api_key="ollama",
                openai_api_base="http://localhost:11434/v1"
            )
        else:
            raise ValueError(f"Unsupported provider: {provider}")

class ProjectService:
    def __init__(self, provider: str = "anthropic"):
        self.llm = LLMFactory.get_llm(provider)

    async def chat_with_project(self, project: Project, message: str):
        if not self.llm:
            return f"Mock response for project '{project.name}': I've received your message: '{message}'. To use real Claude, please provide an API key."

        system_prompt = f"""You are Claude, a senior software engineer helping to develop the project: {project.name}.
Project Description: {project.description}
Current status: {project.status}
"""
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=message)
        ]

        response = self.llm.invoke(messages)
        return response.content
