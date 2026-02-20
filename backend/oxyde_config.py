"""Oxyde ORM configuration."""
import os

# List of Python modules containing OxydeModel classes
MODELS = ["app.oxyde_models"]

# Database dialect: "postgres", "sqlite", or "mysql"
DIALECT = "sqlite"

# Directory for migration files
MIGRATIONS_DIR = "migrations"

# Database connections — absolute path for SQLite
_db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "chaotic.db"))
DATABASES = {
    "default": f"sqlite:///{_db_path}",
}
