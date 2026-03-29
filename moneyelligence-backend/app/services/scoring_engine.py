from app.models.user import UserProfile

class ScoringEngine:
    def calculate_emergency_score(self, profile: UserProfile) -> int:
        """Emergency fund should cover 3-6 months expenses."""
        months_covered = profile.current_savings / profile.monthly_expenses if profile.monthly_expenses > 0 else 6
        if months_covered >= 6: return 100
        elif months_covered >= 3: return 70
        elif months_covered >= 1: return 40
        else: return 10

    def calculate_insurance_score(self, profile: UserProfile) -> int:
        """Life >= 10x income, Health >= 5L."""
        score = 0
        life_cover = profile.insurance_coverage.get('life', 0)
        if life_cover >= profile.annual_income * 10: score += 40
        elif life_cover >= profile.annual_income * 5: score += 20
        
        health_cover = profile.insurance_coverage.get('health', 0)
        if health_cover >= 500000: score += 40
        elif health_cover >= 200000: score += 20
        
        critical_cover = profile.insurance_coverage.get('critical', 0)
        if critical_cover > 0: score += 20
        
        return min(max(score, 10), 100)

    def calculate_diversification_score(self, profile: UserProfile) -> int:
        """Basic check if investments exist across asset classes."""
        num_assets = len([k for k, v in profile.existing_investments.items() if v > 0])
        if num_assets >= 3: return 90
        if num_assets == 2: return 60
        if num_assets == 1: return 30
        return 10

    def calculate_debt_health_score(self, profile: UserProfile) -> int:
        """Debt-to-income ratio check."""
        monthly_income = profile.annual_income / 12 if profile.annual_income > 0 else 1
        dti = profile.monthly_debt_obligation / monthly_income
        if dti == 0: return 100
        elif dti <= 0.3: return 80
        elif dti <= 0.5: return 50
        else: return 20

    def calculate_tax_efficiency_score(self, profile: UserProfile) -> int:
        """Check for tax-saving instruments (ELSS, NPS, PPF)."""
        score = 10
        if 'elss' in profile.existing_investments or 'mf' in profile.existing_investments: score += 30
        if 'nps' in profile.existing_investments: score += 35
        if 'ppf' in profile.existing_investments: score += 25
        return min(score, 100)

    def calculate_retirement_score(self, profile: UserProfile) -> int:
        """Check if savings/investments exist relative to age."""
        if profile.age < 25: return 80 # young, time on side
        total_assets = profile.current_savings + sum(profile.existing_investments.values())
        years_working = max(1, profile.age - 22)
        expected_wealth = (profile.annual_income * 0.1) * years_working
        if expected_wealth == 0: return 50
        ratio = total_assets / expected_wealth
        if ratio >= 1.5: return 100
        elif ratio >= 1.0: return 80
        elif ratio >= 0.5: return 50
        return 30

    def calculate_overall_score(self, profile: UserProfile) -> dict:
        scores = {
            'emergency_preparedness': self.calculate_emergency_score(profile),
            'insurance_coverage': self.calculate_insurance_score(profile),
            'investment_diversification': self.calculate_diversification_score(profile),
            'debt_health': self.calculate_debt_health_score(profile),
            'tax_efficiency': self.calculate_tax_efficiency_score(profile),
            'retirement_readiness': self.calculate_retirement_score(profile)
        }
        weights = {
            'emergency_preparedness': 0.20,
            'insurance_coverage': 0.20,
            'investment_diversification': 0.15,
            'debt_health': 0.15,
            'tax_efficiency': 0.15,
            'retirement_readiness': 0.15
        }
        overall = sum(scores[dim] * weights[dim] for dim in scores.keys())
        return {
            'overall_score': int(overall),
            'dimensions': scores
        }
