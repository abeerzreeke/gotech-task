import Validator from "../../Common/Validator";


export enum Products {
    FOUND,
    NOTFOUND,
}


export default class SearchPage extends Validator {


    private searchInput = 'input[name="search"]';
    private searchButton = '#search button';
    private searchContent = '#content h1';
    private listView = '#list-view';
    private gridView = '#grid-view';
    private unavaillableMessage = '#content h2~p'



    protected validator: Validator = new Validator(this.page);

    public get getValidator() {
        return this.validator;
    }

   
    public async searchProduct(product: Products) {
        const searchProduct:string = (product == Products.FOUND) ? 'macbook':'product unavailable';

        await this.clickAndFillText(this.searchInput, searchProduct);
        await this.page.waitForTimeout(500);
        await this.clickElement(this.searchButton);
        await this.page.waitForTimeout(9000);

        (product == Products.FOUND) ? await this.validateAvailableProducts() : await this.validateUnavailableMessage(); 

    }

    /**
     * Check if the product availablle 
     * by check if the grid view and last view existing in the page
     */
    private async validateAvailableProducts() {
        await this.validator.validateElementVisible(this.gridView);
        await this.validator.validateElementVisible(this.listView)
    }

    /**
    * Checks if the content of the error message on the search page is correct
    * @param {Credentials} message - Messagebox content.
    * @defaultValue - 'There is no product that matches the search criteria.'
    */
    private async validateUnavailableMessage(message: string = 'There is no product that matches the search criteria.') {
        await this.getValidator.validateElementText(this.unavaillableMessage, message);
    }




}