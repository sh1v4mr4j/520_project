from pydantic import BaseModel


class Location(BaseModel):
    name: str
    lat: float
    lon: float
    plus_code: str