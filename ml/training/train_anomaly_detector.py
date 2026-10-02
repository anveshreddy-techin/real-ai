"""
SkillGuard AI — Supervised / Semi-Supervised Anomaly & Fraud Detection Model Training
SIH26245: Calibrated to identify Ghost Attendance, Empty Rooms, and Stripped Workshops
"""
import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

def train_fraud_model():
    np.random.seed(42)
    # Features:
    # 0: discrepancy_ratio (detected / submitted) -> normal 0.90 to 1.05
    # 1: temporal_consistency -> normal 0.85 to 1.00
    # 2: infrastructure_gap_ratio -> normal 0.00 to 0.10
    # 3: occupancy_variance -> normal 0.05 to 0.20

    # Class 0: Compliant Normal (800 samples)
    n_normal = 800
    f0_norm = np.random.normal(loc=0.98, scale=0.04, size=n_normal)
    f1_norm = np.random.normal(loc=0.92, scale=0.04, size=n_normal)
    f2_norm = np.random.uniform(low=0.0, high=0.08, size=n_normal)
    f3_norm = np.random.normal(loc=0.10, scale=0.03, size=n_normal)
    X_normal = np.column_stack([f0_norm, f1_norm, f2_norm, f3_norm])
    y_normal = np.zeros(n_normal)

    # Class 1: Ghost Attendance & Fraudulent Centres (400 samples)
    n_fraud = 400
    f0_fraud = np.random.uniform(low=0.20, high=0.70, size=n_fraud)
    f1_fraud = np.random.uniform(low=0.20, high=0.60, size=n_fraud)
    f2_fraud = np.random.uniform(low=0.30, high=0.90, size=n_fraud)
    f3_fraud = np.random.uniform(low=0.30, high=0.70, size=n_fraud)
    X_fraud = np.column_stack([f0_fraud, f1_fraud, f2_fraud, f3_fraud])
    y_fraud = np.ones(n_fraud)

    X_train = np.vstack([X_normal, X_fraud])
    y_train = np.concatenate([y_normal, y_fraud])

    # Train Random Forest Classifier
    clf = RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42)
    clf.fit(X_train, y_train)

    os.makedirs("/home/anvesh/Documents/sih26245/ml/artifacts", exist_ok=True)
    model_path = "/home/anvesh/Documents/sih26245/ml/artifacts/anomaly_detector.joblib"
    joblib.dump(clf, model_path)
    print(f"Calibrated Classifier saved to {model_path}")

    # Test Canonical Gorakhpur (Ghost Attendance: 18 / 32)
    test_sample = np.array([[18 / 32, 0.54, 0.43, 0.40]])
    prob_fraud = clf.predict_proba(test_sample)[0][1]
    print(f"Gorakhpur Fraud Probability: {prob_fraud * 100:.1f}%")

if __name__ == "__main__":
    train_fraud_model()
