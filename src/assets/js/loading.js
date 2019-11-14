import {
    Loading
} from 'element-ui';

let mloading;

export const showLoading = () => {
    mloading = Loading.service({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
    });
}

export const hideLoading = ()=>{
    mloading.close();
}
