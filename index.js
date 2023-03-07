const route = 'https://dream-sheet.onrender.com/';


function drawPlaceCard (id, appendTo) {
    $.get(route + 'api/place/' + id, (data) => {
        let $card = $('<div>').addClass('card')

        let $thumbnail = $(`<img src="${data.thumbnail} />"`).addClass('thumbnail');
        let $name = $('<div>').addClass('name').text(data.name);
        let $location = $('<div>').addClass('location').text(data.location_id);
        let $latLong = $('<div>').addClass('latLong').text(data.lat_long);
        let $climate = $('<div>').addClass('climate').text(data.climate_id);
        let $population = $('<div>').addClass('population').text(data.population_id);
        let $type = $('<div>').addClass('type').text(data.type_id);
        let $link = $('<div>').addClass('link').text(data.link);
        let $cost = $('<div>').addClass('cost').text(data.cost);
        let $details = $('<div>').addClass('details').text(data.details);

        $card.append($thumbnail);
        $card.append($name);
        $card.append($location);
        $card.append($latLong);
        $card.append($climate);
        $card.append($population);
        $card.append($type);
        $card.append($link);
        $card.append($cost);
        $card.append($details);

        console.log('card: ', $card);
        $(appendTo).append($card);
    });
}






$.get( route + 'api/accounts', (data) => { 
    $accountList = $(`<select name="account" id="account">`);
    $accountList.change(function () {
        $.get(route + 'api/account/'+ $('#account').val() +'/dreams', (data) => {
            $('#my-dreams').empty;
            console.log('Pulling dreams for account', $('#account').val());
            for (let i = 0; i < data.length; i++) {
                drawPlaceCard(data[i].place_id, '#my-dreams');
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

