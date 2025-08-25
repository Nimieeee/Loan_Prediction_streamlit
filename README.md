💳 Loan Default Prediction Web App
An interactive Streamlit application that predicts the likelihood of loan default based on borrower details such as income, loan amount, credit history, and more.
🔗 Live App: https://vortex-loanprediction.streamlit.app/

🚀 Features
	•	User-friendly Streamlit interface for real-time predictions.
	•	End-to-end machine learning pipeline:
	◦	Data preprocessing & feature engineering
	◦	Model training & evaluation
	◦	Interactive deployment as a web app
	•	Designed for non-technical users: outputs are simplified into actionable insights.
	•	Modular pipeline design for reproducibility and future improvements.

📊 Workflow
	1	Input borrower details into the Streamlit form.
	2	Model processes data (preprocessing + feature engineering).
	3	Prediction result returned: Likely Default or Low Risk.
	4	Users can test multiple scenarios in real-time.

🛠️ Tech Stack
	•	Python
	•	Scikit-learn for model development
	•	Streamlit for web app deployment
	•	Pandas / NumPy for data preprocessing

📷 Screenshots
(Optional — you can add screenshots of your app running in Streamlit for more visual appeal)

📦 Installation & Usage
Clone this repository and run locally:

```
git clone https://github.com/Nimieeee/Loan_Prediction_streamlit.git
cd loan-prediction-app
pip install -r requirements.txt
streamlit run app.py
```

🎯 Future Improvements
	•	Add model explainability (e.g., SHAP values).
	•	Experiment with ensemble methods for improved accuracy.
	•	Deploy with Docker or Hugging Face Spaces for broader access.












# Setup Virtual Environment

```python
conda create -n streamlit-env python=3.10
conda activate streamlit-env
pip install -r requirements.txt
```
