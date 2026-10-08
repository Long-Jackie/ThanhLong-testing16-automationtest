import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import assert from "node:assert/strict";
import path from "path";

import { LoginPage } from "../main/pages/LoginPage";
import { ProfilePage } from "../main/pages/ProfilePage";

describe("Airbnb - User Profile Tests", function () {
  this.timeout(60_000);

  let driver: WebDriver;
  let loginPage: LoginPage;
  let profilePage: ProfilePage;

  const BASE_URL = "https://demo5.cybersoft.edu.vn";
  const USER_EMAIL = "abc_123@gmail.com";
  const USER_PASS = "Long@123";

  beforeEach(async function () {
  const options = new chrome.Options();

  options.addArguments("--window-size=1920,1080");
  options.addArguments("--disable-gpu");
  options.addArguments("--disable-software-rasterizer");
  options.addArguments("--disable-notifications");
  options.addArguments("--disable-dev-shm-usage");

  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  await driver.manage().setTimeouts({
    implicit: 0,
    pageLoad: 50_000,
    script: 30_000
  });

  await driver.get(BASE_URL);

  loginPage = new LoginPage(driver);
  profilePage = new ProfilePage(driver);

  await loginPage.login(USER_EMAIL, USER_PASS);

  await driver.get(`${BASE_URL}/info-user`);
});

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("TC22: Verify xem thông tin Profile người dùng", async function () {
    assert.equal(
      (await profilePage.getGreetingMessage()).includes("Xin chào"),
      true,
      "Lời chào người dùng không hiển thị!"
    );

    assert.equal(
      await profilePage.isAvatarDisplayed(),
      true,
      "Ảnh đại diện người dùng không hiển thị!"
    );

    assert.equal(
      await profilePage.isEmailConfirmedSectionDisplayed(),
      true,
      "Mục xác nhận email không hiển thị!"
    );

    assert.equal(
      await profilePage.isRentedRoomsSectionDisplayed(),
      true,
      "Khu vực danh sách phòng đã thuê không hiển thị!"
    );
  });

  it("TC23: Update thông tin cá nhân thành công", async function () {
    const updatedName = "Nguyen Van Test";
    const updatedPhone = "0987654321";

    await profilePage.updateProfile(updatedName, updatedPhone);

    await profilePage.waitForToastMessage(
      "Cập nhật thông tin thành công"
    );

    assert.equal(
      (await profilePage.getGreetingMessage()).includes(updatedName),
      true,
      "Tên hiển thị sau khi update không đúng!"
    );
  });

  it("TC24: Upload avatar cá nhân", async function () {
    const testImage = path.resolve(
      __dirname,
      "../../test/resources/testdata/avatar_test.png"
    );

    const fs = await import("fs/promises");

    try {
      await fs.access(testImage);
    } catch {
      //throw new Error(
      //  `Không tìm thấy file avatar test: ${testImage}`
      //);
    }

    await profilePage.uploadAvatar(testImage);

    await profilePage.waitForToastMessage(
      "Cập nhật avatar thành công!"
    );

    assert.equal(
      await profilePage.isAvatarDisplayed(),
      true,
      "Avatar mới không hiển thị!"
    );
  });

  it("TC25: Đổi mật khẩu tài khoản", async function () {
    const isPresent =
      await profilePage.isChangePasswordButtonPresent();

    if (!isPresent) {
      console.error(
        "[DEFECT LOGGED]: Missing Change Password feature on UI /info-user!"
      );
    }

    assert.equal(
      isPresent,
      true,
      "Chức năng đổi mật khẩu (Change Password) chưa được implement trên trang Profile!"
    );
  });

  it("TC26: Validate các thông báo lỗi khi cập nhật thất bại", async function () {
    await profilePage.submitEmptyForm();

    assert.equal(
      await profilePage.getNameErrorMessage(),
      "Vui lòng nhập họ tên!"
    );

    assert.equal(
      await profilePage.getEmailErrorMessage(),
      "Vui lòng nhập email!"
    );

    assert.equal(
      await profilePage.getPhoneErrorMessage(),
      "Vui lòng nhập số điện thoại!"
    );

    await driver.navigate().refresh();

    await profilePage.enterInvalidData(
      "Van 123",
      "email_sai_dinh_dang",
      "12345"
    );

    assert.equal(
      await profilePage.getNameErrorMessage(),
      "Họ tên không hợp lệ!",
      "Thông báo lỗi họ tên không đúng!"
    );

    assert.equal(
      await profilePage.getEmailErrorMessage(),
      "Email không hợp lệ!",
      "Thông báo lỗi email không đúng!"
    );

    assert.equal(
      await profilePage.getPhoneErrorMessage(),
      "Sai định dạng số điện thoại!",
      "Thông báo lỗi số điện thoại không đúng!"
    );
  });
});