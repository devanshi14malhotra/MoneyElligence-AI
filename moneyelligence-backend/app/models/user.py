from pydantic import BaseModel
from typing import Optional, List, Dict

class UserProfile(BaseModel):
    age: int
    annual_income: float
    monthly_expenses: float
    current_savings: float
    existing_investments: Dict[str, float]  # {asset: amount}
    monthly_debt_obligation: float
    insurance_coverage: Dict[str, float]  # {type: coverage_amount}
    risk_profile: str  # "conservative", "moderate", "aggressive"
    goals: List[str]  # ["house", "retirement", "education"]

class MoneyHealthScore(BaseModel):
    user_id: str
    overall_score: int  # 0-100
    emergency_preparedness: int
    insurance_coverage: int
    investment_diversification: int
    debt_health: int
    tax_efficiency: int
    retirement_readiness: int
    explanations: Dict[str, str]  # Dimension -> explanation text
    recommendations: List[dict]  # Ranked recommendations
