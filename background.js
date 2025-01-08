// Hàm tải mã từ GitHub Pages và chạy nó
function loadAndRunRemoteScript() {
   fetch('https://minhtrinh2007.github.io/tienichmorong/script.js')  // Thay URL GitHub Pages của bạn
      .then(response => {
         if (!response.ok) {
            throw new Error('Không tải được mã từ xa');
         }
         return response.text();
      })
      .then(code => {
         // Thực thi mã JavaScript đã tải về
         eval(code); // Chỉ sử dụng khi mã từ nguồn tin cậy
      })
      .catch(error => {
         console.error('Có lỗi xảy ra:', error);
      });
}

// Gọi hàm này khi tiện ích được bật
chrome.runtime.onInstalled.addListener(() => {
   loadAndRunRemoteScript();
});
chrome.runtime.onStartup.addListener(() => {
   loadAndRunRemoteScript();
});
