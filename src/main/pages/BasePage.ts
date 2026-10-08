import {
  By,
  Key,
  until,
  WebDriver
} from "selenium-webdriver";

export class BasePage {
  protected readonly driver: WebDriver;
  protected readonly wait: typeof until;

  constructor(driver: WebDriver) {
    this.driver = driver;
    this.wait = until;
  }

  protected async click(locator: By): Promise<void> {
    await this.driver.wait(
      async () => {
        try {
          const element = await this.driver.findElement(locator);

          if (!(await element.isDisplayed())) {
            return false;
          }

          if (!(await element.isEnabled())) {
            return false;
          }

          await element.click();
          return true;
        } catch (error: any) {
          if (
            error.name === "StaleElementReferenceError" ||
            error.name === "ElementClickInterceptedError" ||
            error.name === "ElementNotInteractableError"
          ) {
            return false;
          }

          throw error;
        }
      },
      10_000,
      `Không thể click element: ${locator}`
    );
  }

  protected async sendKeys(
    locator: By,
    text: string
  ): Promise<void> {
    await this.driver.wait(
      async () => {
        try {
          const element = await this.driver.findElement(locator);

          if (!(await element.isDisplayed())) {
            return false;
          }

          if (!(await element.isEnabled())) {
            return false;
          }

          await element.sendKeys(
            Key.chord(Key.CONTROL, "a"),
            Key.BACK_SPACE
          );

          if (text !== "") {
            await element.sendKeys(text);
          }

          return true;
        } catch (error: any) {
          if (
            error.name === "StaleElementReferenceError" ||
            error.name === "ElementNotInteractableError"
          ) {
            return false;
          }

          throw error;
        }
      },
      10_000,
      `Không thể nhập dữ liệu vào element: ${locator}`
    );
  }

  protected async getText(locator: By): Promise<string> {
  const timeout = 10_000;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      const element = await this.driver.findElement(locator);

      if (await element.isDisplayed()) {
        return (await element.getText()).trim();
      }
    } catch (error: any) {
      if (error.name !== "StaleElementReferenceError") {
        throw error;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(
    `Không thể lấy text từ element sau ${timeout}ms: ${locator}`
  );
}

  protected async isElementDisplayed(
    locator: By
  ): Promise<boolean> {
    try {
      return await this.driver.wait(
        async () => {
          try {
            const elements = await this.driver.findElements(locator);

            if (elements.length === 0) {
              return false;
            }

            return await elements[0].isDisplayed();
          } catch (error: any) {
            if (error.name === "StaleElementReferenceError") {
              return false;
            }

            return false;
          }
        },
        10_000
      );
    } catch {
      return false;
    }
  }

  async waitForToastMessage(
    expectedMessage: string
  ): Promise<void> {
    const toastLocator = By.xpath(
      `//div[contains(@class,'ant-message')]//span[contains(text(), '${expectedMessage}')]`
    );

    await this.driver.wait(
      async () => {
        try {
          const elements =
            await this.driver.findElements(toastLocator);

          for (const element of elements) {
            try {
              if (
                (await element.isDisplayed()) &&
                (await element.getText()).includes(expectedMessage)
              ) {
                return true;
              }
            } catch (error: any) {
              if (
                error.name === "StaleElementReferenceError"
              ) {
                return false;
              }
            }
          }

          return false;
        } catch {
          return false;
        }
      },
      10_000,
      `Không tìm thấy toast: ${expectedMessage}`
    );
  }
}