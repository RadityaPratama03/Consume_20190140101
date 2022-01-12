//* GET Data --------
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/jajanan/");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHtml = '';
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHtml += '<tr>';
                //trHtml += '<td>' + object['id'] + '</td>';
                trHtml += '<td>' + object['nama'] + '</td>';
                trHtml += '<td>' + object['harga'] + '</td>';
                trHtml += '<td>' + object['stock'] + '</td>';
                trHtml += '<td><button type="button" class="btn btn-outline-secondary" onclick = "showUserEditBox(' + object['id'] + ')">Edit</button></td>';
                trHtml += '<td><button type="button" class="btn btn-outline-danger" onclick="userDelete(' + object['id'] + ')"> Del</button></td>';
                trHtml += '</tr>';
            }
            document.getElementById("mytable").innerHTML = trHtml;
        }
    };
}
loadTable();


//  POST Data --------
 function showUserCreateBox() {
     Swal.fire({
         title: 'Add Jajan',
         html:
            '<input id="id" type="hidden">'+
             '<input id="nama" class="swal2-input" placeholder="Nama Jajan">' +
             '<input id="harga" class="swal2-input" placeholder="Harga">' +
             '<input id="stock" class="swal2-input" placeholder="Stock">' ,
         focusConfirm: false,
         preConfirm: () => { userCreate(); }
     })
 }

 function userCreate() {
     
     const nama = document.getElementById("nama").value;
     const harga = document.getElementById("harga").value;
     const stock = document.getElementById("stock").value;

     const xhttp = new XMLHttpRequest();
     xhttp.open("POST", "http://localhost:8080/jajanan");
     xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
     xhttp.send(JSON.stringify({
         
         "nama": nama,
         "harga": harga,
         "stock": stock
     }));
     xhttp.onreadystatechange = function() {
         if (this.status == 200) {
             const objects = JSON.parse(this.responseText);
             Swal.fire(objects['message']);
             loadTable();
         }
     }
 }

// PUT Data --------
 function showUserEditBox(id) {
     console.log(id);
     const xhttp = new XMLHttpRequest();
     xhttp.open("GET", "http://localhost:8080/jajanan/" + id);
     xhttp.send();
     xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             const objects = JSON.parse(this.responseText);
             const user = objects["user"];
             console.log(user);
             Swal.fire({
                 title: 'Edit Jajan',
                 html: '<input id="id" type="hidden" value="' + objects['id'] + '">' +
                     '<input id="nama" class="swal2-input" placeholder="Nama Jajan" value="' + objects['nama'] + '">' +
                     '<input id="harga" class="swal2-input" placeholder="Harga Jajan" value="' + objects['harga'] + '">' +
                     '<input id="stock" class="swal2-input" placeholder="Stock" value="' + objects['stock'] + '">' ,
                 focusConfirm: false,
                 preConfirm: () => { userEdit(); }
             })
         }
     };
 }

 function userEdit() {
     const id = document.getElementById("id").value;
     const nama = document.getElementById("nama").value;
     const harga = document.getElementById("harga").value;
     const stock = document.getElementById("stock").value;

     const xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "http://localhost:8080/jajanan/updatebarang");
     xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
     xhttp.send(JSON.stringify({
         "id": id,
         "nama": nama,
         "harga": harga,
         "stock": stock
     }));
     xhttp.onreadystatechange = function() {
         if (this.status == 200) {
             const objects = JSON.parse(this.responseText);
             Swal.fire(objects['message']);
             loadTable();
         }
     }
 }


 function userDelete(id) {
     // const id = document.getElementById("id").value;
     const xhttp = new XMLHttpRequest();
     xhttp.open("DELETE", "http://localhost:8080/jajanan/" + id);
     xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
     xhttp.send(JSON.stringify({ "id": id }));
     xhttp.onreadystatechange = function() {
         if (this.status == 200) {
             const objects = JSON.parse(this.responseText);
             Swal.fire(objects["message"]);
             loadTable();
         }
     }
 }
 
 $(document).ready(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#mytable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
$(document).ready(function() {
    $("mytable").loadTable();
} );
