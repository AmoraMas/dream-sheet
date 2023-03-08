const route = 'https://dream-sheet.onrender.com/';
let accountID = null;
let accountLocation = null;
let isAdmin = false;
let accountEmail = null;
let accountName = null;

// Code to draw a single place card
function drawPlaceCard (placeid, appendTo, otherNote, dreamid) {
    $.get(route + 'api/place/' + placeid, (data) => {
        let $card = $('<div>').addClass('card')

        let $location = $('<div>').addClass('location');
        let $country = $('<div>').addClass('country').text(data.country);
        let $state = $('<div>').addClass('state').text(data.state);
        let $city = $('<div>').addClass('city').text(data.city);
        let $locationNotes = $('<div>').addClass('locationsNotes').text(data.location_notes);
        let $latLong = $('<div>').addClass('latLong').text(data.lat_long);

        let thumbnailSRC = data.thumbnail == ' ' ? '/images/nothumbnail.png': data.thumbnail

        let $thumbnail = $(`<img src="${thumbnailSRC}" alt="${data.name} thumbnail" />`).addClass('thumbnail');
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
            $card.append($('<hr>'));
            $card.append($otherNote);
            let $deleteDream = $('<button type="button">').addClass('deleteDream').text('Delete Dream');
            $deleteDream.click( (data) => {
                $.ajax({
                    type: "DELETE",
                    url: `${route}api/dream/${dreamid}}`,
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        updateDreamList();
                    }
                });
            });
            $card.append($deleteDream);
        }
        else {
            let $addDream = $('<button type="button">').addClass('addDream').text('Add Dream').hide(0);
            $addDream.click( (data) => {
                let notes = prompt("Please provide some notes for this dream");
                let submitData = { account_id: accountID, place_id: placeid, dream_notes: notes };
                submitData = JSON.stringify(submitData);
                $.ajax({
                    type: "POST",
                    url: `${route}api/dream`,
                    data: submitData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        updateDreamList();
                    }
                });
            })
            $card.append($addDream);
                let $deletePlace = $('<button type="button">').addClass('deletePlace').text('Delete Place').hide(0);
                $deletePlace.click( (datra) => {
                $.ajax({
                    type: "DELETE",
                    url: `${route}api/place/${placeid}`,
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        updatePlaceList();
                    }
                });
            });
            $card.append($deletePlace);
        }
        $(appendTo).append($card);
    });
}

// Code to update the #dreams section of index.html
function updateDreamList () {
    $('#dreams').empty();
    accountID = $('#account').val();
    $.get(route + 'api/account/'+ accountID +'/dreams', (data) => {
        $('#dreams').empty();
        console.log('Pulling dreams for account', accountID);
        for (let i = 0; i < data.length; i++) {
            drawPlaceCard(data[i].place_id, '#dreams', data[i].dream_notes, data[i].id);
        }
        $.get(route + 'api/account/' + accountID, (data) => {
            AccountLocation = data.location_id;
            isAdmin = data.is_admin;
            accountEmail = data.email;
            accountName = data.name;
            if (isAdmin) {
                $('.deletePlace').show(500);
            }
            else {
                $('.deletePlace').hide(500);
            }
            $('.addDream').show(500);
        })
    });
}

// code to find all places and draw them
function updatePlaceList() {
    $('#places').empty();
    $.get( route + 'api/places', (data) => { 
        for (let i = 0; i < data.length; i++) {
            drawPlaceCard(data[i].id, '#places');
        }
    });
}

// Code to populate Account ID list
$.get( route + 'api/accounts', (data) => { 
    $accountList = $(`<select name="account" id="account">`);
    // ON CHANGE populate user dreams section
    $accountList.change(function () {
        updateDreamList();
    });
    let $option = $(`<option value="0"></option>`).text('Select');
        $accountList.append($option);
    for (let i = 0; i < data.length; i++) {
        let $option = $(`<option value="${data[i].id}"></option>`).text(data[i].email);
        $accountList.append($option);
    }
    $('#accountID').append($accountList);
});

$('.create-place').click(function () {
    let $createPlaceForm = $('<div>').addClass('create-place-form')
    questions = ['name', 'location_id', 'lat_long', 'thumbnail', 'link', 'climate_id', 'population_id', 'type_id', 'cost', 'details'];
    for (let i = 0; i < questions.length; i++) {
        let $question = $(`<div>`).addClass('question');
        // if quesitons[i] ends in _id, it needs a drop down menu
        if (questions[i].endsWith('_id')) {
            let questionName = questions[i].replace('_id', '');
            $label = $(`<label for "${questionName}">`).text(questionName + ':');
            $select = $(`<select name="${questionName}" id="${questionName}">`);
            $option = $('<option value="">').text('Select');

            // Populate drop down menus
            $.get( route + 'api/' + questionName + 's', (data) => {
                for (let i = 0; i < data.length; i++) {
                    // locations table has different data structure than the rest of these tables
                    if (questionName == 'location') {
                        $option = $(`<option value="${data[i].id}">`).text(`${data[i].country}, ${data[i].state}, ${data[i].city}`);
                    }
                    else {
                        $option = $(`<option value="${data[i].id}">`).text(data[i][questionName[0] + 'type']);
                    }
                    $('#' + questionName).append($option);
                }
            });
            
            $question.append($label);
            $question.append($select);
            $select.append($option);
        }
        // questions[i] does not need a drop down menu
        else {
            $label = $(`<label for "${questions[i]}">`).text(questions[i] + ':');
            $input = $(`<input type="text" id="${questions[i]}" name="${questions[i]}">`);
            $question.append($label);
            $question.append($input);
        }
        $createPlaceForm.append($question);
    }
    let $buttonPost = $('<button type"submit" class="postNewPlace">').text('Create New');
    $buttonPost.click(function () {
        let placeData = {
            "name": $('#name').val(),
            "location_id": Number($('#location').val()),
            "lat_long": $('#lat_long').val(),
            "climate_id": Number($('#climate').val()),
            "population_id": Number($('#population').val()),
            "type_id": Number($('#type').val()),
            "thumbnail": $('#thumbnail').val(),
            "link": $('#link').val(),
            "cost": $('#cost').val(),
            "details": $('#details').val(),
        }
        console.log("Submiting Data:", placeData);
        placeData = JSON.stringify(placeData);
        $.ajax({
            type: "POST",
            url: `${route}api/place`,
            data: placeData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log(result);
            }
        });

    });

    $($createPlaceForm).append($buttonPost);
    $('#create-place').append($createPlaceForm);
});

updatePlaceList();