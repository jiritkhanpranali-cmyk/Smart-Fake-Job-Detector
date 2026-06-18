import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("fake_job_postings.csv")

# Use multiple useful text columns if available
text_cols = ["title", "company_profile", "description", "requirements", "benefits"]
for col in text_cols:
    if col not in df.columns:
        df[col] = ""

df["text"] = df[text_cols].fillna("").agg(" ".join, axis=1)

# Target
y = df["fraudulent"]
X = df["text"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Strong text pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer(
        stop_words="english",
        max_features=20000,
        ngram_range=(1,2),
        min_df=2
    )),
    ("clf", LogisticRegression(
        max_iter=3000,
        class_weight="balanced",
        random_state=42
    ))
])

# Train
model.fit(X_train, y_train)

# Evaluate
pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, pred))
print(classification_report(y_test, pred))

# Save ONE pipeline file
pickle.dump(model, open("model.pkl", "wb"))

print("Model trained successfully!")