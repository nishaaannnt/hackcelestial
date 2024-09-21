from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tempfile
from pdf2image import convert_from_path, convert_from_bytes
from pathlib import Path
import pytesseract
import spacy
from spacy.matcher import PhraseMatcher
import os

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
config = r"--psm 6 --oem 3"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nlp = spacy.load("en_core_web_sm")
file = os.path.join(
    "D:/Sahil/hackcelestial/backend/server/fastapi/LINKEDIN_SKILLS_ORIGINAL.txt"
)
file = open(file, "r", encoding="utf-8")
skill = [line.strip().lower() for line in file]
skillsmatcher = PhraseMatcher(nlp.vocab)
patterns = [nlp.make_doc(text) for text in skill if len(nlp.make_doc(text)) < 10]
skillsmatcher.add("Job title", None, *patterns)

nlp = spacy.load("en_core_web_sm")


def extract_skills(text):
    skills = []
    __nlp = nlp(text.lower())
    matches = skillsmatcher(__nlp)
    for match_id, start, end in matches:
        span = __nlp[start:end]
        skills.append(span.text)
    skills = list(set(skills))
    return skills


@app.get("/")
async def root():
    return {"message": "running"}


@app.post("/parse_resume")
async def process_pdf(file: UploadFile = File()):
    try:
        path_to_poppler_exe = Path(r"C:\Program Files\poppler-24.02.0\Library\bin")
        pdf_bytes = file.file.read()
        images = convert_from_bytes(pdf_bytes, poppler_path=path_to_poppler_exe)
        output_text = ""
        for image in images:
            text = pytesseract.image_to_string(image, config=config)
            output_text += text
        skills = extract_skills(output_text)
        return {"skills": skills}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8800)
