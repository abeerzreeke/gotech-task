import {ElementHandle, expect, Locator, Page} from "@playwright/test";



export default class BasePage  {

    
    constructor(public page: Page) {
    
    }

    public async loadApplication(url: string) {
        console.log('start te')
        await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
        console.log('end')
    }

    public async clickElement(selector:  (string | Locator | ElementHandle<SVGElement | HTMLElement>), waitAfterClick: boolean = true) {

        try {
            if (typeof selector === "string") {

             const webElement = this.page.locator(selector);
             await webElement.waitFor({ state: 'visible', timeout: 5000 }); 
             await this.page.waitForTimeout(500);

             await webElement.focus()
             // Wait for the element to be present in the DOM and visible
             await this.page.waitForSelector(selector);
             await this.page.waitForTimeout(500);
             await webElement.click({force: true});
             if (waitAfterClick) {
                 await this.page.waitForTimeout(500);
             }
            }
         
         } catch (error) {
             throw new Error(error.toString());
         } 
    }

    public async clickAndFillText(selector: string, text: string) {

        try {
            await this.clickElement(selector)
            // Type the text into the input field
            await this.page.fill(selector, text);
            console.log(`Clicked on element '${selector}' and typed '${text}'`);
        } catch (error) {
            console.error(`Error clicking on element '${selector}' and typing '${text}': ${error}`);
        }
    }

    public async getTextContent(selector: string) {
        return await this.page.locator(selector).textContent();
    }



}