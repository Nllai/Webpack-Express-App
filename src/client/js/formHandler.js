function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (Client.isString(formText) == "true") {
        console.log(JSON.stringify({formText}))
        console.log("::: Form Submitted :::")
        fetch('http://localhost:8081/api',
        {
            method: 'POST',
            body: JSON.stringify({formText}),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('polarity').innerHTML = constructName('Polarity', res.polarity)
            document.getElementById('subjectivity').innerHTML = constructName('Subjectivity', res.subjectivity)
            document.getElementById('polarity_confidence').innerHTML = constructName('Polarity Confidence', res.polarity_confidence)
            document.getElementById('subjectivity_confidence').innerHTML = constructName('Subjectivity Confidence', res.subjectivity_confidence)
        }).catch(err => console.log(err))
    } else {
        document.getElementById('polarity').innerHTML = constructName('Error', 'Input not string')
    }
}


function constructName(name, response) {
    return name + ': ' + response
}


export { handleSubmit }
export { constructName }
