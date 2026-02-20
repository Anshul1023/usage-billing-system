from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from .services import ResourceService, UsageSessionService, BillingService
from .schemas import (
    ResourceCreate,
    ResourceUpdate,
    ResourceResponse,
    UsageSessionStart,
    UsageSessionResponse,
    BillingRecordResponse,
    UsageSessionStop,
)

router = APIRouter()


# Resource endpoints
@router.get("/resources", response_model=list[ResourceResponse])
def get_resources(db: Session = Depends(get_db)):
    """Get all resources"""
    return ResourceService.get_all_resources(db)


@router.get("/resources/{resource_id}", response_model=ResourceResponse)
def get_resource(resource_id: int, db: Session = Depends(get_db)):
    """Get a specific resource by ID"""
    return ResourceService.get_resource_by_id(db, resource_id)


@router.post("/resources", response_model=ResourceResponse, status_code=201)
def create_resource(resource: ResourceCreate, db: Session = Depends(get_db)):
    """Create a new resource"""
    return ResourceService.create_resource(db, resource)


@router.put("/resources/{resource_id}", response_model=ResourceResponse)
def update_resource(
    resource_id: int, resource: ResourceUpdate, db: Session = Depends(get_db)
):
    """Update a resource"""
    return ResourceService.update_resource(db, resource_id, resource)


@router.delete("/resources/{resource_id}")
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    """Delete a resource"""
    return ResourceService.delete_resource(db, resource_id)


# Usage Session endpoints
@router.get("/usage-sessions", response_model=list[UsageSessionResponse])
def get_all_sessions(db: Session = Depends(get_db)):
    """Get all usage sessions"""
    return UsageSessionService.get_all_sessions(db)


@router.get("/usage-sessions/resource/{resource_id}", response_model=list[UsageSessionResponse])
def get_sessions_by_resource(resource_id: int, db: Session = Depends(get_db)):
    """Get all usage sessions for a specific resource"""
    return UsageSessionService.get_sessions_by_resource(db, resource_id)


@router.get("/usage-sessions/user/{user_id}", response_model=list[UsageSessionResponse])
def get_sessions_by_user(user_id: str, db: Session = Depends(get_db)):
    """Get all usage sessions for a specific user"""
    return UsageSessionService.get_sessions_by_user(db, user_id)


@router.post("/usage-sessions/start", response_model=UsageSessionResponse, status_code=201)
def start_session(session: UsageSessionStart, db: Session = Depends(get_db)):
    """Start a new usage session"""
    return UsageSessionService.start_session(db, session)


@router.post("/usage-sessions/stop")
def stop_session(data: UsageSessionStop, db: Session = Depends(get_db)):
    return UsageSessionService.stop_session(db, data.session_id)


# Billing endpoints
@router.get("/billing", response_model=list[BillingRecordResponse])
def get_billing_records(db: Session = Depends(get_db)):
    """Get all billing records"""
    return BillingService.get_billing_records(db)


@router.get("/billing/user/{user_id}", response_model=list[BillingRecordResponse])
def get_billing_by_user(user_id: str, db: Session = Depends(get_db)):
    """Get billing records for a specific user"""
    records = BillingService.get_billing_by_user(db, user_id)
    if not records:
        return []
    return records


@router.get("/billing/user/{user_id}/total")
def get_user_total_spent(user_id: str, db: Session = Depends(get_db)):
    """Get total amount spent by a user"""
    total = BillingService.get_user_total_spent(db, user_id)
    return {"user_id": user_id, "total_spent": total}


@router.get("/billing/resource/{resource_id}", response_model=list[BillingRecordResponse])
def get_billing_by_resource(resource_id: int, db: Session = Depends(get_db)):
    """Get billing records for a specific resource"""
    return BillingService.get_billing_by_resource(db, resource_id)
