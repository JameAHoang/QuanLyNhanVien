export const SUCCESS = 200;

export const STATUSES = [
  { id: 1, name: "Tạo mới" },
  { id: 2, name: "Chờ xử lý" },
  { id: 3, name: "Đã được chấp nhận" },
  { id: 4, name: "Yêu cầu bổ sung" },
  { id: 5, name: "Từ chối" },
  { id: 6, name: "Chờ duyệt kết thúc" },
  { id: 7, name: "Kết thúc hồ sơ" },
  { id: 8, name: "Yêu cầu bổ sung kết thúc hồ sơ" },
  { id: 9, name: "Từ chối yêu cầu kết thúc hồ sơ" },
  { id: 0, name: "Nộp lưu hồ sơ" },
];

export const GENDER = [
  { id: "0", name: "Nam" },
  { id: "1", name: "Nữ" },
  { id: "2", name: "Khác" },
];

export const TEAMS = [
  { id: 1, name: "ReactJS" },
  { id: 2, name: "Java" },
  { id: 3, name: "PHP" },
  { id: 4, name: "C#" },
];

export const RELATIONSHIP = [
  { id: "0", name: "Ông" },
  { id: "1", name: "Bà" },
  { id: "3", name: "Bố" },
  { id: "4", name: "Mẹ" },
  { id: "5", name: "Anh trai" },
  { id: "6", name: "Em trai" },
  { id: "7", name: "Chị gái" },
  { id: "8", name: "Em gái" },
];

export const LEADER_POSITION = [
  { id: 2, name: "Quản lý 2" },
  { id: 3, name: "Quản lý 3" },
  { id: 4, name: "Quản lý 4" },
];

export const LIST_POSITION = [
  { id: 1, name: "Tổng giám đốc điều hành" },
  { id: 2, name: "Giám đốc điều hành" },
  { id: 3, name: "Giám đốc tài chính" },
  { id: 4, name: "Giám đốc tiếp thị" },
  { id: 5, name: "Giám đốc nhân sự" },
];

export const TYPE_OF_PROPOSAL = [
  { id: 1, name: "Loại 1" },
  { id: 2, name: "Loại 2" },
  { id: 3, name: "Loại 3" },
];

export const TYPE = {
  REGISTER_EMPLOYEE: "resgiter",
  RESIGNATION_EMPLOYEE: "resignation",
  SALARY_INCREASE: "salary",
  PROCESS: "process",
  PROPOSAL: "proposal",
};

export const STATUS_OF_ADDITIONAL_REQUEST = [
  { id: 1, name: "Tạo mới" },
  { id: 2, name: "Chờ xử lý" },
  { id: 3, name: "Đã được chấp nhận" },
  { id: 4, name: "Yêu cầu bổ sung" },
  { id: 5, name: "Từ chối" },
];

export const TAB_EMPLOYYEE = {
  EMPLOYEE_INFOR: { id: 1, name: "Thông tin nhân viên" },
  CETIFICATE: { id: 2, name: "Thông tin chứng chỉ" },
  FAMILY_RELATIONSHIP: { id: 3, name: "Quan hệ gia đình" },
};

export const TAB_UPDATE_PROGRESS = {
  SALARY_INCREASE: { id: 1, name: "Tăng lương" },
  PROCESS: { id: 2, name: "Thăng chức" },
  PROPOSAL: { id: 3, name: "Đề xuất tham mưu" },
};

export const TAB_PENDING = {
  PENDING: { id: 1, name: "Chờ duyệt" },
  PENDING_SALARY_INCREASE: { id: 2, name: "Chờ duyệt tăng lương" },
  PENDING_PROCESS: { id: 3, name: "Chờ duyệt thăng thức" },
  PENDING_PROPOSAL: { id: 4, name: "Chờ duyệt đề xuất tham mưu" },
};

export const TAB_REGISTER_EMPLOYEE = {
  PROFILE: { id: 1, name: "Hồ sơ" },
  RESUME: { id: 2, name: "Sơ yếu lí lịch" },
  DIPLOMA: { id: 3, name: "Văn bằng" },
};

export const STATUS_EMPLOYEE = {
  ADD_NEW_STATUS: { id: 1, name: "Tạo mới" },
  PENDING_STATUS: { id: 2, name: "Chờ xử lý" },
  APPROVED_STATUS: { id: 3, name: "Đã được chấp nhận" },
  ADDITIONAL_REQUESTED_STATUS: { id: 4, name: "Yêu cầu bổ sung" },
  REJECT_STATUS: { id: 5, name: "Từ chối" },
  PENDING_END_STATUS: { id: 6, name: "Chờ duyệt kết thúc" },
  APPROVED_ENDING_STATUS: { id: 7, name: "Kết thúc hồ sơ" },
  ADDITIONAL_REQUESTED_ENDING_STATUS: {
    id: 8,
    name: "Yêu cầu bổ sung kết thúc hồ sơ",
  },
  REJECT_ENDING_STATUS: { id: 9, name: "Từ chối yêu cầu kết thúc hồ sơ" },
  DEPOSIT_STATUS: { id: 0, name: "Nộp lưu hồ sơ" },
};

export const STATUS_OF_ADD_EMPLOYEE = [
  STATUS_EMPLOYEE.ADD_NEW_STATUS.id,
  STATUS_EMPLOYEE.PENDING_STATUS.id,
  STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
  STATUS_EMPLOYEE.REJECT_STATUS.id,
];

export const STATUS_OF_PENDING = [
  STATUS_EMPLOYEE.PENDING_STATUS.id,
  STATUS_EMPLOYEE.PENDING_END_STATUS.id,
];

export const STATUS_OF_APPROVED = [
  STATUS_EMPLOYEE.APPROVED_STATUS.id,
  STATUS_EMPLOYEE.APPROVED_ENDING_STATUS.id,
  STATUS_EMPLOYEE.DEPOSIT_STATUS.id,
];

export const STATUS_OF_EMPLOYEE_MANAGEMEMNT = [
  STATUS_EMPLOYEE.APPROVED_STATUS.id,
  STATUS_EMPLOYEE.PENDING_END_STATUS.id,
  STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_ENDING_STATUS.id,
  STATUS_EMPLOYEE.REJECT_ENDING_STATUS.id,
];

export const STATUS_OF_EMPLOYEE_END = [
  STATUS_EMPLOYEE.APPROVED_ENDING_STATUS.id,
  STATUS_EMPLOYEE.DEPOSIT_STATUS.id,
];

export const STATUS_OF_PROGRESS_EMPLOYEE = [
  STATUS_EMPLOYEE.ADD_NEW_STATUS.id,
  STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
  STATUS_EMPLOYEE.REJECT_STATUS.id,
];

export const STATUS_OF_PROGRESS_EMPLOYEE_ADDITIONAL_REJECT = [
  STATUS_EMPLOYEE.APPROVED_STATUS.id,
  STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
  STATUS_EMPLOYEE.REJECT_STATUS.id,
];

export const DELETE_STATUS_PROGRESS_EMPLOYYEE = [
  STATUS_EMPLOYEE.ADD_NEW_STATUS.id,
];

export const UPDATE_STATUS_PROGRESS_EMPLOYYEE = [
  STATUS_EMPLOYEE.ADD_NEW_STATUS.id,
  STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
  STATUS_EMPLOYEE.REJECT_STATUS.id,
];

export const STATUS_OF_UPDATE_PROGRESS = [
  STATUS_EMPLOYEE.PENDING_STATUS.id,
  STATUS_EMPLOYEE.APPROVED_STATUS.id,
];

export const DELETE_STATUS = [STATUS_EMPLOYEE.ADD_NEW_STATUS.id];

export const EDIT_STATUS = [
  STATUS_EMPLOYEE.ADD_NEW_STATUS.id,
  STATUS_EMPLOYEE.ADDITIONAL_REQUESTED_STATUS.id,
  STATUS_EMPLOYEE.REJECT_STATUS.id,
];

export const VISIBILITY_STATUS = [STATUS_EMPLOYEE.PENDING_STATUS.id];

export const SALARY_INCREASE_UPDATE_PROGRESS =
  "salary-increase-update-progress";
export const SALARY_INCREASE_PENDING = "salary-increase-pending";

export const PROCESS_UPDATE_PROGRESS = "process-update-progress";
export const PROCESS_PENDING = "process-pending";

export const PROPOSAL_UPDATE_PROGRESS = "proposal-update-progress";
export const PROPOSAL_PENDING = "proposal-pending";

export const PAGE = 1;
export const ROWPERPAGE = 10;
