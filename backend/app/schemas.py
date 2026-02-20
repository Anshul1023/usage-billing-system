from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ResourceCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    capacity: int = Field(..., gt=0)
    price_per_minute: float = Field(..., gt=0)


class ResourceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    capacity: Optional[int] = None
    price_per_minute: Optional[float] = None


class ResourceResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    capacity: int
    price_per_minute: float
    created_at: datetime
    updated_at: Optional[datetime] = None   

    class Config:
        from_attributes = True


class UsageSessionStart(BaseModel):
    resource_id: int = Field(..., gt=0)
    user_id: str = Field(..., min_length=1)


class UsageSessionStop(BaseModel):
    session_id: int = Field(..., gt=0)


class UsageSessionResponse(BaseModel):
    id: int
    resource_id: int
    user_id: str
    start_time: datetime
    end_time: Optional[datetime] = None
    is_active: bool
    duration_minutes: Optional[float] = None
    cost: Optional[float] = None
    created_at: datetime

    class Config:
        from_attributes = True


class BillingRecordResponse(BaseModel):
    id: int
    usage_session_id: int
    resource_id: int
    user_id: str
    duration_minutes: float
    price_per_minute: float
    total_cost: float
    created_at: datetime

    class Config:
        from_attributes = True