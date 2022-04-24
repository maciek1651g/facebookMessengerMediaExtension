window.onload = (event) => {
  console.log("Load page");

  setTimeout(() => {
    updateChatListener();
    changeChatListener();

    getAllMessagesAndLoadVideo();
  }, 5000);
};

const getAllMessagesAndLoadVideo = () => {
  const divsWithMessages = document.querySelectorAll(
    'div[data-testid="mw_message_list"] div[role="grid"] > div[role="row"] span > div[role="none"]  div[dir="auto"]'
  );

  divsWithMessages.forEach((message) => {
    const spansWithLinks = message.getElementsByTagName("span");
    for (let span of spansWithLinks) {
      const link = span.firstChild;
      if (link) {
        console.log(link.innerText);
        /*const video =
          '<video width="320" height="240" controls>' +
          '<source src="https://i1.jbzd.com.pl/contents/2022/04/kwwuAaG2QxQ8npYM81ZY8fMSqiE0y2co.mp4" type="video/mp4">' +
          "</video>";
        message.innerHTML += video;*/
      }
    }

    //console.log(message);
  });

  //console.log(divsWithMessages);
};

const updateChatListener = () => {
  //config
  const divGrid = document.querySelector(
    'div[data-testid="mw_message_list"] div[role="grid"]'
  );
  const config = { attributes: false, childList: true, subtree: false };

  //callback when chat is updated
  const onUpdateChat = function (mutationsList, observer) {
    console.log("chat updated");
    getAllMessagesAndLoadVideo();
  };

  //create and use observer
  const observer = new MutationObserver(onUpdateChat);
  observer.observe(divGrid, config);
};

const changeChatListener = () => {
  //config
  const mainDiv = document.querySelector('div[role="progressbar"]');
  const config = { attributes: true, childList: false, subtree: false };

  //callback when chat is changed
  const onChangeChat = function (mutationsList, observer) {
    console.log("change chat");
    updateChatListener();
    getAllMessagesAndLoadVideo();
  };

  //create and use observer
  const observer = new MutationObserver(onChangeChat);
  observer.observe(mainDiv, config);
};
