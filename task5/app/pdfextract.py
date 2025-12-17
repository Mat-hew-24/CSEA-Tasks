from pypdf import PdfReader as reader

def extract_text_from_pdf(file_path: str) -> str:
    reader = reader(file_path)
    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    return text.strip() #remove trailing or leading spaces
