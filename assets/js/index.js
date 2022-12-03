$("#add_user").submit(function (event) {
    alert("data inserted successfully")



})

function onlyNumberKey(evt) {

    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    if (document.getElementById("phone_input").value.toString().length >= 10)
        return false;
    return true;
}

$("#update_user").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();


    var data = {}
    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })


    console.log("Array: ", unindexed_array);
    console.log("Data: ", data);
    if (data.mobile_no == "") {
        window.alert("Error: Cell number must not be null.");
        number.focus();
        return false;

    }
    if (data.mobile_no.length != 10) {
        window.alert("Phone number must be 10 digits.");
        number.focus();
        return false;
    }

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("data updated successfully");
    })
})

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if (confirm("do you really delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("data deleted successfully");
                location.reload()
            })
        }
    })
}