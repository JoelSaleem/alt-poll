FROM tiangolo/uwsgi-nginx:python3.7
RUN apt-get update && apt-get install -y python3-pip 
COPY . /app
WORKDIR /app
RUN pip3 install pipenv
RUN pipenv install --system --deploy
ENV FLASK_APP /app/app.py

EXPOSE 5000
ENTRYPOINT [ "python" ]
CMD ["app.py"]