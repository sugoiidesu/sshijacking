package com.browserbot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.Cookie;
// import org.openqa.selenium.firefox.FirefoxDriver; // hapus komentar kode ini jika kamu menggunakan firefox
import org.openqa.selenium.chrome.ChromeDriver; // hapus komentar kode ini jika kamu menggunakan chrome
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class App 
{
    public static void main(String[] args)
    {
        String address = null;
        String cookie = null;
        if (args.length < 2) {
            System.err.println("use: java -jar browserbot-1.0-SNAPSHOT.jar --address [url] --cookie [your_cookie]");
            System.err.println("example: java -jar browserbot-1.0-SNAPSHOT.jar --address https://facebook.com --cookie 'cookieName1=cookieValue2;cookieName2=cookieValue2'");
            return;
        }

        for (int i = 0; i < args.length; i += 2) {
            if (args[i].equals("--address")) {
                address = args[i + 1];
            } else if (args[i].equals("--cookie")) {
                cookie = args[i + 1];
            } else {
                System.err.println("Error: Invalid argument: " + args[i]);
                return;
            }
        }

        if (address == null || cookie == null) {
            System.err.println("use: java -jar browserbot-1.0-SNAPSHOT.jar --address [url] --cookie [your_cookie]");
            System.err.println("example: java -jar browserbot-1.0-SNAPSHOT.jar --address https://facebook.com --cookie 'cookieName1=cookieValue2;cookieName2=cookieValue2'");
            return;
        }

        String baseUrl = address;
        // System.setProperty("webdriver.gecko.driver","geckodriver"); // hapus komentar kode ini jika kamu menggunakan firefox geckodriver

        System.setProperty("webdriver.chrome.driver", "chromedriver"); // hapus komentar kode ini jika kamu menggunakan chrome webdriver
        
        // WebDriver driver = new FirefoxDriver(); // hapus komentar kode ini jika kamu menggunakan firefox
        WebDriver driver = new ChromeDriver(); // hapus komentar kode ini jika kamu menggunakan chrome
        driver.get(baseUrl);
        
        String cookieData = cookie;

        JsonObject jsonData = new JsonObject();

        String[] cookiePairs = cookieData.split(";");
        for (String pair : cookiePairs) {
            String[] keyValue = pair.trim().split("=");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();

                JsonObject kuki = new JsonObject();
                kuki.addProperty("name", key);
                kuki.addProperty("value", value);

                String kukiName = "kuki" + (jsonData.size() + 1);
                jsonData.add(kukiName, kuki);
            }
        }

        Gson gson = new Gson();
        String json = gson.toJson(jsonData);

        JsonElement element = JsonParser.parseString(json);

        if (element.isJsonObject()) {
            JsonObject jsonObject = element.getAsJsonObject();
            for (String key : jsonObject.keySet()) {
                JsonObject cookieObject = jsonObject.getAsJsonObject(key);
                String name = cookieObject.get("name").getAsString();
                String value = cookieObject.get("value").getAsString();
                Cookie ncookie = new Cookie(name, value);
                driver.manage().addCookie(ncookie);
            }
        }
        driver.navigate().refresh();
    }
}
