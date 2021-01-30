from flask import Flask, request
import requests

PORT = 3001
HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE']

app = Flask(__name__)


def requestAPI(method, port, subpath, payload):
    if method in HTTP_METHODS and method != 'GET':
        r = getattr(requests, method.lower())(
            "http://localhost:" + str(port) + "/" + str(subpath), data=payload)
        return r.text
    elif method == 'GET':
        r = requests.get(
            "http://localhost:" + str(port) + "/" + str(subpath), params=payload)
        return r.text
    else:
        return f'Unauthorized methods: {method}'


@app.route("/")
def main():
    return "Main page"


@app.route("/<int:port>/<path:subpath>", methods=HTTP_METHODS)
def server_route(port, subpath):
    method = request.method
    if method == 'GET':
        return requestAPI(method, port, subpath, request.args)
    elif method in HTTP_METHODS and method != 'GET':
        body = request.data
        if body == b'':
            body = request.form
        return requestAPI(method, port, subpath, body)
    return "Done"


app.run(port=PORT)
