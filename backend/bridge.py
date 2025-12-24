import sys
import json
import pandas as pd
import os
from pathlib import Path

# Add project root to sys.path to allow imports from prediction_model
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.append(str(PROJECT_ROOT))

# Also add the directory containing prediction_model if it's not the root
# Based on earlier list_dir, prediction_model is in /Users/mac/Desktop/Loan_Prediction_streamlit/

try:
    from prediction_model.config import config
    from prediction_model.processing.data_handling import load_pipeline
except ImportError as e:
    print(json.dumps({"error": f"Failed to import prediction model: {str(e)}", "sys_path": sys.path}))
    sys.exit(1)

# Initialize pipeline
try:
    classification_pipeline = load_pipeline(config.MODEL_NAME)
except Exception as e:
    print(json.dumps({"error": f"Failed to load pipeline: {str(e)}"}))
    sys.exit(1)

def predict(input_data):
    # Mapping input data to match expected feature names (already matched in streamlit app)
    # ['no_of_dependents', 'education', 'self_employed', 'income_annum',
    #  'loan_amount', 'loan_term', 'cibil_score', 'residential_assets_value',
    #  'commercial_assets_value', 'luxury_assets_value', 'bank_asset_value']
    
    df = pd.DataFrame([input_data])
    
    # Ensure columns are in correct order if the pipeline doesn't handle it
    # config.PRED_FEATURES exists and defines the order
    df = df[config.PRED_FEATURES]
    
    prediction = classification_pipeline.predict(df)
    # The model seems to return 1 for Approved and 0 for Rejected, based on predict.py
    result = "Approved" if prediction[0] == 1 else "Rejected"
    return result

if __name__ == "__main__":
    try:
        # Read from stdin (Node will pipe the JSON here)
        input_raw = sys.stdin.read()
        if not input_raw:
            print(json.dumps({"error": "No input data provided"}))
            sys.exit(1)
        
        input_json = json.loads(input_raw)
        result = predict(input_json)
        print(json.dumps({"prediction": result}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
