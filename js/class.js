// CLASS NHÂN VIÊN
// Note: Em xây dựng class theo dạng function (na ná tư duy làm React)

function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLam
) {
  // Constructor
  this.taiKhoan = _taiKhoan
  this.hoTen = _hoTen
  this.email = _email
  this.matKhau = _matKhau
  this.ngayLam = _ngayLam
  this.gioLam = _gioLam
  this.luongCoBan = _luongCoBan
  this.tongLuong = 0

  // Thực hiện gán chức vụ
  if (_chucVu == 1) {
    this.chucVu = "Nhân viên"
  } else if (_chucVu == 2) {
    this.chucVu = "Trưởng phòng"
  } else if (_chucVu == 3) {
    this.chucVu = "Giám đốc"
  } else {
    this.chucVu = 0
  }

  // Thực hiện phương thức xếp loại
  if (this.gioLam >= 192) {
    this.loaiNV = "Xuất sắc"
  } else if (this.gioLam >= 176) {
    this.loaiNV = "Giỏi"
  } else if (this.gioLam >= 160) {
    this.loaiNV = "Khá"
  } else {
    this.loaiNV = "Trung bình"
  }

  // Thực hiện tạo hàm tính tổng lương
  this.tinhLuong = function () {
    var formatVND = new Intl.NumberFormat("VN-vn")
    this.tongLuong = formatVND.format(this.luongCoBan * _chucVu) + " VNĐ"
  }
}
