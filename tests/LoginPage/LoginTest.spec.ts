import { test, expect } from '@playwright/test';
import BasePage from '../../Common/BasePage';
import LoginPage, {Credentials} from './LoginPage';

let basePage: BasePage;
let loginPage: LoginPage;


test('Login test feature - open the website', async ({ page }) => {

  basePage = new BasePage(page);
  loginPage = new LoginPage(page);
  const utdUrlTemplate = 'http://tutorialsninja.com/demo/';
  await basePage.loadApplication(utdUrlTemplate);
  await page.setViewportSize({width: 1400, height: 900});
  await page.waitForTimeout(500);
});


test("Login with incorrect credentials", async ({ page }) => {

  basePage = new BasePage(page);
  loginPage = new LoginPage(page);

  const utdUrlTemplate = 'http://tutorialsninja.com/demo/';
  await basePage.loadApplication(utdUrlTemplate);
  await page.setViewportSize({width: 1400, height: 900});
  await page.waitForTimeout(500);

  await loginPage.loginToUdt(Credentials.INCORRECT);
  expect(true);

});

test("Login with Correct dentials", async ({ page }) => {

  basePage = new BasePage(page);
  loginPage = new LoginPage(page);

  await loginPage.loginToUdt(Credentials.CORRECT);
  expect(true);
});
