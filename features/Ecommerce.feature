# npx cucumber-js --tags "@Regression" --exit
# npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
#npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html ->to genrate cucumber html file

Feature: Ecommerce validation
    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with some "hey123@yopmail.com" and "Test@123"
        When Add "ZARA COAT 3" product to the Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and place the Order
        Then Verify order is present in the order history

    Scenario Outline: Scenario Outline name: Placing the Order
        Given a login to Ecommerce2 application with some "<userName" and "<password>"
        Then Verify error message is displayed

        Examples:
            | userName            | password    |
            | hey@123@yopmail.com | Test@123    |
            | anshika@gmail.com   | Iamking@000 |

