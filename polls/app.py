from tornado import (
    ioloop, web, ioloop
)
from base_message_connection import BaseMessageConsumer

# BaseMessageConsumer().attempt_connection()

class MainHandler(web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    ioloop.IOLoop.current().start()