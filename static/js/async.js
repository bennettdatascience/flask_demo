window.onload = function() {

    $('#message').html(`
		<div>
    		<h2 class="center">Click on the button to make a plot!</h2>
		</div>`).show();
}

// SLIDER --------------
var slider = document.getElementById("myRange");
var output = document.getElementById("val");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  // Call some function here...
  makePlot($('#seedInput').val(), this.value)
}
// END Slider --------------

$(document).on('submit', '#form', (event) => {
    event.preventDefault()
    const seedValue = $('#seedInput').val()
    makePlot(seedValue, $('#myRange').val())
})

async function makePlot(seedValue, arrayLen) {
    const response = await fetch('/process', {
        method: 'POST',
        body: JSON.stringify({
            seed_value: seedValue,
            array_len: arrayLen
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        render(true, [])
        return
    }

    const data = await response.json()
    render(null, data)
}


function render(err, data) {

    if (err) {
        // Do something smart here :)
        return
    }

    // Make the plot!
    var chart = c3.generate({
    data: {
        json: {
            Data: data.random_int,
            }
        }
    });
}
