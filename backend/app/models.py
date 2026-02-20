from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.sql import func
from datetime import datetime
from .database import Base


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)
    capacity = Column(Integer, nullable=False)
    price_per_minute = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class UsageSession(Base):
    __tablename__ = "usage_sessions"

    id = Column(Integer, primary_key=True, index=True)
    resource_id = Column(Integer, nullable=False, index=True)
    user_id = Column(String, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True, index=True)
    duration_minutes = Column(Float, nullable=True)
    cost = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class BillingRecord(Base):
    __tablename__ = "billing_records"

    id = Column(Integer, primary_key=True, index=True)
    usage_session_id = Column(Integer, nullable=False, index=True)
    resource_id = Column(Integer, nullable=False, index=True)
    user_id = Column(String, nullable=False)
    duration_minutes = Column(Float, nullable=False)
    price_per_minute = Column(Float, nullable=False)
    total_cost = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
