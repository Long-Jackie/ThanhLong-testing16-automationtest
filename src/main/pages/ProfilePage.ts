import { By, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  // Thông tin cá nhân
  private readonly greetingText = By.xpath(
    "//div[contains(@class,'basis-9/12')]//p[contains(text(),'Xin chào')]",
  );
  private readonly userAvatar = By.xpath(
    "//div[contains(@class,'container')]//img[contains(@class,'rounded-full')]",
  );
  private readonly emailConfirmedText = By.xpath(
    "//span[contains(text(),'Địa chỉ email')]",
  );
  private readonly rentedRoomsSection = By.xpath(
    "//h1[contains(text(),'Phòng đã thuê')]",
  );

  // Chỉnh sửa hồ sơ
  private readonly editProfileBtn = By.xpath(
    "//button[contains(text(),'Chỉnh sửa hồ sơ')]",
  );
  private readonly nameInput = By.id("name");
  private readonly emailInput = By.id("email");
  private readonly phoneInput = By.id("phone");
  private readonly updateProfileSubmitBtn = By.xpath(
    "//button[span[contains(text(),'Cập nhật')]]",
  );

  // Validation
  private readonly nameErrorMsg = By.xpath(
    "//div[contains(@class,'ant-form-item') and .//label[@for='name']]//div[contains(@class,'ant-form-item-explain-error')]",
  );
  private readonly emailErrorMsg = By.xpath(
    "//div[contains(@class,'ant-form-item') and .//label[@for='email']]//div[contains(@class,'ant-form-item-explain-error')]",
  );
  private readonly phoneErrorMsg = By.xpath(
    "//div[contains(@class,'ant-form-item') and .//label[@for='phone']]//div[contains(@class,'ant-form-item-explain-error')]",
  );

  // Upload avatar
  private readonly openUploadAvatarBtn = By.xpath(
    "//button[contains(text(),'Cập nhật ảnh')]",
  );
  private readonly fileUploadInput = By.xpath(
    "//div[contains(@class,'ant-modal')]//input[@type='file']",
  );
  private readonly submitUploadAvatarBtn = By.xpath(
    "//div[contains(@class,'ant-modal')]//button[contains(text(),'Upload Avatar')]",
  );

  // Change password
  private readonly changePasswordBtn = By.xpath(
    "//button[contains(text(),'Đổi mật khẩu') or contains(text(),'Change password')]",
  );

  constructor(driver: WebDriver) {
    super(driver);
  }

  async getGreetingMessage(): Promise<string> {
    return this.getText(this.greetingText);
  }

  async isAvatarDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(this.userAvatar);
  }

  async isEmailConfirmedSectionDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(this.emailConfirmedText);
  }

  async isRentedRoomsSectionDisplayed(): Promise<boolean> {
    return this.isElementDisplayed(this.rentedRoomsSection);
  }

  async openEditProfileModal(): Promise<void> {
  await this.click(this.editProfileBtn);

  await this.driver.wait(
    async () => {
      try {
        const elements = await this.driver.findElements(
          this.nameInput
        );

        if (elements.length === 0) {
          return false;
        }

        return await elements[0].isDisplayed();
      } catch (error: any) {
        if (error.name === "StaleElementReferenceError") {
          return false;
        }

        throw error;
      }
    },
    10_000,
    "Form chỉnh sửa hồ sơ chưa xuất hiện"
  );
}

  async updateProfile(newName: string, newPhone: string): Promise<void> {
    await this.openEditProfileModal();
    await this.sendKeys(this.nameInput, newName);
    await this.sendKeys(this.phoneInput, newPhone);
    await this.click(this.updateProfileSubmitBtn);
  }

  async submitEmptyForm(): Promise<void> {
    await this.openEditProfileModal();
    await this.sendKeys(this.nameInput, "");
    await this.sendKeys(this.emailInput, "");
    await this.sendKeys(this.phoneInput, "");
    await this.click(this.updateProfileSubmitBtn);
  }

  async enterInvalidData(
    invalidName: string,
    invalidEmail: string,
    invalidPhone: string,
  ): Promise<void> {
    await this.openEditProfileModal();
    await this.sendKeys(this.nameInput, invalidName);
    await this.sendKeys(this.emailInput, invalidEmail);
    await this.sendKeys(this.phoneInput, invalidPhone);
    await this.click(this.updateProfileSubmitBtn);
  }

  async getNameErrorMessage(): Promise<string> {
    return this.getText(this.nameErrorMsg);
  }

  async getEmailErrorMessage(): Promise<string> {
    return this.getText(this.emailErrorMsg);
  }

  async getPhoneErrorMessage(): Promise<string> {
    return this.getText(this.phoneErrorMsg);
  }

  async uploadAvatar(absoluteFilePath: string): Promise<void> {
    await this.click(this.openUploadAvatarBtn);

    const input = await this.driver.wait(
      this.wait.elementLocated(this.fileUploadInput),
      10_000,
    );

    await input.sendKeys(absoluteFilePath);
    await this.click(this.submitUploadAvatarBtn);
  }

  async isChangePasswordButtonPresent(): Promise<boolean> {
    return this.isElementDisplayed(this.changePasswordBtn);
  }
}
