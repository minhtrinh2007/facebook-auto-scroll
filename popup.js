let actionIntervals = [];

document.getElementById("closePopup").addEventListener("click", () => {
  window.close(); // Đóng popup
});

document.getElementById("startActions").addEventListener("click", () => {
  const actions = {
    autoLike: document.getElementById("autoLike").checked,
    autoScroll: document.getElementById("autoScroll").checked,
    autoStory: document.getElementById("autoStory").checked,
    autoMarketplace: document.getElementById("autoMarketplace").checked,
    autoGroupPosts: document.getElementById("autoGroupPosts").checked,
    autoFriends: document.getElementById("autoFriends").checked,
  };

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: startActions,
      args: [actions],
    });
  });
});

document.getElementById("stopActions").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: stopActions,
    });
  });
});

function startActions(actions) {
  window.actionIntervals = [];

  if (actions.autoLike) {
    const likeInterval = setInterval(() => {
      const likeButtons = document.querySelectorAll('div[aria-label="Thích"]');
      likeButtons.forEach((button, index) => {
        setTimeout(() => button.click(), index * 1000);
      });
    }, 10000); // Mỗi 10 giây lặp lại
    window.actionIntervals.push(likeInterval);
  }

  if (actions.autoScroll) {
    const scrollInterval = setInterval(() => {
      window.scrollBy(0, 500);
    }, 1000);
    window.actionIntervals.push(scrollInterval);
  }

  if (actions.autoStory) {
    const storyInterval = setInterval(() => {
      const stories = document.querySelectorAll('a[aria-label="Story"]');
      stories.forEach((story, index) => {
        setTimeout(() => story.click(), index * 3000);
      });
    }, 20000); // Mỗi 20 giây lặp lại
    window.actionIntervals.push(storyInterval);
  }

  // Thêm các chức năng tương tự cho Marketplace, GroupPosts, Friends
}

  function autoViewMarketplace() {
    window.location.href = "https://www.facebook.com/marketplace";
    setTimeout(() => autoScroll(), 5000); // Lướt sau khi vào Marketplace
  }

  function autoViewGroupPosts() {
    const groups = document.querySelectorAll('div[aria-label="Nhóm"]');
    groups.forEach((group, index) => {
      setTimeout(() => group.click(), index * 3000);
    });

  function autoViewFriends() {
    window.location.href = "https://www.facebook.com/friends";
    setTimeout(() => autoScroll(), 5000); // Lướt sau khi vào danh sách bạn bè
  }
}




function stopActions() {
  if (window.actionIntervals) {
    window.actionIntervals.forEach((interval) => clearInterval(interval));
    window.actionIntervals = [];
    alert("Đã dừng tất cả hoạt động!");
  }
}
