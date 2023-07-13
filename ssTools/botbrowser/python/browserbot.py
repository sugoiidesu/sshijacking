from selenium import webdriver
import argparse, time


parser = argparse.ArgumentParser()
parser.add_argument("--address", help="Alamat")
parser.add_argument("--cookie", help="Cookie")

args = parser.parse_args()

address = args.address
cookie = args.cookie

if address is None or cookie is None:
    parser.error(
        "use: python3 browserbot.py --address [url] --cookie [your_cookie]\nexample: python3 browserbot.py --address https://facebook.com --cookie 'cookieName1=cookieValue1;cookieName2=cookieValue2'"
    )

# options = webdriver.FirefoxOptions() # jika pake firefox
options = webdriver.ChromeOptions()  # ini jika chrome

# options.add_argument("--marionette-port=6699") # hapus komentar kode ini jika pake firefox
options.add_argument("--keep-alive")  # khusus chrome
options.add_argument("--no-sandbox")  # khusus chrome
options.add_argument("--disable-dev-shm-usage")  # khusus chrome


# driver = webdriver.Firefox(options=options) # khusus firefox
driver = webdriver.Chrome(options=options)  # khusus chrome

cookie_parts = cookie.split(";")
cookie_list = []

for part in cookie_parts:
    cookie_data = part.split("=")
    if len(cookie_data) == 2:
        name = cookie_data[0].strip()
        value = cookie_data[1].strip()

        cookie_dict = {"name": name, "value": value}

        cookie_list.append(cookie_dict)

driver.get(address)

for kuki in cookie_list:
    driver.add_cookie(kuki)

driver.get(address)


while True:
    try:
        time.sleep(5)
    except Exception as e:
        if "session deleted because of page crash" in str(
            e
        ) or "invalid session id" in str(e):
            print(e)
            break
