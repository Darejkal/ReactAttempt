import * as Localization from 'expo-localization';
import I18n from 'i18n-js';
import { preferencesGetState } from './Preferences';
export async function prepareLanguage() {
    I18n.translations = {
        en: {
            tableHeading: "Your timetable",
            viewAsList: "View as list",
            timetableHead1: "Days",
            timetableHead2: "Lessons",
            error: "Error",
            newsFeedBottom: "That's all for today",
            getDataError: "Error ecountered while getting data",
            loginInform:"Logged in as",
            class:"Class",
            school:"School",
            notificationTitle:"Notification Test",
            notification:"Notification",
            notificationTestSub:"This is a subtitle",
            notificationTestBody:"This is the body",
            schoolLocationTitle: "Tran Phu High School For The Gifted",
            schoolLocationDescription: "10A Le Hong Phong,Đang Hai,Hai An,Hai Phong,VN",
            colorfulMode: "Colorful Mode",
            wheelInitial:"Initial set up",
            wheelEnterNumVar: "Enter number of variable",
            wheelWrongNumInput: "Input must be number",
            wheelTooMuchInput: "Stop abusing it, you filthy pig",
            wheelTooMuchInputHeading: "Too many, don't ya think?",
            wheelResultHeading: "Rolling result",
            ok: "OK",
            done:"Done",
            wheelAddVar: "Add variable no",
            wheelEnterVar: "Enter value",
            wheelRoll:"Roll",
            again:"Again",
            wheelVariableEmpty:"Please enter all variable",
            wheelVariableEmptyHeading:"Input cannot be empty",
            authLoginError:"There is no matched school or class",
            login:"Login",
            logout:"Logout",
            lFSchoolEmpty:"School cannot be empty",
            lFIncorrectInput:"Incorrect input",
            lFClassEmpty:"ClassID cannot be empty",
            appNotiNotEnabled:'Hey! You might want to enable notifications for my app, they are good.',
            Menu:"Menu",
            Wheel:"Wheel Of Fortunes",
            Map:"School Map",
            Settings:"Settings",
            Home:"Home",
            forceLanguageMode:"Prefered language",
            vi:"Vietnamese - Tiếng Việt",
            en:"English"
        },
        vi: {
            tableHeading: "Thời khóa biểu",
            viewAsList: "Xem theo danh sách",
            timetableHead1: "Ngày",
            timetableHead2: "Môn",
            error: "Lỗi",
            newsFeedBottom: "Hết òi",
            getDataError: "Load dữ liệu đã gặp lỗi. Rất xin lỗi vì sự cố này.",
            loginInform:"Đã đăng nhập",
            class:"Lớp",
            school:"Trường",
            notificationTitle:"Test thử thông báo",
            notification:"Thông báo",
            notificationTestSub:"Đây là phụ đề",
            notificationTestBody:"Đây là phần thân",
            schoolLocationTitle: "Trường THPT Chuyên NK Trần Phú",
            schoolLocationDescription: "10A Lê Hồng Phong,Đằng Hải,Hải An,Hải Phòng,VN",
            colorfulMode: "Chế độ sặc sỡ",
            wheelInitial:"Cài đặt ban đầu",
            wheelEnterNumVar: "Nhập số phiếu bốc thăm",
            wheelWrongNumInput: "Số dữ liệu phải là số, không được thêm các ký tự khác",
            wheelTooMuchInput: "Làm ơn đừng lạm dụng cái đó nữa :<",
            wheelTooMuchInputHeading: "Quá nhiều, quá tham",
            wheelResultHeading: "Kết quả bốc thăm",
            ok: "OK",
            done:"Xong",
            wheelAddVar: "Phiếu số",
            wheelEnterVar: "Viết vô phiếu",
            wheelRoll:"RÚT",
            again:"Lại Lại!",
            wheelVariableEmpty:"Làm ơn điền vô tất cả phiếu",
            wheelVariableEmptyHeading:"Phiếu không được để trống",
            authLoginError:"Rất tiếc, lớp hoặc trường không khớp hoặc không tồn tại",
            login:"Đăng Nhập",
            logout:"Đăng xuất",
            lFSchoolEmpty:"Tên trường không được để trống",
            lFIncorrectInput:"Dữ liệu nhập vô bị sai",
            lFClassEmpty:"Mã lớp không được bỏ trống",
            appNotiNotEnabled:'Làm ơn bật thông báo, đi màaaaaaaaaaaaaaaaaaaaaaaaaa',
            Menu:"Menu",
            Wheel:"Bốc phiếu may mắn",
            Map:"Địa điểm trường",
            Settings:"Cài đặt",
            Home:"NewsFeed",
            forceLanguageMode:"Ngôn ngữ ưu tiên",
            vi:"Tiếng Việt",
            en:"Tiếng Anh - English"
            
        }
    };
    let {forcedLanguage,language} = await preferencesGetState()
    I18n.locale = forcedLanguage? language:Localization.locale
    I18n.fallbacks = true;
}
export const DAY_OF_THE_WEEK = {
    Mon: 'Mon',
    Tue: 'Tue',
    Wed: 'Wed',
    Thu: "Thu",
    Fri: "Fri",
    Sat: "Sat",
    Sun: "Sun",

}