# Pins the decode toolchain so the pipeline behaves identically on a laptop,
# in CI, and inside an agent sandbox. This same file is what `e2b template build`
# consumes if you later move execution into E2B microVMs.
FROM python:3.11-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /work
COPY pipeline/requirements.txt /work/pipeline/requirements.txt
RUN pip install --no-cache-dir -r pipeline/requirements.txt

# Bake the ASR weights into the image so runs work with no network at all.
RUN python -c "from faster_whisper import WhisperModel; WhisperModel('base', device='cpu', compute_type='int8')"

COPY pipeline/ /work/pipeline/
ENTRYPOINT ["python", "pipeline/vid2skill.py"]
