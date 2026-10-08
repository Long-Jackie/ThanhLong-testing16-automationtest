import { By, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  // Button avatar trên navbar
  private readonly avatarMenuBtn = By.xpath(
    "//nav//button[.//img]"
  );

  // Dropdown user
  private readonly userDropdown = By.id("user-dropdown");

  // Nút Đăng nhập nằm bên trong dropdown
  private readonly loginButton = By.xpath(
    "//div[@id='user-dropdown']//button[normalize-space(.)='Đăng nhập']"
  );

  private readonly emailInput = By.id("email");

  private readonly passwordInput = By.id("password");

  private readonly submitLoginBtn = By.xpath(
    "//button[@type='submit' and contains(normalize-space(.), 'Đăng nhập')]"
  );

  constructor(driver: WebDriver) {
    super(driver);
  }

  async login(email: string, password: string): Promise<void> {
    console.log("LOGIN 1 - Chờ trang load");

    // Chờ loading overlay biến mất
    await this.driver.wait(
      async () => {
        const loaders = await this.driver.findElements(
          By.xpath(
            "//div[contains(@class,'fixed') and contains(@class,'inset-0')]"
          )
        );

        for (const loader of loaders) {
          try {
            if (await loader.isDisplayed()) {
              return false;
            }
          } catch {
            // Loader đã biến mất khỏi DOM
          }
        }

        return true;
      },
      15_000,
      "Trang vẫn đang loading"
    );

    console.log("LOGIN 2 - Click avatar");

    const avatar = await this.driver.wait(
      this.wait.elementLocated(this.avatarMenuBtn),
      10_000
    );

    await this.driver.wait(
      this.wait.elementIsVisible(avatar),
      10_000
    );

    await avatar.click();

    console.log("LOGIN 3 - Dropdown user đã mở");

    const dropdown = await this.driver.wait(
      this.wait.elementLocated(this.userDropdown),
      10_000
    );

    await this.driver.wait(
      this.wait.elementIsVisible(dropdown),
      10_000
    );

    console.log("LOGIN 4 - Click Đăng nhập");

    const loginButton = await this.driver.wait(
      this.wait.elementLocated(this.loginButton),
      10_000
    );

    await this.driver.wait(
      this.wait.elementIsVisible(loginButton),
      10_000
    );

    await loginButton.click();

    console.log("LOGIN 5 - Form login đã mở");

    console.log("LOGIN 6 - Nhập email");

    await this.sendKeys(this.emailInput, email);

    console.log("LOGIN 7 - Nhập password");

    await this.sendKeys(this.passwordInput, password);

    console.log("LOGIN 8 - Submit login");

    await this.click(this.submitLoginBtn);

    console.log("LOGIN 9 - Chờ toast đăng nhập");

    await this.waitForToastMessage("Đăng nhập thành công");

    console.log("LOGIN 10 - Login hoàn tất");
  }
}