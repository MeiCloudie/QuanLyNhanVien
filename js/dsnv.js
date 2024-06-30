// XỬ LÝ DANH SÁCH NHÂN VIÊN
function DSNV() {
  this.arr = []

  // Hàm Validation
  this.validation = function (nhanVien) {
    this.arrCheck = []

    // KIỂM TRA TÊN TÀI KHOẢN
    // Quy định: Tài khoản tối đa 4 - 6 ký số, không để trống
    if (
      isNaN(nhanVien.taiKhoan) ||
      nhanVien.taiKhoan.length < 4 ||
      nhanVien.taiKhoan.length > 6
    ) {
      layElementTuID("tbTKNV").style.display = "block"
      layElementTuID("tbTKNV").innerText =
        "Tài khoản chỉ được nhập số, phải từ 4 - 6 ký tự!"
      this.arrCheck.push(false)
    } else {
      layElementTuID("tbTKNV").style.display = "none"
      this.arrCheck.push(true)
    }

    // KIỂM TRA TÊN NHÂN VIÊN
    // Quy định: Tên nhân viên phải là chữ, không để trống
    if (!isNaN(nhanVien.hoTen) || nhanVien.hoTen.length === 0) {
      layElementTuID("tbTen").style.display = "block"
      layElementTuID("tbTen").innerText = "Họ tên chỉ được nhập chữ, không để trống!"
      this.arrCheck.push(false)
    } else {
      layElementTuID("tbTen").style.display = "none"
      this.arrCheck.push(true)
    }

    // KIỂM TRA EMAIL
    // Quy định: Email phải đúng định dạng, không để trống
    if (nhanVien.email.length === 0) {
      layElementTuID("tbEmail").style.display = "block"
      layElementTuID("tbEmail").innerText = "Email không được để trống"
      this.arrCheck.push(false)
    } else if (!emailValid(nhanVien.email)) {
      // Tách gọi hàm emailValid bên ngoài
      layElementTuID("tbEmail").style.display = "block"
      layElementTuID("tbEmail").innerText = "Email phải đúng định dạng!"
      this.arrCheck.push(false)
    } else {
      layElementTuID("tbEmail").style.display = "none"
      this.arrCheck.push(true)
    }

    // KIỂM TRA MẬT KHẨU
    // Quy định: mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống
    var kyTuInHoa = 0
    var kyTuSo = 0
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

    for (var i = 0; i < nhanVien.matKhau.length; i++) {
      var character = nhanVien.matKhau.charAt(i)
      if (!isNaN(character)) {
        kyTuSo++
      } else {
        if (character === character.toUpperCase()) {
          kyTuInHoa++
        }
      }
    }

    if (kyTuInHoa == 0 || kyTuSo == 0 || !format.test(nhanVien.matKhau)) {
      layElementTuID("tbMatKhau").style.display = "block"
      layElementTuID("tbMatKhau").innerText =
        "Mật khẩu phải từ 6 - 10 ký tự, phải có ít nhất 1 số, 1 chữ hoa và 1 ký tự đặc biệt!"
      this.arrCheck.push(false)
    } else {
      layElementTuID("tbMatKhau").style.display = "none"
      this.arrCheck.push(true)
    }

    // KIỂM TRA NGÀY THÁNG NĂM
    // Quy định: Ngày làm không để trống, định dạng mm/dd/yyyy
    var dateCheck = nhanVien.ngayLam.split("/")
    var thang = dateCheck[0]
    var ngay = dateCheck[1]
    var nam = dateCheck[2]
    var dateCheckResult = true
    var notiMess = "Ngày tháng năm phải là số, định dạng mm/dd/yyyy!"

    if (dateCheck.length < 3) {
      dateCheckResult = false
    } else if (isNaN(ngay) || isNaN(thang) || isNaN(nam)) {
      dateCheck = false
    } else if (ngay < 1 || ngay > 31 || thang < 1 || thang > 12) {
      dateCheckResult = false
      notiMess = "Phải nhập ngày tháng cho phù hợp với Định Dạng mm/dd/yyyy!"
    } else if (thang == 2) {
      // Kiểm tra trường hợp NĂM NHUẬN
      if (nam % 4 === 0) {
        ngay > 29 ? (dateCheckResult = true) : (dateCheckResult = false)
      } else {
        ngay > 28 ? (dateCheckResult = true) : (dateCheckResult = false)
      }
    }

    if (dateCheckResult) {
      layElementTuID("tbNgay").style.display = "none"
      this.arrCheck.push(true)
    } else {
      layElementTuID("tbNgay").style.display = "block"
      layElementTuID("tbNgay").innerText = notiMess
      this.arrCheck.push(false)
    }

    // KIỂM TRA LƯƠNG CƠ BẢN
    // Quy định: Lương cơ bản 1 000 000 - 20 000 000, không để trống
    if (
      isNaN(nhanVien.luongCoBan) ||
      nhanVien.luongCoBan < 1000000 ||
      nhanVien.luongCoBan > 20000000
    ) {
      layElementTuID("tbLuongCB").style.display = "block"
      layElementTuID("tbLuongCB").innerText =
        "Lương cơ bản phải từ 1.000.000 đến 20.000.000!"
      this.arrCheck.push(false)
    } else {
      layElementTuID("tbLuongCB").style.display = "none"
      this.arrCheck.push(true)
    }

    // KIỂM TRA CHỨC VỤ
    // Quy định: Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
    if (nhanVien.chucVu == 0) {
      layElementTuID("tbChucVu").style.display = "block"
      layElementTuID("tbChucVu").innerText = "Chọn chức vụ!"
      this.arrCheck.push(false)
    } else {
      layElementTuID("tbChucVu").style.display = "none"
      this.arrCheck.push(true)
    }

    // KIỂM TRA GIỜ LÀM
    // Quy định: Số giờ làm trong tháng 80 - 200 giờ, không để trống
    if (nhanVien.gioLam < 80 || nhanVien.gioLam > 200) {
      layElementTuID("tbGiolam").style.display = "block"
      layElementTuID("tbGiolam").innerText = "Giờ làm từ 80 - 200 giờ!"
      this.arrCheck.push(false)
    } else {
      layElementTuID("tbGiolam").style.display = "none"
      this.arrCheck.push(true)
    }

    // ĐẶT CỜ ĐỂ KIỂM TRA LẠI TOÀN BỘ QUÁ TRÌNH CHO MẢNG VALIDATION
    var flag = true
    this.arrCheck.forEach(function (item) {
      if (item == false) {
        flag = false
      }
    })

    return flag
  }

  // XỬ LÝ HÀM THÊM NHÂN VIÊN
  this.themNhanVien = function (nhanVienArr) {
    var success = false

    // Thực hiện kiểm tra hàm có tồn tại hay chưa
    // Tức không trùng tài khoản
    var validCheck = this.arr.find(function (element) {
      return element.taiKhoan == nhanVienArr.taiKhoan
    })

    if (validCheck == undefined) {
      this.arr.push(nhanVienArr)
      success = true
    } else {
      layElementTuID("tbTKNV").style.display = "block"
      layElementTuID("tbTKNV").innerText = "Tài khoản đã tồn tại!"
    }

    return success
  }

  // XỬ LÝ HÀM XÓA NHÂN VIÊN
  this.xoaNhanVien = function (tkNV) {
    var xoaNV = this.arr.findIndex(function (element) {
      return element.taiKhoan == tkNV
    })

    this.arr.splice(xoaNV, 1)
  }

  // XỬ LÝ HÀM LẤY THÔNG TIN
  this.layThongTinNV = function (tk) {
    var thongTinNV = this.arr.find(function (element) {
      return element.taiKhoan == tk
    })
    return thongTinNV
  }

  // XỬ LÝ HÀM CHỈNH SỬA NHANH TẠI FIELD
  // Note: Trừ hai cột cuối (Tổng lương và Xếp loại)
  this.quickEdit = function (taiKhoanCu, editedNhanVien) {
    var editValid = true
    quickEditIndex = this.arr.findIndex(function (findExample) {
      return findExample.taiKhoan == taiKhoanCu
    })

    var check = 0
    for (var i = 0; i < this.arr.length; i++) {
      if (i == quickEditIndex) {
        continue
      } else if (this.arr[i].taiKhoan == editedNhanVien.taiKhoan) {
        check++
      }
    }

    // THỰC HIỆN VALIDATION CHO QUICK EDIT
    var date = editedNhanVien.ngayLam.split("/")
    var thang = date[0]
    ngay = date[1]
    nam = date[2]

    if (check > 0) {
      alert("Tài khoản đã tồn tại!")
      editValid = false
    } else if (
      editedNhanVien.taiKhoan.length === 0 ||
      editedNhanVien.taiKhoan.length < 4 ||
      editedNhanVien.taiKhoan.length > 6
    ) {
      alert("Tài khoản từ 4 - 6 ký tự, không được để trống!")
      editValid = false
    } else if (
      !emailValid(editedNhanVien.email) ||
      editedNhanVien.email.length === 0
    ) {
      alert("Email phải đúng định dạng và không được bỏ trống!")
      editValid = false
    } else if (editedNhanVien.ngayLam.length === 0) {
      alert("Ngày tháng không được để trống!")
      editValid = false
    } else if (ngay == "" || thang == "" || nam == "") {
      alert("Định dạng mm/dd/yyyy!")
      editValid = false
    } else if (ngay < 1 || ngay > 31 || thang < 0 || thang > 12) {
      alert("Điền ngày tháng cho hợp lý!")
      editValid = false
    } else if (thang == 2) {
      if (nam % 4 === 0) {
        if (ngay > 29) {
          alert("Năm nhuận tháng 2 có 29 ngày thôi!")
          editValid = false
        }
      } else {
        if (ngay > 28) {
          alert("Tháng 2 có 28 ngày thôi!")
          editValid = false
        }
      }
    } else if (editedNhanVien.chucVu == 0) {
      alert("Chọn chức vụ đã!")
      editValid = false
    }

    if (editValid) {
      this.arr[quickEditIndex] = editedNhanVien
    }
    return editValid
  }

  // XỬ LÝ HÀM CHỈNH SỬA
  this.edit = function (editedNhanVien) {
    var index = this.arr.findIndex(function (sort) {
      return sort.taiKhoan == editedNhanVien.taiKhoan
    })
    if (index != -1) {
      this.arr[index] = editedNhanVien
    } else {
      layElementTuID("tbTKNV").style.display = "block"
      layElementTuID("tbTKNV").innerText = "Không tìm thấy nhân viên này!"
    }
  }

  // XỬ LÝ HÀM CHỌN LỌC NHÂN VIÊN THEO XẾP LOẠI
  this.sortNV = function (value) {
    var filter
    if (value == 0) {
      filter = this.arr
    } else if (value == 1) {
      filter = this.arr.filter(function (filterExample) {
        return filterExample.gioLam >= 192
      })
    } else if (value == 2) {
      filter = this.arr.filter(function (filterExample) {
        return filterExample.gioLam < 192 && filterExample.gioLam >= 176
      })
    } else if (value == 3) {
      filter = this.arr.filter(function (filterExample) {
        return filterExample.gioLam < 176 && filterExample.gioLam >= 160
      })
    } else if (value == 4) {
      filter = this.arr.filter(function (filterExample) {
        return filterExample.gioLam < 160
      })
    }
    return filter
  }

  // XỬ LÝ HÀM TỰ TẠO TÀI KHOẢN
  this.autoIDPicker = function () {
    var min = 0
    var max = 999999
    // HÀM TẠO SỐ RANDOM TỪ MIN - MAX
    function getRandomID(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      var randomNumber = Math.floor(Math.random() * (max - min + 1) + min)

      // KIỂM TRA ĐỘ DÀI CỦA SỐ, NẾU DƯỚI 4 THÌ PHẢI THÊM 0 VÀO CHO ĐỦ 4
      var length = String(randomNumber).length
      while (length < 4) {
        randomNumber = "0" + randomNumber
        length = length.length
      }
      return randomNumber
    }

    // LẤY SỐ RANDOM
    var newID = getRandomID(min, max)

    // TÌM TRONG MẢNG XEM CÓ TÀI KHOẢN TRÙNG KO
    while (this.layThongTinNV(newID) != undefined) {
      // NẾU CÓ THÌ TIẾP TỤC GỌI RANDOM RA SỐ KHÁC
      newID = getRandomID(min, max)
    }

    return newID
  }
}

// KIỂM TRA EMAIL
function emailValid(email) {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}
