# Implement cucumber tags for features and also demo on tagged hooks on filter
# npx cucumber-js --tags "@Validation" --exit
# applied parameterized cucumber

Feature: Ecommerce validation
    @Validation
    @foo
    Scenario Outline: Scenario Outline name: Placing the Order
        Given a login to Ecommerce2 application with some "<userName" and "<password>"
        Then Verify error message is displayed

        Examples:
            | userName            | password    |
            | hey@123@yopmail.com | Test@123    |
            | anshika@gmail.com   | Iamking@000 |