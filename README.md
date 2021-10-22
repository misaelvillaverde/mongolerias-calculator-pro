# Calculator

To run the flask server, just execute `python app.py`

## API

To call the api via JS:

```JS
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body:JSON.stringify( {
    "expression":"\\int+tcos\\left(nt\\right)dt+"
}),
  redirect: 'follow'
};

fetch("/symbo", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
