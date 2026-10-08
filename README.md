# Airbnb Automation Testing - TypeScript

Project Selenium WebDriver + TypeScript + Mocha dành cho VS Code.

## Requirements

- Node.js 18+
- npm
- Google Chrome
- VS Code
- TypeScript / ts-node
- ChromeDriver tương thích với Chrome (Selenium Manager của Selenium 4 có thể tự xử lý driver trong đa số trường hợp)

## Cài dependencies

```bash
npm install
```

## Chạy toàn bộ test

```bash
npm test
```

## Chạy từng test case

```bash
npm run test:tc22
npm run test:tc23
npm run test:tc24
npm run test:tc25
npm run test:tc26
```

## Cấu trúc

```text
airbnb-automation-testing/
├── src/
│   ├── main/
│   │   └── pages/
│   │       ├── BasePage.ts
│   │       ├── LoginPage.ts
│   │       └── ProfilePage.ts
│   └── test/
│       ├── UserProfile.test.ts
│       └── resources/
│           └── testdata/
│               └── avatar_test.png
├── package.json
├── tsconfig.json
└── README.md
```

## Mapping từ Java sang TypeScript

| Java | TypeScript |
|---|---|
| Maven | npm |
| pom.xml | package.json |
| TestNG | Mocha |
| @BeforeMethod | beforeEach |
| @AfterMethod | afterEach |
| @Test | it |
| Assert.assertTrue | expect(...).to.equal(true) |
| Assert.assertEquals | expect(...).to.equal(...) |
| WebDriver | WebDriver |
| By | By |
| WebDriverWait | driver.wait(...) |
| Keys.chord | Key.chord |
| .java | .ts |

## Test cases

- TC22: View User Profile
- TC23: Update User Profile
- TC24: Upload Avatar
- TC25: Change Password
- TC26: Validate update errors

> Lưu ý: Account, BASE_URL và locator được giữ nguyên từ project Java ban đầu.
