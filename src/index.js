<!DOCTYPE html>
<html>
<head>
<title></title>
<script src="firebase.js"></script>
<script src="jquery-3.2.1.slim.min.js"></script>
<script src="bootstrap.min.js"></script>
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="fonts/font-awesome.min.css" >
 
</head>
<body onload="tampilData()">
<div style="padding:100px;">
<br>
<div class="row no-gutters">
<div class="col align-self-center"><h3 class="text-left"><i class="fa fa-home" onclick="tampilData()" style="cursor: pointer;"></i> Tabel Alat-Alat</h3></div>
<div class="col align-self-center" style="padding:12px;"><input id="text_cari" type="text" placeholder="Cari berdasarkan nama alat" class="form-control" style="padding:6px;" /></div>
<div class="col-auto align-self-center" style="padding:6px;"><button class="btn btn-primary" type="button" onclick="CariData()">Cari Data</button></div>
<div class="col-auto align-self-center" style="padding:6px;"><button class="btn btn-success" type="button" id="tambah_data" style="margin-left:10px;" data-toggle="modal" data-target="#ModalAdd" onclick="ambilDataTerakhir()">Tambah Data</button></div>
</div>
 
 
 
<table id="tabel-status-alat" class="table table-striped table-bordered table-hover">
<thead class="thead-dark">
<tr>
<th scope="col">ID</th>
<th scope="col">Nama Alat</th>
<th scope="col">Status Alat</th>
<th scope="col">Tanggal Alat</th>
<th scope="col">Jam Alat</th>
<th scope="col">Aksi</th>
</tr>
</thead>
<tbody>
 
</tbody>
</table>
 
</div>
 
<script>
 
// Initialize Firebase
var config = {
apiKey: ".....",
authDomain: ".....",
databaseURL: ".....",
projectId: ".....",
storageBucket: ".....",
messagingSenderId: "....."
};
firebase.initializeApp(config);
 
// Menampilkan data dalam bentuk tabel
function tampilData()
{
 

var dbRef = firebase.database();
var statusAlat = dbRef.ref("status-alat");
 

var table = document.getElementById("tabel-status-alat").getElementsByTagName('tbody')[0];
 

$("#tabel-status-alat").find("tr:gt(0)").remove();
 

statusAlat.on("child_added", function(data, prevChildKey) {
var newstatusAlat = data.val();
 
var row = table.insertRow(table.rows.length);
 
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4);
var cell6 = row.insertCell(5);
 
cell1.innerHTML = newstatusAlat.id;
cell2.innerHTML = newstatusAlat.nama_alat;
cell3.innerHTML = newstatusAlat.status_alat;
cell4.innerHTML = newstatusAlat.tanggal_alat;
cell5.innerHTML = newstatusAlat.jam_alat;
cell6.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + newstatusAlat.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + newstatusAlat.id + ')" data-toggle="modal" data-target="#ModalDel" style="margin-left:10px;">Hapus</button>';
});
 
}
 
// Melakukan proses pencarian data
function CariData()
{

var nama_alat_cari = $('#text_cari').val();
 

var dbRef = firebase.database();
var statusAlat = dbRef.ref("status-alat");
 

var query = statusAlat
.orderByChild('nama_alat')
.startAt(nama_alat_cari)
.endAt(nama_alat_cari + "\uf8ff");
 

var table = document.getElementById("tabel-status-alat").getElementsByTagName('tbody')[0];
 

$("#tabel-status-alat").find("tr:gt(0)").remove();
 

 
query.on("child_added", function(snapshot) {
 
var childData = snapshot.val();
console.log(childData);
 
var row = table.insertRow(table.rows.length);
 
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4);
var cell6 = row.insertCell(5);
 
cell1.innerHTML = childData.id;
cell2.innerHTML = childData.nama_alat;
cell3.innerHTML = childData.status_alat;
cell4.innerHTML = childData.tanggal_alat;
cell5.innerHTML = childData.jam_alat;
cell6.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + childData.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + childData.id + ')" style="margin-left:10px;"data-toggle="modal" data-target="#ModalDel">Hapus</button>';
});
 
}
 
// Menampilkan data yang akan di update kedalam modal update
function updateData_Tampil(id)
{
$('#T4').val(id);
 
var dbRef_update_tampil = firebase.database();
var statusAlatdenganID = dbRef_update_tampil.ref("status-alat/" + id);
 
statusAlatdenganID.on("value", function(snapshot) {
var childData = snapshot.val();
$('#t4_nama_alat').val(childData.nama_alat);
$('#t4_status_alat').val(childData.status_alat);
$('#t4_tanggal_alat').val(childData.tanggal_alat);
$('#t4_jam_alat').val(childData.jam_alat);
});
 
}
 
// Melakukan proses update data
function updateData_Proses()
{
var id_update_proses = $('#T4').val();
var nama_alat_update_proses = $('#t4_nama_alat').val();
var status_alat_update_proses = $('#t4_status_alat').val();
var tanggal_alat_update_proses = $('#t4_tanggal_alat').val();
var jam_alat_update_proses = $('#t4_jam_alat').val();
 
var dbRef_update_proses = firebase.database();
var update_statusAlat = dbRef_update_proses.ref("status-alat/" + id_update_proses);
 
update_statusAlat.update ({
"nama_alat": nama_alat_update_proses,
"status_alat": parseInt(status_alat_update_proses),
"tanggal_alat": tanggal_alat_update_proses,
"jam_alat": jam_alat_update_proses
});
 
$('#ModalUpdate').modal('hide');
tampilData();
}
 
// Mengambil id terakhir dan membahkan dengan 1 dan memasukkan kedalam text id di modal tambah
function ambilDataTerakhir()
{
 
$('#t4_nama_alat_add').val("");
$('#t4_status_alat_add').val("");
$('#t4_tanggal_alat_add').val("");
$('#t4_jam_alat_add').val("");
 
var dbRef_ambilDataTerakhir = firebase.database();
var cariAkhir = dbRef_ambilDataTerakhir.ref("status-alat");
cariAkhir.limitToLast(1).on('child_added', function(dataAkhir) {
var snap = dataAkhir.val();
var id_record_terakhir = snap.id + 1;
document.getElementById("T4_add").value = id_record_terakhir;
});
 
}
 
// Melakukan proses penambahan data
function addData_Proses()
{
var id_add_proses = $('#T4_add').val();
var nama_alat_add_proses = $('#t4_nama_alat_add').val();
var status_alat_add_proses = $('#t4_status_alat_add').val();
var tanggal_alat_add_proses = $('#t4_tanggal_alat_add').val();
var jam_alat_add_proses = $('#t4_jam_alat_add').val();
 
var dbRef_add_proses = firebase.database();
 

var statusAlat = dbRef_add_proses.ref("status-alat/" + id_add_proses);
 
statusAlat.set({
 
id : parseInt(id_add_proses),
jam_alat : jam_alat_add_proses,
nama_alat : nama_alat_add_proses,
status_alat : parseInt(status_alat_add_proses),
tanggal_alat : tanggal_alat_add_proses
 
});
 
$('#ModalAdd').modal('hide');
tampilData();
}
 
// Melakukan proses delete data yang telah dikonfirmasi sebelumnya
function delData_Proses()
{
var id_add_proses = $('#T4_del').val();
 
var dbRef_delete = firebase.database();
var statusAlat = dbRef_delete.ref("status-alat/" + id_add_proses);
statusAlat.remove();
$('#ModalDel').modal('hide');
tampilData();
 
 
}
 
// Memasukkan id ke textbox di modal konfirmasi delete
function deleteData_Tampil(id)
{
$('#T4_del').val(id);
}
 
</script>
 
<!-- Modal Update -->
<div class="modal fade" id="ModalUpdate" tabindex="-1" role="dialog" aria-labelledby="ModalUpdateLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="ModalUpdateLabel">Update Data</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
<h6>ID : </h6>
<input class="form-control" type="text" id="T4">
<h6>Nama Alat : </h6>
<input class="form-control" type="text" id="t4_nama_alat">
<h6>Status Alat : </h6>
<input class="form-control" type="text" id="t4_status_alat">
<h6>Tanggal Alat : </h6>
<input class="form-control" type="text" id="t4_tanggal_alat">
<h6>Jam Alat : </h6>
<input class="form-control" type="text" id="t4_jam_alat">
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
<button type="button" class="btn btn-primary" onclick="updateData_Proses()">Simpan</button>
</div>
</div>
</div>
</div>
 
<!-- Modal Add -->
<div class="modal fade" id="ModalAdd" tabindex="-1" role="dialog" aria-labelledby="ModalAddLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="ModalUpdateLabel">Tambah Data Data</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
<h6>ID : </h6>
<input class="form-control" type="text" id="T4_add">
<h6>Nama Alat : </h6>
<input class="form-control" type="text" id="t4_nama_alat_add">
<h6>Status Alat : </h6>
<input class="form-control" type="text" id="t4_status_alat_add">
<h6>Tanggal Alat : </h6>
<input class="form-control" type="text" id="t4_tanggal_alat_add">
<h6>Jam Alat : </h6>
<input class="form-control" type="text" id="t4_jam_alat_add">
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
<button type="button" class="btn btn-primary" onclick="addData_Proses()">Simpan</button>
</div>
</div>
</div>
</div>
 
<!-- Modal Hapus Data -->
<div class="modal fade" id="ModalDel" tabindex="-1" role="dialog" aria-labelledby="ModalDelLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="ModalUpdateLabel">Konfirmasi Hapus Data</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
<h6>ID : </h6>
<input class="form-control" type="text" id="T4_del">
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
<button type="button" class="btn btn-danger" onclick="delData_Proses()">Hapus Data</button>
</div>
</div>
</div>
</div>
 
</body>
</html>