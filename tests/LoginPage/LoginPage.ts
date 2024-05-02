import Validator from "../../Common/Validator";


export enum Credentials {
    CORRECT,
    INCORRECT,
}


export default class LoginPage extends Validator {

    private myAccount = '[title="My Account"]';
    private login = '[class*="dropdown-menu"] a[href*="login"]';
    private emailField = '[name="email"]';
    private passwordField = '[name="password"]';
    private loginButton = '[value="Login"]';
    private headerMessage = '[class*="alert-danger alert-dismissible"]';
    private orderFeature = '[class="list-inline"] [class*="dropdown"] li a[href*="order"]';
    private logoutFeature = '[class="list-group"] a[href*="logout"]';


    protected validator: Validator = new Validator(this.page);

    public get getValidator() {
        return this.validator;
    }

    public async loginToUdt(credentials: Credentials = Credentials.CORRECT) {
        
        const email: string = (credentials == Credentials.CORRECT) ? 'user@example.com' : 'incorrect email';
        const password: string = (credentials == Credentials.CORRECT) ? '12345' : 'incorrect password';


        await this.clickElement(this.myAccount);
        await this.page.waitForTimeout(5000);

        await this.clickElement(this.login);
        await this.page.waitForTimeout(5000);

        await this.validateElementVisible(this.emailField);
        await this.clickAndFillText(this.emailField,email);
        // await this.page.waitForTimeout(5000);
        await this.clickAndFillText(this.passwordField,password);
        await this.page.waitForTimeout(500);

        await this.clickElement(this.loginButton);

        (credentials == Credentials.CORRECT) ? await this.validateSuccessLogin() : await this.validateLoginPageHeaderMessage();


    }

    /**
     * Checks if the content of the error message on the login page is correct
     * @param {Credentials} message - Messagebox content.
     * @defaultValue - 'Warning: No match for E-Mail Address and/or Password.'
     */
    private async validateLoginPageHeaderMessage(message: string = 'Warning: No match for E-Mail Address and/or Password.') {
        await this.getValidator.validateElementText(this.headerMessage, message);
    }

      /**
     * Checks if the login action succeeded
     * by check if the order and logout feature existing in the page
     */
      private async validateSuccessLogin() {
        // await this.validator.validateElementVisible(this.orderFeature); 
        await this.validator.validateElementVisible(this.logoutFeature);
    }


}