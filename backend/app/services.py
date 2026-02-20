from sqlalchemy.orm import Session
from datetime import datetime, timezone
from .models import Resource, UsageSession, BillingRecord
from fastapi import HTTPException


class ResourceService:
    @staticmethod
    def get_all_resources(db: Session):
        return db.query(Resource).all()

    @staticmethod
    def get_resource_by_id(db: Session, resource_id: int):
        resource = db.query(Resource).filter(Resource.id == resource_id).first()
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        return resource

    @staticmethod
    def create_resource(db: Session, resource):
        existing = db.query(Resource).filter(Resource.name == resource.name).first()
        if existing:
            raise HTTPException(status_code=400, detail="Resource name already exists")
        
        db_resource = Resource(
            name=resource.name,
            description=resource.description,
            capacity=resource.capacity,
            price_per_minute=resource.price_per_minute,
        )
        db.add(db_resource)
        db.commit()
        db.refresh(db_resource)
        return db_resource

    @staticmethod
    def update_resource(db: Session, resource_id: int, resource):
        db_resource = ResourceService.get_resource_by_id(db, resource_id)
        
        update_data = resource.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_resource, field, value)
        
        db.commit()
        db.refresh(db_resource)
        return db_resource

    @staticmethod
    def delete_resource(db: Session, resource_id: int):
        db_resource = ResourceService.get_resource_by_id(db, resource_id)
        db.delete(db_resource)
        db.commit()
        return {"message": "Resource deleted successfully"}


class UsageSessionService:
    @staticmethod
    def get_active_count(db: Session, resource_id: int):
        return db.query(UsageSession).filter(
            UsageSession.resource_id == resource_id,
            UsageSession.is_active == True
        ).count()

    @staticmethod
    def start_session(db: Session, session):
        resource = ResourceService.get_resource_by_id(db, session.resource_id)
        
        active_count = UsageSessionService.get_active_count(db, session.resource_id)
        if active_count >= resource.capacity:
            raise HTTPException(
                status_code=400,
                detail=f"Resource at capacity. Active sessions: {active_count}/{resource.capacity}"
            )
        
        db_session = UsageSession(
            resource_id=session.resource_id,
            user_id=session.user_id,
            start_time=datetime.now(timezone.utc),
            is_active=True,
        )
        db.add(db_session)
        db.commit()
        db.refresh(db_session)
        return db_session

    @staticmethod
    def stop_session(db: Session, session_id: int):

        # Find active session
        session = db.query(UsageSession).filter(
            UsageSession.id == session_id,
            UsageSession.is_active == True
        ).first()

        if not session:
            raise HTTPException(
                status_code=404,
                detail="Active session not found"
            )

        # End session
        session.end_time = datetime.utcnow()
        session.is_active = False

        # Calculate duration (minutes)
        duration_minutes = (
            (session.end_time - session.start_time).total_seconds() / 60
        )
        session.duration_minutes = duration_minutes

        # Get resource for pricing
        resource = db.query(Resource).filter(
            Resource.id == session.resource_id
        ).first()

        if not resource:
            raise HTTPException(
                status_code=404,
                detail="Resource not found"
            )
        
        # Calculate cost
        cost = duration_minutes * resource.price_per_minute
        session.cost = cost

        # Create billing record
        billing = BillingRecord(
            usage_session_id=session.id,
            resource_id=session.resource_id,
            user_id=session.user_id,
            duration_minutes=duration_minutes,
            price_per_minute=resource.price_per_minute,
            total_cost=cost
        )

        db.add(billing)
        db.commit()
        db.refresh(session)

        return session
    @staticmethod
    def get_sessions_by_resource(db: Session, resource_id: int):
        return db.query(UsageSession).filter(UsageSession.resource_id == resource_id).all()

    @staticmethod
    def get_sessions_by_user(db: Session, user_id: str):
        return db.query(UsageSession).filter(UsageSession.user_id == user_id).all()

    @staticmethod
    def get_all_sessions(db: Session):
        return db.query(UsageSession).all()


class BillingService:
    @staticmethod
    def create_billing_record(
        db: Session,
        usage_session_id: int,
        resource_id: int,
        user_id: str,
        duration_minutes: float,
        price_per_minute: float,
        total_cost: float,
    ):
        billing = BillingRecord(
            usage_session_id=usage_session_id,
            resource_id=resource_id,
            user_id=user_id,
            duration_minutes=duration_minutes,
            price_per_minute=price_per_minute,
            total_cost=total_cost,
        )
        db.add(billing)
        db.commit()
        db.refresh(billing)
        return billing

    @staticmethod
    def get_billing_records(db: Session):
        return db.query(BillingRecord).all()

    @staticmethod
    def get_billing_by_user(db: Session, user_id: str):
        return db.query(BillingRecord).filter(BillingRecord.user_id == user_id).all()

    @staticmethod
    def get_billing_by_resource(db: Session, resource_id: int):
        return db.query(BillingRecord).filter(BillingRecord.resource_id == resource_id).all()

    @staticmethod
    def get_user_total_spent(db: Session, user_id: str):
        records = BillingService.get_billing_by_user(db, user_id)
        return sum(record.total_cost for record in records)
