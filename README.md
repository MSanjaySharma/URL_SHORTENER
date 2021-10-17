# URL SHORTENER

Url Shortener is an API built on Express to serve the purpose shortening URL's and storing them for further personal use.

### Usage

Pre-req:
MongoDB atlas URI or local installation of MONGODB. Change URI accordingly in env file

- Start the app
```
docker-compose up
```
- Stop the app
```
docker-compose down
```
- remove images, volumes and app
```
docker-compse rm -fsv
```

- App exposes port `7013`

### Endpoints:
####  POST:&nbsp;&nbsp;&nbsp;&nbsp;   /url-shortner
- JSON sample body
```
{
    "title":"test"
    "url":"https://google.com"
}
```

####  GET:&nbsp;&nbsp;&nbsp;&nbsp;   /:hash
- redirected to new URL 