from selenium import webdriver

options = webdriver.FirefoxOptions()
options.add_argument("--marionette-port=6699")
driver = webdriver.Firefox(options=options)
driver.get("https://facebook.com")


cookie1 = {
    "name": "datr",
    "value": "RyVrZFeYElw_5AbDEexYOgt7",
}
cookie2 = {
    "name": "sb",
    "value": "RyVrZKpqHdsNXLmuRZ_S0B01",
}
cookie3 = {
    "name": "c_user",
    "value": "100007282653547",
}
cookie4 = {
    "name": "m_page_voice",
    "value": "100007282653547",
}
cookie5 = {
    "name": "usida",
    "value": "eyJ2ZXIiOjEsImlkIjoiQXJ3bHVtZTE2bTMxMjAiLCJ0aW1lIjoxNjg3MzUzOTI2fQ==",
}
cookie6 = {
    "name": "wd",
    "value": "1280x615",
}
cookie7 = {
    "name": "xs",
    "value": "11:Qv3T2GdbyNXT4g:2:1686590095:-1:10724::AcXevQprPLHZgz2ryglGqKyxBDY1H1ddOxeiHzqaHqo",
}
cookie8 = {
    "name": "fr",
    "value": "0u3PTU0fvdOyMbnhd.AWXJVQMR69vmlogLtVNxW9ZdolE.Bkocgs.pS.AAA.0.0.Bkocgs.AWX5510aXZs",
}
cookie9 = {
    "name": "presence",
    "value": 'C{"t3":[],"utc3":1688324154549,"v":1}',
}
driver.add_cookie(cookie1)
driver.add_cookie(cookie2)
driver.add_cookie(cookie3)
driver.add_cookie(cookie4)
driver.add_cookie(cookie5)
driver.add_cookie(cookie6)
driver.add_cookie(cookie7)
driver.add_cookie(cookie8)
driver.add_cookie(cookie9)

driver.get("https://facebook.com")
