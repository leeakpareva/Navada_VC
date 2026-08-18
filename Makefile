VIDEO ?=
SLUG  ?=

.PHONY: setup run docker-build docker-run clean

setup:            ## install ffmpeg + python deps locally
	apt-get install -y --no-install-recommends ffmpeg
	pip install -r pipeline/requirements.txt

run:              ## make run VIDEO=inbox/demo.mp4 SLUG=demo
	@test -n "$(VIDEO)" || { echo "usage: make run VIDEO=inbox/clip.mp4 [SLUG=name]"; exit 1; }
	python3 pipeline/vid2skill.py run "$(VIDEO)" $(if $(SLUG),--slug $(SLUG),)

docker-build:
	docker build -f docker/Dockerfile -t vid2skill .

docker-run:       ## make docker-run VIDEO=inbox/demo.mp4 SLUG=demo
	docker run --rm -v "$(PWD):/work" vid2skill run "$(VIDEO)" $(if $(SLUG),--slug $(SLUG),)

clean:
	rm -rf inbox/*.mp4 inbox/*.mov
