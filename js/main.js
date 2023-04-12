// 各ページのidを取得し、オブジェクトとして保存
const configPage = {
  loginPage: document.getElementById("page-type-login"),
  homePage: document.getElementById("page-type-home"),
  purchasePage: document.getElementById("page-type-purchase"),
};

// 変更が必要な要素を取得し、オブジェクトとして保存
const configData = {
  hambergerQty: document.getElementById("hamberger-count"),
  moneyPerClick: document.getElementById("hamberger-per-click"),
  moneyPerSecond: document.getElementById("hamberger-per-second"),
  userName: document.getElementById("input-name"),
  userNameWrap: document.getElementById("user-info-name"),
  userDays: document.getElementById("user-info-days"),
  userAge: document.getElementById("user-info-age"),
  userMoney: document.getElementById("user-info-money"),
  userStocks: document.getElementById("user-stocks"),
  userBonds: document.getElementById("user-bonds"),
  shopItemList: document.querySelectorAll(".user-shop-item"),
  stockPriceData: document.getElementById("stocks-price-data"),
  stockPrice: document.getElementById("stocks-price"),
};

class Display {
  // 引数の要素を表示するメソッド
  static showElement(element) {
    element.classList.remove("d-none");
    element.classList.add("d-flex");
  }

  // 引数の要素を非表示にするメソッド
  static hideElement(element) {
    element.classList.remove("d-flex");
    element.classList.add("d-none");
  }
}

class GameData {
  // ゲームデータの初期化処理をするメソッド
  static initialize() {
    configData.hambergerQty.innerHTML = "0";
    configData.moneyPerClick.innerHTML = "25";
    configData.moneyPerSecond.innerHTML = "0";
    configData.userDays.innerHTML = "0";
    configData.userAge.innerHTML = "20";
    configData.userMoney.innerHTML = "50000";
    configData.userStocks.innerHTML = "0";
    configData.userBonds.innerHTML = "0";
    configData.stockPriceData.dataset.price = "300000";
    configData.stockPrice.innerHTML = "$ 300000";
  }

  // セーブボタンを押した時の処理をするメソッド
  static clickSaveBtn() {
    const saveBtn = document.getElementById("save-btn");

    saveBtn.addEventListener("click", function () {
      if (!confirm("ゲームデータをセーブしますか？")) return false;

      const itemQtyList = [];

      for (let i = 0; i < configData.shopItemList.length; i++) {
        const itemQty = document.getElementById(String(i));
        itemQtyList.push(itemQty.innerHTML);
      }

      const gameDataList = {};

      for (const [key, value] of Object.entries(configData)) {
        if (key == "stockPriceData") {
          gameDataList[key] = value.dataset.price;
        } else if (
          key != "userName" &&
          key != "userNameWrap" &&
          key != "shopItemList"
        ) {
          gameDataList[key] = value.innerHTML;
        }
      }

      gameDataList["itemQtyList"] = itemQtyList;

      localStorage.setItem(
        configData.userName.value,
        JSON.stringify(gameDataList)
      );

      alert("ゲームデータをセーブしました。");
    });
  }

  // リセットボタンを押した時の処理をするメソッド
  static clickResetBtn() {
    const resetBtn = document.getElementById("reset-btn");

    resetBtn.addEventListener("click", function () {
      if (!confirm("ゲームデータをリセットしますか？")) return false;

      for (let i = 0; i < configData.shopItemList.length; i++) {
        const itemQty = document.getElementById(String(i));
        itemQty.innerHTML = "0";
      }

      GameData.initialize();

      alert("ゲームデータをリセットしました。");
    });
  }

  // 既存のゲームデータをロードするメソッド
  static loadGame() {
    const data = JSON.parse(localStorage.getItem(configData.userName.value));

    if (data == null) {
      alert("入力した名前のデータは存在しません。");
      return false;
    }

    for (let i = 0; i < configData.shopItemList.length; i++) {
      document.getElementById(String(i)).innerHTML = data["itemQtyList"][i];
    }

    for (const [key, value] of Object.entries(configData)) {
      if (key == "stockPriceData") {
        value.dataset.price = data[key];
      } else if (
        key != "userName" &&
        key != "userNameWrap" &&
        key != "shopItemList"
      ) {
        value.innerHTML = data[key];
      }
    }

    alert("ゲームを開始します。");

    HambergerGame.startGame();
  }

  // 新しくゲームを始めて良いか判定するメソッド
  static newGame() {
    const data = JSON.parse(localStorage.getItem(configData.userName.value));

    if (data != null) {
      alert("入力した名前のデータはすでに存在しています。");
      return false;
    }

    alert("ゲームを開始します。");

    startGame();
  }
}

class HambergerGame {
  // dataListのタイプがボンドの時の購入処理を行うメソッド
  static bondsTypePurchase() {
    const qtyTotal = document.getElementById("quantity-total");

    configData.userBonds.innerHTML =
      Number(configData.userBonds.innerHTML) + Number(qtyTotal.innerHTML);
  }

  // dataListのタイプがストックの時の購入処理を行うメソッド
  static stockTypePurchase(price) {
    const qtyTotal = document.getElementById("quantity-total");

    configData.userStocks.innerHTML =
      Number(configData.userStocks.innerHTML) + Number(qtyTotal.innerHTML);
    configData.stockPriceData.dataset.price = Math.floor(Number(price) * 1.1);
    configData.stockPrice.innerHTML = "$ " + Math.floor(Number(price) * 1.1);
  }

  // dataListのタイプがセカンドの時の購入処理を行うメソッド
  static secondTypePurchase(get) {
    const merchQty = document.getElementById("merchandise-quantity");

    configData.moneyPerSecond.innerHTML =
      Number(configData.moneyPerSecond.innerHTML) +
      Number(merchQty.value) * Number(get);
  }

  // dataListのタイプがクリックの時の購入処理を行うメソッド
  static clickTypePurchase(get) {
    const merchQty = document.getElementById("merchandise-quantity");

    configData.moneyPerClick.innerHTML =
      Number(configData.moneyPerClick.innerHTML) +
      Number(merchQty.value) * Number(get);
  }

  // 購入処理をするメソッド
  static purchaseProcessing(dataList) {
    const merchQty = document.getElementById("merchandise-quantity");
    const qtyTotal = document.getElementById("quantity-total");
    const itemQty = document.getElementById(dataList["productIndex"]);

    if (dataList.type == "click") {
      HambergerGame.clickTypePurchase(dataList.get);
    } else if (dataList.type == "second") {
      HambergerGame.secondTypePurchase(dataList.get);
    } else if (dataList.type == "stocks") {
      HambergerGame.stockTypePurchase(dataList.price);
    } else if (dataList.type == "bonds") {
      HambergerGame.bondsTypePurchase();
    }

    // アイテム所持数を更新
    itemQty.innerHTML = Number(itemQty.innerHTML) + Number(merchQty.value);

    // ユーザーの所持金を更新
    configData.userMoney.innerHTML =
      Number(configData.userMoney.innerHTML) - Number(qtyTotal.innerHTML);
  }

  // 購入ページでパーチェスボタンを押した時に購入処理をして良いか判定するメソッド
  static clickPurchaseBtn(dataList) {
    const purchaseBtn = document.getElementById("purchase");
    const merchQty = document.getElementById("merchandise-quantity");
    const qtyTotal = document.getElementById("quantity-total");
    const itemQty = document.getElementById(dataList.productIndex);

    purchaseBtn.addEventListener("click", function () {
      if (!merchQty.value || Number(merchQty.value) <= 0) {
        alert("1つ以上購入してください。");
      } else if (Number(merchQty.value) > Number(dataList.max)) {
        alert("購入数の上限を超えています。");
      } else if (
        Number(qtyTotal.innerHTML) > Number(configData.userMoney.innerHTML)
      ) {
        alert("現在の手持ちでは購入できません。");
      } else if (merchQty.value.includes(".")) {
        alert("小数では購入できません。");
      } else if (
        Number(merchQty.value) + Number(itemQty.innerHTML) >
        Number(dataList.max)
      ) {
        alert("所持数と足し合わせた数が購入数の上限を超えています。");
      } else if (confirm("購入しますか？")) {
        HambergerGame.purchaseProcessing(dataList);

        configPage.homePage.classList.remove("pe-none", "opacity-50");
        Display.hideElement(configPage.purchasePage);
      }
    });
  }

  // 購入ページでバックボタンを押した時の処理を行うメソッド
  static clickGoBackBtn() {
    const goBackBtn = document.getElementById("goback");
    goBackBtn.addEventListener("click", function () {
      configPage.homePage.classList.remove("pe-none", "opacity-50");
      Display.hideElement(configPage.purchasePage);
    });
  }

  // 合計金額を計算し、要素に代入するメソッド
  static totalPrice(dataList) {
    const merchQty = document.getElementById("merchandise-quantity");
    const qtyTotal = document.getElementById("quantity-total");

    merchQty.addEventListener("input", function () {
      if (Number(merchQty.value) <= 0) {
        qtyTotal.innerHTML = "0";
      } else if (
        !merchQty.value.includes(".") &&
        Number(merchQty.value) <= Number(dataList.max)
      ) {
        qtyTotal.innerHTML = Number(merchQty.value) * Number(dataList.price);
      }
    });
  }

  // 購入ページを作るメソッド
  static createPurchasePage(dataList) {
    const lastSentence =
      dataList.type == "stocks"
        ? "of total stocks"
        : dataList.type == "bonds"
        ? "of total bonds"
        : "per " + dataList.type;

    configPage.purchasePage.innerHTML = `
  <div
  class="merchandise-info-wrapper d-flex justify-content-center align-items-center gap-5"
>
  <div class="merchandise-info-desc">
    <h1 class="merchandise-name h1 border-bottom border-4 border-dark">${
      dataList.productName
    }</h1>
    <ul class="merchandise-about-list h4 fw-bold d-flex flex-column gap-2">
      <li class="merchandise-about-item">Max Purchase : ${dataList.max}</li>
      <li class="merchandise-about-item">Price : $ ${Number(
        dataList.price
      )}</li>
      <li class="merchandise-about-item">Get : $ ${
        dataList.get
      } ${lastSentence}</li>
    </ul>
  </div>
  <div class="marchandise-img-wrapper border border-4 border-secondary">
    <img src="${
      dataList.img
    }" alt="" class="marchandise-img p-4" width="180" height="180" />
  </div>
</div>
<div
  class="merchandise-quantity-wrapper d-flex justify-content-center align-items-end flex-column gap-3"
>
  <h1 class="merchandise-quantity-text h4 fw-bold">
    How many would you like to purchase?
  </h1>
  <input
    id="merchandise-quantity"
    class="border border-4 border-dark w-100 text-end p-2 h4"
    type="number"
    min="0"
    max="${dataList.max}"
    step="5"
  />
  <p id="quantity-total"
    class="merchandise-quantity-total h4 border-bottom border-4 border-dark pb-2"
  >
  0
  </p>
</div>
<div
  class="merchandise-button-wrapper d-flex justify-content-center align-items-between gap-5"
>
  <button
    id="goback"
    class="merchandese-button bg-white border border-2 border-secondary rounded fw-bold h3 p-2"
  >
    Go Back
  </button>
  <button
    id="purchase"
    class="merchandese-button bg-dark border border-2 border-secondary rounded fw-bold text-white h3 p-2"
  >
    Purchase
  </button>
  `;

    configPage.homePage.classList.add("pe-none", "opacity-50");
    Display.showElement(configPage.purchasePage);

    HambergerGame.totalPrice(dataList);
    HambergerGame.clickGoBackBtn();
    HambergerGame.clickPurchaseBtn(dataList);
  }

  // アイテムクリック時の処理をするメソッド
  static itemClickProcessing() {
    for (let i = 0; i < configData.shopItemList.length; i++) {
      configData.shopItemList[i].addEventListener("click", function () {
        const dataList = {
          type: this.dataset.type,
          max: this.dataset.max,
          price: this.dataset.price,
          get: this.dataset.get,
          img: this.dataset.img,
          productName: this.dataset.name,
          productIndex: this.dataset.index,
        };

        HambergerGame.createPurchasePage(dataList);
      });
    }
  }

  // ユーザーの所持金を1秒ごとに更新するメソッド
  static updateUserMoneyPerSecond() {
    if (configData.moneyPerSecond.innerHTML != "0") {
      configData.userMoney.innerHTML =
        Number(configData.userMoney.innerHTML) +
        Number(configData.moneyPerSecond.innerHTML);
    }

    if (configData.userStocks.innerHTML != "0") {
      configData.userMoney.innerHTML =
        Number(configData.userMoney.innerHTML) +
        Math.floor(Number(configData.userStocks.innerHTML) * 0.001);
    }

    if (configData.userBonds.innerHTML != "0") {
      configData.userMoney.innerHTML =
        Number(configData.userMoney.innerHTML) +
        Math.floor(Number(configData.userBonds.innerHTML) * 0.0007);
    }
  }

  // ユーザーの所持金をクリック毎に更新するメソッド
  static updateUserHandheldPerClick() {
    configData.userMoney.innerHTML =
      Number(configData.userMoney.innerHTML) +
      Number(configData.moneyPerClick.innerHTML);
  }

  // ハンバーガーの数をクリック毎に更新するメソッド
  static updateHambergerAmountPerClick() {
    const hambergerImg = document.querySelector(".hamberger-img");

    hambergerImg.addEventListener("click", function () {
      configData.hambergerQty.innerHTML =
        Number(configData.hambergerQty.innerHTML) + 1;
      HambergerGame.updateUserHandheldPerClick();
    });
  }

  // ユーザーの年齢を更新するメソッド
  static updateUserAge() {
    configData.userAge.innerHTML = Number(configData.userAge.innerHTML) + 1;
  }

  // 日にちを1秒ごとに更新するメソッド
  static updateUserDaysPerSecond() {
    setInterval(function () {
      const days = Number(configData.userDays.innerHTML) + 1;
      configData.userDays.innerHTML = days;

      if (days % 365 == 0) {
        HambergerGame.updateUserAge();
      }

      HambergerGame.updateUserMoneyPerSecond();
    }, 1000);
  }

  // ゲームをスタートするメソッド
  static startGame() {
    configData.userNameWrap.innerHTML = configData.userName.value;

    Display.hideElement(configPage.loginPage);
    Display.showElement(configPage.homePage);

    HambergerGame.updateUserDaysPerSecond();
    HambergerGame.updateHambergerAmountPerClick();
    HambergerGame.itemClickProcessing();
  }
}

//ハンバーガークリック中のアニメーションをする関数
function clickAnimation() {
  const hambergerImg = document.querySelector(".hamberger-img");
  hambergerImg.classList.add("is-active");
}

// ハンバーガークリックが外れた時のアニメーションをする関数
function notClickAnimation() {
  const hambergerImg = document.querySelector(".hamberger-img");
  hambergerImg.classList.remove("is-active");
}

// ホームページに移って良いか判定する関数
function submitCheck(gameType) {
  if (configData.userName.value == "") {
    alert("名前を入力してください。");
  } else if (gameType == "start") {
    GameData.newGame();
  } else if (gameType == "login") {
    GameData.loadGame();
  }
}

GameData.clickSaveBtn();
GameData.clickResetBtn();
