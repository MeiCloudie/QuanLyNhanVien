// GỌI GỌN PHẦN DOM LẤY PHẦN TỬ TỪ ID
function layElementTuID(id) {
  return document.getElementById(id)
}

// KHỞI TẠO DANH SÁCH NHÂN VIÊN
var dsnv = new DSNV()

// BẮT CÁC SỰ KIỆN
window.addEventListener("load", function () {
  pageURL()
  getLocalStorage()
  thongTinTacGia()
})

// THÔNG BÁO THÔNG TIN TÁC GIẢ BÀI LÀM
function thongTinTacGia() {
  var tacGia = localStorage.getItem("tacGia")
  if (!tacGia) {
    alert(
      "Xin chào 👋 \nĐây là bài làm của Trương Thục Vân (MeiCloudie) 🔥 \nLớp Bootcamp Sáng 12 - CyberSoft Academy 🏫"
    )
    localStorage.setItem("tacGia", true)
  }
}

// XỬ LÝ LOAD THÔNG TIN NHÂN VIÊN
function thongTinNV() {
  var chucVuOption = layElementTuID("chucvu").querySelectorAll("option")
  chucVuOption.forEach(function (item, index) {
    layElementTuID("chucvu")
      .querySelectorAll("option")
      [index].setAttribute("value", index)
  })

  var _taiKhoan = layElementTuID("tknv").value
  var _hoTen = layElementTuID("name").value
  var _email = layElementTuID("email").value
  var _matKhau = layElementTuID("password").value
  var _ngayLam = layElementTuID("datepicker").value
  var _luongCoBan = layElementTuID("luongCB").value
  var _chucVu = layElementTuID("chucvu").value
  var _gioLam = layElementTuID("gioLam").value

  var nhanVien = new NhanVien(
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _gioLam
  )
  nhanVien.tinhLuong()
  return nhanVien
}

// XỬ LÝ HAI THAM SỐ "search" VÀ "page"
function pageURL() {
  var url = window.location.href
  var urlData = url.split("?search=")[1]
  if (urlData == undefined) {
    window.location.replace("./?search=0&page=1")
  } else {
    urlSearch = urlData.split("&page=")[0]
    var urlPage = urlData.split("&page=")[1]
    if (urlPage == undefined) {
      window.location.replace("./?search=" + urlSearch + "&page=1")
    }
  }
  var infoObject = {
    search: urlSearch,
    page: urlPage,
  }
  return infoObject
}

// XỬ LÝ PHÂN TRANG
// Note: Xử lý trả về dạng Object
function pagination(arr) {
  var perPage = 10 // Số lượng hiển thị mỗi trang
  var total = arr.length // Tổng các phần tử
  var page = 0 // Tổng số trang
  var lastPageItem = 0 // Phần tử ở trang cuối cùng
  var paginationInfo = {}

  if (total < perPage) {
    page = 1
  } else {
    if (total % perPage == 0) {
      page = total / perPage
    } else {
      page = parseInt(total / perPage) + 1
      lastPageItem = total % perPage
    }
  }

  paginationInfo = {
    perPage,
    total,
    page,
    lastPageItem,
  }

  return paginationInfo
}

// XỬ TẠO CÁC DÒNG BÊN TRONG BẢNG DANH SÁCH NHÂN VIÊN
function createRow(arr, number, isMultiObject) {
  var row
  if (isMultiObject) {
    row = `
            <tr id="rowIndex__${number}">
            <td>${arr[number].taiKhoan}</td>
            <td>${arr[number].hoTen}</td>
            <td>${arr[number].email}</td>
            <td>${arr[number].ngayLam}</td>
            <td>${arr[number].chucVu}</td>
            <td>${arr[number].tongLuong}</td>
            <td>${arr[number].loaiNV}</td>
            <td>
                <button 
                class="btn btn-primary" 
                onclick="this.remove();quickEditInfo('${arr[number].taiKhoan}', ${number})">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button 
                class="btn btn-danger" 
                onclick="xoaNhanVien('${arr[number].taiKhoan}', ${number})">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
        `
  } else {
    row = `
            <tr id="rowIndex__${number}">
            <td>${arr.taiKhoan}</td>
            <td>${arr.hoTen}</td>
            <td>${arr.email}</td>
            <td>${arr.ngayLam}</td>
            <td>${arr.chucVu}</td>
            <td>${arr.tongLuong}</td>
            <td>${arr.loaiNV}</td>
            <td>
                <button 
                class="btn btn-primary" 
                onclick="this.remove();quickEditInfo('${arr.taiKhoan}', ${number})">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button 
                class="btn btn-danger" 
                onclick="xoaNhanVien('${arr.taiKhoan}', ${number})">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
        `
  }

  return row
}

// XỬ LÝ RENDER RA BẢNG DANH SÁCH NHÂN VIÊN
// Note: Có kết hợp phân trang và page url đã thực hiện bên trên
function renderTable(arr, urlData) {
  var table = layElementTuID("tableDanhSach")
  var tableInner = ""
  var pagiInfo = pagination(arr)
  var pagi = layElementTuID("ulPhanTrang")
  var pagiInner = ""
  var url = pageURL()
  var rowInfo = layElementTuID("rowInfo")

  if (url.page == 1) {
    if (pagiInfo.page == 1) {
      pagiInner += `
                <li class="page-item">1</li>
            `
      for (var i = 1; i <= pagiInfo.total; i++) {
        var j = i - 1
        tableInner += createRow(arr, j, true)
      }
    } else {
      for (var i = 1; i <= pagiInfo.page; i++) {
        var active = ""
        if (i == 1) {
          active = "active"
        }
        pagiInner += `<li class="page-item ${active}">`
        if (i == 1) {
          pagiInner += `<a class="page-link disabled">`
        } else {
          pagiInner += `<a class="page-link" href="./?search=${urlData}&page=${i}">`
        }
        pagiInner += `${i}</a></li>`
      }
      for (var j = 1; j <= pagiInfo.perPage; j++) {
        var k = j - 1
        tableInner += createRow(arr, k, true)
      }
    }
  } else {
    for (var k = 1; k <= pagiInfo.page; k++) {
      var active = ""
      if (k == url.page) {
        active = "active"
      }
      pagiInner += `<li class="page-item ${active}">`
      if (k == url.page) {
        pagiInner += `<a class="page-link disabled">${k}</a>`
      } else {
        pagiInner += `<a class="page-link" href="./?search=${urlData}&page=${k}">${k}</a>`
      }
      pagiInner += `</li>`
    }
    if (url.page == pagiInfo.page) {
      for (
        var i = url.page * pagiInfo.perPage - (pagiInfo.perPage - 1);
        i <= pagiInfo.total;
        i++
      ) {
        var j = i - 1
        tableInner += createRow(arr, j, true)
      }
    } else {
      for (
        var i = url.page * pagiInfo.perPage - (pagiInfo.perPage - 1);
        i <= url.page * pagiInfo.perPage;
        i++
      ) {
        var j = i - 1
        tableInner += createRow(arr, j, true)
      }
    }
  }
  var rowInfoText = ""
  if (url.page != pagiInfo.page) {
    rowInfoText += pagiInfo.perPage * url.page
  } else {
    rowInfoText += pagiInfo.total
  }
  rowInfoText += " / "
  rowInfoText += pagiInfo.total
  rowInfoText += " nhân viên"
  rowInfo.innerText = rowInfoText
  pagi.innerHTML = pagiInner
  table.innerHTML = tableInner
}

// XỬ LÝ HÀM XOÁ NHÂN VIÊN
function xoaNhanVien(tk, index) {
  var table = layElementTuID("rowIndex__" + index)
  table.cells[7].innerHTML = `
        <button class="btn btn-secondary" onclick="xoaNhanVienCancel('${tk}', ${index})"><i class="fa-solid fa-xmark"></i></button>
        <button class="btn btn-success" onclick="xoaNhanVienConfirmed('${tk}')"><i class="fa-solid fa-check"></i></button>
    `
}

// XỬ LÝ XÁC NHẬN XOÁ NHÂN VIÊN - LÀM MỚI CÁC GIÁ TRỊ THAM SỐ URL
function xoaNhanVienConfirmed(tk) {
  dsnv.xoaNhanVien(tk)
  setLocalStorage()
  var url = pageURL()
  var phanTrang = pagination(dsnv.sortNV(url.search))
  if (phanTrang.total % phanTrang.perPage === 0) {
    window.location.replace("./?search=" + url.search + "&page=" + phanTrang.page)
  } else {
    renderTable(dsnv.sortNV(url.search), url.search)
  }
}

// XỬ LÝ HUỶ XOÁ
function xoaNhanVienCancel(tk, index) {
  var table = layElementTuID("rowIndex__" + index)
  var thongTinNV = dsnv.layThongTinNV(tk)
  url = pageURL()
  table.innerHTML = createRow(thongTinNV, index, false)
}

// XỬ LÝ PHẦN CHỈNH SỬA NHANH TẠI MỘT DÒNG TRÊN BẢNG
// Lấy thông tin nhân viên cho phần chỉnh sửa nhanh
function quickEditInfo(tk, index) {
  var thongTinNV = dsnv.layThongTinNV(tk)
  var taiKhoan = thongTinNV.taiKhoan
  var hoTen = thongTinNV.hoTen
  var email = thongTinNV.email
  var ngayLam = thongTinNV.ngayLam
  var chucVu = thongTinNV.chucVu
  var table = layElementTuID("rowIndex__" + index)
  table.cells[0].innerHTML = `<input class="form-control input-sm"
    value="${taiKhoan}">`
  table.cells[1].innerHTML = `<input class="form-control input-sm"
    value="${hoTen}">`
  table.cells[2].innerHTML = `<input type="email" class="form-control input-sm"
    value="${email}">`
  table.cells[3].innerHTML = `<input class="form-control input-sm"
    value="${ngayLam}">`
  table.cells[4].innerHTML = `
    <select class="form-control editChucVu">
        <option value="0">Chọn chức vụ</option>
        <option value="1">Nhân viên</option>
        <option value="2">Trưởng phòng</option>
        <option value="3">Giám đốc</option>
    </select>
    `

  if (chucVu == "Nhân viên") {
    table.querySelector(".editChucVu").selectedIndex = "1"
  } else if (chucVu == "Trưởng phòng") {
    table.querySelector(".editChucVu").selectedIndex = "2"
  } else if (chucVu == "Giám đốc") {
    table.querySelector(".editChucVu").selectedIndex = "3"
  }
  table.cells[7].innerHTML = `
        <button class="btn btn-info" onclick="callEditModal('${tk}')" data-toggle="modal"
        data-target="#myModal"><i class="fa-solid fa-user-pen"></i></button>
        <button class="btn btn-success" onclick="quickEdit('${tk}', ${index})"><i class="fa-solid fa-check"></i></button>
    `
}

// Gọi hàm chỉnh sửa nhanh và cập nhật các phần tử
function quickEdit(tk, index) {
  var table = layElementTuID("rowIndex__" + index)
  var thongTinNV = dsnv.layThongTinNV(tk)
  var editedTaiKhoan = table.cells[0].querySelectorAll("input")[0].value
  var editedHoTen = table.cells[1].querySelectorAll("input")[0].value
  var editedEmail = table.cells[2].querySelectorAll("input")[0].value
  var editedMatKhau = thongTinNV.matKhau
  var editNgayLam = table.cells[3].querySelectorAll("input")[0].value
  var editedLuongCoBan = thongTinNV.luongCoBan
  var editedChucVu = table.cells[4].querySelectorAll("select")[0].value
  var editedGioLam = thongTinNV.gioLam

  var editedNhanVien = new NhanVien(
    editedTaiKhoan,
    editedHoTen,
    editedEmail,
    editedMatKhau,
    editNgayLam,
    editedLuongCoBan,
    editedChucVu,
    editedGioLam
  )
  editedNhanVien.tinhLuong()
  if (dsnv.quickEdit(tk, editedNhanVien)) {
    setLocalStorage()
    table.innerHTML = createRow(editedNhanVien, index, false)
  }
}

// SET DỮ LIỆU NHÂN VIÊN VÀO LOCAL STORAGE
function setLocalStorage() {
  var dataToString = JSON.stringify(dsnv.arr)
  localStorage.setItem("DSNV", dataToString)
}

// LẤY DỮ LIỆU TỪ LOCAL STORAGE
function getLocalStorage() {
  var data = localStorage.getItem("DSNV")
  if (data) {
    var dataToJSON = JSON.parse(data)
    dsnv.arr = dataToJSON
    var url = pageURL()
    renderTable(dsnv.sortNV(url.search), url.search)
    layElementTuID("searchName")
      .querySelectorAll("option")
      [url.search].setAttribute("selected", "selected")
  }

  if (!data || JSON.parse(data).length == 0) {
    layElementTuID("duLieu").style.display = "block"
    layElementTuID("duLieu")
      .querySelector("button")
      .addEventListener("click", function () {
        layElementTuID("dataTextaria").style.display = "block"
      })
  }
}

// XỬ LÝ KHI NHẤN NÚT THÊM NHÂN VIÊN
layElementTuID("btnThemNV").addEventListener("click", function () {
  var nhanVien = thongTinNV()
  if (dsnv.validation(nhanVien)) {
    if (dsnv.themNhanVien(nhanVien)) {
      layElementTuID("btnDong").click()
    }
    var url = pageURL()
    renderTable(dsnv.sortNV(url.search), url.search)
    setLocalStorage()
    var lastRow = pagination(dsnv.sortNV(url.search))
    if (lastRow.page != url.page) {
      window.location.replace(
        "./?search=" + url.search + "&page=" + lastRow.page
      )
    }
  }
})

// GỌI MODAL CHỈNH SỬA
function callEditModal(tk) {
  layElementTuID("btnAutoPicker").style.display = "none"
  var thongBao = document.querySelectorAll(".sp-thongbao")
  thongBao.forEach(function (item) {
    item.style.display = "none"
  })
  var capNhatNV = dsnv.layThongTinNV(tk)
  layElementTuID("tknv").value = capNhatNV.taiKhoan
  layElementTuID("tknv").disabled = true
  layElementTuID("name").value = capNhatNV.hoTen
  layElementTuID("email").value = capNhatNV.email
  layElementTuID("password").value = capNhatNV.matKhau
  layElementTuID("datepicker").value = capNhatNV.ngayLam
  layElementTuID("luongCB").value = capNhatNV.luongCoBan
  if (capNhatNV.chucVu == "Nhân viên") {
    layElementTuID("chucvu").selectedIndex = "1"
  } else if (capNhatNV.chucVu == "Trưởng phòng") {
    layElementTuID("chucvu").selectedIndex = "2"
  } else if (capNhatNV.chucVu == "Giám đốc") {
    layElementTuID("chucvu").selectedIndex = "3"
  }
  layElementTuID("gioLam").value = capNhatNV.gioLam
  layElementTuID("btnCapNhat").style.display = "inline"
  layElementTuID("btnThemNV").style.display = "none"
}

// XỬ LÝ KHI NHẤN NÚT CẬP NHẬT
layElementTuID("btnCapNhat").addEventListener("click", function () {
  var capNhatNV = thongTinNV()
  if (dsnv.validation(capNhatNV)) {
    dsnv.edit(capNhatNV)
    var url = pageURL()
    renderTable(dsnv.sortNV(url.search), url.search)
    setLocalStorage()
    layElementTuID("btnDong").click()
  }
})

// XỬ LÝ KHI THAO TÁC VỚI THANH SEARCH
layElementTuID("searchName").addEventListener("change", function () {
  var searchValue = layElementTuID("searchName").value
  window.location.replace("./?search=" + searchValue + "&page=1")
})

// FIX CÁC TRƯỜNG HỢP KHI NHẤN NÚT THÊM
layElementTuID("btnThem").addEventListener("click", function () {
  layElementTuID("btnCapNhat").style.display = "none"
  layElementTuID("btnThemNV").style.display = "inline"
  layElementTuID("tknv").disabled = false
  layElementTuID("btnAutoPicker").style.display = "inline"
  var modal = document.querySelector(".modal-body")
  var input = modal.querySelectorAll("input")
  input.forEach(function (item, index) {
    if (index == 4) {
      item.value = new Date().toLocaleDateString("en-US")
    } else {
      item.value = ""
    }
  })
  layElementTuID("duLieu").style.display = "none"
})

// XỬ LÝ SINH TỰ ĐỘNG ID (TÀI KHOẢN)
function autoIDPicker() {
  var nextID = dsnv.autoIDPicker()
  layElementTuID("tknv").value = nextID
}
