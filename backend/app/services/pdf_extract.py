import io
import logging

import pdfplumber

logger = logging.getLogger(__name__)


def extract_text_from_pdf(file_bytes: bytes, source_name: str = "document") -> str:
    """Extract plain text from a PDF using pdfplumber (Render-compatible)."""
    parts: list[str] = []
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for index, page in enumerate(pdf.pages, start=1):
            text = page.extract_text()
            if text:
                parts.append(text.strip())
            else:
                logger.info("No text on page %s of %s", index, source_name)

    result = "\n\n".join(parts).strip()
    logger.info(
        "pdfplumber extracted %s chars from %s (%s pages)",
        len(result),
        source_name,
        len(parts),
    )
    return result
