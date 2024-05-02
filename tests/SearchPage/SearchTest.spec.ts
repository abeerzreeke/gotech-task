import { test, expect } from '@playwright/test';
import BasePage from '../../Common/BasePage';
import SearchPage, { Products } from './SearchPage'


let basePage: BasePage;
let searchPage: SearchPage;


test("Search test feature - Search by product not found", async ({ page }) => {

  basePage = new BasePage(page);
  searchPage = new SearchPage(page);

  const utdUrlTemplate = 'http://tutorialsninja.com/demo/';
  await basePage.loadApplication(utdUrlTemplate);
  await page.setViewportSize({width: 1400, height: 900});
  await page.waitForTimeout(500);

  await searchPage.searchProduct(Products.NOTFOUND)
  expect(true);

});

test("Search test feature - Search by product found", async ({ page }) => {

  basePage = new BasePage(page);
  searchPage = new SearchPage(page);

  await searchPage.searchProduct(Products.FOUND);
  expect(true);
});
