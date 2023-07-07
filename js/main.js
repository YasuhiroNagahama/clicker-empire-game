const config = {
  top: document.getElementById("loginPage"),
  game: document.getElementById("gamePage"),
  modal: document.getElementById("modalPage"),
};

class Page {
  static removePage(page) {
    page.classList.add("d-none");
  }

  static addPage(page) {
    page.classList.remove("d-none");
  }
}

class ETF {
  constructor(etfStocks, etfBonds, perSecond, userInfo) {
    this.etfStocks = etfStocks;
    this.etfBonds = etfBonds;
    this.perSecond = perSecond;
    this.user = userInfo;

    // 初期値
    this.stocksRatio = 0.001;
    this.bondsRatio = 0.0007;

    // ETFクラス内の複数のメソッドで使用するIDを取得し、メンバ変数に保存
    this.perSecondElement = document.getElementById("perSecond");

    this.setPerSecond();
    this.updateUserMoneyPerSecond();
  }

  initialize() {
    this.stocksRatio = 0.001;
    this.bondsRatio = 0.0007;
    this.etfStocks = 0;
    this.etfBonds = 0;
    this.perSecond = 0;

    this.setPerSecond();
  }

  setPerSecond() {
    this.perSecondElement.innerHTML = String(this.perSecond);
  }

  updateUserMoneyPerSecond() {
    setInterval(() => {
      this.user.addUserMoney(
        this.etfStocks * this.stocksRatio +
          this.etfBonds * this.bondsRatio +
          this.perSecond
      );
    }, 1000);
  }

  updatePerSecondInfo() {
    this.perSecondElement.innerHTML = String(
      this.etfStocks * this.stocksRatio +
        this.etfBonds * this.bondsRatio +
        this.perSecond
    );
  }

  addEtfStocks(total) {
    this.etfStocks += total;

    this.updatePerSecondInfo();
  }

  addEtfBonds(total) {
    this.etfBonds += total;

    this.updatePerSecondInfo();
  }

  addPerSecond(money, quantity) {
    const total = money * quantity;
    this.perSecond += total;

    this.updatePerSecondInfo();
  }
}

class User {
  constructor(userName, userAge, userDays, userMoney) {
    this.userName = userName;
    this.userAge = userAge;
    this.userDays = userDays;
    this.userMoney = userMoney;

    // Userクラス内の複数のメソッドで使用するIDを取得し、メンバ変数に保存
    this.userNameElement = document.getElementById("userName");
    this.userAgeElement = document.getElementById("userAge");
    this.userDaysElement = document.getElementById("userDays");
    this.userMoneyElement = document.getElementById("userMoney");

    // 初期化処理の自動実行
    this.setUserInfo();
    this.setUserName();
    this.updateUserDays();
  }

  initialize() {
    this.userAge = 20;
    this.userDays = 0;
    this.userMoney = 50000;

    this.setUserInfo();
  }

  setUserInfo() {
    this.userNameElement.innerHTML = String(this.userName);

    this.userAgeElement.innerHTML = String(this.userAge);

    this.userMoneyElement.innerHTML = String(this.userMoney);
  }

  setUserName() {
    this.userNameElement.innerHTML = String(this.userName);
  }

  updateUserDays() {
    this.userDaysElement.innerHTML = this.userDays;

    setInterval(() => {
      this.userDays++;
      this.userDaysElement.innerHTML = String(this.userDays);

      this.updateUserAge();
    }, 1000);
  }

  updateUserAge() {
    if (this.userDays % 365 == 0) {
      this.userAge++;
      this.userAgeElement.innerHTML = String(this.userAge);
    }
  }

  addUserMoney(money) {
    this.userMoney += money;
    this.userMoneyElement.innerHTML = String(this.userMoney);
  }

  removeUserMoney(money) {
    this.userMoney -= money;
    this.userMoneyElement.innerHTML = String(this.userMoney);
  }
}

class Hamburger {
  constructor(clickCount, perClick, user) {
    this.clickCount = clickCount;
    this.perClick = perClick;
    this.user = user;

    // Hamburgerクラス内の複数のメソッドで使用するIDを取得し、メンバ変数に保存
    this.burgersElement = document.getElementById("burgers");
    this.perClickElement = document.getElementById("perClick");
    this.perSecondElement = document.getElementById("perSecond");
    this.hamburgerBtn = document.getElementById("hamburgerBtn");

    // 初期化処理の自動実行
    this.setHamburgerInfo();
    this.hamburgerClickAnimation();
    this.updateClickCount();
  }

  initialize() {
    this.clickCount = 0;
    this.perClick = 25;

    this.setHamburgerInfo();
  }

  setHamburgerInfo() {
    this.burgersElement.innerHTML = String(this.clickCount);
    this.perClickElement.innerHTML = String(this.perClick);
  }

  hamburgerClickAnimation() {
    this.hamburgerBtn.addEventListener("mousedown", () => {
      this.hamburgerBtn.style.transform = "scale(1.1, 1.1)";
    });
    this.hamburgerBtn.addEventListener("mouseup", () => {
      this.hamburgerBtn.style.transform = "scale(1, 1)";
    });
  }

  updateClickCount() {
    this.hamburgerBtn.addEventListener("click", () => {
      this.clickCount++;
      this.burgersElement.innerHTML = String(this.clickCount);

      this.user.addUserMoney(this.perClick);
    });
  }

  addPerClick(money, quantity) {
    const total = money * quantity;

    this.perClick += total;
    this.perClickElement.innerHTML = String(this.perClick);
  }
}

class Item {
  constructor(
    itemName,
    itemType,
    itemEffect,
    itemMax,
    itemDesc,
    itemPrice,
    itemImg,
    user,
    hamburger,
    etf
  ) {
    this.itemName = itemName;
    this.itemType = itemType;
    this.itemEffect = itemEffect;
    this.itemMax = itemMax;
    this.itemDesc = itemDesc;
    this.itemPrice = itemPrice;
    this.itemImg = itemImg;

    // インスタンス
    this.user = user;
    this.hamburger = hamburger;
    this.etf = etf;

    // 初期値
    this.purchaseNumber = 0;

    // 初期化処理の自動化
    this.createItemElement();
  }

  initialize() {
    this.purchaseNumber = 0;
  }

  createItemElement() {
    const itemListElement = document.getElementById("itemList");
    const itemElement = document.createElement("li");
    itemElement.classList.add(
      "hamburger-game_shop_item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "gap-4",
      "bg-white",
      "border",
      "border-secondary",
      "border-4",
      "px-2"
    );

    itemElement.innerHTML = `
      <div class="hamburger-game_shop_img-wrapper">
        <img
          src="${this.itemImg}"
          alt="${this.itemName}"
          class="hamburger-game_shop_img"
        />
      </div>
      <p class="hamburger-game_shop_type text-dark h4 fw-bold">
        ${this.itemName}
      </p>
    `;

    itemListElement.append(itemElement);

    itemElement.addEventListener("click", () => {
      window.scroll({ top: 0, behavior: "smooth" });
      this.createModalPage();
      this.pushPurchaseBtn();
      this.pushBackBtn();
    });
  }

  createModalPage() {
    Page.addPage(config.modal);

    config.modal.innerHTML = `
    <div class="hamburger-game_modal_list-wrapper">
        <ul
          class="hamburger-game_modal_list d-flex justify-content-center align-items-start flex-column gap-3"
        >
          <li class="hamburger-game_modal_item h3 fw-bold">
            Name&nbsp;:&nbsp;<span
              class="border-bottom border-2 border-dark"
              >${this.itemName}</span
            >
          </li>
          <li class="hamburger-game_modal_item h3 fw-bold">
            Type&nbsp;:&nbsp;<span
              class="border-bottom border-2 border-dark"
              >${this.itemType}</span
            >
          </li>
          <li class="hamburger-game_modal_item h3 fw-bold">
            Price&nbsp;:&nbsp;$<span
              class="border-bottom border-2 border-dark"
              >${this.itemPrice}</span
            >
          </li>
          <li class="hamburger-game_modal_item h3 fw-bold">
            Purchase Number&nbsp;:&nbsp;<span
              class="border-bottom border-2 border-dark"
              ><span id="purchaseNumber">${this.purchaseNumber}</span>&nbsp;/&nbsp;<span>${this.itemMax}</span
              ></span
            >
          </li>
          <li class="hamburger-game_modal_item h4 fw-bold">
            Description&nbsp;:&nbsp;<span>${this.itemDesc}</span
            >
          </li>
        </ul>
      </div>
      <div class="hamburger-game_modal_input-wrapper border border-2 border-dark">
        <input class="hamburger-game_modal_input h3 fw-bold p-2" id="modalInput" type="number" dir="rtl">
      </div>
      <div
        class="hamburger-game_modal_btn-wrapper d-flex justify-content-center align-items-center gap-5"
      >
        <button id="backBtn" class="hamburger-game_modal_btn">
          <i class="fa-sharp fa-solid fa-delete-left h1"></i>
        </button>
        <button id="purchaseBtn" class="hamburger-game_modal_btn">
          <i class="fa-solid fa-cart-shopping h1"></i>
        </button>
      </div>
    `;
  }

  totalChecker(total) {
    if (this.user.userMoney < total) {
      alert("所持金が足りません。");
      return true;
    }

    return false;
  }

  quantityChecker(quantity) {
    try {
      if (quantity <= 0) throw "1個以上購入してください。";
      else if (quantity > this.itemMax)
        throw "個数が最大可能購入数より大きいです。";
      else if (quantity + this.purchaseNumber > this.itemMax)
        throw "個数と今までの購入数の合計が最大可能購入数より大きいです。";
    } catch (error) {
      alert(error);
      return true;
    }

    return false;
  }

  processThePurchase() {
    const quantity = Number(document.getElementById("modalInput").value);
    if (this.quantityChecker(quantity)) return false;

    const total = this.itemPrice * quantity;
    if (this.totalChecker(total)) return false;

    if (this.itemType === "ability") {
      this.hamburger.addPerClick(this.itemEffect, quantity);
    } else if (this.itemType === "stock") {
      this.etf.addEtfStocks(total);
      this.itemPrice += this.itemPrice * 0.1;
    } else if (this.itemType === "bonds") {
      this.etf.addEtfBonds(total);
    } else {
      this.etf.addPerSecond(this.itemEffect, quantity);
    }

    // userMoneyから購入額を差し引く
    this.user.removeUserMoney(total);
    // アイテム購入数を更新
    this.purchaseNumber += quantity;

    Page.removePage(config.modal);
    config.modal.innerHTML = "";
  }

  pushPurchaseBtn() {
    const purchaseBtn = document.getElementById("purchaseBtn");

    purchaseBtn.addEventListener("click", () => {
      this.processThePurchase();
    });
  }

  pushBackBtn() {
    const backBtn = document.getElementById("backBtn");

    backBtn.addEventListener("click", () => {
      Page.removePage(config.modal);
      config.modal.innerHTML = "";
    });
  }
}

class Game {
  static initializeGame(userInfo, etf, hamburger, items) {
    const resetBtn = document.getElementById("resetBtn");

    resetBtn.addEventListener("click", () => {
      if (!confirm("ゲーム進行状況をリセットしますか?")) return false;

      alert("ゲーム進行状況をリセットしました。");

      userInfo.initialize();
      etf.initialize();
      hamburger.initialize();
      items.forEach((item) => item.initialize());
    });
  }

  static saveGameDataToJson(userName, userInfo, etf, hamburger, items) {
    const gameData = {
      userName: userName,
      userInfo: userInfo,
      etf: etf,
      hamburger: hamburger,
      items: items,
    };

    localStorage.setItem(userName, JSON.stringify(gameData));
  }

  static saveGame(userName, userInfo, etf, hamburger, items) {
    const saveBtn = document.getElementById("saveBtn");

    saveBtn.addEventListener("click", () => {
      if (!confirm("ゲーム進行状況をセーブしますか?")) return false;
      console.log("ゲーム進行状況をセーブする処理を実装中。");

      Game.saveGameDataToJson(userName, userInfo, etf, hamburger, items);
    });
  }

  static startNewGame(enteredName) {
    const userInfo = new User(enteredName, 20, 0, 50000);
    const etf = new ETF(0, 0, 0, userInfo);
    const hamburger = new Hamburger(0, 25, userInfo);
    const items = [
      new Item(
        "Flip machine",
        "ability",
        25,
        500,
        "グリルをクリックごとに 25 円を取得します。",
        15000,
        "img/hamburger_machine.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "ETF Stock",
        "stock",
        300000,
        Infinity,
        "ETF 銘柄の購入分をまとめて加算し、毎秒 0.1% を取得します。",
        300000,
        "img/KK.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "ETF Bonds",
        "bonds",
        300000,
        Infinity,
        "債券 ETF の購入分をまとめて加算し、毎秒 0.07% を取得します。",
        300000,
        "img/bond.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "Lemonade Stand",
        "estates",
        30,
        1000,
        "毎秒 30 円を取得します。",
        30000,
        "img/lemonade.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "Ice Cream Truck",
        "estates",
        120,
        500,
        "毎秒 120 円を取得します。",
        100000,
        "img/ice.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "House",
        "estates",
        32000,
        100,
        "毎秒 32,000 円を取得します。",
        20000000,
        "img/house.jpg",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "TownHouse",
        "estates",
        64000,
        100,
        "毎秒 64,000 円を取得します。",
        40000000,
        "img/city_house.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "Mansion",
        "estates",
        500000,
        20,
        "毎秒 500,000 円を取得します。",
        250000000,
        "img/mansion.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "Industrial Space",
        "estates",
        2200000,
        10,
        "毎秒 2,200,000 円を取得します。",
        1000000000,
        "img/industry.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "Hotel Skyscraper",
        "estates",
        25000000,
        5,
        "毎秒 25,000,000 円を取得します。",
        10000000000,
        "img/hotel.png",
        userInfo,
        hamburger,
        etf
      ),
      new Item(
        "Bullet-Speed Sky Railway",
        "estates",
        30000000000,
        1,
        "毎秒 30,000,000,000 円を取得します。",
        10000000000000,
        "img/train.png",
        userInfo,
        hamburger,
        etf
      ),
    ];

    Page.removePage(config.top);
    Page.addPage(config.game);

    Game.initializeGame(userInfo, etf, hamburger, items);
    Game.saveGame(enteredName, userInfo, etf, hamburger, items);
  }

  static loadGame(enteredName) {
    const gameData = JSON.parse(localStorage.getItem(enteredName));

    const userInfo = new User(
      enteredName,
      gameData.userInfo.userAge,
      gameData.userInfo.userDays,
      gameData.userInfo.userMoney
    );

    const etf = new ETF(
      gameData.etf.etfStocks,
      gameData.etf.etfBonds,
      gameData.etf.perSecond,
      userInfo
    );

    const hamburger = new Hamburger(
      gameData.hamburger.clickCount,
      gameData.hamburger.perClick,
      userInfo
    );

    const items = [];

    gameData.items.forEach((item) => {
      if (item.itemMax == null) item.itemMax = Infinity;

      const itemInstance = new Item(
        item.itemName,
        item.itemType,
        item.itemEffect,
        item.itemMax,
        item.itemDesc,
        item.itemPrice,
        item.itemImg,
        userInfo,
        hamburger,
        etf
      );

      itemInstance.purchaseNumber = item.purchaseNumber;

      items.push(itemInstance);
    });

    Page.removePage(config.top);
    Page.addPage(config.game);

    Game.initializeGame(userInfo, etf, hamburger, items);
    Game.saveGame(enteredName, userInfo, etf, hamburger, items);
  }

  static isEmpty(value) {
    if (value == "") {
      alert("名前を入力してください。");
      return true;
    }

    return false;
  }

  static dataExist(enteredName) {
    return JSON.parse(localStorage.getItem(enteredName)) !== null;
  }

  static pushNewBtn() {
    const newBtn = document.getElementById("newBtn");

    newBtn.addEventListener("click", () => {
      const enteredName = document.getElementById("inputName").value;

      if (Game.isEmpty(enteredName)) return false;
      if (Game.dataExist(enteredName)) {
        alert("入力した名前のデータは既に存在しています。");
        return false;
      }

      Game.startNewGame(enteredName);
    });
  }

  static pushLoginBtn() {
    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {
      const enteredName = document.getElementById("inputName").value;

      if (Game.isEmpty(enteredName)) return false;
      if (!Game.dataExist(enteredName)) {
        alert("入力した名前のデータは存在しません。");
        return false;
      }

      Game.loadGame(enteredName);
    });
  }
}

Game.pushLoginBtn();
Game.pushNewBtn();
