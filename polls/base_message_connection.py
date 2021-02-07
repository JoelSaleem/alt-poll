from time import sleep
import pika
import logging

logging.getLogger('pika').setLevel(logging.DEBUG)
logging.getLogger('pika').propagate = True


SLEEP_INTERVAL = 10


class BaseMessageConsumer:
    def __init__(self):
        print('init')
        self.attempts = 0

    def on_open(self, connection):
        print('connection', connection)

    def attempt_connection(self):
        print('attempt_conn')
        while self.attempts < 10:
            print(f'Sleeping: {SLEEP_INTERVAL * self.attempts}')
            sleep(SLEEP_INTERVAL * self.attempts)

            credentials = pika.PlainCredentials('admin', 'foobar')
            connection = pika.SelectConnection(
                pika.ConnectionParameters(
                    "alt-poll-rabbitmq.default.svc.cluster.local",
                    credentials=credentials
                ),
                on_open_callback=self.on_open,
            )
            print(connection)
            try:
                connection.ioloop.start()
                break
            except Exception as e:
                # connection.close()
                print(e)
            self.attempts += 1
        else:
            print('Connection established')
