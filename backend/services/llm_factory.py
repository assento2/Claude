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
    def get_llm(provider: str = "anthropic", model_name: Optional[str] = None, api_key: Optional[str] = None):
        if provider == "anthropic":
            key = api_key or os.getenv("ANTHROPIC_API_KEY")
            if not key:
                return None
            return ChatAnthropic(
                model=model_name or "claude-3-5-sonnet-20240620",
                anthropic_api_key=key
            )
        elif provider == "openrouter":
            key = api_key or os.getenv("OPENROUTER_API_KEY")
            if not key:
                return None
            return ChatOpenAI(
                model=model_name or "google/gemma-2-9b-it:free",
                openai_api_key=key,
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
    def __init__(self, provider: str = "anthropic", api_key: Optional[str] = None, model_name: Optional[str] = None):
        self.provider = provider
        self.llm = LLMFactory.get_llm(provider, model_name, api_key)

    async def chat_with_project(self, project: Project, message: str):
        if not self.llm:
            return f"API anahtarı eksik. Lütfen ayarlardan bir API anahtarı ekleyin. (Seçili Sağlayıcı: {self.provider})"

        system_prompt = f"You are a senior software engineer. Project: {project.name}. Description: {project.description}"
        messages = [SystemMessage(content=system_prompt), HumanMessage(content=message)]
        response = self.llm.invoke(messages)
        return response.content
