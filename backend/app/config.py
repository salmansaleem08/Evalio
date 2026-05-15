from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=("../.env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    backend_port: int = 8000
    cors_origins: str = "http://localhost:3000"
    gemini_api_key: str = ""
    next_public_supabase_url: str = Field(
        default="",
        validation_alias="NEXT_PUBLIC_SUPABASE_URL",
    )
    supabase_anon_key: str = Field(
        default="",
        validation_alias="NEXT_PUBLIC_SUPABASE_ANON_KEY",
    )
    supabase_service_role_key: str = Field(
        default="",
        validation_alias="SUPABASE_SERVICE_ROLE_KEY",
    )
    frontend_url: str = Field(default="", validation_alias="NEXT_PUBLIC_APP_URL")
    cors_allow_vercel_previews: bool = False
    max_student_sheets: int = 5
    max_upload_size_mb: int = 25

    @property
    def supabase_url(self) -> str:
        return self.next_public_supabase_url

    @property
    def cors_origin_list(self) -> list[str]:
        origins: list[str] = []
        for part in self.cors_origins.split(","):
            normalized = part.strip().rstrip("/")
            if normalized:
                origins.append(normalized)

        front = self.frontend_url.strip().rstrip("/")
        if front and front not in origins:
            origins.append(front)

        # De-duplicate while preserving order
        seen: set[str] = set()
        unique: list[str] = []
        for origin in origins:
            if origin not in seen:
                seen.add(origin)
                unique.append(origin)

        return unique if unique else ["http://localhost:3000"]

    @property
    def cors_origin_regex(self) -> str | None:
        if self.cors_allow_vercel_previews:
            return r"https://.*\.vercel\.app"
        return None


settings = Settings()
