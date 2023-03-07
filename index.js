const route = 'https://dream-sheet.onrender.com/';
let accountID = null;

// Code to draw a single place card
function drawPlaceCard (id, appendTo, otherNote) {
    $.get(route + 'api/place/' + id, (data) => {
        console.log('place info: ', data);
        let $card = $('<div>').addClass('card')

        let $location = $('<div>').addClass('location');
        let $country = $('<div>').addClass('country').text(data.country);
        let $state = $('<div>').addClass('state').text(data.state);
        let $city = $('<div>').addClass('city').text(data.city);
        let $locationNotes = $('<div>').addClass('locationsNotes').text(data.location_notes);
        let $latLong = $('<div>').addClass('latLong').text(data.lat_long);

        let $thumbnail = $(`<img src="${data.thumbnail}" alt="${data.name} thumbnail" />`).addClass('thumbnail');
        let $name = $('<div>').addClass('name').text(data.name);
        let $climate = $('<div>').addClass('climate').text(data.ctype);
        let $population = $('<div>').addClass('population').text(data.ptype);
        let $type = $('<div>').addClass('type').text(data.ttype);
        let $link = $('<div>').addClass('link').text(data.link);
        let $cost = $('<div>').addClass('cost').text(data.cost);
        let $details = $('<div>').addClass('details').text(data.details);
        
        $location.append($country);
        $location.append($city);
        $location.append($state);
        $location.append($locationNotes);
        //$location.append($latLong);
        
        $card.append($thumbnail);
        $card.append($name);
        $card.append($location);
        $card.append($climate);
        $card.append($population);
        $card.append($type);
        $card.append($link);
        $card.append($cost);
        $card.append($details);

        // if otherNote is provided, is a dream. Otherwise, is just a place
        if (otherNote) {
            let $otherNote = $('<div>').addClass('otherNotes').text(otherNote);
            $card.append($otherNote);
        }
        else {
            $addDream = $('<button type="button">').addClass('addDream').text('Add Dream');
            $card.append($addDream);
        }

        $(appendTo).append($card);
    });
}


// Code to start looking for dreams for logged in user
$.get( route + 'api/accounts', (data) => { 
    $accountList = $(`<select name="account" id="account">`);
    $accountList.change(function () {
        accountID = $('#account').val();
        $.get(route + 'api/account/'+ $('#account').val() +'/dreams', (data) => {
            $('#my-dreams').empty();
            console.log('Pulling dreams for account', accountID);
            for (let i = 0; i < data.length; i++) {
                drawPlaceCard(data[i].place_id, '#my-dreams', data[i].dream_notes);
            }
        });
    });
    let $option = $(`<option value="0"></option>`).text('Select');
        $accountList.append($option);
    for (let i = 0; i < data.length; i++) {
        let $option = $(`<option value="${data[i].id}"></option>`).text(data[i].email);
        $accountList.append($option);
    }
    $('#accountID').append($accountList);
});

// code to find all places and draw them
$.get( route + 'api/places', (data) => { 
    for (let i = 0; i < data.length; i++) {
        drawPlaceCard(data[i].id, '#all-places');
    }

});

$('.create-place').click(function () {
    //asdf
});