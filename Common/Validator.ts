import BasePage from "./BasePage";
import {expect} from "@playwright/test";



export default class Validator extends BasePage {

    public async validateElementText(element: string, text: string) {
        const elementText = await this.getTextContent(element)
        expect(elementText).toContain(text);
    }

     public async validateElementVisible(element: string) {
        const webElement = this.page.locator(element);
        await webElement.waitFor({ state: 'visible', timeout: 60000 }); 
        await this.page.waitForTimeout(500);
        await this.page.waitForSelector(element)
        const expectedElement = await this.page.$(element, {strict: true});
        const isVisible = !!expectedElement && await expectedElement.isVisible();
        expect(isVisible).toBe(true);
    }
}