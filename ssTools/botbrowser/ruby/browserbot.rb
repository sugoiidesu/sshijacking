require 'optparse'
require 'selenium-webdriver'

address = nil
cookie = nil

OptionParser.new do |opts|
    opts.on("--address ADDRESS", "Specify the address") do |value|
        address = value
    end

    opts.on("--cookie COOKIE", "Specify the cookie") do |value|
        cookie = value
    end
end.parse!

if address.nil? || cookie.nil?
    puts "Error: Argument is missing."
else
    # Selenium::WebDriver::Firefox::Service.driver_path = 'geckodriver' #jika pake firefox
    Selenium::WebDriver::Chrome::Service.driver_path = 'chromedriver' # jika pake chrome


    # options = Selenium::WebDriver::Firefox::Options.new # ini pake firefox
    options = Selenium::WebDriver::Chrome::Options.new # ini pake chrome


    # driver = Selenium::WebDriver.for :firefox, options: options # ini pake firefox
    driver = Selenium::WebDriver.for :chrome, options: options # ini pake chrome

    
    cookies = cookie.split(';')

    cookie_json = []

    cookies.each_with_index do |cookie, index|
        name, value = cookie.split('=')
        cookie_json << { 'name' => name, 'value' => value }
    end
    driver.get(address)

    cookie_json.each do |kuki|
        driver.manage.add_cookie(name: kuki["name"], value: kuki["value"])
    end
    driver.get(address)

    loop do
        begin
            sleep(5)
        rescue Selenium::WebDriver::Error::WebDriverError => e
            if e.message.include?('invalid session id')
                break
            end
        end
    end
end